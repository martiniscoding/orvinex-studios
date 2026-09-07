import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

/** The rail plus the inset rounded panel every page sits inside. */
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="lg:pl-[var(--rail)]">
        <div className="px-3 pb-4 lg:py-5 lg:pr-5 lg:pl-0">
          <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-panel px-5 py-10 sm:px-8 lg:px-14 lg:py-16">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
