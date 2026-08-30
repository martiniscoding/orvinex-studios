import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { CatalogueService } from "@/lib/service-catalogue";
import { BANDS } from "@/lib/services";
import { BOOKING_URL } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The catalogue index.
 *
 * A services page is a directory before it is anything else, so the hero is
 * built as one: every discipline listed once, with its band code and a leader
 * rule out to its own page. It doubles as the page's navigation — ten cards is
 * more than a visitor should have to scroll blindly through to find the one
 * thing they came for.
 */
function Ledger({ services }: { services: CatalogueService[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0b0b11]/80 p-6 sm:p-7">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
          Index
        </span>
        <span className="font-mono text-[11px] tracking-[0.18em] text-white/30">
          {services.length} services
        </span>
      </div>

      {BANDS.map((band) => {
        const entries = services.filter((s) => s.band === band.id);
        return (
          <div key={band.id} className="mt-7 first:mt-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.18em] text-primary/80">
                {band.letter}
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/55">
                {band.label}
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-r from-white/[0.12] to-transparent"
              />
            </div>

            <ul className="mt-1.5">
              {entries.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-baseline gap-3 rounded-lg py-[7px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    <span className="font-mono text-[11px] tracking-[0.14em] text-white/30 transition-colors group-hover:text-primary/80">
                      {service.code}
                    </span>
                    <span className="shrink-0 text-[14px] text-white/75 transition-colors group-hover:text-white">
                      {service.short}
                    </span>
                    <span
                      aria-hidden="true"
                      className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-white/[0.18] transition-colors group-hover:border-primary/45"
                    />
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 self-center text-white/20 transition-colors group-hover:text-primary"
                      strokeWidth={2}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export function ServicesHero({
  services,
}: {
  services: CatalogueService[];
}) {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-grid mask-hero-grid opacity-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[420px] w-[min(90vw,760px)] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124,92,255,0.22) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16 lg:pb-28">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
            Services
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5.2vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white text-balance">
            Everything at one place, one team, and nobody to translate
            between.
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted">
            Most companies hire one agency to build the product, another to add
            the AI, and a third to bring the traffic — then spend every week
            relaying messages between them. Orvinex runs all three from a single
            team on a single roadmap, measured against the same number.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-deep px-6 py-3 text-[14.5px] font-semibold text-white shadow-[0_0_24px_-6px_rgba(124,92,255,0.9)] outline-none transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Schedule a call
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </a>
            <a
              href="#catalogue"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3 text-[14.5px] font-medium text-white/80 outline-none transition-colors hover:border-white/25 hover:text-white focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Read the catalogue
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <Ledger services={services} />
        </Reveal>
      </div>
    </section>
  );
}
