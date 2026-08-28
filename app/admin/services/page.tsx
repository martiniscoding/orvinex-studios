import Link from "next/link";
import { headers } from "next/headers";
import { ExternalLink } from "lucide-react";

import { auth } from "@/lib/auth";
import { listServicePages, missingServicePages } from "@/lib/service-pages";
import { BANDS, SERVICES } from "@/lib/services";
import { LoginForm } from "../login-form";
import { AdminHeader } from "../admin-header";

export default async function AdminServicesPage() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return <LoginForm />;

  const pages = await listServicePages();
  const missing = await missingServicePages();
  const written = new Map(pages.map((page) => [page.slug, page]));

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <AdminHeader current="services" />

        <div className="mt-8">
          <h1 className="font-display text-[26px] font-bold tracking-tight text-ink">
            Service pages
          </h1>
          <p className="mt-1 text-[14px] text-muted">
            One page per service. The list itself lives in code — this is where
            the writing on each page is edited.
          </p>
        </div>

        {missing.length > 0 && (
          <p className="mt-6 rounded-xl border border-amber-500/25 bg-amber-500/[0.07] px-4 py-3 text-[13.5px] text-amber-200/90">
            {missing.length} service{missing.length === 1 ? " has" : "s have"} no
            page yet ({missing.join(", ")}). Run{" "}
            <code className="font-mono text-[12.5px]">npm run seed:services</code>{" "}
            to create them.
          </p>
        )}

        <div className="mt-6 space-y-8">
          {BANDS.map((band) => {
            const entries = SERVICES.filter(
              (service) => service.band === band.id
            );
            return (
              <section key={band.id}>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[12px] tracking-[0.2em] text-primary">
                    {band.letter}
                  </span>
                  <h2 className="font-display text-[17px] font-bold tracking-tight text-ink">
                    {band.label}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-gradient-to-r from-ink/[0.12] to-transparent"
                  />
                </div>

                <ul className="mt-3 rounded-2xl border border-ink/[0.08] bg-surface/50">
                  {entries.map((service) => {
                    const page = written.get(service.slug);
                    return (
                      <li
                        key={service.slug}
                        className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-ink/[0.06] px-5 py-3.5 last:border-b-0"
                      >
                        <span className="font-mono text-[11px] tracking-[0.14em] text-ink/30">
                          {service.code}
                        </span>

                        <div className="min-w-0 flex-1">
                          {page ? (
                            <Link
                              href={`/admin/services/${service.slug}`}
                              className="font-display text-[15.5px] font-semibold tracking-tight text-ink transition-colors hover:text-primary"
                            >
                              {service.title}
                            </Link>
                          ) : (
                            <span className="font-display text-[15.5px] font-semibold tracking-tight text-ink/40">
                              {service.title}
                            </span>
                          )}
                          <p className="truncate font-mono text-[11.5px] text-ink/25">
                            /services/{service.slug}
                          </p>
                        </div>

                        {page ? (
                          <a
                            href={`/services/${service.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${service.title} page`}
                            className="rounded-full border border-ink/10 p-2 text-ink/40 transition-colors hover:text-ink"
                          >
                            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                          </a>
                        ) : (
                          <span className="rounded-full border border-ink/10 px-3 py-1 text-[11.5px] text-ink/35">
                            Not written
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
