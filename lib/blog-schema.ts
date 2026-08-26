import {
  LOGO_ID,
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
} from "@/app/structured-data";
import { readingTime, type PostFull, type PostSummary } from "./post";

/**
 * JSON-LD for the blog.
 *
 * Publisher and author are `@id` references rather than inline objects: the
 * root layout already emits the Organization node on every page, so pointing
 * at it keeps one entity instead of creating a second, weaker duplicate.
 */

const BLOG_ID = `${SITE_URL}/blog#blog`;

function breadcrumb(trail: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${trail[trail.length - 1]!.url}#breadcrumb`,
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: step.url,
    })),
  };
}

export function blogIndexStructuredData(posts: PostSummary[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": BLOG_ID,
        url: `${SITE_URL}/blog`,
        name: "Orvinex Blog",
        description:
          "Practical writing on custom software, AI products and growth from the Orvinex engineering team.",
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en",
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${SITE_URL}/blog/${post.slug}#article`,
          headline: post.title,
          description: post.excerpt,
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.publishedAt ?? undefined,
          dateModified: post.updatedAt,
        })),
      },
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Blog", url: `${SITE_URL}/blog` },
      ]),
    ],
  };
}

export function postStructuredData(post: PostFull) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        url,
        mainEntityOfPage: url,
        datePublished: post.publishedAt ?? undefined,
        dateModified: post.updatedAt,
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": BLOG_ID },
        image: `${url}/opengraph-image`,
        // Google reads wordCount and timeRequired for article rich results.
        wordCount: post.content.trim().split(/\s+/).filter(Boolean).length,
        timeRequired: `PT${readingTime(post.content)}M`,
        inLanguage: "en",
        thumbnailUrl: `${SITE_URL}/logo.png`,
        publisherLogo: { "@id": LOGO_ID },
      },
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Blog", url: `${SITE_URL}/blog` },
        { name: post.title, url },
      ]),
    ],
  };
}
