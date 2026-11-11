"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import { ArrowIcon, Mark } from "./Icons";

/**
 * A compact floating glass pill. Over the hero image it is a clear tint with
 * white type; once the hero has scrolled past it frosts over the page. The
 * switch is driven by an IntersectionObserver on a sentinel the hero renders,
 * not a scroll listener, it costs nothing per frame.
 *
 * The desktop links share one highlight that slides to whichever link is
 * hovered, and rests on the active one. The logo already links home, so the
 * Home item only appears in the mobile menu.
 */
export default function Navbar({ overHero = false }: { overHero?: boolean }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [lifted, setLifted] = useState(!overHero);
  const [section, setSection] = useState("home");
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const active = onHome ? section : (nav.find((n) => n.href === pathname)?.id ?? "");
  const desktopNav = nav.filter((n) => n.id !== "home");
  const target = hovered ?? active;

  const measure = useCallback(() => {
    const el = linkRefs.current[target];
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [target]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    if (!navRef.current) return;
    const ro = new ResizeObserver(measure);
    ro.observe(navRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    if (!overHero) return;
    const sentinel = document.querySelector("[data-hero-end]");
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setLifted(!e.isIntersecting));
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative w-full border-b backdrop-blur-2xl backdrop-saturate-[1.8] transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--ease-out-soft)] before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-b before:to-transparent before:to-60% ${
          light
            ? "border-white/15 bg-white/8 before:from-white/12"
            : "border-line bg-panel/80 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-24px_rgba(30,36,48,0.5)] before:from-white/40"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3 lg:px-10">
        <Link href="/" aria-label={`${site.name}, home`} className="relative flex items-center gap-2.5">
          <Mark size={20} light={light} />
          <span
            className={`phudu text-[1.0625rem] leading-none transition-colors duration-500 ${light ? "text-white" : "text-ink"}`}
          >
            {site.name}
          </span>
        </Link>

        <div className="flex items-center gap-2">
        <nav
          ref={navRef}
          aria-label="Primary"
          onMouseLeave={() => setHovered(null)}
          className="relative hidden items-center md:flex"
        >
          <span
            aria-hidden="true"
            className={`absolute inset-y-0 rounded-full transition-[left,width,opacity] duration-300 ease-[var(--ease-out-soft)] ${
              light ? "bg-white/20" : "bg-ink/[0.07]"
            } ${pill ? "opacity-100" : "opacity-0"}`}
            style={pill ?? undefined}
          />
          {desktopNav.map((item) => {
            const on = target === item.id;
            return (
              <Link
                key={item.id}
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                href={item.href}
                onMouseEnter={() => setHovered(item.id)}
                onFocus={() => setHovered(item.id)}
                onBlur={() => setHovered(null)}
                aria-current={active === item.id ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 ${
                  light ? (on ? "text-white" : "text-white/75") : on ? "text-ink" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a
          href={site.booking}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative hidden items-center gap-1.5 rounded-full py-2 pl-4 pr-3 text-sm font-medium transition-colors duration-500 sm:inline-flex ${
            light
              ? "bg-white text-ink"
              : "bg-ink text-white shadow-[0_6px_16px_-8px_rgba(30,36,48,0.7)]"
          }`}
        >
          Book a call
          <span className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 [&_svg]:h-3.5 [&_svg]:w-3.5">
            <ArrowIcon />
          </span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-menu"
          className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 md:hidden ${
            light ? "bg-white/15" : "bg-ink/[0.07]"
          }`}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex w-4 flex-col gap-[4px]">
            {[0, 1].map((i) => (
              <span
                key={i}
                className={`h-[1.5px] w-full rounded transition-all duration-300 ease-[var(--ease-out-soft)] ${light ? "bg-white" : "bg-ink"} ${
                  open && i === 0 ? "translate-y-[2.75px] rotate-45" : ""
                } ${open && i === 1 ? "-translate-y-[2.75px] -rotate-45" : ""}`}
              />
            ))}
          </span>
        </button>
        </div>
        </div>
      </div>

      {/* Mobile: a frosted card that drops from the bar, over a dimmed page. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 -z-10 bg-ink/20 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        id="nav-menu"
        inert={!open}
        className={`absolute right-4 top-full mt-2 w-[calc(100%-2rem)] max-w-sm origin-top rounded-[var(--radius-card)] border border-white/70 bg-panel/80 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_48px_-24px_rgba(30,36,48,0.5)] backdrop-blur-2xl backdrop-saturate-[1.8] transition-[opacity,scale] duration-300 ease-[var(--ease-out-soft)] md:hidden ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {nav.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={active === item.id ? "page" : undefined}
            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[1.0625rem] font-medium transition-colors ${
              active === item.id ? "bg-ink/[0.06] text-ink" : "text-ink-2 hover:bg-ink/[0.04]"
            }`}
          >
            {item.label}
            <span className="text-faint [&_svg]:h-4 [&_svg]:w-4">
              <ArrowIcon />
            </span>
          </Link>
        ))}
        <a
          href={site.booking}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3.5 text-[0.9375rem] font-medium text-white"
        >
          Book a call
          <span className="[&_svg]:h-4 [&_svg]:w-4">
            <ArrowIcon />
          </span>
        </a>
      </div>
    </header>
  );
}
