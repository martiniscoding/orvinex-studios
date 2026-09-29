"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

/**
 * Scroll choreography, in one place.
 *
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
