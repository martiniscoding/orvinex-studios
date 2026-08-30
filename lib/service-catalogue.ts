import "server-only";

import { getPrisma } from "./prisma";
import { parseFaq, type ServiceFaq } from "./service-page";
import { BANDS, type BandId } from "./services";

/**
 * The service catalogue, read from the database.
 *
 * It used to be a constant in lib/services.ts. It moved here so services can
 * be added from the admin panel without a deploy. What stays in code is the
 * band definitions — there are three, they carry design decisions like the
 * aperture arc count, and adding a fourth is a design change rather than
 * content entry.
 */

export type CatalogueService = {
  slug: string;
  /** Derived from band and position, e.g. "B·02" — never stored, so
   *  reordering renumbers instead of leaving holes. */
  code: string;
  title: string;
  short: string;
  description: string;
  stack: string[];
  band: BandId;
  icon: string;
  featured: boolean;
  position: number;
};

export type CatalogueServiceFull = CatalogueService & {
  headline: string;
  intro: string;
  body: string;
  faq: ServiceFaq[];
  metaTitle: string | null;
  metaDescription: string | null;
  keyword: string | null;
  updatedAt: string;
};

const BAND_IDS: ReadonlySet<string> = new Set<string>(BANDS.map((b) => b.id));

function bandLetter(band: string) {
  return BANDS.find((b) => b.id === band)?.letter ?? "?";
}

type Row = {
  slug: string;
  title: string;
  short: string;
  cardText: string;
  stack: string[];
  band: string;
  icon: string;
  featured: boolean;
  position: number;
};

/**
 * Codes are assigned by walking each band in display order, so they always
 * run 01, 02, 03 with no gaps regardless of what `position` values exist.
 */
function withCodes(rows: Row[]): CatalogueService[] {
  const seen: Record<string, number> = {};
  return rows.map((row) => {
    seen[row.band] = (seen[row.band] ?? 0) + 1;
    return {
      slug: row.slug,
      code: `${bandLetter(row.band)}·${String(seen[row.band]).padStart(2, "0")}`,
      title: row.title,
      short: row.short || row.title,
      description: row.cardText,
      stack: row.stack,
      band: row.band as BandId,
      icon: row.icon,
      featured: row.featured,
      position: row.position,
    };
  });
}

const CATALOGUE_FIELDS = {
  slug: true,
  title: true,
  short: true,
  cardText: true,
  stack: true,
  band: true,
  icon: true,
  featured: true,
  position: true,
} as const;

/**
 * Every service, ordered for display.
 *
 * Rows whose band is not one the design defines are dropped rather than
 * rendered into a band that has no header, arc count or column setting.
 */
export async function listCatalogue(): Promise<CatalogueService[]> {
  const rows = await getPrisma().servicePage.findMany({
    orderBy: [{ band: "asc" }, { position: "asc" }, { title: "asc" }],
    select: CATALOGUE_FIELDS,
  });

  const ordered = BANDS.flatMap((band) =>
    rows.filter((row) => row.band === band.id)
  ).filter((row) => BAND_IDS.has(row.band));

  return withCodes(ordered);
}

/** The six-or-so shown in the landing page teaser. */
export async function listFeatured(): Promise<CatalogueService[]> {
  return (await listCatalogue()).filter((s) => s.featured);
}

export async function getCatalogueService(
  slug: string
): Promise<CatalogueServiceFull | null> {
  const all = await listCatalogue();
  const summary = all.find((s) => s.slug === slug);
  if (!summary) return null;

  const row = await getPrisma().servicePage.findUnique({ where: { slug } });
  if (!row) return null;

  return {
    ...summary,
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
