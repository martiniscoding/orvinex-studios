"use client";

import { useId, useState } from "react";
import { approach } from "@/content/site";
import { CheckIcon } from "@/components/Icons";

/**
 * The one interactive detail: the same card, out of true and hung straight.
 * It demonstrates the service instead of describing it.
 */
export default function Approach() {
  const [plumb, setPlumb] = useState(true);
  const id = useId();

  return (
    <section id="approach" className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      <div>
        <p className="eyebrow">{approach.eyebrow}</p>
        <h2 className="hero-type mt-4 text-[clamp(1.875rem,3.8vw,3rem)]">{approach.title}</h2>
        <div className="mt-7 max-w-[54ch] space-y-5 text-[1.0625rem] text-muted">
          {approach.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <span id={`${id}-label`} className="eyebrow">
            {plumb ? approach.toggle.on : approach.toggle.off}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={plumb}
            aria-labelledby={`${id}-label`}
            onClick={() => setPlumb((v) => !v)}
            className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${plumb ? "bg-accent" : "bg-line"}`}
          >
            <span
              aria-hidden="true"
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all duration-300 ease-[var(--ease-out-soft)] ${plumb ? "left-7" : "left-1"}`}
            />
          </button>
        </div>

        <div className="mt-5 rounded-[var(--radius-card)] bg-card p-7 shadow-[0_20px_44px_-34px_rgba(44,30,74,0.6)]">
          {plumb ? (
            <div>
              <p className="eyebrow">Team</p>
              <p className="phudu mt-3 text-[2.25rem] leading-none tabular-nums">$29</p>
              <p className="mt-1 text-sm text-muted">per editor, per month</p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-[0.9375rem] text-ink-2">
                {["Unlimited projects", "SSO and audit log", "Priority support"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 text-accent">
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-white">
                Start a trial
              </span>
            </div>
          ) : (
            <div className="text-center" style={{ fontFamily: "system-ui, sans-serif" }}>
              <p className="text-[13px] font-bold text-[#6b7280]">TEAM</p>
              <p className="mt-2 text-[22px] font-bold text-[#111827]">$29</p>
              <p className="mt-0.5 text-[13px] text-[#9ca3af]">per editor, per month</p>
              <ul className="mt-3 space-y-1.5 text-[13px] text-[#374151]">
                {["Unlimited projects", "SSO and audit log", "Priority support"].map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
              <span className="mt-4 inline-flex rounded-md bg-[#2563eb] px-4 py-2 text-[13px] font-semibold text-white shadow-sm">
                Start a trial
              </span>
            </div>
          )}
        </div>
        <p className="mt-4 max-w-[44ch] text-sm text-muted">{approach.toggle.caption}</p>
      </div>
    </section>
  );
}
