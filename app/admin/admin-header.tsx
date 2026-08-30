import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { logout } from "./actions";

const TABS = [
  { id: "leads", label: "Inquiries", href: "/admin" },
  { id: "articles", label: "Articles", href: "/admin/articles" },
  { id: "services", label: "Services", href: "/admin/services" },
  { id: "reviews", label: "Reviews", href: "/admin/testimonials" },
] as const;

/** Shared chrome for every admin screen: brand, section tabs, sign out. */
export function AdminHeader({
  current,
}: {
  current: "leads" | "articles" | "services" | "reviews";
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
                  ? "bg-primary-deep text-white"
                  : "text-white/60 hover:bg-white/[0.06] hover:text-white"
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
          className="rounded-full border border-white/10 px-4 py-2 text-[13px] font-medium text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          Sign out
        </button>
      </form>
    </header>
  );
}
