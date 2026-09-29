"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { pricing, site } from "@/content/site";
import { gsap, reducedMotion } from "@/lib/gsap";
import { CallIcon, ClockIcon, MessageIcon } from "@/components/Icons";
import { Tick } from "@/components/ui/Bits";
import { Mark } from "@/components/Icons";

function Watermark() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -right-6 -bottom-8 scale-[6] opacity-[0.12]"
    >
      <Mark size={40} />
    </span>
  );
}

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={`relative h-8 w-14 shrink-0 rounded-full transition-colors duration-300 ${on ? "bg-accent" : "bg-line"}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all duration-300 ease-[var(--ease-out-soft)] ${on ? "left-7" : "left-1"}`}
      />
    </button>
  );
}

export default function Pricing() {
  const [active, setActive] = useState(0);
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const [tasks, setTasks] = useState(1);
  const tab = pricing.tabs[active];
  const panelRef = useRef<HTMLDivElement>(null);
  const lastHeight = useRef(0);

  const total =
    tab.price +
    tab.addons.reduce((sum, a) => (addons[`${tab.id}-${a.id}`] ? sum + a.price : sum), 0);

  /* Tabs differ in length; tween between the measured heights so the page
     below does not jump. */
  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const next = el.offsetHeight;
    const previous = lastHeight.current;
    lastHeight.current = next;
    if (!previous || previous === next || reducedMotion()) return;
    gsap.fromTo(
      el,
      { height: previous, overflow: "hidden" },
      {
        height: next,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => gsap.set(el, { clearProps: "height,overflow" }),
      },
    );
  }, [active]);

  return (
    <section id="pricing">
      <div className="flex justify-center">
        <div role="tablist" aria-label="Project type" className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-hush/70 p-1 [scrollbar-width:none] sm:p-1.5">
          {pricing.tabs.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActive((active + 1) % pricing.tabs.length);
                if (e.key === "ArrowLeft") setActive((active - 1 + pricing.tabs.length) % pricing.tabs.length);
              }}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm transition-all duration-300 sm:px-6 sm:py-3 sm:text-[0.9375rem] ${
                i === active
                  ? "bg-card font-medium text-ink shadow-[0_8px_20px_-12px_rgba(30,36,48,0.45)]"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={panelRef}
        role="tabpanel"
        id={`panel-${tab.id}`}
        aria-labelledby={`tab-${tab.id}`}
        className="relative isolate mt-10 overflow-hidden rounded-[var(--radius-panel)] bg-card p-6 shadow-[0_28px_60px_-45px_rgba(30,36,48,0.6)] lg:p-10"
      >
        <span aria-hidden="true" className="tex tex-paper" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="display-serif text-[2rem] leading-none">{tab.name}</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[0.8125rem] text-muted">
                <ClockIcon />
                {tab.timeline}
              </span>
            </div>

            <div className="mt-7 space-y-2.5">
              {tab.addons.map((addon) => {
                const key = `${tab.id}-${addon.id}`;
                const on = !!addons[key];
                return (
                  <div
                    key={key}
                    className={`flex items-center justify-between gap-4 rounded-[18px] px-5 py-4 transition-colors duration-300 ${on ? "bg-accent/10" : "bg-hush/70"}`}
                  >
                    <div>
                      <p className="text-[0.9375rem] font-medium">{addon.label}</p>
                      <p className="mt-0.5 text-sm text-muted">
                        <span className="font-semibold text-ink-2">+{fmt(addon.price)}</span>
                        {addon.unit ?? ""}
                        {addon.note ? ` · ${addon.note}` : ""}
                      </p>
                    </div>
                    <Toggle
                      on={on}
                      label={addon.label}
                      onChange={() => setAddons((s) => ({ ...s, [key]: !s[key] }))}
                    />
                  </div>
                );
              })}
            </div>

            <ul className="mt-7 space-y-3">
              {tab.features.map((f) => (
                <Tick key={f}>{f}</Tick>
              ))}
            </ul>
          </div>

          <div>
            <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-ink p-7">
              <span aria-hidden="true" className="tex tex-ink" />
              <Watermark />
              <p className="phudu relative text-white/60">{site.name}</p>
              <div className="relative mt-16">
                <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white/75">
                  {tab.label}
                </p>
                <p className="display-serif mt-2 text-[clamp(2.5rem,5.5vw,3.5rem)] leading-none text-white lining-nums tabular-nums">
                  {fmt(total)}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-ink-2"
              >
                <MessageIcon />
                Send a message
              </a>
              <a
                href={site.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-card px-6 py-3.5 text-[0.9375rem] font-medium text-ink shadow-[0_10px_24px_-14px_rgba(30,36,48,0.45)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <CallIcon />
                Book a call
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12 h-px bg-line lg:my-16" />

      <div className="relative isolate overflow-hidden rounded-[var(--radius-panel)] bg-card p-6 shadow-[0_28px_60px_-45px_rgba(30,36,48,0.5)] lg:p-10">
        <span aria-hidden="true" className="tex tex-paper" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="display-serif text-[2rem] leading-none">{pricing.retainer.name}</h2>
            <div className="mt-7 flex items-center gap-4 rounded-[18px] bg-hush/70 px-5 py-4">
              <div className="flex items-center gap-1 rounded-full bg-hush p-1">
                <button
                  type="button"
                  onClick={() => setTasks((t) => Math.max(1, t - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-lg leading-none text-ink"
                >
                  <span className="sr-only">Fewer active tasks</span>
                  <span aria-hidden="true">−</span>
                </button>
                <span aria-live="polite" className="w-7 text-center text-[0.9375rem] font-semibold tabular-nums">
                  {tasks}
                </span>
                <button
                  type="button"
                  onClick={() => setTasks((t) => Math.min(4, t + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-lg leading-none text-ink"
                >
                  <span className="sr-only">More active tasks</span>
                  <span aria-hidden="true">+</span>
                </button>
              </div>
              <p className="text-[0.9375rem] font-medium">{pricing.retainer.taskLabel}</p>
            </div>
            <ul className="mt-7 space-y-3">
              {pricing.retainer.features.map((f) => (
                <Tick key={f}>{f}</Tick>
              ))}
              <Tick>Everything below, in whatever mix you need</Tick>
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2">
              {pricing.retainer.includes.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-hush px-4 py-2 text-[0.8125rem] text-ink-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-accent-deep p-7">
              <span aria-hidden="true" className="tex tex-moss" />
              <Watermark />
              <p className="phudu relative text-white/60">{site.name}</p>
              <div className="relative mt-16">
                <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white/75">
                  Retainer · {pricing.retainer.unit}
                </p>
                <p className="display-serif mt-2 text-[clamp(2.5rem,5.5vw,3.5rem)] leading-none text-white lining-nums tabular-nums">
                  {fmt(pricing.retainer.price + (tasks - 1) * pricing.retainer.perTask)}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={site.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-ink-2"
              >
                <CallIcon />
                Talk about a retainer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
