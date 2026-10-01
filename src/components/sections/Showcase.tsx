import Image from "next/image";
import { workBySlug, type Work } from "@/content/works";
import { PhoneGroup } from "@/components/ui/IPhone";

const rows: Work[][] = [
  ["jee-society", "calendia", "panini8", "maa-kamakhya", "buildlabs"],
  ["dexter", "a-star-coaching", "syamabala", "jee-society-careers"],
].map((row) => row.map(workBySlug));

function Tile({ work, hidden }: { work: Work; hidden?: boolean }) {
  const alt = hidden ? "" : `${work.name} ${work.kind === "app" ? "app" : "website"}`;
  return (
    <li
      aria-hidden={hidden || undefined}
      className="mr-5 w-[clamp(280px,36vw,520px)] shrink-0 rounded-[var(--radius-panel)] border border-line bg-hush/70 p-[clamp(14px,2vw,28px)] shadow-[0_24px_50px_-38px_rgba(30,36,48,0.55)]"
    >
      <div className="@container relative aspect-[16/10] overflow-hidden rounded-[14px] bg-card shadow-[0_18px_36px_-22px_rgba(30,36,48,0.45)] ring-1 ring-ink/5">
        {work.kind === "app" ? (
          <PhoneGroup screens={work.screens} alt={alt} />
        ) : (
          <Image
            src={work.src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 36vw, 280px"
            className="object-cover object-top"
          />
        )}
      </div>
    </li>
  );
}

/** Two rows of work drifting in opposite directions, right under the hero. */
export default function Showcase() {
  return (
    <section
      id="work"
      aria-label="Recent work"
      className="group/showcase relative space-y-5 overflow-hidden py-14 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] lg:py-20"
    >
      {rows.map((row, i) => (
        // The row is rendered twice back to back; the track slides by exactly
        // half its width, so the loop seam is invisible.
        <ul
          key={i}
          data-marquee={i % 2 === 0 ? "left" : "right"}
          className="flex w-max group-hover/showcase:[animation-play-state:paused]"
        >
          {row.map((work) => (
            <Tile key={work.slug} work={work} />
          ))}
          {row.map((work) => (
            <Tile key={`${work.slug}-copy`} work={work} hidden />
          ))}
        </ul>
      ))}

      {/* Floats over the seam between the two rows. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
        <p className="flex items-baseline gap-3 rounded-full border border-line bg-card/95 px-7 py-4 shadow-[0_24px_50px_-24px_rgba(30,36,48,0.55)] backdrop-blur-md sm:px-9 sm:py-5">
          <span className="display-serif text-[clamp(2rem,4vw,3rem)] leading-none text-ink">50+</span>
          <span className="text-[clamp(0.9375rem,1.4vw,1.125rem)] font-medium text-muted">
            products delivered
          </span>
        </p>
      </div>
    </section>
  );
}
