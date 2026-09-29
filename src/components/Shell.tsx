import type { ReactNode } from "react";
import SiteNav from "@/components/SiteNav";

/**
 * Page chrome. The nav sits in the flow, so pages only need breathing room
 * under it; `hero` pages bring their own.
 */
export default function Shell({
  children,
  hero = false,
}: {
  children: ReactNode;
  hero?: boolean;
}) {
  return (
    <>
      <SiteNav />
      <main className={hero ? "" : "pt-10 lg:pt-14"}>{children}</main>
    </>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 lg:px-10 ${className}`}>{children}</div>
  );
}
