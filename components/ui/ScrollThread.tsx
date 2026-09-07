"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * A single glowing thread that draws itself down the page as you scroll.
 *
 * Rendered in pixel coordinates rather than a scaled viewBox: stretching a
 * viewBox to fit the container is the usual trick, but it scales the stroke
 * with it, so the line would be thin at the top of a tall page and fat on a
 * short one. Measuring the container and emitting a path in real pixels keeps
 * the stroke an even width whatever the page height.
 *
 * It sits behind content and is decorative, so it is aria-hidden and never
 * takes pointer events.
 */

/**
 * Vertical distance between weave points.
 *
 * Long on purpose. A short segment against a wide swing produces a steep
 * zigzag that reads as a diagonal slash across the page; stretching the
 * wavelength turns the same amplitude into a slow S that drifts past content.
 */
const SEGMENT = 900;

/**
 * Smooths a list of points into one path.
 *
 * Catmull-Rom through the points, converted to cubic Béziers — the curve
 * passes exactly through every point, which a plain quadratic chain does not,
 * so the weave hits the amplitudes it is given instead of flattening.
 */
function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0]!.x.toFixed(1)} ${points[0]!.y.toFixed(1)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;

    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function buildPath(width: number, height: number) {
  // Swing wide on a desktop, stay near the middle on a phone where a broad
  // weave would cut straight through the text column.
  const amplitude = Math.min(width * 0.33, width < 640 ? 48 : 330);
  const centre = width / 2;
  const count = Math.max(3, Math.round(height / SEGMENT));

  const points = Array.from({ length: count + 1 }, (_, i) => {
    const t = i / count;
    // Two sine waves of different periods, so the weave never settles into an
    // obvious repeat down a long page.
    const swing =
      Math.sin(t * Math.PI * 1.9) * 0.78 + Math.sin(t * Math.PI * 4.3) * 0.22;
    return { x: centre + swing * amplitude, y: t * height };
  });

  return smoothPath(points);
}

export function ScrollThread({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry!.contentRect;
      setBox({ width: Math.round(r.width), height: Math.round(r.height) });
    });
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  // Progress across the host element, from when its top reaches the bottom of
  // the viewport to when its bottom reaches the top.
  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start end", "end start"],
  });

  // A spring keeps the tip from snapping on a fast flick or a trackpad jolt.
  const drawn = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const d = box.width && box.height ? buildPath(box.width, box.height) : "";

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      /**
       * Painted above the sections, not behind them. Every section below the
       * hero has an opaque background, so a thread underneath is simply never
       * seen. `screen` blending means it only ever adds light — it brightens
       * the dark ground it crosses and leaves text legible instead of laying a
       * grey wash over it.
       */
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden mix-blend-screen ${className}`}
    >
      {d && (
        <svg
          width={box.width}
          height={box.height}
          viewBox={`0 0 ${box.width} ${box.height}`}
          fill="none"
          className="absolute inset-0"
        >
          <defs>
            <filter id="thread-glow" x="-25%" y="-2%" width="150%" height="104%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
            {/* Fades both ends so the thread appears and leaves rather than
                being cut off by the edge of the section. */}
            <linearGradient id="thread-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="8%" stopColor="#fff" stopOpacity="0.34" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="92%" stopColor="#fff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="thread-bloom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0" />
              <stop offset="10%" stopColor="#c4b5fd" stopOpacity="0.62" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.52" />
              <stop offset="90%" stopColor="#8b5cf6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* The violet bloom underneath, blurred, so the white core reads as
              light rather than as a drawn line. */}
          <motion.path
            d={d}
            stroke="url(#thread-bloom)"
            strokeWidth={9}
            strokeLinecap="round"
            filter="url(#thread-glow)"
            style={reduced ? undefined : { pathLength: drawn }}
            pathLength={reduced ? undefined : 1}
          />

          {/* The hairline core. */}
          <motion.path
            d={d}
            stroke="url(#thread-fade)"
            strokeWidth={1.2}
            strokeLinecap="round"
            style={reduced ? undefined : { pathLength: drawn }}
            pathLength={reduced ? undefined : 1}
          />
        </svg>
      )}
    </div>
  );
}
