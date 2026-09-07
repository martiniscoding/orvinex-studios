"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import {
  ArrowIcon,
  CallIcon,
  CareerIcon,
  HomeIcon,
  Mark,
  MessageIcon,
  PriceIcon,
  SparkIcon,
  WorkIcon,
} from "./Icons";

const icons: Record<string, () => React.ReactElement> = {
  home: HomeIcon,
  work: WorkIcon,
  approach: SparkIcon,
  pricing: PriceIcon,
  careers: CareerIcon,
};

function Rail({ onNavigate }: { onNavigate?: () => void }) {
  const [active, setActive] = useState("home");

  /* The rail marks the section you are actually looking at. */
  useEffect(() => {
    const ids = nav.filter((n) => !n.soon).map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <nav aria-label="Sections" className="mt-2 space-y-0.5">
        {nav.map((item) => {
          const Icon = icons[item.id] ?? HomeIcon;
          const isActive = active === item.id && !item.soon;
          const Tag = item.soon ? "span" : "a";
          return (
            <Tag
              key={item.id}
              href={item.soon ? undefined : `#${item.id}`}
              onClick={item.soon ? undefined : onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={`group flex items-center gap-3 rounded-full px-4 py-3 text-[0.9375rem] transition-all duration-300 ${
                isActive
                  ? "bg-card text-ink shadow-[0_6px_18px_-8px_rgba(20,51,77,0.28)]"
                  : item.soon
                    ? "cursor-default text-muted"
                    : "text-ink-2 hover:bg-hush"
              }`}
            >
              <span className={isActive ? "text-ink" : "text-faint"}>
                <Icon />
              </span>
              <span className={isActive ? "font-medium" : ""}>{item.label}</span>
              {item.soon && (
                <span className="ml-auto rounded-full bg-hush px-2.5 py-1 text-[0.6875rem] text-muted">
                  Coming soon
                </span>
              )}
              {isActive && (
                <span className="ml-auto text-faint transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              )}
            </Tag>
          );
        })}
      </nav>

      <p className="eyebrow mt-9 px-4">Start project</p>
      <div className="mt-3 space-y-0.5">
        <a
          href={site.booking}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-full px-4 py-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-hush"
        >
          <CallIcon />
          Book a call
        </a>
        <a
          href={`mailto:${site.email}`}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-full px-4 py-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-hush"
        >
          <MessageIcon />
          Send a message
        </a>
      </div>

      {/* Where kree8 lists client logos, we have none to list honestly —
          so this is the one number we can actually stand behind. */}
      <div className="mt-auto px-4 pt-10">
        <p className="eyebrow">
          Shipped <span className="text-ink-2">11 products</span> since 2023
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            ["4", "raised a round after"],
            ["1", "designer, start to end"],
            ["0", "account managers"],
            ["48h", "to first screens"],
          ].map(([n, label]) => (
            <div key={label} className="rounded-2xl bg-card/70 px-3 py-2.5">
              <p className="phudu text-lg leading-none text-ink">{n}</p>
              <p className="mt-1 text-[0.6875rem] leading-tight text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      {/* Desktop rail */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-[var(--rail)] flex-col px-5 py-6 lg:flex"
        aria-label="Site"
      >
        <a href="#home" className="flex items-center gap-2.5 px-4">
          <Mark />
          <span className="phudu text-[1.375rem] leading-none tracking-[0.01em]">
            {site.name}
          </span>
        </a>
        <div className="mx-4 mt-6 border-t border-line" />
        <div className="min-h-0 flex-1">
          <Rail />
        </div>
      </aside>

      {/* Mobile bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-shell/85 px-5 py-4 backdrop-blur-md lg:hidden">
        <a href="#home" className="flex items-center gap-2.5">
          <Mark size={24} />
          <span className="phudu text-xl leading-none">{site.name}</span>
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="rail-menu"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-[0_4px_14px_-6px_rgba(20,51,77,0.3)]"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
            <span
              className={`h-[2px] w-full rounded bg-ink transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`h-[2px] w-full rounded bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-[2px] w-full rounded bg-ink transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </header>

      <div
        id="rail-menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-shell px-5 pt-24 pb-10 lg:hidden"
      >
        <Rail onNavigate={() => setOpen(false)} />
      </div>
    </>
  );
}
