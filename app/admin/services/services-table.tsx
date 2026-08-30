"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, ExternalLink, Trash2 } from "lucide-react";

import { iconFor } from "@/lib/service-icons";
import type { CatalogueService } from "@/lib/service-catalogue";
import { deleteServicePage, moveServicePage } from "./actions";

export function ServicesTable({
  services,
  bandLabel,
}: {
  services: CatalogueService[];
  bandLabel: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (!result.ok) setError(result.error ?? "That did not work.");
      router.refresh();
    });
  }

  if (services.length === 0) {
    return (
      <p className="mt-3 rounded-2xl border border-white/[0.08] bg-surface/50 px-5 py-6 text-[13.5px] text-white/35">
        No services in {bandLabel} yet.
      </p>
    );
  }

  return (
    <div>
      {error && (
        <p className="mt-3 text-[13px] text-red-400" role="alert">
          {error}
        </p>
      )}

      <ul className="mt-3 rounded-2xl border border-white/[0.08] bg-surface/50">
        {services.map((service, index) => {
          const Icon = iconFor(service.icon);
          return (
            <li
              key={service.slug}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.06] px-5 py-3.5 last:border-b-0"
            >
              <span className="font-mono text-[11px] tracking-[0.14em] text-white/30">
                {service.code}
              </span>

              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/[0.09] text-primary">
                <Icon className="h-4 w-4" strokeWidth={1.9} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/admin/services/${service.slug}`}
                    className="font-display text-[15.5px] font-semibold tracking-tight text-white transition-colors hover:text-primary"
                  >
                    {service.title}
                  </Link>
                  {service.featured && (
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary">
                      Home page
                    </span>
                  )}
                </div>
                <p className="truncate font-mono text-[11.5px] text-white/25">
                  /services/{service.slug}
                </p>
              </div>

              <span className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={pending || index === 0}
                  onClick={() => run(() => moveServicePage(service.slug, "up"))}
                  aria-label={`Move ${service.title} up`}
                  className="rounded-full border border-white/10 p-1.5 text-white/40 transition-colors hover:text-white disabled:opacity-25"
                >
                  <ChevronUp className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  disabled={pending || index === services.length - 1}
                  onClick={() => run(() => moveServicePage(service.slug, "down"))}
                  aria-label={`Move ${service.title} down`}
                  className="rounded-full border border-white/10 p-1.5 text-white/40 transition-colors hover:text-white disabled:opacity-25"
                >
                  <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              </span>

              <a
                href={`/services/${service.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${service.title} page`}
                className="rounded-full border border-white/10 p-2 text-white/40 transition-colors hover:text-white"
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              </a>

              {confirming === service.slug ? (
                <span className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => {
                      setConfirming(null);
                      run(() => deleteServicePage(service.slug));
                    }}
                    className="rounded-full bg-red-500/90 px-3 py-1.5 text-[12.5px] font-semibold text-white disabled:opacity-40"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirming(null)}
                    className="text-[12.5px] text-white/50 hover:text-white"
                  >
                    Cancel
                  </button>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirming(service.slug)}
                  aria-label={`Delete ${service.title}`}
                  className="rounded-full border border-white/10 p-2 text-white/40 transition-colors hover:border-red-500/40 hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
