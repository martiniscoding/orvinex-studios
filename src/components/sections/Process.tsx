"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { workflow } from "@/content/site";
import { CheckIcon, SparkIcon } from "@/components/Icons";

type StepId = (typeof workflow.steps)[number]["id"];

/**
 * How a project runs, as tabs, framed by who runs it: the agency pitch and
 * numbers above. Each step gets a small drawn interface instead of a stock image — built from divs, so it
 * stays sharp and on-palette.
 */
export default function Process() {
  const [index, setIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const step = workflow.steps[index];

  const onKey = (e: KeyboardEvent) => {
    const last = workflow.steps.length - 1;
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setIndex(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section id="process">
      <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
        <h2 className="display-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.04]">
          {workflow.title[0]}
          <br />
          <span className="text-faint">{workflow.title[1]}</span>
        </h2>
        <div className="max-w-[52ch] lg:justify-self-end lg:border-l lg:border-line lg:pl-10">
          <p className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">{workflow.lead}</p>
          <p className="mt-3 text-[1rem] leading-[1.65] text-muted">{workflow.intro}</p>
        </div>
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line lg:grid-cols-4">
        {workflow.stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 bg-card px-5 py-5 sm:px-6 sm:py-6">
            <dt className="order-2 text-[0.875rem] font-medium text-muted">{s.label}</dt>
            <dd className="order-1 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-none font-bold tracking-[-0.04em] text-ink">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <div
        role="tablist"
        aria-label="Project steps"
        onKeyDown={onKey}
        className="mt-10 flex gap-1 overflow-x-auto rounded-2xl bg-hush p-1.5 [scrollbar-width:none]"
      >
        {workflow.steps.map((s, i) => {
          const on = i === index;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              id={`${id}-tab-${s.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setIndex(i)}
              className={`relative flex-1 whitespace-nowrap rounded-xl px-4 py-3 text-[0.9375rem] font-medium transition-colors duration-300 ${
                on ? "text-accent" : "text-ink-2 hover:text-ink"
              }`}
            >
              {on && (
                <motion.span
                  layoutId={`${id}-tab`}
                  className="absolute inset-0 rounded-xl bg-card shadow-[0_6px_16px_-10px_rgba(30,36,48,0.35)]"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <span className="relative">{s.tab}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-[var(--radius-panel)] bg-hush p-2">
        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${step.id}`}
          className="relative overflow-hidden rounded-[calc(var(--radius-panel)-6px)] bg-card"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 items-center gap-8 p-5 sm:gap-10 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14"
            >
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium">
                  <span className="text-accent [&_svg]:h-4 [&_svg]:w-4">
                    <SparkIcon />
                  </span>
                  Step {index + 1}
                </span>
                <h3 className="mt-6 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-muted">
                  {step.body}
                </p>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  {step.outputs.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-[0.9375rem] font-medium">
                      <span className="text-accent [&_svg]:h-4 [&_svg]:w-4">
                        <CheckIcon />
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                aria-hidden="true"
                className="art-frame relative aspect-[4/3] overflow-hidden rounded-3xl bg-panel [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:18px_18px]"
              >
                {/* Drawn on a fixed 440×330 canvas and scaled to the frame, so
                    the mock UI keeps its proportions at any width. */}
                <div className="art-canvas">{art[step.id]}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Illustrations. Placeholder "text" is bars; the accent marks what the
   step produces.
------------------------------------------------------------------- */

const Card = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <div
    className={`absolute rounded-2xl border border-line/70 bg-card shadow-[0_18px_40px_-24px_rgba(30,36,48,0.35)] ${className}`}
  >
    {children}
  </div>
);

const Bar = ({ w, className = "" }: { w: string; className?: string }) => (
  <span className={`block h-1.5 rounded-full bg-line ${className}`} style={{ width: w }} />
);

const Tick = () => (
  <span className="text-accent [&_svg]:h-3 [&_svg]:w-3">
    <CheckIcon />
  </span>
);

const art: Record<StepId, ReactNode> = {
  discovery: (
    <>
      <Card className="left-[8%] top-[14%] w-[46%] p-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-px flex-1 bg-accent" />
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex flex-1 items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-line" />
              <span className="h-px flex-1 bg-line" />
            </span>
          ))}
        </div>
        <Bar w="80%" className="mt-4" />
        <Bar w="55%" className="mt-2" />
        {[true, false, false].map((on, i) => (
          <div
            key={i}
            className={`mt-2.5 flex items-center gap-2 rounded-lg border px-2 py-1.5 ${on ? "border-accent/30 bg-accent/5" : "border-line"}`}
          >
            <span className={`h-2.5 w-2.5 rounded-full border-2 ${on ? "border-accent bg-accent/30" : "border-line"}`} />
            <Bar w={on ? "60%" : "45%"} />
          </div>
        ))}
        <span className="mt-4 ml-auto flex h-5 w-10 items-center justify-center rounded-md bg-accent text-[10px] text-white">
          →
        </span>
      </Card>
      <Card className="right-[8%] top-[10%] w-[40%] p-3">
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {["●", "▲", "◆", "■"].map((g, i) => (
            <span key={g} className={`rounded-md py-1 text-[10px] ${i === 0 ? "bg-accent/10 text-accent" : "bg-hush text-faint"}`}>
              {g}
            </span>
          ))}
          {Array.from({ length: 16 }, (_, i) =>
            i % 4 === 0 || i % 3 === 0 ? (
              <span key={i} className="flex justify-center py-0.5"><Tick /></span>
            ) : (
              <span key={i} className="py-0.5 text-[10px] text-faint">–</span>
            ),
          )}
        </div>
      </Card>
      <Card className="bottom-[12%] right-[12%] flex w-[36%] items-center gap-3 p-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mark text-xs">💡</span>
        <span className="flex-1">
          <span className="block h-1.5 w-4/5 rounded-full bg-ink" />
          <Bar w="60%" className="mt-1.5" />
        </span>
      </Card>
    </>
  ),

  strategy: (
    <div className="relative flex w-[78%] flex-col items-center">
      <span className="rounded-xl bg-ink px-4 py-2 text-xs font-medium text-white shadow-lg">Home</span>
      <span className="h-6 w-px bg-line" />
      <span className="h-px w-[76%] bg-line" />
      <div className="grid w-full grid-cols-3 gap-3">
        {["Work", "Approach", "Pricing"].map((p, i) => (
          <div key={p} className="flex flex-col items-center">
            <span className="h-5 w-px bg-line" />
            <span
              className={`w-full rounded-xl border px-2 py-2 text-center text-[11px] font-medium shadow-sm ${i === 2 ? "border-accent/40 bg-accent/5 text-accent" : "border-line bg-card text-ink-2"}`}
            >
              {p}
            </span>
            <div className="mt-2 w-full space-y-1.5 rounded-xl border border-dashed border-line p-2">
              <Bar w="80%" />
              <Bar w="55%" />
            </div>
          </div>
        ))}
      </div>
      <Card className="-bottom-4 left-[-4%] w-[48%] -rotate-3 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-faint">One-liner</p>
        <span className="mt-2 block h-1.5 w-full rounded-full bg-ink" />
        <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-ink/60" />
      </Card>
    </div>
  ),

  wireframes: (
    <Card className="inset-[10%] overflow-hidden p-0">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-line" />)}
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <Bar w="18%" />
          <div className="flex gap-2"><Bar w="24px" /><Bar w="24px" /><Bar w="24px" /></div>
        </div>
        <div className="grid grid-cols-[1.2fr_1fr] gap-3 pt-2">
          <div className="space-y-2">
            <span className="block h-3 w-11/12 rounded bg-ink/80" />
            <span className="block h-3 w-3/4 rounded bg-ink/80" />
            <Bar w="85%" className="mt-3" />
            <Bar w="70%" />
            <span className="mt-3 block h-5 w-16 rounded-md border-2 border-dashed border-accent/60" />
          </div>
          <div className="relative rounded-lg bg-hush">
            <span className="absolute inset-0 m-auto h-px w-full rotate-[33deg] bg-line" />
            <span className="absolute inset-0 m-auto h-px w-full -rotate-[33deg] bg-line" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[0, 1, 2].map((i) => <span key={i} className="h-10 rounded-lg border border-dashed border-line" />)}
        </div>
      </div>
    </Card>
  ),

  design: (
    <>
      <Card className="left-[8%] top-[12%] w-[44%] p-4">
        <p className="text-5xl font-bold leading-none tracking-[-0.04em] text-ink">Aa</p>
        <Bar w="70%" className="mt-4" />
        <Bar w="45%" className="mt-2" />
        <div className="mt-4 flex gap-2 text-[10px] text-faint">
          <span>48</span><span>32</span><span>20</span><span>16</span>
        </div>
      </Card>
      <Card className="right-[8%] top-[18%] w-[40%] p-3">
        <div className="grid grid-cols-3 gap-1.5">
          {["bg-ink", "bg-ink-2", "bg-accent", "bg-accent-deep", "bg-mark", "bg-hush"].map((c) => (
            <span key={c} className={`aspect-square rounded-lg ${c}`} />
          ))}
        </div>
      </Card>
      <Card className="bottom-[12%] left-[30%] flex w-[48%] items-center gap-2 p-3">
        <span className="rounded-full bg-ink px-3 py-1.5 text-[10px] font-medium text-white">Primary</span>
        <span className="rounded-full border border-line px-3 py-1.5 text-[10px] font-medium">Secondary</span>
        <span className="ml-auto h-4 w-7 rounded-full bg-accent p-0.5">
          <span className="ml-auto block h-3 w-3 rounded-full bg-white" />
        </span>
      </Card>
    </>
  ),

  build: (
    <>
      <div className="absolute inset-x-[8%] top-[12%] bottom-[22%] overflow-hidden rounded-2xl bg-ink p-4 font-mono text-[11px] leading-[1.9] shadow-[0_24px_48px_-24px_rgba(30,36,48,0.7)]">
        <div className="mb-2 flex gap-1.5">
          {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-white/20" />)}
        </div>
        <p><span className="text-[#c792ea]">export default</span> <span className="text-[#82aaff]">function</span> <span className="text-white">Hero</span><span className="text-white/50">() {"{"}</span></p>
        <p className="pl-4"><span className="text-[#c792ea]">return</span> <span className="text-white/50">(</span></p>
        <p className="pl-8"><span className="text-[#89ddff]">&lt;section</span> <span className="text-[#ffcb6b]">className</span><span className="text-white/50">=</span><span className="text-[#c3e88d]">&quot;plumb&quot;</span><span className="text-[#89ddff]">&gt;</span></p>
        <p className="pl-12 text-white/40">{"{/* better than it looks */}"}</p>
        <p className="pl-8 text-[#89ddff]">&lt;/section&gt;</p>
        <p className="pl-4 text-white/50">)</p>
      </div>
      <Card className="bottom-[10%] right-[10%] flex items-center gap-2.5 px-3 py-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-red-500" />
        </span>
        <span className="text-[11px] font-medium">Preview ready</span>
        <span className="text-[11px] text-faint">· 48s</span>
      </Card>
    </>
  ),

  launch: (
    <>
      <Card className="left-[8%] top-[14%] w-[46%] p-4">
        {["Mobile Safari", "Chrome Android", "Meta & OG tags", "Redirects", "Analytics"].map((t) => (
          <div key={t} className="flex items-center gap-2 border-b border-line/60 py-1.5 text-[11px] last:border-0">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/10"><Tick /></span>
            {t}
          </div>
        ))}
      </Card>
      <Card className="right-[8%] top-[20%] grid w-[38%] grid-cols-2 gap-3 p-4">
        {[100, 98, 100, 96].map((n, i) => (
          <div key={i} className="flex flex-col items-center">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-[11px] font-semibold text-accent"
              style={{ background: `conic-gradient(var(--color-accent) ${n}%, var(--color-hush) 0)` }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-card">{n}</span>
            </span>
          </div>
        ))}
      </Card>
      <Card className="bottom-[10%] right-[16%] flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[11px] font-medium text-white">
        🚀 Live on orvinex.store
      </Card>
    </>
  ),
};
