import type { CatalogueService } from "@/lib/service-catalogue";
import { BANDS } from "@/lib/services";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LightBoard } from "./LightBoard";
import { ServiceCard } from "./ServiceCard";

export function ServiceCatalogue({
  services,
}: {
  services: CatalogueService[];
}) {
  return (
    <section
      id="catalogue"
      className="relative overflow-hidden border-t border-white/[0.06] bg-background py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-grid-sm mask-fade-y opacity-70"
      />

      <LightBoard className="mx-auto max-w-6xl px-5">
        {BANDS.map((band, index) => {
          const entries = services.filter((s) => s.band === band.id);
          return (
            <div key={band.id} className={index === 0 ? "" : "mt-20"}>
              <Reveal>
                <div className="flex items-center gap-5">
                  <span className="font-mono text-[12px] tracking-[0.2em] text-primary">
                    {band.letter}
                  </span>
                  <h2 className="font-display text-[22px] font-bold tracking-tight text-white">
                    {band.label}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-gradient-to-r from-white/[0.14] to-transparent"
                  />
                  <span className="font-mono text-[11px] tracking-[0.18em] text-white/30">
                    {String(entries.length).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                  {band.blurb}
                </p>
              </Reveal>

              <RevealGroup
                className={`mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 ${
                  band.columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"
                }`}
              >
                {entries.map((service) => (
                  <RevealItem key={service.slug} className="h-full">
                    <ServiceCard service={service} arcs={band.arcs} anchored />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          );
        })}
      </LightBoard>
    </section>
  );
}
