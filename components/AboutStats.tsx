"use client";

import { Layers, Rocket, ShieldCheck, type LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

const STATS = [
  { value: "50+", label: "Enterprise Projects" },
  { value: "0%", label: "Failed Deliveries" },
  { value: "2Yrs", label: "Proven Excellence" },
  { value: "100%", label: "In-House Engineering" },
];

const STANDARDS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Layers,
    title: "Scalable Architecture",
    description:
      "We don't build temporary fixes. Every line of code is structured to handle millions of queries, ensuring your software grows flawlessly with your user base.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Security",
    description:
      "From strict data encryption to WAF implementation and CSRF protection, we treat your business data with the highest level of cryptographic security available.",
  },
  {
    icon: Rocket,
    title: "Rapid Deployment",
    description:
      "We utilize agile methodologies and modern CI/CD pipelines to drastically reduce development time without compromising on code quality or testing.",
  },
];

export function AboutStats() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-ink/[0.06] bg-background py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 -z-10 h-[420px] w-[560px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgb(var(--primary) / calc(0.18 * var(--wash))) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
              Established in 2022
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.95rem,4.4vw,3.05rem)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
              Engineering the future of enterprise software.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="flex items-end">
            <p className="text-[15.5px] leading-relaxed text-muted">
              We are a specialized technology agency that eliminates the
              friction of building software. We don&apos;t just write
              code&mdash;we engineer scalable, bank-grade architectures that
              allow your business to grow infinitely without technical debt.
            </p>
          </Reveal>
        </div>

        {/* ── Stats ──────────────────────────────────────────────────── */}
        <RevealGroup className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/[0.08] bg-ink/[0.06] lg:grid-cols-4">
          {STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="h-full bg-background px-6 py-8 text-center transition-colors duration-300 hover:bg-surface">
                <p className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-bold tracking-tight text-ink">
                  {stat.value}
                </p>
                <p className="mt-2 text-[13px] leading-snug text-muted">
                  {stat.label}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ── Standards ──────────────────────────────────────────────── */}
        <RevealGroup className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {STANDARDS.map((standard) => {
            const Icon = standard.icon;
            return (
              <RevealItem key={standard.title} className="h-full">
                <article className="group h-full rounded-2xl border border-ink/[0.08] bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-ink/10 bg-ink/[0.04] text-primary transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/15">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-display text-[17px] font-semibold tracking-tight text-ink">
                    {standard.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">
                    {standard.description}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-16 max-w-3xl text-center font-display text-[clamp(1.3rem,3vw,2rem)] font-semibold leading-snug tracking-tight text-ink/90">
            &ldquo;We build the technology so you can build the business.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
