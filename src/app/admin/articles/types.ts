import type { ArticleFields, Heading } from "@/lib/articles";
import type { Audit } from "@/lib/seo-audit";

/** What the editor sends: every written field. Publishing is its own action. */
export type ArticleDraft = Omit<ArticleFields, "draft">;

export type Analysis = {
  audit: Audit;
  html: string;
  words: number;
  readingMinutes: number;
  toc: Heading[];
  /** The SEO title as Google will show it (the default filled in). */
  metaTitle: string;
};

export type SaveResult =
  | { ok: true; version: string; slug: string; draft: boolean; date: string }
  | { ok: false; error: string; conflict?: boolean };

export const categories = [
  "Web development",
  "Mobile apps",
  "Custom software",
  "AI",
  "E-commerce",
  "SEO",
  "Marketing",
  "Product",
];
