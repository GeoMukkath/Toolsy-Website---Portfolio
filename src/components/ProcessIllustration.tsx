"use client";

import { useRef } from "react";
import { useFigureDraw } from "@/hooks/useFigureDraw";

/**
 * FIG. 03 — The build process as an annotated instrument: a raw input
 * signal passes an empathy filter (coils), is amplified through the
 * iteration horn, and lands on the ship screen. A feedback loop closes
 * the cycle, a scope plots loss over iterations, a ruler calibrates
 * progress, and the convolution integral signs it off.
 */

const MONO = { fontFamily: "var(--font-mono), monospace" } as const;

export default function ProcessIllustration() {
  const svgRef = useRef<SVGSVGElement>(null);
  useFigureDraw(svgRef);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-2xl mx-auto"
      role="img"
      aria-label="Blueprint figure: a signal chain showing input, empathy filter, iteration horn, ship screen, feedback loop and a loss curve scope"
    >
      {/* ── Input block (the raw signal) ── */}
      <rect x={30} y={152} width={70} height={36} className="blueprint-stroke" style={{ strokeWidth: 1.2 }} />
      <rect x={30} y={152} width={70} height={36} className="blueprint-fill" fillOpacity={0.15} data-no-draw />
      <path d="M38 170 q8 -14 16 0 t16 0 t16 0" className="blueprint-stroke" style={{ strokeWidth: 1 }} />
      {/* Dashed lead into the horn neck */}
      <line x1={100} y1={170} x2={206} y2={170} className="blueprint-stroke" style={{ strokeWidth: 0.9, strokeDasharray: "4 4" }} data-no-draw />
      <path d="M200 165 L209 170 L200 175" className="blueprint-stroke" style={{ strokeWidth: 0.9 }} data-no-draw />

      {/* ── Iteration horn (narrow neck → wide mouth) ── */}
      <path d="M210 162 C 280 150, 340 105, 430 95" className="blueprint-stroke" />
      <path d="M210 178 C 280 190, 340 235, 430 245" className="blueprint-stroke" />
      <line x1={210} y1={162} x2={210} y2={178} className="blueprint-stroke" style={{ strokeWidth: 1 }} />

      {/* Empathy filter coils hugging the neck */}
      <path d="M136 156 Q 150 142, 164 156" className="blueprint-stroke" style={{ strokeWidth: 2 }} />
      <path d="M136 184 Q 150 198, 164 184" className="blueprint-stroke" style={{ strokeWidth: 2 }} />

      {/* Beam trajectories (dashed) converging on the screen */}
      <path d="M212 166 C 290 152, 360 142, 434 170" className="blueprint-stroke" style={{ strokeWidth: 0.8, strokeDasharray: "3 4" }} data-no-draw />
      <path d="M212 174 C 290 188, 360 198, 434 170" className="blueprint-stroke" style={{ strokeWidth: 0.8, strokeDasharray: "3 4" }} data-no-draw />

      {/* ── Ship screen (thick line + hatched coating) ── */}
      <line x1={430} y1={95} x2={430} y2={245} className="blueprint-stroke" style={{ strokeWidth: 2.5 }} />
      {Array.from({ length: 16 }, (_, i) => {
        const y = 100 + i * 9;
        return (
          <line key={`hatch-${i}`} x1={431} y1={y} x2={437} y2={y - 7} className="blueprint-stroke" style={{ strokeWidth: 0.8 }} data-no-draw />
        );
      })}

      {/* ── Output light wedge ── */}
      <polygon points="440,168 556,124 556,216 440,172" className="blueprint-fill" fillOpacity={0.08} data-no-draw />
      <line x1={440} y1={170} x2={556} y2={124} className="blueprint-stroke" style={{ strokeWidth: 0.8 }} data-no-draw />
      <line x1={440} y1={170} x2={556} y2={216} className="blueprint-stroke" style={{ strokeWidth: 0.8 }} data-no-draw />

      {/* ── Feedback loop from screen back to the coils ── */}
      <path d="M433 250 C 380 296, 240 298, 156 190" className="blueprint-stroke" style={{ strokeWidth: 0.9, strokeDasharray: "5 4" }} data-no-draw />
      <path d="M162 199 L155 187 L167 188" className="blueprint-stroke" style={{ strokeWidth: 0.9 }} data-no-draw />

      {/* ── Scope: loss over iterations (top right) ── */}
      <text x={525} y={30} textAnchor="middle" className="blueprint-fill" style={{ ...MONO, fontSize: 8, letterSpacing: "0.12em" }}>
        J(θ) / ITERATION
      </text>
      <rect x={470} y={40} width={110} height={70} className="blueprint-stroke" style={{ strokeWidth: 1 }} />
      {/* Axes + calibration ticks */}
      <line x1={480} y1={48} x2={480} y2={102} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} />
      <line x1={480} y1={102} x2={572} y2={102} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} />
      {[0, 1, 2, 3].map((i) => (
        <line key={`sx-${i}`} x1={488 + i * 24} y1={102} x2={488 + i * 24} y2={98} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} data-no-draw />
      ))}
      {/* Converging loss curve + asymptote */}
      <path d="M482 54 C 505 94, 535 100, 570 101" className="blueprint-stroke" style={{ strokeWidth: 1.2 }} />
      <line x1={482} y1={101} x2={570} y2={101} className="blueprint-stroke" style={{ strokeWidth: 0.6, strokeDasharray: "2 3" }} data-no-draw />

      {/* ── Progress ruler (bottom left) ── */}
      <text x={60} y={288} className="blueprint-fill" style={{ ...MONO, fontSize: 8, letterSpacing: "0.12em" }}>
        PROGRESS p(t)
      </text>
      <line x1={60} y1={300} x2={380} y2={300} className="blueprint-stroke" style={{ strokeWidth: 0.9 }} />
      {Array.from({ length: 11 }, (_, i) => {
        const x = 60 + i * 32;
        const major = i % 5 === 0;
        return (
          <g key={`tick-${i}`}>
            <line x1={x} y1={300} x2={x} y2={major ? 292 : 296} className="blueprint-stroke" style={{ strokeWidth: 0.8 }} />
            {major && (
              <text x={x} y={312} textAnchor="middle" className="blueprint-fill" style={{ ...MONO, fontSize: 7 }}>
                {(i / 10).toFixed(1)}
              </text>
            )}
          </g>
        );
      })}

      {/* ── Callout labels with leaders ── */}
      <text x={30} y={120} className="blueprint-fill annotation" style={{ ...MONO, fontSize: 8, letterSpacing: "0.12em" }}>
        INPUT SIGNAL
      </text>
      <line x1={65} y1={126} x2={65} y2={148} className="blueprint-stroke annotation" style={{ strokeWidth: 0.8 }} data-no-draw />

      <text x={95} y={248} className="blueprint-fill annotation" style={{ ...MONO, fontSize: 8, letterSpacing: "0.12em" }}>
        EMPATHY FILTER
      </text>
      <line x1={146} y1={238} x2={150} y2={202} className="blueprint-stroke annotation" style={{ strokeWidth: 0.8 }} data-no-draw />

      <text x={252} y={120} className="blueprint-fill annotation" style={{ ...MONO, fontSize: 8, letterSpacing: "0.12em" }}>
        ITERATION HORN
      </text>
      <line x1={300} y1={126} x2={310} y2={132} className="blueprint-stroke annotation" style={{ strokeWidth: 0.8 }} data-no-draw />

      <text x={452} y={268} className="blueprint-fill annotation" style={{ ...MONO, fontSize: 8, letterSpacing: "0.12em" }}>
        SHIP SCREEN
      </text>
      <line x1={462} y1={258} x2={438} y2={240} className="blueprint-stroke annotation" style={{ strokeWidth: 0.8 }} data-no-draw />

      <text x={500} y={232} className="blueprint-fill annotation" style={{ ...MONO, fontSize: 8, letterSpacing: "0.12em" }}>
        OUTPUT
      </text>
      <line x1={520} y1={224} x2={508} y2={206} className="blueprint-stroke annotation" style={{ strokeWidth: 0.8 }} data-no-draw />

      <rect x={258} y={268} width={62} height={14} fill="#ffffff" data-no-draw />
      <text x={262} y={278} className="blueprint-fill annotation" style={{ ...MONO, fontSize: 8, letterSpacing: "0.12em" }}>
        FEEDBACK
      </text>

      {/* ── Vertical figure caption ── */}
      <text
        x={592}
        y={318}
        transform="rotate(-90 592 318)"
        className="blueprint-fill annotation"
        style={{ ...MONO, fontSize: 7, letterSpacing: "0.2em" }}
      >
        [ SIGNAL CHAIN ]
      </text>

      {/* ── Sign-off formula ── */}
      <text x={440} y={330} textAnchor="end" className="blueprint-fill annotation" style={{ ...MONO, fontSize: 9, letterSpacing: "0.06em" }}>
        y(t) = ∫ K(x,t)·x(τ) dτ
      </text>
    </svg>
  );
}
