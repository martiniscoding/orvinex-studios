import Image from "next/image";
import { testimonials, testimonialsIntro } from "@/content/site";
import { workBySlug } from "@/content/works";

type Review = (typeof testimonials)[number];

/** Client reviews, each labelled with what was built for that client. */
export default function Testimonials() {
  return (
    <section id="testimonials">
      <h2 className="display-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] text-balance">
        {testimonialsIntro.title}
      </h2>

      <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-3 lg:gap-6">
        {testimonials.map((r) => (
          <li key={r.name}>
            <Card review={r} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Card({ review }: { review: Review }) {
  const work = workBySlug(review.work);
  const [pre, post] = review.quote.split(review.highlight);

  return (
    <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-line/70 bg-card p-6 shadow-[0_24px_50px_-36px_rgba(30,36,48,0.55)] transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-34px_rgba(30,36,48,0.6)]">
      <div className="flex flex-1 flex-col">
        <p className="text-[0.8125rem] font-medium text-faint">Built: {work.what}</p>
        <blockquote className="mt-3 flex-1 text-[1rem] leading-[1.55] text-ink-2 sm:text-[1.0625rem]">
          “{pre}
          <span className="marker font-medium text-ink">{review.highlight}</span>
          {post}”
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
          <Image
            src={review.logo}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span>
            <span className="block text-sm font-semibold">{review.name}</span>
            <span className="block text-[0.8125rem] text-muted">{review.role}</span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
