import Link from "next/link";
import { pricing, pricingTeaser } from "@/content/site";
import { ArrowIcon } from "@/components/Icons";

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * Pricing lives on its own route. This band keeps the number visible on the
 * landing page — a story that ends without one just makes people email to ask.
 */
export default function PricingTeaser() {
  const cheapest = Math.min(...pricing.tabs.map((t) => t.price));

  return (
    <section id="pricing" className="relative overflow-hidden rounded-[var(--radius-panel)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hush" />
      <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:p-12">
        <div>
          <h2 className="hero-type max-w-[16ch] text-[clamp(1.75rem,3.6vw,2.75rem)]">
            {pricingTeaser.title}
          </h2>
          <p className="mt-5 max-w-[46ch] text-[1.0625rem] text-ink-2">
            {pricingTeaser.body}
          </p>
        </div>

        <div className="lg:justify-self-end lg:text-right">
          <p className="eyebrow">
            Projects from
          </p>
          <p className="phudu mt-1 text-[clamp(2.5rem,6vw,3.75rem)] leading-none tabular-nums">
            {fmt(cheapest)}
          </p>
          <Link
            href={pricingTeaser.cta.href}
            className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-ink-2"
          >
            {pricingTeaser.cta.label}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
