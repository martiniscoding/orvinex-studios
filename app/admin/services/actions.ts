"use server";

import { revalidatePath } from "next/cache";

import { randomUUID } from "node:crypto";

import { isAuthenticated } from "@/lib/admin";
import { getPrisma } from "@/lib/prisma";
import { slugify } from "@/lib/post";
import type { ServiceFaq } from "@/lib/service-page";
import { SERVICE_ICONS } from "@/lib/service-icons";
import { BANDS } from "@/lib/services";

export type ServicePageInput = {
  title: string;
  short: string;
  cardText: string;
  stack: string[];
  band: string;
  icon: string;
  featured: boolean;
  headline: string;
  intro: string;
  body: string;
  faq: ServiceFaq[];
  metaTitle: string;
  metaDescription: string;
  keyword: string;
};

export type SaveServiceResult =
  | { ok: true; slug: string }
  | { ok: false; error: string };

const BAND_IDS = BANDS.map((band) => band.id) as string[];

function validate(input: ServicePageInput): string | null {
  if (!input.title.trim()) return "A service name is required.";
  if (!input.cardText.trim()) return "The card description is required.";
  if (!input.headline.trim()) return "A headline is required.";
  if (!input.intro.trim()) return "An intro is required.";
  if (!input.body.trim()) return "The page has no content.";
  if (!BAND_IDS.includes(input.band)) return "Unknown band.";
  if (!(input.icon in SERVICE_ICONS)) return "Unknown icon.";
  return null;
}

/** Shared write shape, so create and update cannot drift apart. */
function toData(input: ServicePageInput) {
  return {
    title: input.title.trim(),
    short: input.short.trim() || input.title.trim(),
    cardText: input.cardText.trim(),
    stack: input.stack.map((s) => s.trim()).filter(Boolean).slice(0, 8),
    band: input.band,
    icon: input.icon,
    featured: input.featured,
    headline: input.headline.trim(),
    intro: input.intro.trim(),
    body: input.body,
    // Drop half-filled question rows rather than rendering an empty accordion.
    faq: input.faq
      .map((item) => ({ q: item.q.trim(), a: item.a.trim() }))
      .filter((item) => item.q && item.a),
    metaTitle: input.metaTitle.trim() || null,
    metaDescription: input.metaDescription.trim() || null,
    keyword: input.keyword.trim() || null,
  };
}

function revalidateService(slug: string) {
  revalidatePath(`/services/${slug}`);
  revalidatePath("/services");
  // The teaser grid on the landing page reads the same catalogue.
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin/services");
}

/** Finds a slug nobody is using, so two services can share a name. */
async function freeSlug(base: string, exceptSlug?: string) {
  const prisma = getPrisma();
  const root = slugify(base) || "service";
  for (let n = 1; n < 200; n++) {
    const candidate = n === 1 ? root : `${root}-${n}`;
    if (candidate === exceptSlug) return candidate;
    const clash = await prisma.servicePage.findUnique({
      where: { slug: candidate },
      select: { slug: true },
    });
    if (!clash) return candidate;
  }
  return `${root}-${Date.now()}`;
}

export async function createServicePage(
  input: ServicePageInput
): Promise<SaveServiceResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Not authenticated." };
  }
  const invalid = validate(input);
  if (invalid) return { ok: false, error: invalid };

  const prisma = getPrisma();
  const slug = await freeSlug(input.title);

  // Append to the end of its band.
  const last = await prisma.servicePage.findFirst({
    where: { band: input.band },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  await prisma.servicePage.create({
    data: {
      id: randomUUID(),
      slug,
      position: (last?.position ?? 0) + 1,
      ...toData(input),
    },
  });

  revalidateService(slug);
  return { ok: true, slug };
}

export async function deleteServicePage(slug: string) {
  if (!(await isAuthenticated())) {
    return { ok: false as const, error: "Not authenticated." };
  }
  const prisma = getPrisma();
  const existing = await prisma.servicePage.findUnique({ where: { slug } });
  if (!existing) return { ok: true as const };

  await prisma.servicePage.delete({ where: { slug } });
  revalidateService(slug);
  return { ok: true as const };
}

/** Moves a service up or down within its band. */
export async function moveServicePage(slug: string, direction: "up" | "down") {
  if (!(await isAuthenticated())) {
    return { ok: false as const, error: "Not authenticated." };
  }
  const prisma = getPrisma();
  const current = await prisma.servicePage.findUnique({ where: { slug } });
  if (!current) return { ok: false as const, error: "Unknown service." };

  const siblings = await prisma.servicePage.findMany({
    where: { band: current.band },
    orderBy: [{ position: "asc" }, { title: "asc" }],
    select: { slug: true, position: true },
  });

  const index = siblings.findIndex((s) => s.slug === slug);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || target < 0 || target >= siblings.length) {
    return { ok: true as const };
  }

  // Rewrite the whole band's positions. Swapping two rows leaves duplicate or
  // gapped values behind whenever the data started out untidy.
  const reordered = [...siblings];
  const [moved] = reordered.splice(index, 1);
  reordered.splice(target, 0, moved!);

  await prisma.$transaction(
    reordered.map((s, i) =>
      prisma.servicePage.update({
        where: { slug: s.slug },
        data: { position: i + 1 },
      })
    )
  );

  revalidateService(slug);
  return { ok: true as const };
}

export async function updateServicePage(
  slug: string,
  input: ServicePageInput
): Promise<SaveServiceResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Not authenticated." };
  }
  const invalid = validate(input);
  if (invalid) return { ok: false, error: invalid };

  const prisma = getPrisma();
  const existing = await prisma.servicePage.findUnique({ where: { slug } });
  if (!existing) return { ok: false, error: "That service no longer exists." };

  await prisma.servicePage.update({ where: { slug }, data: toData(input) });

  revalidateService(slug);
  return { ok: true, slug };
}
