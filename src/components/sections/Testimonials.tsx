import Image from "next/image";
import { testimonials, testimonialsIntro } from "@/content/site";
import { workBySlug } from "@/content/works";

type Review = (typeof testimonials)[number];

/** Client reviews, each labelled with what was built for that client. */
export default function Testimonials() {
  return (
    <section id="testimonials">
      <Heading />

      <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-3 lg:gap-6">
        {testimonials.map((r, i) => (
          <li key={r.name}>
            <Card review={r} tilt={tilts[i % tilts.length]} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * "What our customers say", with the middle word hand-lettered in the accent
 * over a soft brush underline, and a scribbled aside under the last word.
 */
function Heading() {
  const { before, accent, after } = testimonialsIntro.heading;
  return (
    <div className="relative mx-auto w-fit max-w-full">
      <h2 className="display-serif text-center text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] text-balance">
        {before}{" "}
        <span className="relative mx-[0.08em] inline-block whitespace-nowrap">
          <span className="relative z-10 inline-block -rotate-2 font-[family-name:var(--font-hand)] text-[1.18em] font-bold leading-none text-accent">
            {accent}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 300 20"
            preserveAspectRatio="none"
            className="absolute -bottom-[0.06em] left-[-2%] h-[0.2em] w-[104%] text-accent/30"
          >
            <path
              d="M4 16C60 6 150 2 296 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </svg>
        </span>{" "}
        {after}
      </h2>
      <p className="mt-1 flex items-center justify-end gap-2 font-[family-name:var(--font-hand)] text-[clamp(1.125rem,2vw,1.5rem)] text-muted sm:mr-[-0.5rem]">
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="-mt-2 rotate-6"
        >
          <path d="M19 3 4 18M4 10v8h8" />
        </svg>
        <span className="rotate-3">{testimonialsIntro.note}</span>
      </p>
    </div>
  );
}

/* A slight, alternating lean, like cards pinned to a board. Each straightens
   on hover. */
const tilts = ["-rotate-[1.5deg]", "rotate-[1deg]", "-rotate-[0.75deg]"];

function Card({ review, tilt }: { review: Review; tilt: string }) {
  const work = workBySlug(review.work);
  const [pre, post] = review.quote.split(review.highlight);

  return (
    <figure className={`flex h-full flex-col rounded-[var(--radius-card)] border border-line/70 bg-card p-6 shadow-[0_24px_50px_-36px_rgba(30,36,48,0.55)] transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_30px_60px_-34px_rgba(30,36,48,0.6)] ${tilt}`}>
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
