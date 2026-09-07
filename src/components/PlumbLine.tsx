"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

/**
 * The page's spine: a hairline brass rule at the plumb axis with a bob that
 * rides it. Bob position is scrubbed to page progress (it doubles as the
 * progress indicator) and it swings off vertical with scroll velocity, then
 * settles. This is the site's one persistent piece of motion.
 */
export default function PlumbLine() {
  const bobRef = useRef<HTMLDivElement>(null);
  const armRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const bob = bobRef.current;
      const arm = armRef.current;
      if (!bob || !arm) return;

      const swingTo = gsap.quickTo(arm, "rotation", {
        duration: 0.9,
        ease: "elastic.out(1, 0.5)",
      });
      let settle: ReturnType<typeof setTimeout>;

      const st = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: "max",
        scrub: true,
        onUpdate: (self) => {
          const travel = window.innerHeight - 132;
          gsap.set(bob, { y: self.progress * travel });
          const swing = gsap.utils.clamp(-14, 14, -self.getVelocity() / 260);
          swingTo(swing);
          clearTimeout(settle);
          settle = setTimeout(() => swingTo(0), 140);
        },
      });

      return () => {
        clearTimeout(settle);
        st.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 z-30 hidden md:block"
      style={{ left: "var(--plumb-x)" }}
    >
      {/* Difference blending keeps the rule readable over both the paper
          ground and the inverted band. */}
      <div className="h-full w-px bg-paper mix-blend-difference opacity-25" />
      <div ref={bobRef} className="absolute top-14 -left-[7px] will-change-transform">
        <div ref={armRef} className="origin-top">
          <div className="mx-auto h-8 w-px bg-brass/60" />
          <svg width="15" height="26" viewBox="0 0 15 26" fill="none" className="block">
            <path
              d="M7.5 0 L15 9 L7.5 26 L0 9 Z"
              fill="var(--color-brass)"
              stroke="var(--color-ink)"
              strokeOpacity="0.35"
              strokeWidth="0.75"
            />
            <path d="M0 9 L15 9" stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="0.75" />
          </svg>
        </div>
      </div>
    </div>
  );
}
