"use client";

import { useRef } from "react";
import { useFigureDraw } from "@/hooks/useFigureDraw";

/**
 * FIG. 04 — The philosophy as an exploded isometric layer stack: raw
 * user signals at the bottom, an empathy layer, the AI kernel layer,
 * and the finished tool on top. Blueprint style: dashed alignment
 * guides through the stack, a vertical dimension line, leader labels
 * and a rotated figure caption.
 */

const MONO = { fontFamily: "var(--font-mono), monospace" } as const;

// Isometric helpers — one layer is a box w×w in plan, h tall.
const CX = 210;
const CY = 196; // ground centre
const UX = 40;
const UY = 20;
const UZ = 14;

function corner(x: number, y: number, z: number): [number, number] {
  return [CX + (x - y) * UX, CY + (x + y) * UY - z * UZ];
}
function pts(...cs: [number, number][]): string {
  return cs.map((c) => c.join(",")).join(" ");
}

/** A full isometric box from plan corner (x0,y0) to (x1,y1), z0..z1. */
function box(x0: number, y0: number, x1: number, y1: number, z0: number, z1: number) {
  const a = corner(x0, y0, z1); // back top
  const b = corner(x1, y0, z1); // right top
  const c = corner(x1, y1, z1); // front top
  const d = corner(x0, y1, z1); // left top
  const d0 = corner(x0, y1, z0); // left bottom
  const c0 = corner(x1, y1, z0); // front bottom
  const b0 = corner(x1, y0, z0); // right bottom
  return { a, b, c, d, d0, c0, b0 };
}

function BoxFigure({
  x0, y0, x1, y1, z0, z1, topOpacity = 0.1, sideOpacity = 0.2,
}: {
  x0: number; y0: number; x1: number; y1: number; z0: number; z1: number;
  topOpacity?: number; sideOpacity?: number;
}) {
  const { a, b, c, d, d0, c0, b0 } = box(x0, y0, x1, y1, z0, z1);
  return (
    <g>
      {/* left face */}
      <polygon points={pts(a, d, d0, b0)} className="blueprint-fill" fillOpacity={sideOpacity * 0.7} stroke="var(--blueprint-blue)" strokeWidth={1} data-no-draw />
      {/* right face */}
      <polygon points={pts(a, b, c0, b0)} className="blueprint-fill" fillOpacity={sideOpacity} stroke="var(--blueprint-blue)" strokeWidth={1} data-no-draw />
      {/* top face */}
      <polygon points={pts(a, b, c, d)} className="blueprint-fill" fillOpacity={topOpacity} stroke="var(--blueprint-blue)" strokeWidth={1.1} />
      {/* hidden bottom edges */}
      <polyline points={pts(d, d0, c0)} className="blueprint-stroke" style={{ strokeWidth: 0.7, strokeDasharray: "3 3" }} data-no-draw />
      <line x1={c[0]} y1={c[1]} x2={c0[0]} y2={c0[1]} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} />
    </g>
  );
}

