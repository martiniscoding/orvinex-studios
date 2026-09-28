"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import { CallIcon, Mark } from "./Icons";

/**
 * A floating pill nav. Over the hero image it is translucent with white type;
 * once the hero has scrolled past it turns solid. The switch is driven by an
 * IntersectionObserver on a sentinel the hero renders, not a scroll listener —
 * it costs nothing per frame and works with JavaScript-light rendering.
 */
export default function Navbar({ overHero = false }: { overHero?: boolean }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [lifted, setLifted] = useState(!overHero);
  const [section, setSection] = useState("home");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const active = onHome ? section : (nav.find((n) => n.href === pathname)?.id ?? "");

  useEffect(() => {
    if (!overHero) return;
    const sentinel = document.querySelector("[data-hero-end]");
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setLifted(!e.isIntersecting), {
      rootMargin: "0px",
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, [overHero]);

  useEffect(() => {
    if (!onHome) return;
    const ids = nav.filter((n) => n.section).map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const light = !lifted && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto flex w-full items-center justify-between gap-6 rounded-full border py-1.5 pl-4 pr-1.5 backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 ease-[var(--ease-out-soft)] md:w-fit md:gap-8 ${
          light
            ? "border-white/25 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_32px_-14px_rgba(0,0,0,0.35)]"
            : "border-white/60 bg-card/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_30px_-18px_rgba(30,36,48,0.4)]"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Mark size={20} light={light} />
          <span
            className={`phudu text-lg leading-none transition-colors duration-500 ${light ? "text-white" : "text-ink"}`}
          >
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors duration-300 ${
                light
                  ? active === item.id
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white"
                  : active === item.id
                    ? "bg-hush text-ink"
                    : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.booking}
            className="hidden items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-ink shadow-[0_8px_20px_-12px_rgba(30,36,48,0.5)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            <CallIcon />
            Book a call
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-menu"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 md:hidden ${
              light ? "bg-white/15" : "bg-hush"
            }`}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-[2px] w-full rounded transition-all duration-300 ${light ? "bg-white" : "bg-ink"} ${
                    open && i === 0 ? "translate-y-[7px] rotate-45" : ""
                  } ${open && i === 1 ? "opacity-0" : ""} ${
                    open && i === 2 ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        id="nav-menu"
        hidden={!open}
        className="fixed inset-0 -z-10 flex flex-col justify-center gap-2 bg-shell px-8 pt-24 md:hidden"
      >
        {nav.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setOpen(false)}
            className="hero-type py-2 text-[2rem] text-ink"
          >
            {item.label}
          </Link>
        ))}
        <a
          href={site.booking}
          onClick={() => setOpen(false)}
          className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[0.9375rem] font-medium text-white"
        >
          <CallIcon />
          Book a call
        </a>
      </div>
    </header>
  );
}
