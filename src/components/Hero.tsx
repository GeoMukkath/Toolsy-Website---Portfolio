"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  const ref = useScrollReveal(0.1);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      {/* Rotated figure label */}
      <div className="figure-label absolute left-12 top-1/2 -translate-y-1/2 hidden md:block">
        FIG. 01 — INTRODUCTION
      </div>

      <div ref={ref} className="reveal max-w-3xl mx-auto text-center">
        {/* Blueprint accent line */}
        <div className="w-16 h-0.5 bg-blueprint mx-auto mb-8 opacity-60" />

        <p
          className="font-display text-blueprint text-xs tracking-[0.2em] uppercase mb-4"
          style={{ animationDelay: "0.2s" }}
        >
          toolsy.online
        </p>

        <h1
          className="font-display text-4xl md:text-6xl lg:text-7xl text-ink font-bold mb-6 leading-tight"
        >
          <span className="sr-only">Geo Mukkath — </span>
          AI-native product
          <br />
          manager who builds
          <br />
          <span className="text-blueprint">everyday tools.</span>
        </h1>

        <p className="text-ink-muted text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Hi, I&apos;m <strong className="text-ink">Geo Mukkath</strong> — I leverage AI
          to ship tools faster, smarter, and with deeper user empathy.
        </p>

        <HeroIllustration />

        <div className="mt-12 flex flex-col items-center gap-2 text-blueprint opacity-50">
          <span className="font-display text-[10px] tracking-[0.15em] uppercase">scroll</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-bounce">
            <path d="M10 4 L10 16 M5 11 L10 16 L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
