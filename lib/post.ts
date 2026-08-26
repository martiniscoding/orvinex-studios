/**
 * Post types and pure helpers, safe on both sides of the boundary.
 *
 * lib/blog.ts holds the database queries and is marked server-only, so a
 * client component cannot import from it — importing anything from that module
 * drags Prisma into the browser bundle and Next refuses to build. Everything
 * here touches nothing but its arguments.
 */

export const POST_STATUSES = ["draft", "published"] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

/** A post as handed to client components — dates already serialised. */
export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: string;
  featured: boolean;
  /** Editor-only: the phrase this post targets. Never rendered publicly. */
  keyword: string | null;
  publishedAt: string | null;
  updatedAt: string;
};

export type PostFull = PostSummary & { content: string };

/**
 * Turns a title into a URL segment.
 *
 * Diacritics are folded rather than stripped, so "Café" becomes "cafe" instead
 * of "caf". Anything left that is not a letter or digit collapses to a single
 * hyphen.
 */
export function slugify(input: string) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Rounded, with a floor of one minute — "0 min read" reads like an error. */
export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatPostDate(iso: string | null) {
  if (!iso) return "Unpublished";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
