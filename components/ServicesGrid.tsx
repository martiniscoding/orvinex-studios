"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
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
  /** What you actually get — real deliverables, not decoration. */
  stack: string[];
};

const BUILD: Service[] = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native iOS and Android builds, or a single cross-platform codebase that serves both. We own the architecture, the interface, the store submission and the release cadence after launch — so you ship an app people keep on their home screen.",
    stack: ["iOS", "Android", "React Native", "Flutter"],
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "The system your business actually runs on, built to fit rather than forced from a template. ERP, internal tools, integrations, automation — we retire the spreadsheets and manual handoffs quietly costing your team hours every week.",
    stack: ["ERP", "Internal tools", "Automation"],
  },
  {
    icon: Globe,
    title: "Web Application Development",
    description:
      "Fast, secure, scalable platforms — SaaS products, dashboards, customer portals. Built on modern stacks, documented properly, load-tested before launch, and handed over as clean code your future engineers will thank you for.",
    stack: ["SaaS", "Dashboards", "Portals", "APIs"],
  },
];

const GROW: Service[] = [
  {
    icon: Search,
    title: "SEO Services",
    description:
      "Rankings that compound instead of spike. Technical foundations fixed first, content mapped to real search intent, authority earned through links worth having — the work that keeps sending qualified traffic long after the invoice clears.",
    stack: ["Technical SEO", "Content", "Digital PR"],
  },
  {
    icon: LineChart,
    title: "Digital Marketing",
    description:
      "Campaigns measured in revenue, not impressions. We build the funnel end to end, run paid and organic as one system, and report on the numbers that decide your budget: acquisition cost, payback period, lifetime value.",
    stack: ["Paid search", "Paid social", "Lifecycle"],
  },
  {
    icon: TrendingUp,
    title: "Growth Marketing",
    description:
      "Experiment-led growth for teams past product-market fit. We instrument the funnel, test relentlessly across acquisition, activation and retention, then put budget only behind what has already proven it returns.",
    stack: ["Analytics", "A/B testing", "Retention"],
  },
];

/**
 * A fragment of the Orvinex mark — concentric arcs winding toward a hollow
 * centre. Sits behind each service icon and unwinds when the card is hovered.
 */
function Aperture() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-primary/60 transition-[transform,color] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-primary motion-safe:group-hover:rotate-[130deg]"
    >
      {Array.from({ length: 5 }, (_, i) => {
        const r = 46 - i * 7.5;
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
            opacity={0.95 - i * 0.13}
          />
        );
      })}
    </svg>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article
      data-card
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0b11] bg-gradient-to-b from-white/[0.035] to-transparent to-60% p-6 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-white/[0.14]"
    >
      {/* Cursor light, spilling across whichever cards it passes over. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--active, 0)",
          background:
            "radial-gradient(340px circle at var(--x) var(--y), rgba(124,92,255,0.16), transparent 72%)",
        }}
      />

      {/* The same light, isolated to the 1px edge so the border ignites. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl p-px transition-opacity duration-300"
        style={{
          opacity: "var(--active, 0)",
          background:
            "radial-gradient(280px circle at var(--x) var(--y), rgba(167,139,250,0.85), transparent 68%)",
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
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <span className="relative grid h-16 w-16 shrink-0 place-items-center">
        <Aperture />
        <Icon
          className="relative h-[19px] w-[19px] text-white/80 transition-colors duration-500 group-hover:text-white"
          strokeWidth={1.9}
        />
      </span>

      <h3 className="relative mt-6 font-display text-[17px] font-semibold leading-snug tracking-tight text-white">
        {service.title}
      </h3>
      <p className="relative mt-3 text-[14px] leading-relaxed text-muted">
        {service.description}
      </p>

      <ul className="relative mt-auto flex flex-wrap gap-1.5 pt-6">
        {service.stack.map((entry) => (
          <li
            key={entry}
            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/50 transition-colors duration-500 group-hover:border-primary/25 group-hover:text-white/75"
          >
            {entry}
          </li>
        ))}
      </ul>
    </article>
  );
}

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

export function ServicesGrid() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const point = useRef({ x: 0, y: 0 });

  // One listener for the whole board: each card gets the cursor in its own
  // coordinates, so the light reads as a single sheet moving underneath them.
  const handleMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    point.current = { x: e.clientX, y: e.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const cards = rootRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      cards?.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${point.current.x - rect.left}px`);
        card.style.setProperty("--y", `${point.current.y - rect.top}px`);
      });
    });
  }, []);

  const setActive = useCallback((on: boolean) => {
    rootRef.current?.style.setProperty("--active", on ? "1" : "0");
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

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

        <div
          ref={rootRef}
          onPointerMove={handleMove}
          onPointerEnter={() => setActive(true)}
          onPointerLeave={() => setActive(false)}
          className="mt-16"
        >
          <Reveal>
            <BandLabel>Build</BandLabel>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BUILD.map((service) => (
              <RevealItem key={service.title} className="h-full">
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-14">
            <BandLabel>Grow</BandLabel>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GROW.map((service) => (
              <RevealItem key={service.title} className="h-full">
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
