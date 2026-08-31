import { Star } from "lucide-react";

import { averageRating, type Testimonial } from "@/lib/testimonial";
import { TestimonialCard } from "./TestimonialCard";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

/**
 * The reviews band on the landing page.
 *
 * Every word of it is written in the admin panel — see /admin/testimonials.
 * The rating in the heading is averaged from the reviews on display rather
 * than fixed in code, so it cannot quietly contradict the cards beneath it.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const average = averageRating(items);
  if (items.length === 0 || average === null) return null;

  const filled = Math.round(average);

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
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-5 w-5 ${
                  index < filled ? "text-primary" : "text-primary/40"
                }`}
                fill="currentColor"
                strokeWidth={0}
              />
            ))}
          </div>
          <h2 className="mt-5 font-display text-[clamp(1.95rem,4.4vw,3.05rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            {average.toFixed(1)}/5 Average Rating
          </h2>
          <p className="mt-4 text-[15.5px] text-muted">
            Based on {items.length} client review
            {items.length === 1 ? "" : "s"}
          </p>
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
