"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  playPaperRubbing,
  playSharpClick,
  attachAudioUnlock,
  unlockAudio,
} from "@/lib/sounds";

/**
 * Right-side calibration ruler in the style of makingsoftware.com.
 *
 * - A tick every 10px along the viewport height; ticks you've scrolled
 *   past dim, ticks ahead stay darker. Hovering a tick widens it and
 *   plays a sharp click (the site's scroll "tick" sound).
 * - Scrolling in either direction plays the same sharp tick once per
 *   10px travelled, so the ruler "counts" as the page moves.
 * - A blue progress line with a live 0.00–1.00 readout.
 * - Clicking any tick smooth-scrolls to that position in the page.
 * - Crossing the top of the main content while scrolling plays the
 *   paper-rubbing sound.
 */
export default function ScrollRuler() {
  const rulerRef = useRef<HTMLDivElement>(null);
  const articleTopRef = useRef<number>(0);
  const articleHeightRef = useRef<number>(1);
  const headerHeightRef = useRef<number>(0);
  const crossedTopRef = useRef(false);
  const lastYRef = useRef(0);
  const tickAccumRef = useRef(0);

  const [tickCount, setTickCount] = useState(0);
  const [rulerHeight, setRulerHeight] = useState(0);
  const [progressY, setProgressY] = useState(0);

  const recalculate = useCallback(() => {
    const ruler = rulerRef.current;
    const article = document.querySelector("[data-article-content]");
    if (!ruler || !article) return;

    const rulerRect = ruler.getBoundingClientRect();
    setRulerHeight(rulerRect.height);
    setTickCount(Math.floor(rulerRect.height / 10));

    headerHeightRef.current = document
      .querySelector("header[data-site-header]")
      ?.getBoundingClientRect().height ?? 0;

    const rect = article.getBoundingClientRect();
    articleTopRef.current = rect.top + window.scrollY;
    articleHeightRef.current =
      Math.max(rect.height - window.innerHeight, 1);
  }, []);

  const updateProgress = useCallback(() => {
    const ruler = rulerRef.current;
    if (!ruler) return;
    const rulerRect = ruler.getBoundingClientRect();
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    setProgressY(
      Math.max(0, Math.min(10 * Math.round(ratio * rulerRect.height / 10), rulerRect.height - 10)),
    );
  }, []);

  useEffect(() => {
    unlockAudio();
    // Keep retrying the audio unlock on every interaction until the
    // context runs, so the first scroll after load is audible.
    const detachAudioUnlock = attachAudioUnlock();
    lastYRef.current = window.scrollY;
    recalculate();
    updateProgress();

    const onResize = () => {
      recalculate();
      updateProgress();
    };
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastYRef.current;
      lastYRef.current = y;

      // Paper-rubbing sound when scrolling across the main content's
      // top edge (the original triggers it via scrollY vs article top).
      const top = articleTopRef.current - headerHeightRef.current;
      if (top >= 0) {
        if (!crossedTopRef.current && y >= top) {
          crossedTopRef.current = true;
          playPaperRubbing(0.05, 2, "up");
        } else if (crossedTopRef.current && y < top) {
          crossedTopRef.current = false;
          playPaperRubbing(0.05, 3, "down");
        }
      }

      // Tick sound once per 10px scrolled, up or down (matches the
      // ruler's 10px calibration spacing). Fast flicks fire several
      // ticks in one event, capped to avoid an audio burst.
      tickAccumRef.current += dy;
      const steps = Math.floor(Math.abs(tickAccumRef.current) / 10);
      if (steps > 0) {
        tickAccumRef.current %= 10;
        for (let i = 0; i < Math.min(steps, 3); i++) playSharpClick(0.025, 2);
      }

      updateProgress();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Re-measure once fonts/layout have settled.
    const timer = setTimeout(() => {
      recalculate();
      updateProgress();
    }, 300);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      detachAudioUnlock();
      clearTimeout(timer);
    };
  }, [recalculate, updateProgress]);

  const jumpTo = (tickY: number) => {
    const target =
      articleTopRef.current - headerHeightRef.current +
      (tickY / Math.max(rulerHeight, 1)) * articleHeightRef.current;
    playSharpClick(0.1, 1); // original: sharp_click volume .1 rate 1 on click
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div
      ref={rulerRef}
      className="group fixed top-20 right-0 bottom-10 z-40 hidden w-full max-w-[20vw] justify-end pl-10 lg:block"
      aria-label="Page navigation ruler"
    >
      <div className="relative z-50 h-full">
        <div className="absolute inset-0">
          {/* Calibration ticks every 10px */}
          {Array.from({ length: tickCount }, (_, i) => i * 10).map((y) => (
            <div
              key={`tick-${y}`}
              style={{ "--position": `${y}px` } as React.CSSProperties}
              className="group/tick absolute top-[var(--position)] right-4 grid w-24 items-center justify-end"
            >
              <div
                className={`h-px w-2 transition-all duration-100 group-hover/tick:w-4 group-hover/tick:bg-black ${
                  y < progressY ? "bg-black/10" : "bg-black/25"
                }`}
              />
              <div
                className="absolute inset-x-0 h-2 cursor-pointer"
                onMouseEnter={() => playSharpClick(0.05, 2)}
                onClick={() => jumpTo(y)}
              />
            </div>
          ))}


          {/* Blue progress line + 0.00-1.00 readout */}
          <div
            className="absolute right-4 z-20 transition-opacity duration-300 opacity-100"
            style={{ top: `${progressY}px` }}
          >
            <div className="h-px w-4 bg-blueprint" />
            <span className="absolute top-0 -left-10 -translate-y-1/2 font-mono text-xs text-blueprint transition-opacity duration-300 group-hover:opacity-0">
              {(rulerHeight > 0 ? progressY / rulerHeight : 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
