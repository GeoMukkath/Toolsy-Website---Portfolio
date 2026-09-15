"use client";

import { useEffect, useRef } from "react";
import { unlockAudio } from "@/lib/sounds";

/**
 * The architect's desk, around the page:
 *
 * - LEFT — a sliding calibration ruler. The page is the sheet of paper;
 *   scrolling moves it over the stationary scale, so the ticks glide up
 *   (or down) with scroll. A fixed readout window shows the sheet's
 *   travel in px.
 * - BOTTOM — a T-square beam that parallaxes horizontally with scroll,
 *   as if drafting the line you're reading.
 *
 * Purely decorative: aria-hidden, pointer-events-none, hidden below lg.
 * Honours prefers-reduced-motion (static tools, no clicks).
 */

export default function DeskTools() {
  const slideRef = useRef<HTMLDivElement>(null);
  const pxReadoutRef = useRef<HTMLSpanElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let queued = false;

    const update = () => {
      queued = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;

      // Sliding ruler: pattern period is 50px, so translateY wraps seamlessly.
      if (slideRef.current) {
        slideRef.current.style.transform = `translateY(${-(y % 50)}px)`;
      }
      if (pxReadoutRef.current) {
        pxReadoutRef.current.textContent = String(Math.round(y)).padStart(4, "0");
      }

      // T-square beam: subtle horizontal parallax.
      if (beamRef.current) {
        beamRef.current.style.transform = `translateX(${p * 80 - 40}px)`;
      }
    };

    const onScroll = () => {
      if (!queued) {
        queued = true;
        raf = requestAnimationFrame(update);
      }
    };

    unlockAudio();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none hidden lg:block">
      {/* ── Left sliding ruler ── */}
      <div className="fixed left-0 top-0 bottom-0 z-30 w-9 border-r border-blueprint/10">
        <div className="absolute inset-0 overflow-hidden">
          <div ref={slideRef} className="absolute left-0 right-0 top-0 will-change-transform">
            {Array.from({ length: 500 }, (_, i) => {
              const px = i * 10;
              const major = i % 5 === 0;
              return (
                <div
                  key={`rt-${px}`}
                  style={{ top: `${px}px` }}
                  className={`absolute right-2 h-px ${major ? "w-4 bg-blueprint/40" : "w-2 bg-blueprint/20"}`}
                />
              );
            })}
          </div>
        </div>
        {/* Fixed readout window */}
        <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
          <span className="font-mono text-[8px] tracking-[0.15em] text-blueprint/50 [writing-mode:vertical-rl]">
            y = <span ref={pxReadoutRef}>0000</span> px
          </span>
        </div>
      </div>

      {/* ── Bottom T-square beam ── */}
      <div className="fixed bottom-0 left-0 right-0 z-30 h-5 opacity-60">
        <div ref={beamRef} className="absolute bottom-1.5 left-[-60px] right-[-60px] will-change-transform">
          <div className="relative h-3 border-y border-blueprint/30">
            {Array.from({ length: 40 }, (_, i) => (
              <div
                key={`bt-${i}`}
                style={{ left: `${i * 40}px` }}
                className={`absolute bottom-0 w-px ${i % 5 === 0 ? "h-2.5 bg-blueprint/40" : "h-1.5 bg-blueprint/25"}`}
              />
            ))}
            {/* Head */}
            <div className="absolute left-10 bottom-0 h-3 w-2.5 border-x border-t border-blueprint/50 bg-blueprint/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
