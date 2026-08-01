"use client";

import { Reveal } from "./ui/Reveal";

const LOGOS = [
  "TechNova",
  "NexusCorp",
  "Elevate AI",
  "Global Fin",
  "Vertex Health",
  "Quantum ERP",
  "Lumina SaaS",
];

export function TrustLogos() {
  // Rendered twice so the -50% translate loops seamlessly.
  const track = [...LOGOS, ...LOGOS];

  return (
    <section className="relative border-y border-white/[0.06] bg-background py-14">
      <Reveal className="mx-auto max-w-6xl px-5">
        <p className="text-center text-[11.5px] font-semibold uppercase tracking-[0.22em] text-muted">
          Enterprises That Trust Our Architecture
        </p>
      </Reveal>

      <div className="marquee-pause relative mt-9 overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-14 pr-14 sm:gap-20 sm:pr-20">
          {track.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 select-none whitespace-nowrap font-display text-xl font-semibold tracking-tight text-white/40 transition-colors duration-300 hover:text-white/80 sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
