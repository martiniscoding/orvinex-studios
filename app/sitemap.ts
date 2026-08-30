import type { MetadataRoute } from "next";

import { listPublishedPosts } from "@/lib/articles";
import { listCatalogue } from "@/lib/service-catalogue";

const SITE = "https://orvinex.store";

/** Cached; the post actions revalidate this path when visibility changes. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, services] = await Promise.all([
    listPublishedPosts(),
    listCatalogue(),
  ]);

  return [
    { url: SITE, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/services`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE}/articles`,
      changeFrequency: "weekly",
      priority: 0.7,
      lastModified: posts[0]?.updatedAt,
    },
    ...services.map((service) => ({
      url: `${SITE}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    // /admin is deliberately absent: it is noindex and disallowed.
    ...posts.map((post) => ({
      url: `${SITE}/articles/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: post.updatedAt,
    })),
  ];
}
