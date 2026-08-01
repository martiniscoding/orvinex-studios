import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import type { Lead } from "@/lib/db";
import { Logo } from "@/components/ui/Logo";
import { LeadsTable } from "./leads-table";
import { LoginForm } from "./login-form";
import { logout } from "./actions";

export default async function AdminPage() {
  // The gate MUST live here, not in layout.tsx. A layout that renders
  // <LoginForm /> in place of {children} still causes Next to execute the
  // page component to build that children prop — which ran this query and
  // serialised the whole dashboard into the RSC payload of the response.
  // Visually hidden, but present in the raw HTML for anyone who looked.
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) {
    return <LoginForm />;
  }

  // BigInt and Date cannot cross the server/client boundary — narrow to the
  // serialisable shape before handing rows to <LeadsTable />.
  const leads: Lead[] = (
    await getPrisma().lead.findMany({ orderBy: { createdAt: "desc" } })
  ).map((lead) => ({
    ...lead,
    id: Number(lead.id),
    createdAt: lead.createdAt.toISOString(),
  }));

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Logo markSize={26} />
            <h1 className="mt-4 font-display text-[26px] font-bold tracking-tight text-white">
              Inquiries
            </h1>
            <p className="mt-1 text-[14px] text-muted">
              Every submission from the contact form, newest first.
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-white/10 px-4 py-2 text-[13px] font-medium text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              Sign out
            </button>
          </form>
        </header>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              ["Total", counts.total],
              ["New", counts.new],
              ["Contacted", counts.contacted],
              ["Closed", counts.closed],
            ] as const
          ).map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/[0.08] bg-surface/60 px-4 py-3.5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                {label}
              </p>
              <p className="mt-1 font-display text-[24px] font-bold text-white">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <LeadsTable leads={leads} />
        </div>
      </div>
    </main>
  );
}
