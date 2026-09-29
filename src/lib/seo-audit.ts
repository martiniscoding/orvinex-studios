/**
 * The on-page SEO audit, shared by `npm run seo:check` (Markdown files) and
 * the admin editor (live, as you type). Every rule returns a check that
 * passes or fails; errors block publishing, warnings don't.
 *
 * Imports nothing through the "@/" alias so scripts can use it.
 */
import type { Post } from "./articles";
import { serviceDetails } from "../content/serviceDetails";
import { site } from "../content/site";

export type CheckGroup = "Basics" | "Keyword" | "Search snippet" | "Content" | "Structure" | "Links" | "Extras";

export type Check = {
  group: CheckGroup;
  level: "error" | "warn";
  ok: boolean;
  /** What passing means, or what's wrong when it fails. */
  text: string;
};

export type Audit = {
  checks: Check[];
  errors: number;
  warnings: number;
  /** 0–100: errors weigh more than warnings. */
  score: number;
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
export const hasPhrase = (hay: string, needle: string) =>
  norm(needle) !== "" && ` ${norm(hay)} `.includes(` ${norm(needle)} `);
const count = (hay: string, needle: string) => {
  const h = ` ${norm(hay)} `;
  const n = ` ${norm(needle)} `;
  if (!n.trim()) return 0;
  let i = 0;
  let c = 0;
  while ((i = h.indexOf(n, i)) !== -1) {
    c++;
    i += n.length - 1;
  }
  return c;
};

/** Every internal route an article may link to, given all the articles. */
export function knownRoutes(posts: Post[]) {
  return new Set([
    "/",
    "/services",
    "/work",
    "/pricing",
    "/articles",
    "/privacy",
    "/termsandconditions",
    ...serviceDetails.map((s) => `/services/${s.id}`),
    ...posts.map((p) => `/articles/${p.slug}`),
  ]);
}

/**
 * @param p      the article
 * @param others every other article, from both sources (for duplicate and link checks)
 */
export function auditPost(p: Post, others: Post[]): Audit {
  const checks: Check[] = [];
  const add = (group: CheckGroup, level: Check["level"], ok: boolean, pass: string, fail: string) =>
    checks.push({ group, level, ok, text: ok ? pass : fail });
  const kw = p.keyword;
  const kwWords = norm(kw).split(" ").filter(Boolean);

  // Basics
  const missing = (
    [
      ["title", p.title],
      ["target keyword", kw],
      ["meta description", p.description],
      ["category", p.category],
    ] as const
  )
    .filter(([, v]) => !v.trim())
    .map(([k]) => k);
  add("Basics", "error", missing.length === 0, "Title, keyword, description and category are set", `Missing: ${missing.join(", ")}`);
  add(
    "Basics",
    "error",
    /^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug),
    "URL is lowercase words joined by hyphens",
    `URL "${p.slug}" should be lowercase words joined by hyphens`,
  );
  const slugWords = p.slug.split("-").length;
  add("Basics", "warn", slugWords <= 6, `URL is short (${slugWords} words)`, `URL has ${slugWords} words; aim for 3–6`);
  const kwInSlug = kwWords.filter((w) => w.length > 2 && p.slug.includes(w)).length;
  add(
    "Basics",
    "warn",
    kwInSlug >= Math.min(2, kwWords.length),
    "URL contains the keyword's main words",
    "URL doesn't contain the keyword's main words",
  );

  // Keyword placement
  add("Keyword", "error", hasPhrase(p.title, kw), "Title (H1) contains the keyword", "Title (H1) doesn't contain the keyword");
  const first100 = p.text.split(" ").slice(0, 100).join(" ");
  add("Keyword", "error", hasPhrase(first100, kw), "Keyword appears in the first 100 words", "Keyword isn't in the first 100 words");
  const occurrences = count(p.text, kw);
  add(
    "Keyword",
    "warn",
    occurrences >= 3,
    `Keyword used ${occurrences}× in the body`,
    `Keyword used ${occurrences}× in the body; use it naturally 3+ times`,
  );
  const density = ((occurrences * Math.max(kwWords.length, 1)) / Math.max(p.words, 1)) * 100;
  add(
    "Keyword",
    "warn",
    density <= 2.5,
    `Keyword density ${density.toFixed(1)}% reads naturally`,
    `Keyword density ${density.toFixed(1)}%; above ~2.5% reads as stuffing`,
  );
  add(
    "Keyword",
    "warn",
    p.headings.some((h) => hasPhrase(h.text, kw) || p.keywords.some((k) => hasPhrase(h.text, k))),
    "A subheading contains the keyword or a secondary keyword",
    "No H2/H3 contains the keyword or a secondary keyword",
  );
  add("Keyword", "warn", p.keywords.length > 0, "Secondary keywords are set", "Add secondary keywords (variants, “People also ask”)");

  // Search snippet
  add("Search snippet", "warn", p.title.length <= 70, "Title is under 70 characters", `Title is ${p.title.length} characters; keep it under 70`);
  add("Search snippet", "error", hasPhrase(p.metaTitle, kw), "SEO title contains the keyword", "SEO title doesn't contain the keyword");
  add(
    "Search snippet",
    "warn",
    p.metaTitle.length >= 30 && p.metaTitle.length <= 60,
    `SEO title is ${p.metaTitle.length} characters`,
    `SEO title is ${p.metaTitle.length} characters; aim for 30–60 (Google cuts off around 60)`,
  );
  add(
    "Search snippet",
    "warn",
    norm(p.metaTitle).indexOf(norm(kw)) <= 25,
    "Keyword is near the front of the SEO title",
    "Keyword appears late in the SEO title; move it towards the front",
  );
  add("Search snippet", "error", hasPhrase(p.description, kw), "Meta description contains the keyword", "Meta description doesn't contain the keyword");
  add(
    "Search snippet",
    "warn",
    p.description.length >= 120 && p.description.length <= 160,
    `Meta description is ${p.description.length} characters`,
    `Meta description is ${p.description.length} characters; aim for 120–160`,
  );

  // Content
  add("Content", "error", p.words >= 600, `${p.words.toLocaleString("en")} words`, `Only ${p.words} words; thin content rarely ranks (600 minimum)`);
  if (p.words >= 600)
    add("Content", "warn", p.words >= 1200, "1,200+ words: enough depth for competitive topics", `${p.words} words; most competitive topics need 1,200+`);
  const paragraphs = p.html.match(/<p>[\s\S]*?<\/p>/g) ?? [];
  const longParas = paragraphs.filter((x) => x.replace(/<[^>]+>/g, "").split(/\s+/).length > 110).length;
  add("Content", "warn", longParas === 0, "Paragraphs are short enough to skim", `${longParas} paragraph(s) over 110 words; break them up`);
  const sentences = p.text.split(/[.!?]+\s/).filter((s) => s.trim().split(" ").length > 2);
  const avgSentence = sentences.length ? p.words / sentences.length : 0;
  add(
    "Content",
    "warn",
    avgSentence <= 22,
    `Sentences average ${Math.round(avgSentence)} words`,
    `Sentences average ${Math.round(avgSentence)} words; aim for under 22`,
  );

  // Structure
  const h2s = p.headings.filter((h) => h.depth === 2);
  add("Structure", "error", !p.headings.some((h) => h.depth === 1), "No extra H1 in the body", "Body contains an H1 (“# …”); the title is the H1, start sections at “##”");
  add("Structure", "error", h2s.length >= 3, `${h2s.length} H2 sections`, `${h2s.length} H2 section(s); structure the article with at least 3`);
  const skip = p.headings.find((h, i) => i > 0 && h.depth > p.headings[i - 1].depth + 1);
  add("Structure", "error", !skip, "Headings don't skip levels", `Heading “${skip?.text}” skips a level`);

  // Links
  const routes = knownRoutes([p, ...others]);
  const internal = p.links.filter((l) => l.startsWith("/") || l.startsWith(site.url));
  const external = p.links.filter((l) => /^https?:\/\//.test(l) && !l.startsWith(site.url));
  const route = (l: string) => l.replace(site.url, "").split(/[?#]/)[0].replace(/\/$/, "") || "/";
  add("Links", "error", internal.length > 0, "Links to other pages on the site", "No internal links; link to at least one service page");
  if (internal.length > 0)
    add("Links", "warn", internal.length >= 3, `${internal.length} internal links`, `${internal.length} internal link(s); aim for 3–6`);
  const broken = internal.filter((l) => !routes.has(route(l)));
  add("Links", "error", broken.length === 0, "No broken internal links", `Broken internal link(s): ${broken.join(", ")}`);
  const toDrafts = internal.filter((l) => others.some((o) => o.draft && `/articles/${o.slug}` === route(l)));
  if (!p.draft)
    add("Links", "warn", toDrafts.length === 0, "No links to unpublished articles", `Links to unpublished article(s): ${toDrafts.join(", ")}`);
  add("Links", "warn", external.length > 0, "Cites at least one external source", "No external links; cite at least one authoritative source");
  add(
    "Links",
    "warn",
    p.services.some((s) => internal.some((l) => route(l) === `/services/${s}`)),
    "Body links to one of its own services",
    p.services.length ? "Body doesn't link to any of its own services" : "Pick at least one related service",
  );

  // Extras
  const noAlt = p.images.filter((img) => !img.alt.trim());
  add("Extras", "error", noAlt.length === 0, "Every image has alt text", `${noAlt.length} image(s) without alt text`);
  if (p.cover) add("Extras", "error", Boolean(p.coverAlt), "Cover image has alt text", "Cover image has no alt text");
  add("Extras", "warn", p.faqs.length >= 3, `${p.faqs.length} FAQs (for “People also ask”)`, `${p.faqs.length} FAQ(s); 3–5 real questions help win “People also ask”`);
  const unknown = p.services.filter((s) => !serviceDetails.some((d) => d.id === s));
  add("Extras", "error", unknown.length === 0, "Services are valid", `Unknown service(s): ${unknown.join(", ")}`);

  // Uniqueness across the site
  const sameSlug = others.find((o) => o.slug === p.slug);
  add("Basics", "error", !sameSlug, "URL is unique", `“${sameSlug?.title}” already uses this URL`);
  const sameKw = others.find((o) => kw && norm(o.keyword) === norm(kw));
  add("Basics", "error", !sameKw, "No other article targets this keyword", `“${sameKw?.title}” already targets this keyword; two pages competing for one query hurts both`);
  const sameTitle = others.find((o) => o.metaTitle === p.metaTitle);
  add("Search snippet", "error", !sameTitle, "SEO title is unique", `Same SEO title as “${sameTitle?.title}”`);
  const sameDesc = others.find((o) => p.description && o.description === p.description);
  add("Search snippet", "error", !sameDesc, "Meta description is unique", `Same meta description as “${sameDesc?.title}”`);
  const overlap = serviceDetails.find((s) => hasPhrase(s.metaTitle, kw));
  add(
    "Basics",
    "warn",
    !overlap,
    "Keyword doesn't compete with a service page",
    `Keyword overlaps the /services/${overlap?.id} page; make sure the article targets a different intent`,
  );

  const errors = checks.filter((c) => !c.ok && c.level === "error").length;
  const warnings = checks.filter((c) => !c.ok && c.level === "warn").length;
  const weight = (c: Check) => (c.level === "error" ? 3 : 1);
  const total = checks.reduce((s, c) => s + weight(c), 0);
  const passed = checks.filter((c) => c.ok).reduce((s, c) => s + weight(c), 0);
  return { checks, errors, warnings, score: Math.round((passed / Math.max(total, 1)) * 100) };
}
