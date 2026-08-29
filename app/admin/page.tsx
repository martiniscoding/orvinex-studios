import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import type { Lead } from "@/lib/db";
import { LeadsTable } from "./leads-table";
import { LoginForm } from "./login-form";
import { AdminHeader } from "./admin-header";

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
        <AdminHeader current="leads" />

        <div className="mt-8">
          <h1 className="font-display text-[26px] font-bold tracking-tight text-white">
            Inquiries
          </h1>
          <p className="mt-1 text-[14px] text-muted">
            Every submission from the contact form, newest first.
          </p>
        </div>

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
