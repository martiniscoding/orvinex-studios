import Link from "next/link";
import { nav, site } from "@/content/site";
import { Mark } from "@/components/Icons";

const links = [
  ...nav.filter((n) => n.id !== "home").map((n) => ({ label: n.label, href: n.href })),
  { label: "Book a call", href: site.booking },
  { label: "Email", href: `mailto:${site.email}` },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/termsandconditions" },
];

/**
 * A minimal closing strip under a hairline: the wordmark and one row of plain
 * text links, then the copyright and legal links in a fainter line below.
 */
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line pt-8 pb-10 sm:mt-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Mark size={30} />
          <span className="font-serif text-[1.375rem] leading-none tracking-[-0.02em] text-ink">
            {site.wordmark}
          </span>
        </Link>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  {...(link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-faint">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legal.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-ink">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