export default function PhilosophyIllustration() {
  const svgRef = useRef<SVGSVGElement>(null);
  useFigureDraw(svgRef);

  // Layer z-extents (exploded upward).
  const layers = [
    { name: "TOOL", z0: 8.2, z1: 10, top: 0.12, side: 0.22 },
    { name: "AI KERNEL", z0: 5.4, z1: 6.4, top: 0.06, side: 0.12 },
    { name: "EMPATHY", z0: 2.6, z1: 3.6, top: 0.1, side: 0.16 },
    { name: "USER SIGNALS", z0: 0, z1: 1, top: 0.05, side: 0.1 },
  ];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 460 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-label="Blueprint figure: an exploded isometric stack of user signals, empathy, AI kernel and tool layers with dimension lines"
    >
      {/* ── The four layers ── */}
      {layers.map((l) => (
        <BoxFigure key={l.name} x0={0} y0={0} x1={2} y1={2} z0={l.z0} z1={l.z1} topOpacity={l.top} sideOpacity={l.side} />
      ))}

      {/* Signal dots on the bottom layer's top face */}
      {[[0.5, 0.5], [1.5, 0.6], [0.7, 1.4], [1.3, 1.2], [1.0, 1.9]].map(([x, y], i) => {
        const [px, py] = corner(x, y, 1);
        return <circle key={`dot-${i}`} cx={px} cy={py} r={1.6} className="blueprint-fill" fillOpacity={0.6} data-no-draw />;
      })}
      {/* Kernel grid on the AI layer's top face */}
      {[0, 1, 2, 3, 4].map((i) => {
        const t = i / 4;
        const p0 = corner(0.3 + t * 1.4, 0.3, 6.4);
        const p1 = corner(0.3 + t * 1.4, 1.7, 6.4);
        const q0 = corner(0.3, 0.3 + t * 1.4, 6.4);
        const q1 = corner(1.7, 0.3 + t * 1.4, 6.4);
        return (
          <g key={`grid-${i}`} className="blueprint-stroke" style={{ strokeWidth: 0.5, opacity: 0.5 }}>
            <line x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} />
            <line x1={q0[0]} y1={q0[1]} x2={q1[0]} y2={q1[1]} />
          </g>
        );
      })}
      {/* Waveform on the empathy layer's top face */}
      <path
        d={`M ${corner(0.3, 1.15, 3.6).join(" ")} q ${UX * 0.35} ${-UY * 1.2}, ${UX * 0.7} 0 q ${UX * 0.35} ${UY * 1.2}, ${UX * 0.7} 0`}
        className="blueprint-stroke"
        style={{ strokeWidth: 0.9 }}
      />

      {/* ── Dashed alignment guides through the stack ── */}
      {[[0, 0], [2, 0], [2, 2], [0, 2]].map(([x, y], i) => {
        const top = corner(x, y, 10.6);
        const bottom = corner(x, y, 0);
        return (
          <line key={`guide-${i}`} x1={top[0]} y1={top[1]} x2={bottom[0]} y2={bottom[1]} className="blueprint-stroke" style={{ strokeWidth: 0.6, strokeDasharray: "3 4", opacity: 0.5 }} data-no-draw />
        );
      })}

      {/* ── Vertical dimension line (total height) ── */}
      {(() => {
        const t = corner(-0.55, -0.55, 10);
        const b = corner(-0.55, -0.55, 0);
        return (
          <g>
            <line x1={t[0]} y1={t[1]} x2={b[0]} y2={b[1]} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} />
            <line x1={t[0] - 5} y1={t[1]} x2={t[0] + 5} y2={t[1]} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} />
            <line x1={b[0] - 5} y1={b[1]} x2={b[0] + 5} y2={b[1]} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} />
            <rect x={t[0] - 10} y={(t[1] + b[1]) / 2 - 9} width={22} height={16} fill="#ffffff" data-no-draw />
            <text x={t[0] + 1} y={(t[1] + b[1]) / 2 + 3} textAnchor="middle" className="blueprint-fill" style={{ ...MONO, fontSize: 8 }}>
              Σ4
            </text>
          </g>
        );
      })()}

      {/* ── Leader labels (right side) ── */}
      {layers.map((l, i) => {
        const anchor = corner(2, 0.6 + i * 0.25, (l.z0 + l.z1) / 2);
        const lx = 342;
        const ly = anchor[1] + 4;
        return (
          <g key={`lbl-${l.name}`}>
            <line x1={anchor[0] + 4} y1={anchor[1]} x2={lx - 6} y2={ly} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} data-no-draw />
            <circle cx={anchor[0]} cy={anchor[1]} r={1.8} className="blueprint-fill" data-no-draw />
            <text x={lx} y={ly} className="blueprint-fill annotation" style={{ ...MONO, fontSize: 8, letterSpacing: "0.12em" }}>
              {l.name}
            </text>
          </g>
        );
      })}

      {/* ── Rotated figure caption ── */}
      <text
        x={436}
        y={382}
        transform="rotate(-90 436 382)"
        className="blueprint-fill annotation"
        style={{ ...MONO, fontSize: 7, letterSpacing: "0.2em" }}
      >
        [ TOOL STACK ]
      </text>

      {/* ── Ground line + calibration ticks ── */}
      <line x1={70} y1={368} x2={330} y2={368} className="blueprint-stroke" style={{ strokeWidth: 0.8 }} />
      {Array.from({ length: 13 }, (_, i) => {
        const x = 70 + i * 20;
        return <line key={`gt-${i}`} x1={x} y1={368} x2={x} y2={i % 3 === 0 ? 362 : 365} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} />;
      })}
      <text x={330} y={356} textAnchor="end" className="blueprint-fill" style={{ ...MONO, fontSize: 8 }}>
        z (layers)
      </text>

      {/* ── Formula ── */}
      <text x={330} y={392} textAnchor="end" className="blueprint-fill annotation" style={{ ...MONO, fontSize: 9 }}>
        T = f(user, empathy, ai)
      </text>
    </svg>
  );
}
