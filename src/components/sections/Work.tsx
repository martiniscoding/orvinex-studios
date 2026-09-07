"use client";

import { useRef, useState } from "react";
import { work } from "@/content/site";
import { coverArt } from "@/components/art/Covers";
import { ArrowIcon } from "@/components/Icons";

/** Horizontal project carousel; scroll-snap does the work, arrows nudge it. */
export default function Work() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const go = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.min(Math.max(index + dir, 0), work.length - 1);
    setIndex(next);
    const card = track.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section id="work">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2 className="hero-type mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)]">
            Four products, shipped
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(dir)}
              disabled={dir === -1 ? index === 0 : index === work.length - 1}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-card text-ink shadow-[0_8px_20px_-12px_rgba(20,51,77,0.5)] transition-opacity disabled:opacity-35"
            >
              <span className="sr-only">{dir === -1 ? "Previous project" : "Next project"}</span>
              <span aria-hidden="true" className={dir === -1 ? "rotate-180" : ""}>
                <ArrowIcon />
              </span>
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={trackRef}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {work.map((project) => (
          <li
            key={project.id}
            className="w-[85%] shrink-0 snap-start sm:w-[70%] lg:w-[58%]"
          >
            <article className="h-full overflow-hidden rounded-[var(--radius-panel)] bg-card shadow-[0_24px_50px_-38px_rgba(20,51,77,0.6)]">
              <div className="bg-hush/60 p-3">{coverArt[project.id]}</div>
              <div className="p-7">
                <div className="flex items-baseline gap-3">
                  <h3 className="phudu text-[1.5rem] leading-none">{project.client}</h3>
                  <span className="eyebrow">{project.year}</span>
                </div>
                <p className="mt-2 text-[0.9375rem] text-muted">{project.what}</p>
                <dl className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
                  <div className="flex gap-4">
                    <dt className="w-20 shrink-0 text-muted">Scope</dt>
                    <dd className="text-ink-2">{project.did}</dd>
                  </div>
                  <div className="flex gap-4">
                    <dt className="w-20 shrink-0 text-muted">Outcome</dt>
                    <dd className="text-ink-2">{project.outcome}</dd>
                  </div>
                </dl>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
