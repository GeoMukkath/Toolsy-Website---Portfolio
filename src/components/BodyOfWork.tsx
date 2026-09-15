"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BodyOfWork() {
  const ref = useScrollReveal(0.1);

  return (
    <section className="py-24 px-6 relative">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <div className="figure-label absolute right-4 top-32 hidden md:block">
        FIG. 05 — BODY OF WORK
      </div>

      <div ref={ref} className="reveal max-w-3xl mx-auto">
        <p className="font-display text-blueprint text-xs tracking-[0.2em] uppercase mb-4">
          Body of Work
        </p>

        <h2 className="font-display text-3xl md:text-4xl text-ink font-bold mb-8 leading-snug">
          Things I&apos;ve shipped.
          <br />
          <span className="text-blueprint">Built with empathy &amp; AI.</span>
        </h2>

        {/* Project card — QuickShapes */}
        <div className="border border-blueprint/20 p-8 mb-8 group hover:border-blueprint/50 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display text-xl text-ink font-bold mb-1">
                QuickShapes
              </h3>
              <p className="font-display text-blueprint text-[10px] tracking-[0.15em] uppercase">
                Wireframing Tool
              </p>
            </div>
            <a
              href="https://quickshapes.toolsy.online"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-[10px] text-blueprint tracking-[0.1em] uppercase border border-blueprint/30 px-3 py-1.5 hover:bg-blueprint hover:text-white transition-all duration-300"
            >
              Live →
            </a>
          </div>

          <p className="text-ink-muted text-sm md:text-base leading-relaxed mb-4">
            A minimalist wireframing tool for product teams. Designed to make
            sketching UI ideas as fast as thinking them — no learning curve, no
            bloat. Just shapes, connections, and your ideas.
          </p>

          <div className="flex flex-wrap gap-2">
            {["AI-Assisted", "Rapid Prototyping", "Product Thinking"].map(
              (tag) => (
                <span
                  key={tag}
                  className="border border-blueprint/15 text-blueprint px-2 py-0.5 font-display text-[9px] tracking-[0.1em] uppercase"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* Blueprint wireframe illustration */}
          <div className="mt-6 border border-blueprint/10 p-4">
            <svg
              viewBox="0 0 300 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-sm opacity-40"
            >
              {/* Toolbar */}
              <rect x="10" y="10" width="280" height="20" rx="2" stroke="#1a5fb4" strokeWidth="0.8" />
              <circle cx="25" cy="20" r="4" stroke="#1a5fb4" strokeWidth="0.6" />
              <circle cx="40" cy="20" r="4" stroke="#1a5fb4" strokeWidth="0.6" />
              <circle cx="55" cy="20" r="4" stroke="#1a5fb4" strokeWidth="0.6" />
              <line x1="70" y1="20" x2="90" y2="20" stroke="#1a5fb4" strokeWidth="0.4" />

              {/* Canvas area */}
              <rect x="10" y="40" width="280" height="70" rx="2" stroke="#1a5fb4" strokeWidth="0.6" strokeDasharray="3 2" />

              {/* Wireframe shapes */}
              <rect x="30" y="55" width="40" height="25" rx="1" stroke="#1a5fb4" strokeWidth="0.8" />
              <rect x="85" y="55" width="60" height="10" rx="1" stroke="#1a5fb4" strokeWidth="0.6" />
              <rect x="85" y="70" width="45" height="6" rx="1" stroke="#1a5fb4" strokeWidth="0.4" />
              <circle cx="220" cy="75" r="20" stroke="#1a5fb4" strokeWidth="0.8" />

              {/* Connecting line */}
              <path d="M70 67 L85 67" stroke="#1a5fb4" strokeWidth="0.6" markerEnd="url(#arrow)" />

              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0 0 L6 3 L0 6" fill="none" stroke="#1a5fb4" strokeWidth="0.6" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        <p className="text-ink-muted text-xs font-display tracking-[0.05em] italic text-center opacity-60">
          More tools in progress — stay tuned.
        </p>
      </div>
    </section>
  );
}
