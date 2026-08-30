import Link from "next/link";
import { headers } from "next/headers";
import { Plus } from "lucide-react";

import { auth } from "@/lib/auth";
import { listCatalogue } from "@/lib/service-catalogue";
import { BANDS } from "@/lib/services";
import { LoginForm } from "../login-form";
import { AdminHeader } from "../admin-header";
import { ServicesTable } from "./services-table";

export default async function AdminServicesPage() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return <LoginForm />;

  const services = await listCatalogue();
  const onHome = services.filter((s) => s.featured).length;

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <AdminHeader current="services" />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[26px] font-bold tracking-tight text-white">
              Services
            </h1>
            <p className="mt-1 text-[14px] text-muted">
              {services.length} total · {onHome} on the landing page. Order here
              is the order on the site.
            </p>
          </div>

          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-2 rounded-full bg-primary-deep px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-primary"
          >
            <Plus className="h-4 w-4" strokeWidth={2.4} />
            New service
          </Link>
        </div>

        <div className="mt-6 space-y-8">
          {BANDS.map((band) => (
            <section key={band.id}>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[12px] tracking-[0.2em] text-primary">
                  {band.letter}
                </span>
                <h2 className="font-display text-[17px] font-bold tracking-tight text-white">
                  {band.label}
                </h2>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-gradient-to-r from-white/[0.12] to-transparent"
                />
              </div>
              <ServicesTable
                bandLabel={band.label}
                services={services.filter((s) => s.band === band.id)}
              />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
