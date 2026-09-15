"use client";

import { useRef } from "react";
import { useFigureDraw } from "@/hooks/useFigureDraw";

/**
 * FIG. 01 — Isometric Gaussian surface g(x,y) hovering above an exploded
 * 3×3 convolution-kernel layer (fractions 1, 1/2, 1/4). Blueprint style:
 * hairline mesh, dashed drop lines, crosshair on the peak, calibrated
 * scales, dimension line and the formula itself.
 */

const CX = 240;
const CY = 150; // base-plate centre (grid 2.5, 2.5) at z = 0
const UX = 30; // half-width per grid unit
const UY = 15; // half-height per grid unit
const UZ = 40; // pixels per unit of g

function pt(x: number, y: number, z = 0): [number, number] {
  return [CX + (x - y) * UX, CY + (x + y) * UY - z * UZ];
}
function pts(...coords: number[][]): string {
  return coords.map(([x, y, z]) => pt(x, y, z ?? 0).join(",")).join(" ");
}

/** Isotropic Gaussian centred on the plate, peak 2.2 units. */
function g(x: number, y: number): number {
  return 2.2 * Math.exp(-(((x - 2.5) ** 2 + (y - 2.5) ** 2) / 2.2));
}

/** Mesh polyline sampled along x or y. */
function meshLine(fixed: number, alongX: boolean): string {
  const samples: number[][] = [];
  for (let t = 0; t <= 5.0001; t += 0.25) {
    const x = alongX ? t : fixed;
    const y = alongX ? fixed : t;
    samples.push([x, y, g(x, y)]);
  }
  return pts(...samples);
}

/** Kernel tile weights — corners, edges, centre (normalised 4/16). */
const KERNEL = [
  ["1/4", "1/2", "1/4"],
  ["1/2", "1", "1/2"],
  ["1/4", "1/2", "1/4"],
] as const;
const KERNEL_SHADE = [
  [0.3, 0.14, 0.3],
  [0.14, 0.05, 0.14],
  [0.3, 0.14, 0.3],
] as const;

const MONO = { fontFamily: "var(--font-mono), monospace" } as const;

