"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

import { isAuthenticated } from "@/lib/admin";
import { getPrisma } from "@/lib/prisma";
import { normalizePhoto } from "@/lib/testimonial";

export type TestimonialInput = {
  name: string;
  role: string;
  quote: string;
  /** Data URL from the browser's picker, an https link, or "" for none. */
  photo: string;
  published: boolean;
};

export type SaveTestimonialResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export type ActionResult = { ok: true } | { ok: false; error: string };

const LIMITS = { name: 80, role: 120, quote: 700 };

/** The landing page is the only place a review appears. */
function revalidateTestimonials() {
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

function validate(input: TestimonialInput) {
  if (!input.name.trim()) return "A name is required.";
  if (input.name.trim().length > LIMITS.name) {
    return `The name is over ${LIMITS.name} characters.`;
  }
  if (input.role.trim().length > LIMITS.role) {
    return `The role is over ${LIMITS.role} characters.`;
  }
  if (!input.quote.trim()) return "The review has no text.";
  if (input.quote.trim().length > LIMITS.quote) {
    return `The review is over ${LIMITS.quote} characters — the cards are the same height, so keep them close in length.`;
  }
  return null;
}

/** Everything a write needs, with the photo already checked. */
function toData(input: TestimonialInput) {
  const problem = validate(input);
  if (problem) return { error: problem, data: null };

  const { photo, error } = normalizePhoto(input.photo);
  if (error) return { error, data: null };

  return {
    error: null,
    data: {
      name: input.name.trim(),
      role: input.role.trim(),
      quote: input.quote.trim(),
      photo,
      published: input.published,
    },
  };
}

export async function createTestimonial(
  input: TestimonialInput
): Promise<SaveTestimonialResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Not authenticated." };
  }

  const { error, data } = toData(input);
  if (!data) return { ok: false, error: error! };

  const prisma = getPrisma();
  // New reviews land at the end of the list rather than the top: the order is
  // deliberate once someone has arranged it.
  const last = await prisma.testimonial.findFirst({
    orderBy: { position: "desc" },
    select: { position: true },
  });

  const created = await prisma.testimonial.create({
    data: {
      id: randomUUID(),
      position: (last?.position ?? -1) + 1,
      ...data,
    },
    select: { id: true },
  });

  revalidateTestimonials();
  return { ok: true, id: created.id };
}

export async function updateTestimonial(
  id: string,
  input: TestimonialInput
): Promise<SaveTestimonialResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Not authenticated." };
  }

  const { error, data } = toData(input);
  if (!data) return { ok: false, error: error! };

  await getPrisma().testimonial.update({ where: { id }, data });

  revalidateTestimonials();
  return { ok: true, id };
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Not authenticated." };
  }

  await getPrisma().testimonial.delete({ where: { id } });

  revalidateTestimonials();
  return { ok: true };
}

export async function setTestimonialPublished(
  id: string,
  published: boolean
): Promise<ActionResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Not authenticated." };
  }

  await getPrisma().testimonial.update({ where: { id }, data: { published } });

  revalidateTestimonials();
  return { ok: true };
}

/**
 * Moves one review one place up or down.
 *
 * The whole list is renumbered from its new order rather than swapping two
 * positions: seeded rows can share a position, and a swap between equals is a
 * no-op that looks like a broken button.
 */
export async function moveTestimonial(
  id: string,
  direction: "up" | "down"
): Promise<ActionResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Not authenticated." };
  }

  const prisma = getPrisma();
  const rows = await prisma.testimonial.findMany({
    orderBy: [{ position: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });

  const from = rows.findIndex((row) => row.id === id);
  if (from === -1) return { ok: false, error: "That review no longer exists." };

  const to = direction === "up" ? from - 1 : from + 1;
  if (to < 0 || to >= rows.length) return { ok: true };

  const reordered = [...rows];
  [reordered[from], reordered[to]] = [reordered[to], reordered[from]];

  await prisma.$transaction(
    reordered.map((row, index) =>
      prisma.testimonial.update({
        where: { id: row.id },
        data: { position: index },
      })
    )
  );

  revalidateTestimonials();
  return { ok: true };
}
