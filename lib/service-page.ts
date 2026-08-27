/** Types and pure helpers for service pages. Safe on both sides of the boundary. */

export type ServiceFaq = { q: string; a: string };

export type ServicePageContent = {
  slug: string;
  headline: string;
  intro: string;
  body: string;
  faq: ServiceFaq[];
  metaTitle: string | null;
  metaDescription: string | null;
  keyword: string | null;
  updatedAt: string;
};

/**
 * `faq` is a Json column, so Prisma types it as unknown-ish and a hand-edited
 * row could hold anything. Narrow it rather than trusting the shape.
 */
export function parseFaq(value: unknown): ServiceFaq[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const q = (item as Record<string, unknown>).q;
    const a = (item as Record<string, unknown>).a;
    if (typeof q !== "string" || typeof a !== "string") return [];
    if (!q.trim() || !a.trim()) return [];
    return [{ q, a }];
  });
}
