"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import ProcessIllustration from "./ProcessIllustration";

export default function Process() {
  const ref = useScrollReveal(0.1);

  return (
    <section id="process" className="py-24 px-6 relative">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <div className="figure-label absolute left-12 top-32 hidden md:block">
        FIG. 03 — PROCESS
      </div>

      <div ref={ref} className="reveal max-w-3xl mx-auto">
        <p className="font-display text-blueprint text-xs tracking-[0.2em] uppercase mb-4">
          How I Work
        </p>

        <h2 className="font-display text-3xl md:text-4xl text-ink font-bold mb-6 leading-snug">
          Empathy-driven.
          <br />
          <span className="text-blueprint">AI-accelerated.</span>
        </h2>

        <p className="text-ink-muted text-base md:text-lg mb-16 max-w-2xl leading-relaxed">
          Every tool I build follows a cycle that starts with empathy and runs on AI.
          Here&apos;s the process distilled into four stages:
        </p>

        <ProcessIllustration />
      </div>

      {/* Process steps */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 mb-20">
        {[
          {
            num: "01",
            title: "Empathize",
            desc: "I start with the real problem. I use AI to analyze user feedback at scale, spot patterns across thousands of data points, and surface the pain points that matter most.",
          },
          {
            num: "02",
            title: "Observe",
            desc: "I watch how people actually work, then use AI to synthesize observations into actionable insights. The gap between intent and behavior is where the best tools are born.",
          },
          {
            num: "03",
            title: "Build",
            desc: "AI lets me prototype at the speed of thought. From wireframes to working demos in hours. I validate with real users, iterate, and let AI handle the repetitive parts.",
          },
          {
            num: "04",
            title: "Ship",
            desc: "I launch fast, measure with AI-powered analytics, and learn in real time. Then I go back to step one — because great tools evolve continuously.",
          },
        ].map((step) => (
          <div key={step.num} className="flex gap-4">
            <span className="font-display text-blueprint text-3xl md:text-4xl font-bold opacity-30 shrink-0">
              {step.num}
            </span>
            <div>
              <h3 className="font-display text-xl text-ink font-bold mb-2">
                {step.title}
              </h3>
              <p className="text-ink-muted text-sm md:text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Blueprint note box */}
      <div className="max-w-md mx-auto border border-blueprint/20 p-6 relative">
        <span className="absolute -top-3 left-4 bg-white px-2 font-display text-[10px] text-blueprint tracking-[0.15em] uppercase">
          ai-native
        </span>
        <p className="text-ink-muted text-sm leading-relaxed italic">
          &ldquo;AI doesn&apos;t replace product intuition — it amplifies it. The best PMs
          use AI to move faster, not to skip thinking.&rdquo;
        </p>
      </div>
    </section>
  );
}
