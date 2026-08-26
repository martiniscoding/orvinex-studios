import type { MetadataRoute } from "next";

import { listPublishedPosts } from "@/lib/blog";

const SITE = "https://orvinex.store";

/**
 * Regenerated per request so a post appears in the sitemap as soon as it is
 * published, rather than waiting for the next deploy.
 */
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPublishedPosts();

  return [
    { url: SITE, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/services`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
      lastModified: posts[0]?.updatedAt,
    },
    // /admin is deliberately absent: it is noindex and disallowed.
    ...posts.map((post) => ({
      url: `${SITE}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: post.updatedAt,
    })),
  ];
}
