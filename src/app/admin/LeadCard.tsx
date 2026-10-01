"use client";

import { useState, useTransition } from "react";
import { deleteLead, setLeadNotes, setLeadStatus } from "./actions";
import { leadStatuses, type Lead, type LeadStatus } from "@/lib/leads";

export const statusDot: Record<LeadStatus, string> = {
  new: "bg-accent",
  contacted: "bg-[#c08a2b]",
  qualified: "bg-[#3a6ea5]",
  won: "bg-[#2f7d4f]",
  lost: "bg-faint",
};

/** In the viewer's own time zone, so it has to render on the client. */
function When({ date }: { date: Date }) {
  return (
    <time dateTime={date.toISOString()} suppressHydrationWarning>
      {date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
    </time>
  );
}

export default function LeadCard({ lead }: { lead: Lead }) {
  const [pending, start] = useTransition();
  const [notes, setNotes] = useState(lead.notes ?? "");
  const notesDirty = notes !== (lead.notes ?? "");

  return (
    <li
      className={`rounded-[var(--radius-card)] border border-line bg-card p-5 transition-opacity sm:p-7 ${pending ? "opacity-60" : ""}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-[-0.01em]">
            {lead.name}
          </h2>
          <a
            href={`mailto:${lead.email}`}
            className="mt-0.5 block truncate text-[0.9375rem] text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
          >
            {lead.email}
          </a>
        </div>

        <label className="flex items-center gap-2 rounded-full border border-line bg-panel py-1.5 pr-2 pl-3 text-sm font-medium">
          <span className={`h-2 w-2 rounded-full ${statusDot[lead.status]}`} aria-hidden="true" />
          <span className="sr-only">Status</span>
          <select
            value={lead.status}
            disabled={pending}
            onChange={(e) => start(() => setLeadStatus(lead.id, e.target.value as LeadStatus))}
            className="cursor-pointer bg-transparent capitalize outline-none"
          >
            {leadStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2 text-sm">
        {lead.project_type && <li className="rounded-full bg-hush px-3 py-1 font-medium text-ink-2">{lead.project_type}</li>}
        {lead.budget && <li className="rounded-full bg-hush px-3 py-1 font-medium text-ink-2">{lead.budget}</li>}
        {lead.country && <li className="rounded-full bg-hush px-3 py-1 font-medium text-ink-2">{lead.country}</li>}
        {lead.phone && (
          <li>
            <a
              href={`tel:${lead.phone.replace(/[^+0-9]/g, "")}`}
              className="inline-block rounded-full bg-hush px-3 py-1 font-medium text-ink-2 tabular-nums underline-offset-4 hover:underline"
            >
              {lead.phone}
            </a>
          </li>
        )}
        <li className="px-1 py-1 text-faint">
          <When date={new Date(lead.created_at)} />
        </li>
      </ul>

      <p className="mt-4 whitespace-pre-wrap text-[0.9375rem] leading-[1.65] text-ink-2">{lead.message}</p>

      <div className="mt-5 border-t border-line pt-4">
        <label className="block text-xs font-medium tracking-[0.04em] text-faint uppercase">
          Notes
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Private notes: calls, quotes, next steps"
            className="mt-2 w-full resize-y rounded-xl border border-line bg-panel px-3.5 py-2.5 text-[0.9375rem] font-normal tracking-normal text-ink normal-case outline-none placeholder:text-faint focus:border-ink"
          />
        </label>
        <div className="mt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (confirm(`Delete the lead from ${lead.name}? This can't be undone.`)) {
                start(() => deleteLead(lead.id));
              }
            }}
            className="text-sm text-faint transition-colors hover:text-accent"
          >
            Delete
          </button>
          {notesDirty && (
            <button
              type="button"
              disabled={pending}
              onClick={() => start(() => setLeadNotes(lead.id, notes))}
              className="rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white hover:bg-ink-2"
            >
              Save notes
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
