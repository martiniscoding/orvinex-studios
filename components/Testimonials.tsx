import type { Testimonial } from "@/lib/testimonial";
import { TestimonialCard } from "./TestimonialCard";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

/**
 * The reviews band on the landing page.
 *
 * Every word of it is written in the admin panel — see /admin/testimonials.
 * The cards carry no star ratings and the section claims no average: a score
 * a company awards itself reads as decoration, and the quotes are the part
 * worth reading.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;

  // The grid is sized to the number of reviews rather than fixed at three
  // columns: two cards in a three-column track sit off to one side with a
  // hole beside them, which reads as something failed to load.
  const grid =
    items.length === 1
      ? "max-w-md"
      : items.length === 2
        ? "max-w-3xl md:grid-cols-2"
        : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="reviews"
      className="relative overflow-hidden border-t border-white/[0.06] bg-background py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-40 -z-10 h-[420px] w-[560px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(139,92,246,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
            Client Reviews
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.95rem,4.4vw,3.05rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            The people we built for.
          </h2>
        </Reveal>

        <RevealGroup
          className={`mx-auto mt-14 grid grid-cols-1 gap-5 ${grid}`}
        >
          {items.map((item) => (
            <RevealItem key={item.id} className="h-full">
              <TestimonialCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
