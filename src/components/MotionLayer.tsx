"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

/**
 * All scroll choreography for the page, in one place.
 *
 * Two categories only, as planned:
 *   scrubbed  — the problem beats, the letter reveal, the collage frames
 *   triggered — the hero load sequence, the marquee, the nav state
 *
 * Everything sits inside a single gsap.matchMedia, so `prefers-reduced-motion`
 * reverts every tween and kills every ScrollTrigger in one call: no pinning, no
 * transforms, and the static layout the sections already ship.
 */
export default function MotionLayer() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    const root = document.documentElement;

    mm.add(MOTION_OK, () => {
      // The hero load sequence is CSS (see globals.css) so it never waits on
      // this chunk. Everything below is scroll-driven and can.

      // ---- Nav: solid after 80px --------------------------------------
      const nav = document.querySelector("[data-nav]");
      const navTrigger = ScrollTrigger.create({
        start: 80,
        onToggle: (self) => nav?.classList.toggle("is-solid", self.isActive),
      });

      // ---- Trust ticker: transform on a doubled track ------------------
      const track = document.querySelector<HTMLElement>("[data-marquee]");
      let ticker: gsap.core.Tween | undefined;
      let strip: HTMLElement | null = null;
      const pause = () => ticker?.pause();
      const play = () => ticker?.resume();
      if (track) {
        ticker = gsap.to(track, {
          xPercent: -50,
          duration: 34,
          ease: "none",
          repeat: -1,
        });
        strip = track.parentElement;
        strip?.addEventListener("mouseenter", pause);
        strip?.addEventListener("mouseleave", play);
      }

      // ---- Problem: each beat lands as you reach it --------------------
      const beats = gsap.utils.toArray<HTMLElement>("[data-beat]");
      if (beats.length) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-problem]",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });
        beats.forEach((beat, i) => {
          tl.to(beat, { yPercent: 0, duration: 0.8, ease: "power2.out" }, i * 0.75);
        });
      }

      // ---- The naming moment: letter by letter, scrubbed ---------------
      const letters = gsap.utils.toArray<HTMLElement>("[data-letter]");
      if (letters.length) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "[data-naming]",
              start: "top 85%",
              end: "top 25%",
              scrub: 0.4,
            },
          })
          .to(letters, {
            yPercent: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.35,
          });
      }

      // ---- Solution: one frame taped into place per beat ---------------
      const frames = gsap.utils.toArray<HTMLElement>("[data-frame]");
      const board = document.querySelector("[data-board]");
      if (frames.length && board) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: board,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });
        frames.forEach((frame, i) => {
          tl.fromTo(
            frame,
            { opacity: 0, yPercent: 14, scale: 0.94 },
            { opacity: 1, yPercent: 0, scale: 1, duration: 1, ease: "power3.out" },
            i * 0.85,
          );
        });
      }

      root.setAttribute("data-motion-ready", "");

      return () => {
        strip?.removeEventListener("mouseenter", pause);
        strip?.removeEventListener("mouseleave", play);
        navTrigger.kill();
        nav?.classList.remove("is-solid");
        root.removeAttribute("data-motion-ready");
      };
    });

    // Late-loading fonts change every measurement the triggers depend on.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
