import type { ReactNode } from "react";
import { ArrowIcon, CheckIcon } from "../Icons";

export function Pill({
  href,
  children,
  tone = "white",
}: {
  href: string;
  children: ReactNode;
  tone?: "white" | "ink";
}) {
  const styles =
    tone === "ink"
      ? "bg-ink text-white hover:bg-ink-2"
      : "bg-card text-ink hover:-translate-y-0.5";
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 text-[0.9375rem] font-medium shadow-[0_10px_24px_-14px_rgba(44,30,74,0.45)] transition-all duration-300 ${styles}`}
    >
      {children}
    </a>
  );
}

export function Tick({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-[0.9375rem] text-ink-2">
      <span className="mt-0.5 shrink-0 text-accent">
        <CheckIcon />
      </span>
      {children}
    </li>
  );
}

export function Arrow() {
  return <ArrowIcon />;
}
