/**
 * schema.org structured data. The organisation and website are declared once
 * in the root layout and referenced elsewhere by @id, so Google ties every
 * article back to the same publisher.
 */
import { founder, site } from "@/content/site";
import type { Faq, Post } from "@/lib/articles";

const ORG = `${site.url}/#organization`;
const WEBSITE = `${site.url}/#website`;
const FOUNDER = `${site.url}/#founder`;

export const absolute = (p: string) => (p.startsWith("http") ? p : `${site.url}${p}`);

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG,
    name: site.name,
    url: site.url,
    logo: absolute("/work/logo.png"),
    email: site.email,
    founder: { "@id": FOUNDER },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE,
    name: site.name,
    url: site.url,
    publisher: { "@id": ORG },
  };
}

function personSchema() {
  return {
    "@type": "Person",
    "@id": FOUNDER,
    name: founder.name,
    jobTitle: founder.role,
    image: absolute(founder.photo),
    url: `${site.url}/#founder`,
    alumniOf: { "@type": "CollegeOrUniversity", name: founder.school },
    worksFor: { "@id": ORG },
  };
}

export function articleSchema(post: Post) {
  const url = absolute(`/articles/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: post.title,
    description: post.description,
    image: absolute(post.cover ?? `/articles/${post.slug}/opengraph-image`),
    datePublished: post.date,
    dateModified: post.updated,
    // Bylines other than the founder are plain names.
    author: post.author === founder.name ? personSchema() : { "@type": "Person", name: post.author },
    publisher: { "@id": ORG },
    isPartOf: { "@id": WEBSITE },
    articleSection: post.category,
    keywords: [post.keyword, ...post.keywords].join(", "),
    wordCount: post.words,
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
