/**
 * Articles come from two places, rendered the same way into a `Post`:
 *
 * - Markdown files in /content/articles. The file name is the URL:
 *   content/articles/custom-software-vs-saas.md is /articles/custom-software-vs-saas.
 *   README.md and files starting with "_" are ignored (the writing guide,
 *   templates, notes).
 * - Rows in the `articles` table, written in the admin panel (/admin/articles);
 *   see article-store.ts.
 *
 * This file is the shared, database-free part: types, Markdown rendering and
 * the file loader. The site reads the merged list through posts.ts. Used by
 * scripts/seo-check.ts too, so it imports nothing through the "@/" alias.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Root, Element, ElementContent } from "hast";
import { founder, site } from "../content/site";

export { slugify } from "./slug";

export const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export type Faq = { q: string; a: string };
export type Heading = { depth: number; id: string; text: string };

/** The fields an author writes; everything else in a `Post` is derived. */
export type ArticleFields = {
  slug: string;
  title: string;
  /** Empty means "<title> | Orvinex". */
  metaTitle: string;
  description: string;
  keyword: string;
  keywords: string[];
  category: string;
  /** YYYY-MM-DD */
  date: string;
  /** YYYY-MM-DD, or empty when never updated. */
  updated: string;
  /** Empty means the founder. */
  author: string;
  cover: string;
  coverAlt: string;
  services: string[];
  faqs: Faq[];
  draft: boolean;
  /** Markdown, without frontmatter. */
  body: string;
};

export type Post = {
  slug: string;
  /** Where it lives: the file name, or "admin #<id>" for a database article. */
  file: string;
  source: "file" | "db";
  /** The row id, for database articles. */
  id?: number;
  /** The H1. */
  title: string;
  /** The <title>. Defaults to "<title> | Orvinex". */
  metaTitle: string;
  description: string;
  /** The one search phrase this article is written to rank for. */
  keyword: string;
  /** Secondary phrases and close variants. */
  keywords: string[];
  category: string;
  /** YYYY-MM-DD */
  date: string;
  /** YYYY-MM-DD; equals `date` when never updated. */
  updated: string;
  author: string;
  cover?: string;
  coverAlt?: string;
  /** Service ids from site.ts this article sells; the first drives the CTA. */
  services: string[];
  faqs: Faq[];
  draft: boolean;

  html: string;
  /** Plain text of the body, for word counts and keyword checks. */
  text: string;
  words: number;
  readingMinutes: number;
  /** Every heading in the body; `toc` is the h2/h3 subset. */
  headings: Heading[];
  toc: Heading[];
  links: string[];
  images: { src: string; alt: string }[];
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;

function textOf(node: Root | ElementContent): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map((c) => textOf(c as ElementContent)).join("");
  return "";
}

function toDate(value: unknown, field: string, file: string): string {
  // YAML turns an unquoted 2026-09-29 into a Date.
  const s = value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? "");
  if (!DATE.test(s)) throw new Error(`content/articles/${file}: "${field}" must be a YYYY-MM-DD date, got "${s}"`);
  return s;
}

export function render(markdown: string) {
  const headings: Heading[] = [];
  const links: string[] = [];
  const images: { src: string; alt: string }[] = [];

  /** Collects headings, links and images, and hardens external links. */
  const inspect = () => (tree: Root) => {
    visit(tree, "element", (el: Element, index, parent) => {
      const depth = /^h([1-6])$/.exec(el.tagName)?.[1];
      if (depth) {
        headings.push({ depth: Number(depth), id: String(el.properties.id ?? ""), text: textOf(el) });
      } else if (el.tagName === "a") {
        const href = String(el.properties.href ?? "");
        links.push(href);
        if (/^https?:\/\//.test(href) && !href.startsWith(site.url)) {
          el.properties.target = "_blank";
          el.properties.rel = ["noopener", "noreferrer"];
        }
      } else if (el.tagName === "img") {
        images.push({ src: String(el.properties.src ?? ""), alt: String(el.properties.alt ?? "") });
        el.properties.loading = "lazy";
        el.properties.decoding = "async";
      } else if (el.tagName === "table" && parent && index !== undefined) {
        // Wide tables scroll inside their own box instead of the page. The
        // wrapper replaces the table in its parent, so the walk carries on
        // into the table itself and never revisits it.
        parent.children[index] = {
          type: "element",
          tagName: "div",
          properties: { className: ["table-wrap"] },
          children: [el],
        };
      }
    });
  };

  let text = "";
  const html = String(
    unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(inspect)
      .use(() => (tree: Root) => {
        // Block boundaries become spaces, so "end.<p>Next" counts two words.
        text = textOf(tree).replace(/\s+/g, " ").trim();
      })
      .use(rehypeStringify)
      .processSync(markdown),
  );

  return { html, text, headings, links, images };
}

