import type { ReactNode } from "react";

export function Cta({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-[0.02em] transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-brass hover:text-ink"
      : "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}
