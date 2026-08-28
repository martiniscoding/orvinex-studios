"use client";

import { Reveal } from "./ui/Reveal";

const LOGOS = [
  "JEESociety",
  "AStarInstitute",
  "Calendia",
  "EduGlobal",
  "Maakamakhya Hardwares",
];

export function TrustLogos() {
  // The track travels -50%, so one half must be wider than the viewport or a
  // gap opens at the seam on large screens. Five names alone fall short of
  // that on a wide desktop, so the half is itself the list twice over.
  const half = [...LOGOS, ...LOGOS];
  const track = [...half, ...half];

  return (
    <section className="relative border-y border-ink/[0.06] bg-background py-14">
      <Reveal className="mx-auto max-w-6xl px-5">
        <p className="text-center text-[11.5px] font-semibold uppercase tracking-[0.22em] text-muted">
          Enterprises That Trust Our Services
        </p>
      </Reveal>

      <div className="marquee-pause relative mt-9 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-14 pr-14 sm:gap-20 sm:pr-20">
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 select-none whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink/40 transition-colors duration-300 hover:text-ink/80 sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
