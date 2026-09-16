const faqs = [
  {
    q: "Who is Geo Mukkath?",
    a: "Geo Mukkath is an AI-native product manager and the creator of toolsy.online. He builds everyday tools people use at work by combining user empathy with AI fluency — prototyping with AI and shipping in hours, not weeks.",
  },
  {
    q: "What is QuickShapes?",
    a: "QuickShapes is a minimalist wireframing tool for product teams, built by Geo Mukkath. It makes sketching UI ideas as fast as thinking them — no learning curve, no bloat, just shapes, connections, and your ideas.",
  },
  {
    q: "What does AI-native product management mean?",
    a: "AI-native product management means using AI as a core part of the product workflow rather than an add-on. Geo Mukkath uses AI to analyze user feedback at scale, synthesize qualitative insights, and turn ideas into working prototypes in hours.",
  },
  {
    q: "How does Geo Mukkath build products?",
    a: "He follows a four-stage process: Empathize (analyze user feedback at scale with AI), Observe (synthesize observations into insights), Build (prototype at the speed of thought), and Ship (launch fast, measure with AI-powered analytics, learn in real time).",
  },
  {
    q: "What is Geo Mukkath's product philosophy?",
    a: "User empathy plus AI fluency. He uses AI to listen at scale — processing thousands of user signals to find the emotional core of a problem — and ships simple tools that disappear into the workflow. His view: AI doesn't replace product intuition, it amplifies it.",
  },
  {
    q: "How can I contact Geo Mukkath?",
    a: "Email geomukkath@yandex.com or connect on LinkedIn (linkedin.com/in/geomukkath). His official website is toolsy.online.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 relative">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <div className="figure-label absolute left-12 top-32 hidden md:block">
        FIG. 07 — FAQ
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-3xl mx-auto">
        <p className="font-display text-blueprint text-xs tracking-[0.2em] uppercase mb-4">
          FAQ
        </p>

        <h2 className="font-display text-3xl md:text-4xl text-ink font-bold mb-12 leading-snug">
          Frequently asked,
          <br />
          <span className="text-blueprint">answered plainly.</span>
        </h2>

        <div className="space-y-8">
          {faqs.map((f, i) => (
            <div key={i} className="flex gap-4">
              <span className="font-display text-blueprint text-xl font-bold opacity-30 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-lg text-ink font-bold mb-2">
                  {f.q}
                </h3>
                <p className="text-ink-muted text-sm md:text-base leading-relaxed">
                  {f.a}
                  {f.q === "How can I contact Geo Mukkath?" && (
                    <>
                      {" "}
                      <a
                        href="mailto:geomukkath@yandex.com"
                        className="text-blueprint underline underline-offset-4"
                      >
                        Email Geo Mukkath
                      </a>{" "}
                      or find him on{" "}
                      <a
                        href="https://www.linkedin.com/in/geomukkath"
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="text-blueprint underline underline-offset-4"
                      >
                        LinkedIn
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
