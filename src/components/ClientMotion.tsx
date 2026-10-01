"use client";

import dynamic from "next/dynamic";

/**
 * GSAP and Lenis are ~50KB of the bundle and none of it is needed to paint the
 * page. Loading them in their own chunk after hydration keeps them off the
 * critical path, the pinned sections are the usual Lighthouse cost on a site
 * like this.
 */
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const MotionLayer = dynamic(() => import("./MotionLayer"), { ssr: false });

export default function ClientMotion() {
  return (
    <>
      <SmoothScroll />
      <MotionLayer />
    </>
  );
}