export default function HeroIllustration() {
  const svgRef = useRef<SVGSVGElement>(null);
  useFigureDraw(svgRef);

  // Base plate / slab corners.
  const cT = pt(0, 0); // back
  const cR = pt(5, 0); // right
  const cB = pt(5, 5); // front
  const cL = pt(0, 5); // left
  const zOff = 0.35 * UZ;
  const slab = (p: [number, number]) => [p[0], p[1] + zOff] as [number, number];
  const sT = slab(cT);
  const sR = slab(cR);
  const sB = slab(cB);
  const sL = slab(cL);

  const peak = pt(2.5, 2.5, g(2.5, 2.5));
  const baseCentre = pt(2.5, 2.5);

  // Kernel layer spans the middle 60% of the plate.
  const k0 = 0.5;
  const k1 = 4.5;
  const kStep = (k1 - k0) / 3;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-label="Blueprint figure: an isometric Gaussian surface above an exploded convolution kernel layer with calibration marks"
    >
      {/* ── Exploded slab below the base plate (reference-style) ── */}
      <polygon
        points={pts(cT, cR, cB, cL)}
        className="blueprint-fill"
        fillOpacity={0.05}
        data-no-draw
      />
      {/* Slab side faces */}
      <polygon
        points={pts(cL, cB, sB, sL)}
        className="blueprint-fill"
        fillOpacity={0.12}
        stroke="var(--blueprint-blue)"
        strokeWidth={1}
        data-no-draw
      />
      <polygon
        points={pts(cB, cR, sR, sB)}
        className="blueprint-fill"
        fillOpacity={0.2}
        stroke="var(--blueprint-blue)"
        strokeWidth={1}
        data-no-draw
      />
      {/* Slab bottom edges */}
      <polygon points={pts(sT, sR, sB, sL)} className="blueprint-stroke" style={{ strokeWidth: 1 }} />
      {/* Dashed verticals at the plate corners */}
      <line x1={cT[0]} y1={cT[1]} x2={sT[0]} y2={sT[1]} className="blueprint-stroke" style={{ strokeWidth: 0.8, strokeDasharray: "3 3" }} data-no-draw />
      <line x1={cL[0]} y1={cL[1]} x2={sL[0]} y2={sL[1]} className="blueprint-stroke" style={{ strokeWidth: 0.8, strokeDasharray: "3 3" }} data-no-draw />
      <line x1={cR[0]} y1={cR[1]} x2={sR[0]} y2={sR[1]} className="blueprint-stroke" style={{ strokeWidth: 0.8, strokeDasharray: "3 3" }} data-no-draw />

      {/* ── Convolution kernel layer (3×3 fractions) ── */}
      {Array.from({ length: 3 }, (_, iy) =>
        Array.from({ length: 3 }, (_, ix) => {
          const x0 = k0 + ix * kStep;
          const y0 = k0 + iy * kStep;
          const shade = KERNEL_SHADE[iy][ix];
          return (
            <g key={`k-${ix}-${iy}`}>
              <polygon
                points={pts([x0, y0], [x0 + kStep, y0], [x0 + kStep, y0 + kStep], [x0, y0 + kStep])}
                className="blueprint-fill"
                fillOpacity={shade}
                stroke="var(--blueprint-blue)"
                strokeWidth={0.8}
                data-no-draw
              />
              <text
                x={pt(x0 + kStep / 2, y0 + kStep / 2)[0]}
                y={pt(x0 + kStep / 2, y0 + kStep / 2)[1] + zOff + 3}
                textAnchor="middle"
                className="blueprint-fill"
                style={{ ...MONO, fontSize: 8, letterSpacing: "0.08em" }}
              >
                {KERNEL[iy][ix]}
              </text>
            </g>
          );
        }),
      )}

      {/* ── Base plate grid (calibration) ── */}
      {Array.from({ length: 6 }, (_, i) => (
        <g key={`grid-${i}`}>
          <polyline
            points={pts([i, 0], [i, 5])}
            className="blueprint-stroke"
            style={{ strokeWidth: 0.4, opacity: 0.35 }}
          />
          <polyline
            points={pts([0, i], [5, i])}
            className="blueprint-stroke"
            style={{ strokeWidth: 0.4, opacity: 0.35 }}
          />
        </g>
      ))}
      {/* Plate outline */}
      <polygon points={pts(cT, cR, cB, cL)} className="blueprint-stroke" style={{ strokeWidth: 1.2 }} />

      {/* ── Gaussian wireframe surface ── */}
      {Array.from({ length: 6 }, (_, i) => (
        <g key={`mesh-${i}`}>
          <polyline points={meshLine(i, true)} className="blueprint-stroke" style={{ strokeWidth: 0.9 }} />
          <polyline points={meshLine(i, false)} className="blueprint-stroke" style={{ strokeWidth: 0.9 }} />
        </g>
      ))}

      {/* ── Peak crosshair + drop line ── */}
      <line x1={peak[0]} y1={peak[1]} x2={baseCentre[0]} y2={baseCentre[1]} className="blueprint-stroke" style={{ strokeWidth: 0.8, strokeDasharray: "3 3" }} data-no-draw />
      <circle cx={peak[0]} cy={peak[1]} r={5} className="blueprint-stroke" style={{ strokeWidth: 0.8 }} data-no-draw />
      <line x1={peak[0] - 8} y1={peak[1]} x2={peak[0] + 8} y2={peak[1]} className="blueprint-stroke" style={{ strokeWidth: 0.8 }} data-no-draw />
      <line x1={peak[0]} y1={peak[1] - 8} x2={peak[0]} y2={peak[1] + 8} className="blueprint-stroke" style={{ strokeWidth: 0.8 }} data-no-draw />

      {/* ── Vertical scale at the back corner (calibration) ── */}
      {[0, 1, 2].map((u) => {
        const [tx, ty] = pt(0, 0, u);
        return (
          <g key={`vs-${u}`}>
            <line x1={tx - 4} y1={ty} x2={tx + 4} y2={ty} className="blueprint-stroke" style={{ strokeWidth: 0.8 }} />
            <text x={tx - 8} y={ty + 2.5} textAnchor="end" className="blueprint-fill" style={{ ...MONO, fontSize: 7 }}>
              {u.toFixed(1)}
            </text>
          </g>
        );
      })}
      <line
        x1={cT[0]}
        y1={cT[1]}
        x2={pt(0, 0, 2.6)[0]}
        y2={pt(0, 0, 2.6)[1]}
        className="blueprint-stroke"
        style={{ strokeWidth: 0.6, opacity: 0.6 }}
        data-no-draw
      />
      <text
        x={pt(0, 0, 2.8)[0] - 6}
        y={pt(0, 0, 2.8)[1]}
        textAnchor="end"
        className="blueprint-fill"
        style={{ ...MONO, fontSize: 9, letterSpacing: "0.1em" }}
      >
        g(x,y)
      </text>

      {/* ── Horizontal axes with ticks ── */}
      {[0, 1, 2, 3, 4, 5].map((u) => {
        const a = pt(u, 5.55);
        const b = pt(u, 5.8);
        const [lx, ly] = pt(u, 6.15);
        return (
          <g key={`ax-${u}`}>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className="blueprint-stroke" style={{ strokeWidth: 0.8 }} />
            <text x={lx} y={ly + 2} textAnchor="middle" className="blueprint-fill" style={{ ...MONO, fontSize: 7 }}>
              {u}
            </text>
          </g>
        );
      })}
      {[0, 1, 2, 3, 4, 5].map((u) => {
        const a = pt(5.55, u);
        const b = pt(5.8, u);
        const [lx, ly] = pt(6.15, u);
        return (
          <g key={`ay-${u}`}>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className="blueprint-stroke" style={{ strokeWidth: 0.8 }} />
            <text x={lx} y={ly + 2} textAnchor="middle" className="blueprint-fill" style={{ ...MONO, fontSize: 7 }}>
              {u}
            </text>
          </g>
        );
      })}
      <text x={pt(6.4, 6.4)[0]} y={pt(6.4, 6.4)[1] + 3} textAnchor="middle" className="blueprint-fill" style={{ ...MONO, fontSize: 9 }}>
        x,y
      </text>

      {/* ── Dimension line n = 5 ── */}
      <line x1={cL[0]} y1={326} x2={cR[0]} y2={326} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} data-no-draw />
      <line x1={cL[0]} y1={322} x2={cL[0]} y2={330} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} data-no-draw />
      <line x1={cR[0]} y1={322} x2={cR[0]} y2={330} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} data-no-draw />
      <rect x={232} y={318} width={16} height={16} fill="#ffffff" data-no-draw />
      <text x={240} y={331} textAnchor="middle" className="blueprint-fill" style={{ ...MONO, fontSize: 9 }}>
        n=5
      </text>
      {/* Extension lines down from the plate corners */}
      <line x1={cL[0]} y1={cL[1] + 4} x2={cL[0]} y2={328} className="blueprint-stroke" style={{ strokeWidth: 0.5, opacity: 0.5 }} data-no-draw />
      <line x1={cR[0]} y1={cR[1] + 4} x2={cR[0]} y2={328} className="blueprint-stroke" style={{ strokeWidth: 0.5, opacity: 0.5 }} data-no-draw />

      {/* ── Annotations ── */}
      {/* Peak label with leader */}
      <text x={peak[0] + 12} y={peak[1] - 10} className="blueprint-fill" style={{ ...MONO, fontSize: 9, letterSpacing: "0.08em" }}>
        PEAK μ=(2.5, 2.5)
      </text>
      <line x1={peak[0] + 10} y1={peak[1] - 7} x2={peak[0] + 3} y2={peak[1] - 2} className="blueprint-stroke" style={{ strokeWidth: 0.7 }} data-no-draw />

      {/* Kernel label with leader */}
      <text x={44} y={272} className="blueprint-fill annotation" style={{ ...MONO, fontSize: 8, letterSpacing: "0.08em" }}>
        KERNEL K
      </text>
      <line x1={98} y1={268} x2={148} y2={218} className="blueprint-stroke annotation" style={{ strokeWidth: 0.7 }} data-no-draw />

      {/* Formula */}
      <text x={240} y={350} textAnchor="middle" className="blueprint-fill" style={{ ...MONO, fontSize: 10, letterSpacing: "0.06em" }}>
        g(x,y) = e^(−((x−μ)² + (y−μ)²) / 2σ²)
      </text>
    </svg>
  );
}
