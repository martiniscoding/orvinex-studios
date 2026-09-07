"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

/**
 * Scroll choreography, in one place.
 *
 *   triggered once — the key caps popping onto the page, the polaroids
 *                    landing on the board
 *   (the hero load sequence is CSS; see globals.css)
 *
 * Everything sits inside a single gsap.matchMedia, so `prefers-reduced-motion`
 * reverts every tween and kills every ScrollTrigger in one call.
 */
export default function MotionLayer() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    const root = document.documentElement;

    mm.add(MOTION_OK, () => {
      const caps = gsap.utils.toArray<HTMLElement>("[data-cap]");
      if (caps.length) {
        gsap.fromTo(
          caps,
          { opacity: 0, y: -26, scale: 0.7, rotate: 0 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: (i: number) => (i % 2 ? 1 : -1) * (3.5 + ((i * 2) % 4)),
            duration: 0.75,
            ease: "back.out(2.2)",
            stagger: 0.05,
            scrollTrigger: { trigger: caps[0], start: "top 85%", once: true },
          },
        );
      }

      const polaroids = gsap.utils.toArray<HTMLElement>("[data-polaroid]");
      polaroids.forEach((frame, i) => {
        const rest = Number(frame.dataset.rotate ?? 0);
        gsap.fromTo(
          frame,
          { opacity: 0, y: 46, rotate: rest - 8, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            rotate: rest,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            delay: (i % 3) * 0.09,
            scrollTrigger: { trigger: frame, start: "top 88%", once: true },
          },
        );
      });

      root.setAttribute("data-motion-ready", "");

      return () => {
        root.removeAttribute("data-motion-ready");
      };
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    // mm.revert() kills every trigger and tween created inside the context,
    // and only those.
    return () => mm.revert();
  }, []);

  return null;
}
