"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Contact() {
  const ref = useScrollReveal(0.1);

  return (
    <section className="py-24 px-6 relative">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <div className="figure-label absolute left-12 top-32 hidden md:block">
        FIG. 06 — CONNECT
      </div>

      <div ref={ref} className="reveal max-w-3xl mx-auto text-center">
        <p className="font-display text-blueprint text-xs tracking-[0.2em] uppercase mb-4">
          Let&apos;s Connect
        </p>

        <h2 className="font-display text-3xl md:text-4xl text-ink font-bold mb-6 leading-snug">
          Let&apos;s build the future
          <br />
          <span className="text-blueprint">with AI + empathy.</span>
        </h2>

        <p className="text-ink-muted text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          I&apos;m always open to conversations about AI-native product building,
          tools that make work better, and the intersection of empathy and technology.
        </p>

        {/* Contact links */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <a
            href="mailto:geomukkath@yandex.com"
            className="group flex items-center gap-2 border border-blueprint/30 px-6 py-3 font-display text-[11px] text-blueprint tracking-[0.1em] uppercase hover:bg-blueprint hover:text-white transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:stroke-white">
              <rect x="1" y="3" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1 3 L8 9 L15 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Email
          </a>

          <a
            href="https://www.linkedin.com/in/geomukkath"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 border border-blueprint/30 px-6 py-3 font-display text-[11px] text-blueprint tracking-[0.1em] uppercase hover:bg-blueprint hover:text-white transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:stroke-white">
              <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 7 L5 11 M5 5 L5 5.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8 7 L8 11 M9.5 8 Q11 7.5 11 9 L11 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            LinkedIn
          </a>

          <a
            href="https://quickshapes.toolsy.online"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 border border-blueprint/30 px-6 py-3 font-display text-[11px] text-blueprint tracking-[0.1em] uppercase hover:bg-blueprint hover:text-white transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:stroke-white">
              <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <rect x="4" y="4" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
              <line x1="4" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="0.8" />
              <line x1="4" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="0.8" />
            </svg>
            QuickShapes
          </a>
        </div>

        {/* Footer */}
        <div className="mt-8 text-ink-muted opacity-50">
          <div className="w-8 h-px bg-blueprint mx-auto mb-4 opacity-50" />
          <p className="font-display text-[10px] tracking-[0.15em] uppercase">
            Built with AI + user empathy
          </p>
          <p className="font-display text-[9px] tracking-[0.1em] mt-2 opacity-60">
            © 2024 toolsy.online
          </p>
        </div>
      </div>
    </section>
  );
}
