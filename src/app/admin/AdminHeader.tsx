import Link from "next/link";
import { Mark } from "@/components/Icons";
import SignOut from "./SignOut";

const tabs = [
  { id: "leads", label: "Leads", href: "/admin" },
  { id: "articles", label: "Articles", href: "/admin/articles" },
] as const;

export default function AdminHeader({ email, active }: { email: string; active: (typeof tabs)[number]["id"] }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Mark size={32} />
          <span className="text-lg font-semibold tracking-[-0.02em]">Orvinex admin</span>
        </Link>
        <nav aria-label="Admin" className="flex gap-1 rounded-full border border-line bg-card p-1">
          {tabs.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              aria-current={t.id === active ? "page" : undefined}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                t.id === active ? "bg-ink text-white" : "text-ink-2 hover:text-ink"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-muted sm:inline">{email}</span>
        <SignOut />
      </div>
    </header>
  );
}
