"use server";

import { revalidatePath } from "next/cache";

import { isAuthenticated } from "@/lib/admin";
import { getPrisma } from "@/lib/prisma";
import type { ServiceFaq } from "@/lib/service-page";
import { SERVICES } from "@/lib/services";

export type ServicePageInput = {
  headline: string;
  intro: string;
  body: string;
  faq: ServiceFaq[];
  metaTitle: string;
  metaDescription: string;
  keyword: string;
};

export type SaveServiceResult = { ok: true } | { ok: false; error: string };

export async function updateServicePage(
  slug: string,
  input: ServicePageInput
): Promise<SaveServiceResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Not authenticated." };
  }
  // The catalogue in code decides which services exist; a slug outside it must
  // not be able to create a row.
  if (!SERVICES.some((service) => service.slug === slug)) {
    return { ok: false, error: "Unknown service." };
  }

  if (!input.headline.trim()) return { ok: false, error: "A headline is required." };
  if (!input.intro.trim()) return { ok: false, error: "An intro is required." };
  if (!input.body.trim()) return { ok: false, error: "The page has no content." };

  // Drop half-filled question rows rather than rendering an empty accordion.
  const faq = input.faq
    .map((item) => ({ q: item.q.trim(), a: item.a.trim() }))
    .filter((item) => item.q && item.a);

  await getPrisma().servicePage.update({
    where: { slug },
    data: {
      headline: input.headline.trim(),
      intro: input.intro.trim(),
      body: input.body,
      faq,
      metaTitle: input.metaTitle.trim() || null,
      metaDescription: input.metaDescription.trim() || null,
      keyword: input.keyword.trim() || null,
    },
  });

  revalidatePath(`/services/${slug}`);
  revalidatePath("/services");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/services");
  return { ok: true };
}
