"use client";

import {
  Code2,
  Globe,
  LineChart,
  Search,
  Smartphone,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native iOS and Android builds, or a single cross-platform codebase that serves both. We own the architecture, the interface, the store submission and the release cadence after launch — so you ship an app people keep on their home screen.",
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "The system your business actually runs on, built to fit rather than forced from a template. ERP, internal tools, integrations, automation — we retire the spreadsheets and manual handoffs quietly costing your team hours every week.",
  },
  {
    icon: Globe,
    title: "Web Application Development",
    description:
      "Fast, secure, scalable platforms — SaaS products, dashboards, customer portals. Built on modern stacks, documented properly, load-tested before launch, and handed over as clean code your future engineers will thank you for.",
  },
  {
    icon: Search,
    title: "SEO Services",
    description:
      "Rankings that compound instead of spike. Technical foundations fixed first, content mapped to real search intent, authority earned through links worth having — the work that keeps sending qualified traffic long after the invoice clears.",
  },
  {
    icon: LineChart,
    title: "Digital Marketing",
    description:
      "Campaigns measured in revenue, not impressions. We build the funnel end to end, run paid and organic as one system, and report on the numbers that decide your budget: acquisition cost, payback period, lifetime value.",
  },
  {
    icon: TrendingUp,
    title: "Growth Marketing",
    description:
      "Experiment-led growth for teams past product-market fit. We instrument the funnel, test relentlessly across acquisition, activation and retention, then put budget only behind what has already proven it returns.",
  },
];

export function ServicesGrid() {
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

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <RevealItem key={service.title} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface hover:shadow-[0_18px_50px_-24px_rgba(124,92,255,0.85)]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-primary transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/15">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="relative mt-5 font-display text-[17px] font-semibold leading-snug tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 text-[14px] leading-relaxed text-muted">
                    {service.description}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
