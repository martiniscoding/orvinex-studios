import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Service } from "@/lib/services";

/**
 * A fragment of the Orvinex mark — concentric arcs winding toward a hollow
 * centre. Sits behind each service icon and unwinds when the card is hovered.
 *
 * `arcs` varies by band, so Build, Intelligence and Grow read as three
 * distinct groups without introducing a second accent colour.
 */
function Aperture({ arcs }: { arcs: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-primary/60 transition-[transform,color] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-primary motion-safe:group-hover:rotate-[130deg]"
    >
      {Array.from({ length: arcs }, (_, i) => {
        const r = 46 - i * (38 / arcs);
        const circumference = 2 * Math.PI * r;
        return (
          <circle
            key={i}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.58} ${circumference}`}
            transform={`rotate(${i * 46} 50 50)`}
            opacity={0.95 - i * (0.65 / arcs)}
          />
        );
      })}
    </svg>
  );
}

type ServiceCardProps = {
  service: Service;
  arcs: number;
  /** The catalogue page anchors each card so deep links still resolve. */
  anchored?: boolean;
};

export function ServiceCard({ service, arcs, anchored }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      id={anchored ? service.slug : undefined}
      data-card
      className="group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-ink/[0.1] bg-card bg-gradient-to-b from-ink/[0.02] to-transparent to-60% p-6 shadow-card outline-none transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-glow focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      {/* Cursor light, spilling across whichever cards it passes over. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--active, 0)",
          background:
            "radial-gradient(340px circle at var(--x) var(--y), rgb(var(--primary) / calc(0.16 * var(--wash))), transparent 72%)",
        }}
      />

      {/* The same light, isolated to the 1px edge so the border ignites. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl p-px transition-opacity duration-300"
        style={{
          opacity: "var(--active, 0)",
          background:
            "radial-gradient(280px circle at var(--x) var(--y), rgb(var(--primary) / calc(0.85 * var(--wash))), transparent 68%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
        }}
      />

      {/* Hairline catching the light along the top edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="relative grid h-16 w-16 shrink-0 place-items-center">
          <Aperture arcs={arcs} />
          <Icon
            className="relative h-[19px] w-[19px] text-ink/80 transition-colors duration-500 group-hover:text-ink"
            strokeWidth={1.9}
          />
        </span>
        <span className="mt-1 font-mono text-[10.5px] tracking-[0.18em] text-ink/25 transition-colors duration-500 group-hover:text-primary/70">
          {service.code}
        </span>
      </div>

      <h3 className="relative mt-6 font-display text-[17px] font-semibold leading-snug tracking-tight text-ink">
        {service.title}
      </h3>
      <p className="relative mt-3 text-[14px] leading-relaxed text-muted">
        {service.description}
      </p>

      <ul className="relative mt-auto flex flex-wrap gap-1.5 pt-6">
        {service.stack.map((entry) => (
          <li
            key={entry}
            className="rounded-full border border-ink/[0.08] bg-ink/[0.03] px-2.5 py-1 text-[11px] font-medium tracking-wide text-ink/50 transition-colors duration-500 group-hover:border-primary/25 group-hover:text-ink/75"
          >
            {entry}
          </li>
        ))}
      </ul>

      <span className="relative mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink/45 transition-colors duration-500 group-hover:text-primary">
        Read more
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.2}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
