import Link from "next/link";
import { serviceGroups } from "@/content/site";
import { ArrowIcon } from "@/components/Icons";

/* Each group wears its own surface, so the board reads as two bands without
   needing headings: Build on white card, Intelligence on ink. */
const surfaces: Record<string, { tile: string; label: string; body: string; arrow: string }> = {
  build: {
    tile: "border-line bg-card text-ink hover:border-ink/20 hover:shadow-[0_26px_50px_-32px_rgba(30,36,48,0.5)]",
    label: "text-accent",
    body: "text-muted",
    arrow: "text-faint group-hover:text-ink",
  },
  intelligence: {
    tile: "border-ink bg-ink text-white hover:shadow-[0_26px_50px_-28px_rgba(30,36,48,0.85)]",
    label: "text-[color-mix(in_srgb,var(--color-accent)_50%,white)]",
    body: "text-white/65",
    arrow: "text-white/45 group-hover:text-white",
  },
};

const tileBase =
  "work-in group relative flex h-full min-h-[10.5rem] flex-col overflow-hidden rounded-[var(--radius-card)] border p-6 outline-none lg:[@media(max-height:820px)]:!p-5 transition-[translate,box-shadow,border-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel lg:min-h-0 lg:p-7";

/* Beside one another the tiles reserve two lines for the title and three for
   the body, whatever the copy's length, so every title and every body starts
   at the same height across a row. */
const titleBox =
  "display-serif block text-[clamp(1.375rem,min(2.1vw,3.5vh),1.875rem)] leading-[1.08] sm:flex sm:min-h-[2.16em] sm:items-end";
const bodyBox =
  "mt-2.5 block max-w-[38ch] text-[0.9375rem] leading-[1.55] sm:min-h-[4.65em] lg:[@media(max-height:820px)]:mt-2 lg:[@media(max-height:820px)]:text-sm lg:[@media(max-height:820px)]:leading-[1.5] lg:[@media(max-height:820px)]:min-h-[4.5em]";

/**
 * Every service on one board: a 3×2 grid that fills whatever height its
 * parent gives it, so on a laptop the whole offer is visible without
 * scrolling. Rows never shrink below their content, and on short screens the
 * tiles tighten their type and padding to keep fitting. The sixth cell is the ask. The first tile of each group carries
 * the group's id, which the footer links to.
 */
export default function ServiceList() {
  const tiles = serviceGroups.flatMap((group) =>
    group.services.map((service, i) => ({ group, service, anchor: i === 0 ? group.id : undefined })),
  );

  return (
    <ul className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(2,minmax(min-content,1fr))]">
      {tiles.map(({ group, service, anchor }, i) => {
        const s = surfaces[group.id] ?? surfaces.build;
        return (
          <li key={service.id} id={anchor} className="scroll-mt-28">
            <Link
              href={`/services/${service.id}`}
              style={{ animationDelay: `${i * 60}ms` }}
              className={`${tileBase} ${s.tile}`}
            >
              {group.id === "intelligence" && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-accent/45 blur-[70px]"
                />
              )}
              <span className="relative flex items-center justify-between">
                <span className={`text-sm font-semibold ${s.label}`}>{group.label}</span>
                <span
                  className={`transition-[translate,color] duration-300 group-hover:translate-x-1 [&_svg]:h-4 [&_svg]:w-4 ${s.arrow}`}
                >
                  <ArrowIcon />
                </span>
              </span>
              <span className="relative mt-auto block pt-6 lg:[@media(max-height:820px)]:pt-3">
                <span className={titleBox}>
                  {service.title}
                </span>
                <span className={`${bodyBox} ${s.body}`}>
                  {service.body}
                </span>
              </span>
            </Link>
          </li>
        );
      })}

      <li className="sm:col-span-2 lg:col-span-1">
        <Link
          href="/#contact"
          style={{ animationDelay: `${tiles.length * 60}ms` }}
          className={`${tileBase} border-accent bg-accent text-white hover:shadow-[0_26px_50px_-28px_rgba(184,50,31,0.8)]`}
        >
          <span className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white/80">Not sure which one fits?</span>
            <span className="text-white/60 transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-white [&_svg]:h-4 [&_svg]:w-4">
              <ArrowIcon />
            </span>
          </span>
          <span className="mt-auto block pt-6 lg:[@media(max-height:820px)]:pt-3">
            <span className={titleBox}>
              Tell us what you are building
            </span>
            <span className={`${bodyBox} text-white/80`}>
              Most projects need more than one of these. We will tell you which, and what it takes.
            </span>
          </span>
        </Link>
      </li>
    </ul>
  );
}
