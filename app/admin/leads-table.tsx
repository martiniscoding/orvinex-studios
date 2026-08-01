"use client";

import { useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/db";
import { updateLeadStatus } from "./actions";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-primary/15 text-primary border-primary/30",
  contacted: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  closed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [pending, startTransition] = useTransition();

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-surface/60 px-6 py-16 text-center">
        <p className="text-[15px] font-medium text-white/80">No inquiries yet</p>
        <p className="mt-1.5 text-[13.5px] text-muted">
          Submissions from the contact form will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/60">
      {/* Header row is desktop-only; each card is self-describing on mobile. */}
      <div className="hidden grid-cols-[1.4fr_1.8fr_1.2fr_0.9fr_1fr_auto] gap-4 border-b border-white/[0.08] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted md:grid">
        <span>Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Country</span>
        <span>Received</span>
        <span className="w-24">Status</span>
      </div>

      <ul className="divide-y divide-white/[0.06]">
        {leads.map((lead) => {
          const isOpen = expanded === lead.id;
          return (
            <li key={lead.id}>
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : lead.id)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-1 gap-1.5 px-5 py-4 text-left transition-colors hover:bg-white/[0.025] md:grid-cols-[1.4fr_1.8fr_1.2fr_0.9fr_1fr_auto] md:items-center md:gap-4"
              >
                <span className="flex items-center gap-2 text-[14px] font-semibold text-white">
                  <ChevronDown
                    className={`h-3.5 w-3.5 shrink-0 text-muted transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={2.5}
                  />
                  {lead.fullName}
                </span>
                <span className="truncate pl-[22px] text-[13.5px] text-white/75 md:pl-0">
                  {lead.email}
                </span>
                <span className="pl-[22px] text-[13.5px] text-white/75 md:pl-0">
                  {lead.phone}
                </span>
                <span className="pl-[22px] text-[13.5px] text-muted md:pl-0">
                  {lead.country ?? "—"}
                </span>
                <span className="pl-[22px] text-[12.5px] text-muted md:pl-0">
                  {formatDate(lead.createdAt)}
                </span>
                <span
                  className={`ml-[22px] w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize md:ml-0 ${
                    STATUS_STYLES[lead.status] ?? STATUS_STYLES.new
                  }`}
                >
                  {lead.status}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-white/[0.06] bg-black/20 px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Project details
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-[14px] leading-relaxed text-white/85">
                    {lead.details}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-[12px] font-medium text-muted">
                      Mark as
                    </span>
                    {LEAD_STATUSES.map((status) => (
                      <button
                        key={status}
                        type="button"
                        disabled={pending || lead.status === status}
                        onClick={() =>
                          startTransition(() => {
                            updateLeadStatus(lead.id, status as LeadStatus);
                          })
                        }
                        className={`rounded-full border px-3 py-1 text-[12px] font-medium capitalize transition-colors disabled:opacity-35 ${
                          lead.status === status
                            ? STATUS_STYLES[status]
                            : "border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        {status}
                      </button>
                    ))}

                    <a
                      href={`mailto:${lead.email}`}
                      className="ml-auto rounded-full bg-primary-deep px-4 py-1.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-primary"
                    >
                      Reply by email
                    </a>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
