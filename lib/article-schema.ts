import {
  FOUNDER_ID,
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

const BLOG_ID = `${SITE_URL}/articles#blog`;

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
        url: `${SITE_URL}/articles`,
        name: "Orvinex Blog",
        description:
          "Practical writing on custom software, AI products and growth from the Orvinex engineering team.",
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en",
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${SITE_URL}/articles/${post.slug}#article`,
          headline: post.title,
          description: post.excerpt,
          url: `${SITE_URL}/articles/${post.slug}`,
          datePublished: post.publishedAt ?? undefined,
          dateModified: post.updatedAt,
        })),
      },
      breadcrumb([
        { name: "Home", url: SITE_URL },
        { name: "Blog", url: `${SITE_URL}/articles` },
      ]),
    ],
  };
}

export function postStructuredData(post: PostFull) {
  const url = `${SITE_URL}/articles/${post.slug}`;
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
        // A named person rather than the company: search guidance on article
        // quality leans on an identifiable author with a history. Points at
        // the founder node the layout already emits. Add a per-post author
        // field if anyone else starts writing.
        author: { "@id": FOUNDER_ID },
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
        { name: "Blog", url: `${SITE_URL}/articles` },
        { name: post.title, url },
      ]),
    ],
  };
}

/** Service page: the Service itself, its FAQ, and the breadcrumb trail. */
export function servicePageStructuredData(input: {
  slug: string;
  name: string;
  headline: string;
  description: string;
  faq: { q: string; a: string }[];
}) {
  const url = `${SITE_URL}/services/${input.slug}`;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: input.name,
      alternateName: input.headline,
      description: input.description,
      url,
      provider: { "@id": ORGANIZATION_ID },
      areaServed: "Worldwide",
      serviceType: input.name,
    },
    breadcrumb([
      { name: "Home", url: SITE_URL },
      { name: "Services", url: `${SITE_URL}/services` },
      { name: input.name, url },
    ]),
  ];

  // Only emit FAQPage when questions actually appear on the page — marking up
  // content a visitor cannot see is a structured-data violation.
  if (input.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: input.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
