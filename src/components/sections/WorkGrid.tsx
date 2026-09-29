"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { works, type Work } from "@/content/works";
import { PhoneGroup } from "@/components/ui/IPhone";

/* ------------------------------------------------------------------
   Bento layout. The grid is a stack of blocks; each block is its own
   12-column grid that always fills edge to edge, so tiles of different
   sizes still line up. Sites get the wide, 16:10-friendly slots; apps
   get the squarer ones where two phones sit comfortably. A filter just
   re-packs the list, so no view ever ends with a hole.
------------------------------------------------------------------- */
type BlockType = "left" | "right" | "pair" | "pairR" | "trio" | "single";

const blocks: Record<BlockType, { aspect: number; rows: string; slots: string[] }> = {
  // Big tile on the right, two stacked on the left.
  left: {
    aspect: 2.75,
    rows: "md:grid-rows-2",
    slots: ["md:col-[6/13] md:row-[1/3]", "md:col-[1/6] md:row-[1/2]", "md:col-[1/6] md:row-[2/3]"],
  },
  // Mirror of `left`.
  right: {
    aspect: 2.75,
    rows: "md:grid-rows-2",
    slots: ["md:col-[1/8] md:row-[1/3]", "md:col-[8/13] md:row-[1/2]", "md:col-[8/13] md:row-[2/3]"],
  },
  pair: { aspect: 3.3, rows: "md:grid-rows-1", slots: ["md:col-[1/8] md:row-1", "md:col-[8/13] md:row-1"] },
  pairR: { aspect: 3.3, rows: "md:grid-rows-1", slots: ["md:col-[6/13] md:row-1", "md:col-[1/6] md:row-1"] },
  trio: { aspect: 3.4, rows: "md:grid-rows-1", slots: ["md:col-[1/5] md:row-1", "md:col-[5/9] md:row-1", "md:col-[9/13] md:row-1"] },
  single: { aspect: 2.6, rows: "md:grid-rows-1", slots: ["md:col-[1/13] md:row-1"] },
};

const siteCycle: BlockType[] = ["left", "pair", "right", "pairR"];
const fallback = (n: number): BlockType => (n >= 3 ? "trio" : n === 2 ? "pair" : "single");

/** Alternates a block of sites with a row of apps until both run out. */
function pack(list: Work[]) {
  const sites = list.filter((w) => w.kind === "site");
  const apps = list.filter((w) => w.kind === "app");
  const out: { type: BlockType; items: Work[] }[] = [];
  let turn: "site" | "app" = "site";
  let cycle = 0;

  while (sites.length || apps.length) {
    if ((turn === "site" && sites.length) || !apps.length) {
      let type = siteCycle[cycle++ % siteCycle.length];
      if (sites.length < blocks[type].slots.length) type = fallback(sites.length);
      out.push({ type, items: sites.splice(0, blocks[type].slots.length) });
    } else {
      const type = fallback(apps.length);
      out.push({ type, items: apps.splice(0, blocks[type].slots.length) });
    }
    turn = turn === "site" ? "app" : "site";
  }
  return out;
}

const filters = [
  { id: "all", label: "All" },
  { id: "site", label: "Websites" },
  { id: "app", label: "Mobile apps" },
] as const;
type Filter = (typeof filters)[number]["id"];

function Tile({ work, slot }: { work: Work; slot: string }) {
  const media =
    work.kind === "app" ? (
      <PhoneGroup screens={work.screens} alt={`${work.name} app`} />
    ) : (
      <Image
        src={work.src}
        alt={`${work.name} website`}
        fill
        sizes="(min-width: 768px) 60vw, 100vw"
        className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
      />
    );

  const caption = (
    <span className="absolute bottom-3 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full bg-white/90 py-1.5 pr-3 pl-3.5 text-[0.8125rem] text-ink shadow-[0_8px_24px_-12px_rgba(30,36,48,0.5)] ring-1 ring-ink/5 backdrop-blur transition-all duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
      <span className="shrink-0 whitespace-nowrap font-semibold">{work.name}</span>
      <span className="truncate text-muted">{work.what}</span>
      {work.kind === "site" && work.url && <ArrowUpRight size={14} className="shrink-0" />}
    </span>
  );

  const frame =
    "group block h-full rounded-[var(--radius-card)] border border-line bg-hush/70 p-2.5 shadow-[0_24px_50px_-38px_rgba(30,36,48,0.55)] outline-none transition-[translate,box-shadow,border-color,background-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-ink/15 hover:bg-hush hover:shadow-[0_36px_60px_-30px_rgba(30,36,48,0.55)] focus-visible:ring-2 focus-visible:ring-accent active:translate-y-0 active:duration-150 lg:p-3";
  const inner = `@container relative h-full overflow-hidden rounded-[14px] bg-card ring-1 ring-ink/5 md:aspect-auto ${
    work.kind === "app" ? "aspect-[4/3]" : "aspect-[16/10]"
  }`;

  return (
    <li className={slot}>
      {work.kind === "site" && work.url ? (
        <a href={work.url} target="_blank" rel="noreferrer" className={frame}>
          <div className={inner}>
            {media}
            {caption}
          </div>
        </a>
      ) : (
        <div tabIndex={0} className={frame}>
          <div className={inner}>
            {media}
            {caption}
          </div>
        </div>
      )}
    </li>
  );
}

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = filter === "all" ? works : works.filter((w) => w.kind === filter);
  // Only worth filtering when there is more than one kind of work.
  const mixed = new Set(works.map((w) => w.kind)).size > 1;

  return (
    <div>
      {mixed && (
      <div className="sticky top-[84px] z-40 mx-auto mb-8 w-fit max-w-full lg:mb-10">
        <div
          role="group"
          aria-label="Filter work"
          className="flex gap-1 rounded-full border border-line bg-panel/80 p-1 shadow-[0_12px_32px_-16px_rgba(30,36,48,0.35)] backdrop-blur-lg"
        >
          {filters.map((f) => {
            const count = f.id === "all" ? works.length : works.filter((w) => w.kind === f.id).length;
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.id)}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 min-[380px]:px-3.5 sm:px-4 ${
                  on ? "bg-ink text-white" : "text-muted hover:text-ink"
                }`}
              >
                {f.label}
                <span className={`ml-1.5 hidden tabular-nums min-[380px]:inline ${on ? "text-white/60" : "text-faint"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      )}

      <div key={filter} className="space-y-4">
        {pack(list).map((block, b) => {
          const def = blocks[block.type];
          return (
            <ul
              key={b}
              style={{ "--a": def.aspect, animationDelay: `${b * 70}ms` } as CSSProperties}
              className={`work-in grid gap-4 md:aspect-[var(--a)] md:grid-cols-12 ${def.rows}`}
            >
              {block.items.map((work, i) => (
                <Tile key={work.slug} work={work} slot={def.slots[i]} />
              ))}
            </ul>
          );
        })}
      </div>
    </div>
  );
}
