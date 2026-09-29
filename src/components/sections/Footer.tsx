import Link from "next/link";
import { nav, serviceGroups, site } from "@/content/site";
import { ArrowIcon, Mark } from "@/components/Icons";

const columns = [
  {
    title: "Studio",
    links: nav.filter((n) => n.id !== "home").map((n) => ({ label: n.label, href: n.href })),
  },
  {
    title: "Services",
    links: serviceGroups.map((g) => ({ label: g.label, href: `/services#${g.id}` })),
  },
  {
    title: "Contact",
    links: [
      { label: "Book a call", href: site.booking },
      { label: "Email", href: `mailto:${site.email}` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/termsandconditions" },
    ],
  },
];

/**
 * A dark closing panel: one last ask, the site map in columns, and the name
 * set huge and fading into the bottom edge. `@container` sizes the wordmark
 * to the panel, not the viewport, so it always spans edge to edge.
 */
export default function Footer() {
  return (
    <footer className="@container relative mt-16 overflow-hidden rounded-[var(--radius-panel)] bg-ink text-white sm:mt-24">
      {/* Accent glow and a faint grid, both fading out towards the bottom. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-accent/50 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />

      <div className="relative px-5 pt-12 sm:px-10 sm:pt-16 lg:px-14">
        {/* The ask */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-red-500" />
              </span>
              Taking on two projects this quarter
            </p>
            <h2 className="hero-type mt-5 text-[clamp(2rem,4.6vw,3.25rem)]">
              We build the technology
              <br />
              <span className="text-white/45">so you can build the business.</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[0.9375rem] font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a call
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex max-w-full items-center truncate rounded-full border border-white/15 bg-white/5 px-5 py-3 text-[0.9375rem] font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/10"
            >
              {site.email}
            </a>
          </div>
        </div>

        {/* Brand and site map */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 max-w-xs lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Mark size={22} light />
              <span className="phudu text-lg leading-none">{site.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/55">{site.tagline}.</p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...(link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                      className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                      <span className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 [&_svg]:h-3.5 [&_svg]:w-3.5">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal line */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/45">
          <p>
            © {new Date().getFullYear()} {site.name}. Designed and engineered in-house.
          </p>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              All systems go
            </span>
            <a href="#" className="transition-colors hover:text-white">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>

      {/* The wordmark, cropped by the panel's bottom edge. */}
      <p
        aria-hidden="true"
        className="phudu pointer-events-none relative -mb-[4.5cqw] select-none whitespace-nowrap bg-linear-to-b from-white/20 to-white/0 bg-clip-text text-center text-[21cqw] leading-[0.8] text-transparent"
      >
        {site.name}
      </p>
    </footer>
  );
}
