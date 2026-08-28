import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { logout } from "./actions";

const TABS = [
  { id: "leads", label: "Inquiries", href: "/admin" },
  { id: "blog", label: "Posts", href: "/admin/blog" },
  { id: "services", label: "Services", href: "/admin/services" },
] as const;

/** Shared chrome for every admin screen: brand, section tabs, sign out. */
export function AdminHeader({
  current,
}: {
  current: "leads" | "blog" | "services";
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <Logo markSize={26} />

        <nav aria-label="Admin sections" className="flex gap-1">
          {TABS.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              aria-current={current === tab.id ? "page" : undefined}
              className={`rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-colors ${
                current === tab.id
                  ? "bg-primary-deep text-ink"
                  : "text-ink/60 hover:bg-ink/[0.06] hover:text-ink"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      <form action={logout}>
        <button
          type="submit"
          className="rounded-full border border-ink/10 px-4 py-2 text-[13px] font-medium text-ink/75 transition-colors hover:bg-ink/[0.06] hover:text-ink"
        >
          Sign out
        </button>
      </form>
    </header>
  );
}
