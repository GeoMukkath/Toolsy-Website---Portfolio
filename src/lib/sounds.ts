/**
 * Sound engine recreating the makingsoftware.com scroll experience.
 *
 * The original site plays two sounds:
 *  - "sharp_click.m4a" — a short, dry mechanical tick (volume 0.05, rate 2)
 *    fired as each 10px calibration tick on the right-side ruler passes
 *    under the mouse cursor.
 *  - "paper_rubbing.m4a" — a soft paper rustle (volume 0.1, rates 2/3)
 *    fired when the page is scrolled across the article's top edge.
 *
 * The original audio files are not publicly archived, so these are
 * close WebAudio recreations tuned to the original's volume, pitch and
 * timing. Drop real .m4a files into /public/sound/ and swap
 * `playSharpClick` / `playPaperRubbing` for <audio> playback for a 1:1
 * match.
 */

type AudioContextConstructor = typeof AudioContext;

/** Global loudness multiplier applied to every sound. */
const MASTER_VOLUME = 0.6;

/** Max sounds buffered while the AudioContext is still resuming. */
const MAX_PENDING = 6;

/** Queued sounds older than this are dropped instead of bursting later. */
const PENDING_MAX_AGE_MS = 2000;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    AudioContext?: AudioContextConstructor;
    webkitAudioContext?: AudioContextConstructor;
  };
  const Ctor = w.AudioContext ?? w.webkitAudioContext;
  return Ctor ? new Ctor() : null;
}

let ctx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;

/** Sounds requested while the context was still resuming. */
let pending: Array<{ queuedAt: number; play: (context: AudioContext) => void }> = [];

function flushPending(context: AudioContext): void {
  const now = Date.now();
  const queue = pending;
  pending = [];
  for (const entry of queue) {
    if (now - entry.queuedAt <= PENDING_MAX_AGE_MS) entry.play(context);
  }
}

function ensureContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = getAudioContext();
  if (!ctx) return null;
  if (ctx.state === "suspended") {
    // Browsers keep the context suspended until the user interacts with
    // the page (autoplay policy). Retry on every call; once it succeeds,
    // flush any sounds requested during the wait so the first scroll
    // after an unlock is audible immediately.
    void ctx.resume()
      .then(() => flushPending(ctx as AudioContext))
      .catch(() => {});
  }
  if (ctx.state !== "running") return null;
  return ctx;
}

/**
 * Play now, or — if the context is still resuming — buffer the sound so
 * it plays the moment the unlock lands (capped to avoid a burst).
 */
function playOrQueue(play: (context: AudioContext) => void): void {
  const context = ensureContext();
  if (!context) {
    if (pending.length < MAX_PENDING) pending.push({ queuedAt: Date.now(), play });
    return;
  }
  play(context);
}

/** Short filtered-noise buffer, shared by every noise-based sound. */
function getNoiseBuffer(context: AudioContext): AudioBuffer {
  if (noiseBuffer) return noiseBuffer;
  const length = Math.floor(context.sampleRate * 0.12);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  noiseBuffer = buffer;
  return buffer;
}

export function unlockAudio(): void {
  ensureContext();
}

/**
 * Keep retrying the audio unlock on every plausible interaction until the
 * context is running, then detach. Wheel/scroll don't grant user
 * activation in every browser, but they're free to try — and pointerdown,
 * keydown and touch events unlock immediately, so scrolling is audible
 * from the first accepted interaction.
 */
export function attachAudioUnlock(): () => void {
  if (typeof window === "undefined") return () => {};

  const events = [
    "pointerdown",
    "pointerup",
    "keydown",
    "touchstart",
    "touchend",
    "wheel",
    "scroll",
  ] as const;

  const onInteraction = () => {
    const running = ensureContext();
    if (running) detach();
  };
  const detach = () => {
    for (const event of events) {
      window.removeEventListener(event, onInteraction);
    }
  };

  for (const event of events) {
    window.addEventListener(event, onInteraction, { passive: true });
  }
  return detach;
}

/**
 * The ruler "tick" — recreates sharp_click.m4a at the original's
 * settings (volume 0.05, playbackRate 2). A dry, high-pitched click.
 */
export function playSharpClick(volume = 0.05, rate = 2): void {
  playOrQueue((context) => {
    const v = volume * MASTER_VOLUME;
    const t = context.currentTime;
    const duration = 0.03 / rate;

    // Body: short burst of high-frequency filtered noise.
    const noise = context.createBufferSource();
    noise.buffer = getNoiseBuffer(context);
    noise.playbackRate.value = rate;

    const bandpass = context.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(4200 * (rate / 2), t);
    bandpass.frequency.exponentialRampToValueAtTime(2600 * (rate / 2), t + duration);
    bandpass.Q.value = 6;

    const gain = context.createGain();
    gain.gain.setValueAtTime(v, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(context.destination);
    noise.start(t);
    noise.stop(t + duration + 0.01);

    // Attack: one-cycle "thock" to give it a mechanical edge.
    const osc = context.createOscillator();
    const oscGain = context.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(2200 * (rate / 2), t);
    osc.frequency.exponentialRampToValueAtTime(900 * (rate / 2), t + duration);
    oscGain.gain.setValueAtTime(v * 0.9, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(oscGain);
    oscGain.connect(context.destination);
    osc.start(t);
    osc.stop(t + duration + 0.01);
  });
}

/**
 * Soft paper rustle — recreates paper_rubbing.m4a at the original's
 * settings (volume 0.1, rates 2 up / 3 down). A breathy filtered-noise
 * swell that fades in and out quickly.
 */
export function playPaperRubbing(volume = 0.1, rate = 2, direction: "up" | "down" = "up"): void {
  playOrQueue((context) => {
    const v = volume * MASTER_VOLUME;
    const t = context.currentTime;
    const duration = 0.28 / rate;

    const noise = context.createBufferSource();
    noise.buffer = getNoiseBuffer(context);
    noise.playbackRate.value = rate;

    const bandpass = context.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.Q.value = 0.8;
    const base = direction === "up" ? 900 : 700;
    bandpass.frequency.setValueAtTime(base * (rate / 2), t);
    bandpass.frequency.exponentialRampToValueAtTime(base * 2.2 * (rate / 2), t + duration);

    const gain = context.createGain();
    // Paper rubbing swells in and out rather than attacking sharply.
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(v, t + duration * 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(context.destination);
    noise.start(t);
    noise.stop(t + duration + 0.01);
  });
}
