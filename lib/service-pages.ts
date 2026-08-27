import "server-only";

import { getPrisma } from "./prisma";
import { parseFaq, type ServicePageContent } from "./service-page";
import { SERVICES } from "./services";

function toContent(row: {
  slug: string;
  headline: string;
  intro: string;
  body: string;
  faq: unknown;
  metaTitle: string | null;
  metaDescription: string | null;
  keyword: string | null;
  updatedAt: Date;
}): ServicePageContent {
  return {
    slug: row.slug,
    headline: row.headline,
    intro: row.intro,
    body: row.body,
    faq: parseFaq(row.faq),
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    keyword: row.keyword,
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * One service page.
 *
 * Returns null when the slug is not in lib/services.ts, even if a row exists —
 * the catalogue in code decides which services the site offers, and a stale
 * row must not resurrect a service that was removed from the grid.
 */
export async function getServicePage(
  slug: string
): Promise<ServicePageContent | null> {
  if (!SERVICES.some((service) => service.slug === slug)) return null;
  const row = await getPrisma().servicePage.findUnique({ where: { slug } });
  return row ? toContent(row) : null;
}

/** Every page that has both a catalogue entry and a row. */
export async function listServicePages(): Promise<ServicePageContent[]> {
  const rows = await getPrisma().servicePage.findMany();
  const known = new Set(SERVICES.map((service) => service.slug));
  return rows.filter((row) => known.has(row.slug)).map(toContent);
}

/** Slugs the catalogue defines but nothing has been written for yet. */
export async function missingServicePages(): Promise<string[]> {
  const rows = await getPrisma().servicePage.findMany({
    select: { slug: true },
  });
  const written = new Set(rows.map((row) => row.slug));
  return SERVICES.filter((service) => !written.has(service.slug)).map(
    (service) => service.slug
  );
}
