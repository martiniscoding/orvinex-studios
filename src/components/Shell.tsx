import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";

/**
 * Page chrome. `hero` means the first child bleeds to the edges and sits under
 * a translucent nav; without it the nav is solid and the content is padded
 * clear of it.
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
      <Navbar overHero={hero} />
      <main className={hero ? "" : "pt-28 lg:pt-32"}>{children}</main>
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
