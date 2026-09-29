import Link from "next/link";
import { serviceGroups } from "@/content/site";
import { ArrowIcon } from "@/components/Icons";

/**
 * Every service, in its group, each card linking to its own page. Groups
 * carry an id so the footer can link straight to them.
 */
export default function ServiceList() {
  return (
    <div className="space-y-16 lg:space-y-20">
      {serviceGroups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-28">
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold tracking-[-0.03em]">
              {group.label}
            </h2>
            <p className="text-sm font-medium text-faint">
              {group.services.length} services
            </p>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {group.services.map((s) => (
              <li key={s.id} id={s.id} className="scroll-mt-28">
                <Link
                  href={`/services/${s.id}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-card p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-28px_rgba(30,36,48,0.45)] sm:p-8"
                >
                  <span className="flex items-center justify-between text-sm font-semibold tracking-[0.04em] text-accent">
                    {s.code}
                    <span className="text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink [&_svg]:h-4 [&_svg]:w-4">
                      <ArrowIcon />
                    </span>
                  </span>
                  <h3 className="mt-3 text-[1.375rem] font-semibold tracking-[-0.02em]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-muted">
                    {s.body}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {s.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-hush px-3 py-1 text-sm font-medium text-ink-2"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
