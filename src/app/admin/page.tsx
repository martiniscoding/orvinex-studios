import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { pool } from "@/lib/db";
import { leadStatuses, type Lead, type LeadStatus } from "@/lib/leads";
import LeadCard, { statusDot } from "./LeadCard";
import AdminHeader from "./AdminHeader";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ status?: string; q?: string }> };

export default async function AdminPage({ searchParams }: Props) {
  const session = await requireAdmin();
  const params = await searchParams;
  const status = leadStatuses.includes(params.status as LeadStatus) ? (params.status as LeadStatus) : null;
  const q = params.q?.trim().slice(0, 100) ?? "";

  const where: string[] = [];
  const args: string[] = [];
  if (status) {
    args.push(status);
    where.push(`status = $${args.length}`);
  }
  if (q) {
    args.push(`%${q}%`);
    where.push(`(name ilike $${args.length} or email ilike $${args.length} or company ilike $${args.length} or message ilike $${args.length})`);
  }

  const [{ rows: leads }, { rows: counts }, { rows: [week] }] = await Promise.all([
    pool.query<Lead>(
      `select * from leads ${where.length ? `where ${where.join(" and ")}` : ""} order by created_at desc limit 500`,
      args,
    ),
    pool.query<{ status: LeadStatus; n: number }>("select status, count(*)::int n from leads group by status"),
    pool.query<{ n: number }>("select count(*)::int n from leads where created_at > now() - interval '7 days'"),
  ]);

  const byStatus = Object.fromEntries(counts.map((c) => [c.status, c.n])) as Partial<Record<LeadStatus, number>>;
  const total = counts.reduce((sum, c) => sum + c.n, 0);

  const stats = [
    { label: "Total leads", value: total },
    { label: "New", value: byStatus.new ?? 0 },
    { label: "Last 7 days", value: week.n },
    { label: "Won", value: byStatus.won ?? 0 },
  ];

  const href = (s: LeadStatus | null) => {
    const p = new URLSearchParams();
    if (s) p.set("status", s);
    if (q) p.set("q", q);
    const str = p.toString();
    return str ? `/admin?${str}` : "/admin";
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
      <AdminHeader email={session.user.email} active="leads" />

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <h1 className="display-serif text-[clamp(2rem,4vw,2.75rem)]">Leads</h1>
        <a
          href="/admin/export"
          className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink"
        >
          Export CSV
        </a>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-card p-5">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-[-0.03em] tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
          {[null, ...leadStatuses].map((s) => {
            const on = s === status;
            return (
              <Link
                key={s ?? "all"}
                href={href(s)}
                aria-current={on ? "page" : undefined}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${
                  on ? "border-ink bg-ink text-white" : "border-line bg-card text-ink-2 hover:border-faint"
                }`}
              >
                {s && <span className={`h-1.5 w-1.5 rounded-full ${statusDot[s]}`} aria-hidden="true" />}
                {s ?? "All"}
                <span className={on ? "text-white/70" : "text-faint"}>{s ? (byStatus[s] ?? 0) : total}</span>
              </Link>
            );
          })}
        </nav>
        <form action="/admin" className="flex gap-2">
          {status && <input type="hidden" name="status" value={status} />}
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search name, email, company…"
            className="w-full rounded-full border border-line bg-card px-4 py-2 text-sm outline-none placeholder:text-faint focus:border-ink lg:w-72"
          />
        </form>
      </div>

      {leads.length ? (
        <ul className="mt-6 space-y-4">
          {leads.map((lead) => (
            <LeadCard key={`${lead.id}-${lead.status}-${lead.notes ?? ""}`} lead={lead} />
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-[var(--radius-card)] border border-dashed border-line bg-card/60 px-6 py-16 text-center">
          <p className="font-medium">{total ? "No leads match this filter." : "No leads yet."}</p>
          <p className="mt-1 text-sm text-muted">
            {total ? "Try another status or search." : "Briefs sent from the contact form will appear here."}
          </p>
        </div>
      )}
    </div>
  );
}
