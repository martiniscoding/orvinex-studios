import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getArticle } from "@/lib/article-store";
import { getAllPosts } from "@/lib/posts";
import { founder, serviceGroups, site } from "@/content/site";
import { analyseArticle } from "../actions";
import { categories, type ArticleDraft } from "../types";
import Editor from "./Editor";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const id = Number((await params).id);
  const row = Number.isInteger(id) ? await getArticle(id) : null;
  if (!row) notFound();

  const fields: ArticleDraft = {
    slug: row.slug,
    title: row.title,
    metaTitle: row.metaTitle,
    description: row.description,
    keyword: row.keyword,
    keywords: row.keywords,
    category: row.category,
    date: row.date,
    updated: row.updated,
    author: row.author,
    cover: row.cover,
    coverAlt: row.coverAlt,
    services: row.services,
    faqs: row.faqs,
    body: row.body,
  };

  const posts = await getAllPosts();
  const services = serviceGroups.flatMap((g) => g.services.map((s) => ({ id: s.id, title: s.title, group: g.label })));
  const linkTargets = [
    ...services.map((s) => ({ group: "Services", label: s.title, href: `/services/${s.id}` })),
    ...posts
      .filter((p) => !(p.source === "db" && p.id === id))
      .map((p) => ({ group: "Articles", label: `${p.title}${p.draft ? " (draft)" : ""}`, href: `/articles/${p.slug}` })),
    { group: "Pages", label: "Our work", href: "/work" },
    { group: "Pages", label: "Contact form", href: "/#contact" },
  ];
  const usedCategories = [...new Set([...categories, ...posts.map((p) => p.category).filter(Boolean)])];

  return (
    <Editor
      id={id}
      initial={fields}
      initialDraft={row.draft}
      initialVersion={row.updatedAt.toISOString()}
      initialAnalysis={await analyseArticle(id, fields)}
      services={services}
      linkTargets={linkTargets}
      categories={usedCategories}
      founderName={founder.name}
      siteHost={new URL(site.url).host}
    />
  );
}
