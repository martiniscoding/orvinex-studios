import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  // Belt and braces alongside the robots.txt disallow: a Disallow rule stops
  // crawling, but only a noindex tag reliably keeps a URL out of the index.
  robots: { index: false, follow: false, nocache: true },
};

/** Reads cookies downstream, so this subtree is never prerendered. */
export const dynamic = "force-dynamic";

/**
 * Intentionally does no auth checking — see the comment in page.tsx. Gating
 * here would not stop the page from executing, so every route under /admin
 * must check the session itself before touching data.
 *
 * `theme-dark` is what keeps this section dark while the public site is light.
 * It redeclares the colour variables for the whole subtree, so components
 * shared with the public site — the Markdown renderer, the logo — follow along
 * without knowing which theme they are in.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-dark min-h-screen bg-background text-ink">
      {children}
    </div>
  );
}
