"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";

import { isAuthenticated } from "@/lib/admin";
import { uniqueSlug } from "@/lib/blog";
import { POST_STATUSES, type PostStatus } from "@/lib/post";
import { getPrisma } from "@/lib/prisma";

export type PostInput = {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  status: string;
  featured: boolean;
};

export type SaveResult =
  | { ok: true; id: string; slug: string }
  | { ok: false; error: string };

function validate(input: PostInput): string | null {
  if (!input.title.trim()) return "A title is required.";
  if (input.title.trim().length > 160) return "Title is over 160 characters.";
  if (!input.excerpt.trim()) return "An excerpt is required — it is what the index and search results show.";
  if (input.excerpt.trim().length > 300) return "Excerpt is over 300 characters.";
  if (!input.content.trim()) return "The post has no content.";
  if (!POST_STATUSES.includes(input.status as PostStatus)) {
    return "Unknown status.";
  }
  return null;
}

/**
 * Only one post carries the "Start here" label, so promoting one demotes the
 * rest. Done in the same transaction as the write, or a failure between the
 * two would leave the index with two featured posts.
 */
async function clearOtherFeatured(exceptId: string) {
  await getPrisma().post.updateMany({
    where: { featured: true, NOT: { id: exceptId } },
    data: { featured: false },
  });
}

/** Revalidates every route a post can appear on. */
function revalidatePost(slug: string) {
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blog");
}

export async function createPost(input: PostInput): Promise<SaveResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Not authenticated." };
  }
  const invalid = validate(input);
  if (invalid) return { ok: false, error: invalid };

  const id = randomUUID();
  const slug = await uniqueSlug(input.slug.trim() || input.title);

  await getPrisma().post.create({
    data: {
      id,
      slug,
      title: input.title.trim(),
      excerpt: input.excerpt.trim(),
      content: input.content,
      status: input.status,
      featured: input.featured,
      // Stamped only when it actually goes live, so drafts stay undated.
      publishedAt: input.status === "published" ? new Date() : null,
    },
  });

  if (input.featured) await clearOtherFeatured(id);
  revalidatePost(slug);
  return { ok: true, id, slug };
}

export async function updatePost(
  id: string,
  input: PostInput
): Promise<SaveResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Not authenticated." };
  }
  const invalid = validate(input);
  if (invalid) return { ok: false, error: invalid };

  const prisma = getPrisma();
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { ok: false, error: "That post no longer exists." };

  const slug = await uniqueSlug(input.slug.trim() || input.title, id);

  await prisma.post.update({
    where: { id },
    data: {
      slug,
      title: input.title.trim(),
      excerpt: input.excerpt.trim(),
      content: input.content,
      status: input.status,
      featured: input.featured,
      // Keep the original publication date. Re-stamping it on every edit
      // would shuffle a live post back to the top of the index.
      publishedAt:
        input.status === "published"
          ? (existing.publishedAt ?? new Date())
          : existing.publishedAt,
    },
  });

  if (input.featured) await clearOtherFeatured(id);
  revalidatePost(slug);
  // The slug may have changed, so drop the old URL from the cache too.
  if (existing.slug !== slug) revalidatePath(`/blog/${existing.slug}`);
  return { ok: true, id, slug };
}

export async function setPostStatus(id: string, status: string) {
  if (!(await isAuthenticated())) {
    return { ok: false as const, error: "Not authenticated." };
  }
  if (!POST_STATUSES.includes(status as PostStatus)) {
    return { ok: false as const, error: "Unknown status." };
  }

  const prisma = getPrisma();
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { ok: false as const, error: "That post no longer exists." };

  await prisma.post.update({
    where: { id },
    data: {
      status,
      publishedAt:
        status === "published"
          ? (existing.publishedAt ?? new Date())
          : existing.publishedAt,
    },
  });

  revalidatePost(existing.slug);
  return { ok: true as const };
}

export async function setPostFeatured(id: string, featured: boolean) {
  if (!(await isAuthenticated())) {
    return { ok: false as const, error: "Not authenticated." };
  }
  const prisma = getPrisma();
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { ok: false as const, error: "That post no longer exists." };

  await prisma.post.update({ where: { id }, data: { featured } });
  if (featured) await clearOtherFeatured(id);

  revalidatePost(existing.slug);
  return { ok: true as const };
}

export async function deletePost(id: string) {
  if (!(await isAuthenticated())) {
    return { ok: false as const, error: "Not authenticated." };
  }
  const prisma = getPrisma();
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { ok: true as const };

  await prisma.post.delete({ where: { id } });
  revalidatePost(existing.slug);
  return { ok: true as const };
}