/** Builds a `Post` from its written fields; the one path for files and rows alike. */
export function buildPost(
  f: ArticleFields,
  origin: { source: "file"; file: string } | { source: "db"; id: number },
): Post {
  const { html, text, headings, links, images } = render(f.body);
  const words = text ? text.split(" ").length : 0;
  const title = f.title.trim();

  return {
    slug: f.slug,
    file: origin.source === "file" ? origin.file : `admin #${origin.id}`,
    source: origin.source,
    id: origin.source === "db" ? origin.id : undefined,
    title,
    metaTitle: f.metaTitle.trim() || `${title} | ${site.name}`,
    description: f.description.trim(),
    keyword: f.keyword.trim(),
    keywords: f.keywords.map((k) => k.trim()).filter(Boolean),
    category: f.category.trim(),
    date: f.date,
    updated: f.updated || f.date,
    author: f.author.trim() || founder.name,
    cover: f.cover.trim() || undefined,
    coverAlt: f.coverAlt.trim() || undefined,
    services: f.services,
    faqs: f.faqs.filter((x) => x.q.trim() && x.a.trim()),
    draft: f.draft,
    html,
    text,
    words,
    readingMinutes: Math.max(1, Math.round(words / 230)),
    headings,
    toc: headings.filter((h) => h.depth === 2 || h.depth === 3),
    links,
    images,
  };
}

function load(file: string): Post {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
  const { data, content } = matter(raw);

  for (const field of ["title", "description", "keyword", "category", "date"]) {
    if (!data[field]) throw new Error(`content/articles/${file}: missing "${field}" in the frontmatter`);
  }

  return buildPost(
    {
      slug: file.replace(/\.md$/, ""),
      title: String(data.title),
      metaTitle: String(data.metaTitle ?? ""),
      description: String(data.description),
      keyword: String(data.keyword),
      keywords: (data.keywords ?? []).map(String),
      category: String(data.category),
      date: toDate(data.date, "date", file),
      updated: data.updated ? toDate(data.updated, "updated", file) : "",
      author: String(data.author ?? ""),
      cover: String(data.cover ?? ""),
      coverAlt: String(data.coverAlt ?? ""),
      services: (data.services ?? []).map(String),
      faqs: (data.faqs ?? []).map((f: Faq) => ({ q: String(f.q), a: String(f.a) })),
      draft: Boolean(data.draft),
      body: content,
    },
    { source: "file", file },
  );
}

let cache: Post[] | null = null;

/** Every Markdown-file article, drafts and future-dated ones included, newest first. */
export function getFilePosts(): Post[] {
  // Re-read on every request in dev so edits show up without a restart.
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(ARTICLES_DIR)
    ? fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
    : [];
  cache = files.map(load).sort(newestFirst);
  return cache;
}

export const newestFirst = (a: Post, b: Post) => b.date.localeCompare(a.date);

export const today = () => new Date().toISOString().slice(0, 10);

/**
 * What the site shows. Drafts appear only in `next dev`; posts dated in the
 * future stay hidden until that date.
 */
export function visible(posts: Post[]): Post[] {
  if (process.env.NODE_ENV === "development") return posts;
  const now = today();
  return posts.filter((p) => !p.draft && p.date <= now);
}

/** Up to `n` of `pool`, ranked by shared services, category and keywords. */
export function relatedTo(post: Post, pool: Post[], n = 3): Post[] {
  const words = (p: Post) => new Set([p.keyword, ...p.keywords].join(" ").toLowerCase().split(/\W+/));
  const mine = words(post);
  return pool
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = p.category === post.category ? 3 : 0;
      score += p.services.filter((s) => post.services.includes(s)).length * 2;
      for (const w of words(p)) if (w.length > 3 && mine.has(w)) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, n)
    .map((x) => x.p);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
