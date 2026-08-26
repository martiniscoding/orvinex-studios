import Image, { type StaticImageData } from "next/image";

import aidp from "@/public/aidp.png";
import astarcoaching from "@/public/astarcoaching.png";
import calendia from "@/public/calendia.png";
import careers from "@/public/carrer.png";
import jeesociety from "@/public/jeesociety.png";
import maakamakhya from "@/public/maakamakhya.png";
import syambala from "@/public/syambala.png";

type Work = { src: StaticImageData; alt: string };

const WORK: Work[] = [
  { src: calendia, alt: "Calendia — online booking platform" },
  { src: maakamakhya, alt: "Maa Kamakhya — website" },
  { src: aidp, alt: "Dexter — AI architecture governance platform" },
  { src: jeesociety, alt: "JEE Society — student platform" },
  { src: syambala, alt: "Syambala — website" },
  { src: astarcoaching, alt: "A-Star Coaching — website" },
  { src: careers, alt: "JEE Society Careers — hiring site" },
];

/**
 * Too few projects to give each column its own set, so both draw on all of
 * them — which risks a screenshot sitting level with itself across the gutter.
 *
 * The second column is REVERSED, not rotated. A rotation is a cyclic shift, so
 * both columns keep the same sequence of item heights: the moment any one pair
 * lines up, every pair does, and the gallery reads as a mirrored grid.
 * Reversing changes the order the heights accumulate in, so the columns cannot
 * lock in step and at worst a single pair coincides in passing. The negative
 * animation-delay below starts the column partway through its loop.
 */
const COLUMN_A = WORK;
const COLUMN_B = [...WORK].reverse();

/**
 * One scrolling column.
 *
 * The set is rendered twice and the track travels exactly -50%, which lands
 * the duplicate where the original began — so the loop has no seam. Spacing
 * lives on each item as padding rather than as a flex `gap`: a gap applies
 * between items but not after the last one, which leaves the two halves
 * unequal and makes the loop jump.
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
      {[...items, ...items].map((work, i) => (
        <li key={`${work.alt}-${i}`} className="pb-4">
          <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-surface shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)]">
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
 * The hero's proof panel: recent client work, drifting past in two columns
 * running against each other. Pure CSS animation — no JS ships for it.
 */
export function WorkGallery({ className = "" }: { className?: string }) {
  return (
    <div
      className={`group relative overflow-hidden mask-fade-y ${className}`}
      aria-label="Recent Orvinex client websites"
    >
      <div className="grid grid-cols-2 gap-4">
        <Column items={COLUMN_A} direction="up" />
        <Column items={COLUMN_B} direction="down" delay="-19s" />
      </div>
    </div>
  );
}
