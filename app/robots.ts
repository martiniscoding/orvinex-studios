import type { MetadataRoute } from "next";

/**
 * Generates /robots.txt at build time.
 *
 * Everything is crawlable — this is a public marketing site with nothing
 * private on it, and open access is what gets us indexed and cited.
 *
 * Note that `/_next/` is deliberately NOT disallowed. Googlebot needs the JS
 * and CSS bundles to render the page; blocking them is a classic own-goal
 * that makes the rendered result look broken to the crawler.
 *
 * TODO: add `sitemap: "https://orvinex.store/sitemap.xml"` once `app/sitemap.ts`
 * exists. Advertising a sitemap that 404s is worse than advertising none.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The dashboard is password-gated and also carries a noindex tag;
        // this just keeps crawlers from wasting requests on it.
        disallow: "/admin",
      },
    ],
  };
}
