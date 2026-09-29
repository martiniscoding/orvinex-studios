import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { serviceDetails } from "@/content/serviceDetails";
import { site } from "@/content/site";

/**
 * Every indexable page. Static pages carry no lastModified: a date that
 * changes on every build is noise, and Google learns to ignore it.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (p: string) => `${site.url}${p}`;
  const posts = await getPosts();

  return [
    { url: url("/"), priority: 1 },
    { url: url("/services"), priority: 0.9 },
    ...serviceDetails.map((s) => ({ url: url(`/services/${s.id}`), priority: 0.8 })),
    { url: url("/work"), priority: 0.7 },
    {
      url: url("/articles"),
      priority: 0.7,
      ...(posts[0] && { lastModified: posts.reduce((m, p) => (p.updated > m ? p.updated : m), posts[0].updated) }),
    },
    ...posts.map((p) => ({ url: url(`/articles/${p.slug}`), lastModified: p.updated, priority: 0.6 })),
    { url: url("/privacy"), priority: 0.2 },
    { url: url("/termsandconditions"), priority: 0.2 },
  ];
}
