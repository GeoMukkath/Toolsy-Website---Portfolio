"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function About() {
  const ref = useScrollReveal(0.1);

  return (
    <section className="py-24 px-6 relative">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <div className="figure-label absolute right-4 top-32 hidden md:block">
        FIG. 02 — ABOUT
      </div>

      <div ref={ref} className="reveal max-w-3xl mx-auto">
        <p className="font-display text-blueprint text-xs tracking-[0.2em] uppercase mb-4">
          About
        </p>

        <h2 className="font-display text-3xl md:text-4xl text-ink font-bold mb-8 leading-snug">
          I don&apos;t just manage products.
          <br />
          <span className="text-blueprint">I build them with AI.</span>
        </h2>

        <div className="space-y-6 text-ink-muted text-base md:text-lg leading-relaxed">
          <p>
            I&apos;m an <strong className="text-ink">AI-native product manager</strong> with
            a builder&apos;s mindset. Where traditional PMs write specs and wait, I prototype,
            iterate, and ship — using AI as a core part of my workflow to move faster
            and build better.
          </p>

          <p>
            My approach starts with <strong className="text-ink">user empathy</strong>, amplified
            by AI. I use AI to analyze user behavior at scale, synthesize qualitative
            insights, and generate rapid prototypes that I can validate with real users
            in hours, not weeks.
          </p>

          <p>
            I believe the best tools don&apos;t just function — they <em>disappear</em>.
            They become so natural that people don&apos;t think about them. They just
            get work done. And AI is the lever that lets me build those tools faster
            than ever before.
          </p>
        </div>

        {/* AI skill badges */}
        <div className="mt-12 flex flex-wrap gap-3">
          {["AI Prototyping", "LLM Integration", "Prompt Engineering", "Rapid Iteration"].map(
            (tag) => (
              <span
                key={tag}
                className="border border-blueprint/30 text-blueprint px-3 py-1 font-display text-[10px] tracking-[0.12em] uppercase"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
