"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * The tally that sits at the foot of the hero work gallery.
 *
 * The gallery above it is an endless loop of eight screenshots; this is the
 * real depth behind that loop, so it belongs at the seam where the marquee
 * masks out rather than floating over the artwork as a badge.
 *
 * The digits count up once on load — accumulation is the whole claim, so it
 * is worth dramatising exactly once. The panel holds at opacity 0 for the
 * duration of the delay, which keeps the "0" start frame off screen.
 */
export function ShippedCount({
  to = 64,
  delay = 0.75,
}: {
  to?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const shown = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (reduceMotion) {
      count.set(to);
      return;
    }

    const controls = animate(count, to, {
      duration: 1.5,
      delay,
      ease: EASE,
    });

    return () => controls.stop();
  }, [count, delay, reduceMotion, to]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      /* Overlay only — hover still reaches the gallery to pause it. */
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-background/70 px-6 py-5 backdrop-blur-xl sm:px-8 sm:py-6">
        {/* Violet bloom behind the numeral, echoing the hero glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 top-1/2 h-32 w-44 -translate-y-1/2 rounded-full blur-[38px]"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124,92,255,0.42) 0%, transparent 70%)",
          }}
        />

        {/* Hairline catching the light along the top edge of the panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.28), transparent)",
          }}
        />

        <p
          className="relative flex items-center justify-center gap-4 sm:gap-5"
          aria-label={`${to} plus products shipped`}
        >
          <span
            aria-hidden="true"
            className="flex items-start font-display text-[clamp(2.4rem,6.5vw,3.6rem)] font-bold leading-none tracking-[-0.055em] text-white tabular-nums"
          >
            <motion.span>{shown}</motion.span>
            <span className="ml-0.5 mt-[0.1em] text-[0.4em] leading-none text-primary">
              +
            </span>
          </span>

          <span
            aria-hidden="true"
            className="h-9 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent sm:h-11"
          />

          <span
            aria-hidden="true"
            className="text-[10px] font-semibold uppercase leading-[1.7] tracking-[0.26em] text-white/55 sm:text-[10.5px]"
          >
            Products
            <br />
            Shipped
          </span>
        </p>
      </div>
    </motion.div>
  );
}
