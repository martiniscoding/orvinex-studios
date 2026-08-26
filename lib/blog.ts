import "server-only";

import { getPrisma } from "./prisma";
import { slugify, type PostFull, type PostSummary } from "./post";

/**
 * Finds a slug nobody is using yet, appending -2, -3 and so on.
 *
 * `exceptId` lets an edit keep its own slug: without it, saving a post
 * unchanged would see its own row and bump the slug on every save.
 */
export async function uniqueSlug(base: string, exceptId?: string) {
  const prisma = getPrisma();
  const root = slugify(base) || "post";
  for (let n = 1; n < 200; n++) {
    const candidate = n === 1 ? root : `${root}-${n}`;
    const clash = await prisma.post.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!clash || clash.id === exceptId) return candidate;
  }
  return `${root}-${Date.now()}`;
}

const SUMMARY_FIELDS = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  status: true,
  featured: true,
  keyword: true,
  publishedAt: true,
  updatedAt: true,
} as const;

function toSummary(row: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: string;
  featured: boolean;
  keyword: string | null;
  publishedAt: Date | null;
  updatedAt: Date;
}): PostSummary {
  return {
    ...row,
    publishedAt: row.publishedAt ? row.publishedAt.toISOString() : null,
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** The public index. Drafts are never returned here. */
export async function listPublishedPosts(): Promise<PostSummary[]> {
  const rows = await getPrisma().post.findMany({
    where: { status: "published" },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    select: SUMMARY_FIELDS,
  });
  return rows.map(toSummary);
}

/** Every post, drafts included. Callers must check auth first. */
export async function listAllPosts(): Promise<PostSummary[]> {
  const rows = await getPrisma().post.findMany({
    orderBy: [{ updatedAt: "desc" }],
    select: SUMMARY_FIELDS,
  });
  return rows.map(toSummary);
}

export async function getPublishedPost(slug: string): Promise<PostFull | null> {
  const row = await getPrisma().post.findUnique({ where: { slug } });
  if (!row || row.status !== "published") return null;
  return { ...toSummary(row), content: row.content };
}

/** Used by the editor, so it must return drafts too. */
export async function getPostById(id: string): Promise<PostFull | null> {
  const row = await getPrisma().post.findUnique({ where: { id } });
  if (!row) return null;
  return { ...toSummary(row), content: row.content };
}
