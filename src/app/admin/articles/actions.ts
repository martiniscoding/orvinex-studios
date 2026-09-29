"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { buildPost, getFilePosts, slugify, today, type ArticleFields } from "@/lib/articles";
import {
  deleteArticle as removeArticle,
  getArticle,
  insertArticle,
  setDraft,
  slugTaken,
  updateArticle,
} from "@/lib/article-store";
import { ARTICLES_TAG, getAllPosts } from "@/lib/posts";
import { auditPost } from "@/lib/seo-audit";
import { serviceDetails } from "@/content/serviceDetails";
import type { Analysis, ArticleDraft, SaveResult } from "./types";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
const list = (v: unknown, max: number, each: number) =>
  Array.isArray(v) ? [...new Set(v.map((x) => str(x, each).trim()).filter(Boolean))].slice(0, max) : [];

/** Never trust the client: every field is typed, trimmed and length-capped here. */
function clean(input: ArticleDraft, draft: boolean): ArticleFields {
  const date = str(input.date, 10);
  const updated = str(input.updated, 10);
  return {
    slug: slugify(str(input.slug, 120)),
    title: str(input.title, 200).trim(),
    metaTitle: str(input.metaTitle, 200).trim(),
    description: str(input.description, 400).trim(),
    keyword: str(input.keyword, 120).trim(),
    keywords: list(input.keywords, 20, 120),
    category: str(input.category, 60).trim(),
    date: DATE.test(date) ? date : today(),
    updated: DATE.test(updated) ? updated : "",
    author: str(input.author, 120).trim(),
    cover: str(input.cover, 500).trim(),
    coverAlt: str(input.coverAlt, 300).trim(),
    services: list(input.services, 10, 60).filter((s) => serviceDetails.some((d) => d.id === s)),
    faqs: (Array.isArray(input.faqs) ? input.faqs : [])
      .slice(0, 12)
      .map((f) => ({ q: str(f?.q, 300).trim(), a: str(f?.a, 2000).trim() })),
    draft,
    body: str(input.body, 200_000),
  };
}

/** The article as it would be published, audited against every other article. */
async function analyse(id: number, fields: ArticleFields) {
  const post = buildPost({ ...fields, draft: false }, { source: "db", id });
  const others = (await getAllPosts()).filter((p) => !(p.source === "db" && p.id === id));
  return { post, audit: auditPost(post, others) };
}

/** Live feedback while typing: the rendered body and the SEO audit. Saves nothing. */
export async function analyseArticle(id: number, input: ArticleDraft): Promise<Analysis> {
  await requireAdmin();
  const { post, audit } = await analyse(id, clean(input, false));
  return {
    audit,
    html: post.html,
    words: post.words,
    readingMinutes: post.readingMinutes,
    toc: post.toc,
    metaTitle: post.metaTitle,
  };
}

/** Drop every cached copy of the article list: the public pages and the admin. */
function refresh(touchesSite: boolean) {
  revalidateTag(ARTICLES_TAG);
  revalidatePath("/admin/articles");
  if (touchesSite) {
    revalidatePath("/articles", "layout");
    revalidatePath("/sitemap.xml");
  }
}

async function checkSlug(slug: string, id: number): Promise<string | null> {
  if (!slug) return "The URL can't be empty.";
  if (getFilePosts().some((p) => p.slug === slug)) return `A Markdown article already uses /articles/${slug}.`;
  if (await slugTaken(slug, id)) return `Another article uses (or used) /articles/${slug}.`;
  return null;
}

/**
 * Saves the article. A draft stays a draft; `publish` makes it live. A live
 * article (or one being published) must pass the audit with no errors, the
 * same gate `npm run build` applies to Markdown articles.
 *
 * `version` is the updated_at the editor loaded; if the row has changed since
 * (another tab), the save is refused rather than silently overwriting it.
 */
async function save(id: number, input: ArticleDraft, version: string, publish: boolean): Promise<SaveResult> {
  await requireAdmin();
  const existing = await getArticle(id);
  if (!existing) return { ok: false, error: "This article no longer exists." };
  if (existing.updatedAt.toISOString() !== version) {
    return {
      ok: false,
      conflict: true,
      error: "This article was changed in another tab or window. Reload to get the latest version.",
    };
  }

  const draft = publish ? false : existing.draft;
  const fields = clean(input, draft);
  const slugError = await checkSlug(fields.slug, id);
  if (slugError) return { ok: false, error: slugError };

  if (!draft) {
    const { audit } = await analyse(id, fields);
    if (audit.errors) {
      return {
        ok: false,
        error: `Fix the ${audit.errors} SEO error${audit.errors === 1 ? "" : "s"} first${
          existing.draft ? "" : ", or unpublish the article to save it as a draft"
        }.`,
      };
    }
  }

  // Moving a live article: remember the old URL so it redirects (301) here.
  const keepOldSlug = !existing.draft && existing.slug !== fields.slug ? existing.slug : null;
  await updateArticle(id, fields, keepOldSlug);
  refresh(!draft || !existing.draft);

  const saved = await getArticle(id);
  return { ok: true, version: saved!.updatedAt.toISOString(), slug: fields.slug, draft, date: fields.date };
}

export async function saveArticle(id: number, input: ArticleDraft, version: string) {
  return save(id, input, version, false);
}

export async function publishArticle(id: number, input: ArticleDraft, version: string) {
  return save(id, input, version, true);
}

export async function unpublishArticle(id: number): Promise<SaveResult> {
  await requireAdmin();
  const existing = await getArticle(id);
  if (!existing) return { ok: false, error: "This article no longer exists." };
  await setDraft(id, true);
  refresh(true);
  const saved = await getArticle(id);
  return { ok: true, version: saved!.updatedAt.toISOString(), slug: saved!.slug, draft: true, date: saved!.date };
}

export async function createArticle() {
  await requireAdmin();
  const id = await insertArticle({
    slug: `untitled-${crypto.randomUUID().slice(0, 8)}`,
    title: "",
    metaTitle: "",
    description: "",
    keyword: "",
    keywords: [],
    category: "",
    date: today(),
    updated: "",
    author: "",
    cover: "",
    coverAlt: "",
    services: [],
    faqs: [],
    draft: true,
    body: "",
  });
  refresh(false);
  redirect(`/admin/articles/${id}`);
}

export async function deleteArticle(id: number) {
  await requireAdmin();
  const existing = await getArticle(id);
  await removeArticle(id);
  refresh(Boolean(existing && !existing.draft));
  redirect("/admin/articles");
}
