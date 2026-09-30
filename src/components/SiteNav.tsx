"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import { Mark } from "@/components/Icons";

/**
 * A minimal top bar: wordmark left, a row of plain text links right, with the
 * ask as the last and darkest of them. It sticks, and only picks up a frosted
 * fill and hairline once the page has scrolled, so at rest it sits flat on
 * the page.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The logo already goes home.
  const links = nav.filter((n) => n.id !== "home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open
          ? "bg-panel/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-lg"
          : "bg-panel"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Mark size={34} />
          <span className="font-sans text-[1.25rem] leading-none font-bold tracking-[-0.04em] text-ink">
            {site.wordmark}
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-7 md:flex">
          {links.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`text-sm transition-colors hover:text-ink ${
                pathname === item.href ? "text-ink" : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-ink underline-offset-4 hover:underline sm:inline md:ml-1"
          >
            Book a call
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
              <span className={`h-[1.5px] w-full rounded bg-ink transition-transform duration-300 ${open ? "translate-y-[3.25px] rotate-45" : ""}`} />
              <span className={`h-[1.5px] w-full rounded bg-ink transition-transform duration-300 ${open ? "-translate-y-[3.25px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        inert={!open}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[var(--ease-out-soft)] md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav aria-label="Mobile" className="flex flex-col px-6 pt-1 pb-5">
            {nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-[1.0625rem] text-ink-2"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="py-2.5 text-[1.0625rem] font-medium text-ink"
            >
              Book a call
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
