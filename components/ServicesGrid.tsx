import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { listCatalogue } from "@/lib/service-catalogue";
import { BANDS } from "@/lib/services";
import { LightBoard } from "./services/LightBoard";
import { ServiceCard } from "./services/ServiceCard";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

/**
 * The landing-page teaser: six of the ten disciplines, split into the two
 * bands most visitors arrive looking for. The full catalogue — including the
 * Intelligence band — lives at /services.
 */
const TEASER_BANDS = BANDS.filter((band) => band.id !== "intelligence");

function BandLabel({ children }: { children: string }) {
  return (
    <div className="mb-6 flex items-center gap-5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="h-px flex-1 bg-gradient-to-r from-white/[0.14] to-transparent"
      />
    </div>
  );
}

export async function ServicesGrid() {
  const services = await listCatalogue();
  const featured = services.filter((service) => service.featured);

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-white/[0.06] bg-background py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-grid-sm mask-fade-y opacity-70"
      />

      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
            What We Do
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.95rem,4.4vw,3.05rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            One team to build it, launch it, and grow it.
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
            From the first line of code to the campaigns that fill your
            pipeline, Orvinex is the senior engineering and growth team behind
            ambitious companies worldwide — one partner, one standard, and no
            handoffs between agencies.
          </p>
        </Reveal>

        <LightBoard className="mt-16">
          {TEASER_BANDS.map((band, index) => (
            <div key={band.id} className={index === 0 ? "" : "mt-14"}>
              <Reveal>
                <BandLabel>{band.label}</BandLabel>
              </Reveal>
              <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured
                  .filter((service) => service.band === band.id)
                  .map((service) => (
                    <RevealItem key={service.slug} className="h-full">
                      <ServiceCard service={service} arcs={band.arcs} />
                    </RevealItem>
                  ))}
              </RevealGroup>
            </div>
          ))}
        </LightBoard>

        <Reveal className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3 text-[14.5px] font-medium text-white/80 outline-none transition-colors hover:border-primary/40 hover:text-white focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            All {services.length} services, including our AI work
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
