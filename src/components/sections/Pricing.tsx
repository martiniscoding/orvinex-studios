"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { pricing, site } from "@/content/site";

const money = (v: string) => Number(v.replace(/[^0-9]/g, ""));
const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function Pricing() {
  const [active, setActive] = useState(0);
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const tab = pricing.tabs[active];
  const panelRef = useRef<HTMLDivElement>(null);
  const lastHeight = useRef(0);

  /* Tabs are different lengths; tween the panel between the two measured
     heights so the page below does not jump. */
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
    gsap.fromTo(
      el.children,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" },
    );
  }, [active]);

  const total =
    money(tab.oneOff.price) +
    tab.addons.reduce((sum, a) => (addons[`${tab.id}-${a.label}`] ? sum + money(a.price) : sum), 0);

  return (
    <section id="pricing" className="plumb-pad border-t border-ink/10 py-20 md:py-28">
      <p className="label text-slate">07 — Pricing</p>
      <h2 className="display mt-8 max-w-[16ch] text-[clamp(2.25rem,6vw,4.4375rem)]">
        Fixed price, written down before we start.
      </h2>

      <div role="tablist" aria-label="Project type" className="mt-12 grid grid-cols-3 gap-px bg-ink/10 sm:flex sm:w-fit">
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
            className={`px-3 py-3 text-[13px] font-medium transition-colors duration-200 sm:px-5 sm:text-sm ${
              i === active ? "bg-ink text-paper" : "bg-paper text-slate hover:bg-chalk hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        ref={panelRef}
        data-pricing-panel
        role="tabpanel"
        id={`panel-${tab.id}`}
        aria-labelledby={`tab-${tab.id}`}
        className="mt-px grid gap-px bg-ink/10 md:grid-cols-2"
      >
        <div className="bg-chalk p-7 md:p-9">
          <p className="label text-slate">One-time project</p>
          <h3 className="display mt-4 text-lg">{tab.oneOff.name}</h3>
          <p className="display mt-6 text-2xl tabular-nums">{fmt(total)}</p>
          <p className="mt-2 text-sm text-slate">{tab.oneOff.timeline}, start to handoff</p>

          <ul className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-sm">
            {tab.oneOff.features.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-brass" />
                {f}
              </li>
            ))}
          </ul>

          <fieldset className="mt-8 border-t border-ink/10 pt-6">
            <legend className="label text-slate">Add-ons</legend>
            <div className="mt-4 space-y-3">
              {tab.addons.map((a) => {
                const key = `${tab.id}-${a.label}`;
                return (
                  <label key={key} className="flex cursor-pointer items-center justify-between gap-4 text-sm">
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!addons[key]}
                        onChange={(e) => setAddons((s) => ({ ...s, [key]: e.target.checked }))}
                        className="h-4 w-4 shrink-0 appearance-none border border-ink/40 bg-paper checked:border-brass checked:bg-brass"
                      />
                      {a.label}
                    </span>
                    <span className="tabular-nums text-slate">{a.price}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <a
            href={site.booking}
            className="mt-8 inline-flex bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-brass hover:text-ink"
          >
            Book a call
          </a>
        </div>

        <div className="bg-ink p-7 text-paper md:p-9">
          <p className="label text-paper/65">Ongoing</p>
          <h3 className="display mt-4 text-lg">{pricing.retainer.name}</h3>
          <p className="display mt-6 text-2xl tabular-nums">
            {pricing.retainer.price}
            <span className="ml-2 align-middle font-sans text-sm font-normal tracking-normal text-paper/65">
              {pricing.retainer.unit}
            </span>
          </p>
          <p className="mt-2 text-sm text-paper/70">{pricing.retainer.timeline}</p>

          <ul className="mt-8 space-y-3 border-t border-paper/15 pt-6 text-sm text-paper/85">
            {pricing.retainer.features.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-brass" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href={site.booking}
            className="mt-8 inline-flex border border-paper/30 px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            Talk about a retainer
          </a>
        </div>
      </div>
    </section>
  );
}
