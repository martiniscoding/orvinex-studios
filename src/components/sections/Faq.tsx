import Link from "next/link";
import { faq } from "@/content/site";
import { ArrowIcon, Mark } from "@/components/Icons";

/**
 * Common questions. Heading and the two asks on the left; the questions on
 * the right as native <details>, sharing a `name` so opening one closes the
 * last. No JavaScript.
 */
export default function Faq() {
  return (
    <section id="faq" className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
      <div>
        <span className="flex h-16 w-16 items-center justify-center rounded-[18px] border border-line bg-white shadow-[0_18px_30px_-18px_rgba(30,36,48,0.35)]">
          <Mark size={36} />
        </span>
        <h2 className="display-serif mt-7 text-[clamp(2.25rem,3.6vw,3rem)] leading-[1.06]">
          {faq.title[0]}
          <br />
          {faq.title[1]}
        </h2>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href={faq.primary.href}
            className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-6 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-ink-2"
          >
            {faq.primary.label}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:-rotate-45 [&_svg]:h-4 [&_svg]:w-4">
              <ArrowIcon />
            </span>
          </Link>
          <Link
            href={faq.secondary.href}
            className="inline-flex items-center rounded-full bg-hush px-6 py-3.5 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:bg-line"
          >
            {faq.secondary.label}
          </Link>
        </div>
      </div>

      <div className="border-t border-line lg:border-t-0">
        {faq.items.map((f) => (
          <details key={f.q} name="faq" className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1.125rem] font-medium tracking-[-0.01em] outline-none [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-[rotate,background-color] duration-300 group-open:rotate-45 group-open:bg-accent group-has-[summary:focus-visible]:ring-2 group-has-[summary:focus-visible]:ring-accent group-has-[summary:focus-visible]:ring-offset-2"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M7 1.5v11M1.5 7h11" />
                </svg>
              </span>
            </summary>
            <div className="max-w-[58ch] pb-7 text-[1.0625rem] leading-[1.7] text-muted">
              <p>{f.a}</p>
              {f.link && (
                <Link
                  href={f.link.href}
                  className="mt-3 inline-flex items-center gap-1.5 font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {f.link.label}
                </Link>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
