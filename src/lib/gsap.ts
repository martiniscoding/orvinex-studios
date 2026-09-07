import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Every scroll-driven effect goes through this so reduced motion is honoured once, centrally. */
export const NO_MOTION = "(prefers-reduced-motion: reduce)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(NO_MOTION).matches;
}

export { gsap, ScrollTrigger };
