"use client";

import { useEffect, type RefObject } from "react";

/**
 * Blueprint figure draw-in: every stroked element draws itself via the
 * `draw` keyframes (stroke-dash). Elements marked `data-no-draw` (washes,
 * dashed guides, arrowheads) are skipped — fade them in with the
 * `.annotation` class instead. Text labels also use `.annotation`.
 */
export function useFigureDraw(ref: RefObject<SVGSVGElement | null>): void {
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = svg.querySelectorAll<SVGGeometryElement>(
      "path, line, circle, rect, polyline, polygon",
    );
    els.forEach((el, i) => {
      if (el.dataset.noDraw) return;
      const length = el.getTotalLength?.() ?? 300;
      el.style.setProperty("--path-length", `${length}`);
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;
      el.style.animation = `draw ${Math.min(0.9 + length / 900, 1.6)}s ease-in-out ${i * 0.03}s forwards`;
    });
  }, [ref]);
}
