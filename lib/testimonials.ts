import "server-only";

import { getPrisma } from "./prisma";
import type { Testimonial } from "./testimonial";

const FIELDS = {
  id: true,
  name: true,
  role: true,
  quote: true,
  photo: true,
  published: true,
  position: true,
} as const;

/**
 * Position first, then oldest first, so two reviews that were never reordered
 * keep a stable order instead of shuffling between requests.
 */
const ORDER = [{ position: "asc" }, { createdAt: "asc" }] as const;

/** What the landing page renders. */
export async function listPublishedTestimonials(): Promise<Testimonial[]> {
  return getPrisma().testimonial.findMany({
    where: { published: true },
    orderBy: [...ORDER],
    select: FIELDS,
  });
}

/** What the admin panel edits — drafts included. */
export async function listAllTestimonials(): Promise<Testimonial[]> {
  return getPrisma().testimonial.findMany({
    orderBy: [...ORDER],
    select: FIELDS,
  });
}
