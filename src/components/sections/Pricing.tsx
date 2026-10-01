import { pricing, site } from "@/content/site";
import { CheckIcon } from "@/components/Icons";

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * Three fixed tiers, side by side. Each card is one column split in two: the
 * ask on top (name, tagline, price, button), the list below it on the quieter
 * fill, so the three buttons line up across the row however long the lists run.
 * The middle card is filled with the flat accent red to mark it as the one
 * most founders pick.
 */
export default function Pricing() {
  return (
    <section id="pricing" className="grid gap-6 lg:grid-cols-3 lg:gap-7">
      {pricing.plans.map((plan) => {
        const on = plan.featured;
        return (
          <div
            key={plan.id}
            className={`relative isolate flex flex-col overflow-hidden rounded-[var(--radius-panel)] bg-card ${
              on
                ? "shadow-[0_34px_70px_-40px_rgba(217,28,28,0.45)] lg:-my-3"
                : "shadow-[0_28px_60px_-45px_rgba(30,36,48,0.5)]"
            }`}
          >
            {!on && <span aria-hidden="true" className="tex tex-paper" />}

            <div className={`relative flex flex-1 flex-col p-7 lg:p-8 ${on ? "bg-accent" : ""}`}>
              <h2 className={`display-serif text-[1.75rem] leading-none ${on ? "text-white" : ""}`}>
                {plan.name}
              </h2>
              <p className={`mt-2.5 text-[0.9375rem] ${on ? "text-white/85" : "text-muted"}`}>
                {plan.tagline}
              </p>

              <div className="mt-8">
                <p className={`text-[0.9375rem] ${on ? "text-white/85" : "text-muted"}`}>
                  {pricing.startsAt}
                </p>
                <p
                  className={`display-serif mt-1 text-[clamp(2.75rem,5vw,3.25rem)] leading-none lining-nums tabular-nums ${on ? "text-white" : ""}`}
                >
                  {fmt(plan.price)}
                </p>
              </div>

              <a
                href={site.booking}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-10 inline-flex items-center justify-center rounded-full px-6 py-4 text-[0.9375rem] font-medium transition-colors duration-300 ${
                  on
                    ? "bg-white text-ink hover:bg-white/90"
                    : "bg-ink text-white shadow-[0_14px_28px_-16px_rgba(30,36,48,0.8)] hover:bg-ink-2"
                }`}
              >
                {pricing.cta}
              </a>
            </div>

            <div className="relative border-t border-line bg-hush/40 p-7 lg:p-8">
              <h3 className="display-serif text-[1.25rem] leading-none">{pricing.includedLabel}</h3>
              <ul className="mt-6 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[0.9375rem] text-ink-2">
                    <span className="mt-0.5 shrink-0 text-accent">
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </section>
  );
}
