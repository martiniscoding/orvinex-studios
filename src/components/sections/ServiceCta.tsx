import Link from "next/link";
import { site } from "@/content/site";
import { ArrowIcon, CallIcon, ClockIcon } from "@/components/Icons";

/** The closing ask on every service page, after the FAQ. */
export default function ServiceCta({ service }: { service: string }) {
  return (
    <section className="relative isolate mt-20 overflow-hidden rounded-[var(--radius-panel)] bg-ink px-6 py-12 text-white sm:px-12 sm:py-16">
      {/* A soft accent bloom in the corner, as on the contact panel. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full bg-accent/35 blur-[120px]"
      />

      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[40rem]">
          <p className="text-sm font-medium tracking-[0.04em] text-white/60">Next step</p>
          <h2 className="display-serif mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
            Let&rsquo;s talk about your project.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.65] text-white/70">
            A 20-minute call is enough to tell you whether {service} is the right fit, roughly
            what it would cost and how long it would take. No pitch deck, no obligation.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href={site.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[0.9375rem] font-medium text-ink transition-all duration-300 hover:-translate-y-0.5"
          >
            <CallIcon size={16} />
            Book a 20-minute call
          </a>
          <Link
            href="/#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:border-white/60"
          >
            Send a brief instead
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 [&_svg]:h-4 [&_svg]:w-4">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>

      <p className="mt-10 flex items-center gap-2 border-t border-white/10 pt-6 text-sm text-white/55">
        <ClockIcon />
        Replies within one working day
      </p>
    </section>
  );
}
