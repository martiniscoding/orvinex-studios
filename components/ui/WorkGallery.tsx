import Image, { type StaticImageData } from "next/image";

import aidp from "@/public/aidp.png";
import astarcoaching from "@/public/astarcoaching.png";
import calendia from "@/public/calendia.png";
import careers from "@/public/carrer.png";
import jeesociety from "@/public/jeesociety.png";
import maakamakhya from "@/public/maakamakhya.png";
import panini from "@/public/panini.png";
import syambala from "@/public/syambala.png";

import { ShippedCount } from "./ShippedCount";

type Work = { src: StaticImageData; alt: string };

/**
 * The two columns hold disjoint sets, which is what keeps the same screenshot
 * from ever appearing on both sides of the gutter at once. Drawing both from
 * one pool cannot promise that however the order is shuffled — the columns
 * scroll at different speeds, so any shared image eventually lines up with
 * itself. Splitting the set makes the collision impossible rather than rare.
 *
 * Both JEE Society pages sit in the same column for the same reason, one step
 * up: they are different screenshots, so a shared pool would let the one brand
 * fill both columns at once.
 *
 * Within a column the order alternates tone — the two dark screenshots are the
 * scarce ones, so each column gets exactly one, and no two pale pages run back
 * to back, including across the wrap from the last item to the first.
 */
const COLUMN_A: Work[] = [
  { src: jeesociety, alt: "JEE Society — student platform" },
  { src: calendia, alt: "Calendia — online booking platform" },
  { src: careers, alt: "JEE Society Careers — hiring site" },
  { src: panini, alt: "Panini8 — math olympiad practice platform" },
];

const COLUMN_B: Work[] = [
  { src: syambala, alt: "Syambala — website" },
  { src: aidp, alt: "Dexter — AI architecture governance platform" },
  { src: maakamakhya, alt: "Maa Kamakhya — website" },
  { src: astarcoaching, alt: "A-Star Teaching — website" },
];

/**
 * How many times each column repeats its set.
 *
 * Three rather than two: a column of four screenshots is about 640px tall at
 * the desktop layout, which is shorter than the 660px the gallery can open to
 * on a tall viewport. Two copies would leave the tail of the track visible as
 * a gap at the end of each cycle; three keeps the window covered throughout.
 */
const REPEATS = 3;

/**
 * One scrolling column.
 *
 * The track travels exactly one set — `-100% / REPEATS` — which lands the next
 * copy where the previous one began, so the loop has no seam. Spacing lives on
 * each item as padding rather than as a flex `gap`: a gap applies between items
 * but not after the last one, which leaves the copies unequal and makes the
 * loop jump.
 */
function Column({
  items,
  direction,
  delay = "0s",
}: {
  items: Work[];
  direction: "up" | "down";
  /** Negative value starts the loop mid-cycle rather than from the top. */
  delay?: string;
}) {
  return (
    <ul
      style={{ animationDelay: delay }}
      className={`flex flex-col will-change-transform motion-reduce:animate-none ${
        direction === "up" ? "animate-marquee-up" : "animate-marquee-down"
      } group-hover:[animation-play-state:paused]`}
    >
      {Array.from({ length: REPEATS }, () => items)
        .flat()
        .map((work, i) => (
          <li key={`${work.alt}-${i}`} className="pb-4">
            <div className="overflow-hidden rounded-xl border border-ink/[0.12] bg-card shadow-card">
              <Image
                src={work.src}
                alt={i < items.length ? work.alt : ""}
                aria-hidden={i >= items.length}
                placeholder="blur"
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="h-auto w-full"
              />
            </div>
          </li>
        ))}
    </ul>
  );
}

/**
 * The hero's proof panel: recent client work drifting past in two columns
 * running against each other, with the shipped tally anchored at its foot.
 * The marquee itself is pure CSS — only the counter ships JS.
 */
export function WorkGallery({ className = "" }: { className?: string }) {
  return (
    <div className={`group relative ${className}`}>
      {/* The mask lives on the marquee alone so the tally below stays crisp. */}
      <div
        className="absolute inset-0 overflow-hidden mask-fade-y"
        aria-label="Recent Orvinex client websites"
      >
        <div className="grid grid-cols-2 gap-4">
          <Column items={COLUMN_A} direction="up" />
          <Column items={COLUMN_B} direction="down" delay="-9s" />
        </div>
      </div>

      <ShippedCount />
    </div>
  );
}
