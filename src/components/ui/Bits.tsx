import type { ReactNode } from "react";
import { ArrowIcon, CheckIcon } from "../Icons";

/** The recurring device: a hairline rule with a small grey label centred in it. */
const dotHues = ["bg-coral", "bg-sun", "bg-mint", "bg-sky", "bg-grape"];

export function Divider({ label }: { label: string }) {
  const hash = [...label].reduce((n, ch) => n + ch.charCodeAt(0), 0);
  const dot = dotHues[hash % dotHues.length];
  return (
    <div className="my-16 flex items-center gap-5 lg:my-24">
      <span className="h-px flex-1 bg-line" />
      <span className="eyebrow flex items-center gap-2.5 whitespace-nowrap">
        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dot}`} />
        {label}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

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
      <span className="mt-0.5 shrink-0 text-mint-deep">
        <CheckIcon />
      </span>
      {children}
    </li>
  );
}

export function Arrow() {
  return <ArrowIcon />;
}
