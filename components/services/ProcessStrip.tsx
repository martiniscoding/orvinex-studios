import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Numbered because this genuinely is a sequence — each step depends on the
 * one before it, and the order is information the reader needs.
 */
const STEPS = [
  {
    n: "01",
    title: "Scope",
    body: "We start with the decision, not the feature list. A short discovery puts your constraints, your data and your deadline in writing — and tells you what the work should cost before you commit to any of it.",
  },
  {
    n: "02",
    title: "Build",
    body: "Two-week cycles, each ending with something you can actually use. The work sits in a staging environment you have access to throughout, so handover day contains no surprises.",
  },
  {
    n: "03",
    title: "Launch",
    body: "Load tested, monitored and documented before it goes live. We stay on through the first fortnight of real traffic, which is when the problems worth catching actually appear.",
  },
  {
    n: "04",
    title: "Grow",
    body: "The team that built it runs the acquisition. Nobody has to re-brief an agency that has never seen the codebase, and the growth work can change the product when the data says it should.",
  },
];

export function ProcessStrip() {
  return (
    <section className="relative border-t border-white/[0.06] bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
            How we work
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
            The same four steps, whichever service you start with.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <RevealItem key={step.n}>
              <div className="relative pt-5">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/50 to-transparent"
                />
                <span className="font-mono text-[11px] tracking-[0.2em] text-primary/70">
                  {step.n}
                </span>
                <h3 className="mt-3 font-display text-[17px] font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
