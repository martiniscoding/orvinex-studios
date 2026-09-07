"use client";

import { useId, useState } from "react";
import { approach } from "@/content/site";

/**
 * 5.8's interactive detail. Rather than describe craft, it performs it: the
 * same card, the same words, switched between out-of-true and hung straight.
 * This is the service being sold, in two seconds.
 */
export default function AlignmentToggle() {
  const [plumb, setPlumb] = useState(true);
  const id = useId();

  return (
    <div className="mt-10">
      <div className="flex items-center gap-4">
        <span id={`${id}-label`} className="label text-slate">
          {plumb ? approach.toggle.on : approach.toggle.off}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={plumb}
          aria-labelledby={`${id}-label`}
          onClick={() => setPlumb((v) => !v)}
          className="relative h-7 w-14 border border-ink/25 bg-chalk transition-colors duration-300 hover:border-ink/50"
        >
          <span
            aria-hidden="true"
            className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 transition-all duration-300 ease-[var(--ease-plumb)] ${
              plumb ? "left-[calc(100%-26px)] bg-brass" : "left-1 bg-slate"
            }`}
          />
        </button>
      </div>

      <div className="mt-6 max-w-[420px] border border-ink/10 bg-chalk p-6">
        {plumb ? (
          <div className="transition-opacity duration-300">
            <p className="label text-slate">Team</p>
            <p className="display mt-3 text-xl tabular-nums">$29</p>
            <p className="mt-1 text-sm text-slate">per editor, per month</p>
            <ul className="mt-6 space-y-2 border-t border-ink/10 pt-5 text-sm">
              {["Unlimited projects", "SSO and audit log", "Priority support"].map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden="true" className="text-brass">
                    —
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex bg-ink px-5 py-2.5 text-sm font-medium text-paper">
              Start a trial
            </span>
          </div>
        ) : (
          <div
            className="text-center transition-opacity duration-300"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
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

      <p className="mt-4 max-w-[46ch] text-sm text-slate">{approach.toggle.caption}</p>
    </div>
  );
}
