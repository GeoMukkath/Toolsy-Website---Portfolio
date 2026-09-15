"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import PhilosophyIllustration from "./PhilosophyIllustration";

export default function Philosophy() {
  const ref = useScrollReveal(0.1);

  return (
    <section className="py-24 px-6 relative">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <div className="figure-label absolute right-4 top-32 hidden md:block">
        FIG. 04 — PHILOSOPHY
      </div>

      <div ref={ref} className="reveal max-w-3xl mx-auto">
        <p className="font-display text-blueprint text-xs tracking-[0.2em] uppercase mb-4">
          Philosophy
        </p>

        <h2 className="font-display text-3xl md:text-4xl text-ink font-bold mb-8 leading-snug">
          User empathy + AI fluency.
          <br />
          <span className="text-blueprint">That&apos;s the edge.</span>
        </h2>

        <PhilosophyIllustration />

        <div className="space-y-8 mt-12 text-ink-muted text-base md:text-lg leading-relaxed">
          <div>
            <h3 className="font-display text-ink font-bold mb-2 flex items-center gap-3">
              <span className="w-6 h-px bg-blueprint inline-block" />
              Empathy is the input, AI is the accelerator
            </h3>
            <p>
              I don&apos;t use AI to replace human judgment — I use it to listen at
              scale. AI helps me process thousands of user signals so I can focus
              on what matters: understanding the emotional core of the problem.
            </p>
          </div>

          <div>
            <h3 className="font-display text-ink font-bold mb-2 flex items-center gap-3">
              <span className="w-6 h-px bg-blueprint inline-block" />
              Ship fast, learn faster
            </h3>
            <p>
              AI lets me go from idea to working prototype in hours. That means
              faster validation, faster feedback loops, and tools that evolve with
              real user needs instead of internal assumptions.
            </p>
          </div>

          <div>
            <h3 className="font-display text-ink font-bold mb-2 flex items-center gap-3">
              <span className="w-6 h-px bg-blueprint inline-block" />
              Simplicity is the ultimate sophistication
            </h3>
            <p>
              The best AI-powered tools are the ones you don&apos;t notice. They
              feel effortless. I build simplicity through deep understanding, not
              by stripping features — and AI helps me find that balance.
            </p>
          </div>

          <div>
            <h3 className="font-display text-ink font-bold mb-2 flex items-center gap-3">
              <span className="w-6 h-px bg-blueprint inline-block" />
              Build tools, not products
            </h3>
            <p>
              Products have features. Tools have superpowers. I think about what
              a person can do <em>after</em> using what I build — not just what the
              interface looks like. AI-native thinking means the tool gets smarter
              the more it&apos;s used.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
