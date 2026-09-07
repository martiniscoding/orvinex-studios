"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { nav, site } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Staggered link entry: fires once per open, never on scroll.
  useEffect(() => {
    if (!open || reducedMotion()) return;
    const links = menuRef.current?.querySelectorAll("[data-menu-link]");
    if (!links?.length) return;
    const tween = gsap.fromTo(
      links,
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: "expo.out" },
    );
    return () => {
      tween.kill();
      gsap.set(links, { clearProps: "all" });
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      data-nav
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300"
      style={{ height: "var(--nav-h)" }}
    >
      <div className="plumb-pad flex h-full items-center justify-between">
        <a href="#top" className="display text-md leading-none tracking-[-0.02em]">
          {site.name}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.booking}
            className="bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-brass hover:text-ink"
          >
            Book a call
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
            <span
              className={`h-px w-full bg-ink transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span className={`h-px w-full bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-full bg-ink transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 bg-paper md:hidden"
      >
        <nav aria-label="Mobile" className="plumb-pad flex h-full flex-col justify-center gap-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              data-menu-link
              className="display text-2xl"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.booking}
            onClick={() => setOpen(false)}
            data-menu-link
            className="mt-4 inline-flex w-fit bg-ink px-6 py-3 text-sm font-medium text-paper"
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}
