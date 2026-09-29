/**
 * Articles written in the admin panel live in Postgres. Rows hold exactly the
 * fields an author writes (`ArticleFields`); rendering happens in articles.ts,
 * the same as for Markdown files.
 *
 * Server-only. Imports nothing through the "@/" alias so scripts can use it.
 */
import { buildPost, type ArticleFields, type Faq, type Post } from "./articles";
import { pool } from "./db";

export type ArticleRow = ArticleFields & {
  id: number;
  previousSlugs: string[];
  createdAt: Date;
  updatedAt: Date;
};

/** Run by `npm run db:setup`; safe to run again. */
export const articlesTableSql = `
  create table if not exists articles (
    id serial primary key,
    slug text not null unique,
    previous_slugs text[] not null default '{}',
    draft boolean not null default true,
    title text not null default '',
    meta_title text not null default '',
    description text not null default '',
    keyword text not null default '',
    keywords text[] not null default '{}',
    category text not null default '',
    date date not null default current_date,
    updated date,
    author text not null default '',
    cover text not null default '',
    cover_alt text not null default '',
    services text[] not null default '{}',
    faqs jsonb not null default '[]',
    body text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );
  create index if not exists articles_previous_slugs_idx on articles using gin (previous_slugs);

  create table if not exists article_media (
    id uuid primary key default gen_random_uuid(),
    content_type text not null,
    size integer not null,
    data bytea not null,
    created_at timestamptz not null default now()
  );
`;

// date columns come back as text so no time zone can shift them a day.
const columns = `
  id, slug, previous_slugs, draft, title, meta_title, description, keyword, keywords,
  category, date::text as date, coalesce(updated::text, '') as updated, author, cover,
  cover_alt, services, faqs, body, created_at, updated_at
`;

type Row = {
  id: number;
  slug: string;
  previous_slugs: string[];
  draft: boolean;
  title: string;
  meta_title: string;
  description: string;
  keyword: string;
  keywords: string[];
  category: string;
  date: string;
  updated: string;
  author: string;
  cover: string;
  cover_alt: string;
  services: string[];
  faqs: Faq[];
  body: string;
  created_at: Date;
  updated_at: Date;
};

const fromRow = (r: Row): ArticleRow => ({
  id: r.id,
  slug: r.slug,
  previousSlugs: r.previous_slugs,
  draft: r.draft,
  title: r.title,
  metaTitle: r.meta_title,
  description: r.description,
  keyword: r.keyword,
  keywords: r.keywords,
  category: r.category,
  date: r.date,
  updated: r.updated,
  author: r.author,
  cover: r.cover,
  coverAlt: r.cover_alt,
  services: r.services,
  faqs: r.faqs,
  body: r.body,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

export function toPost(row: ArticleRow): Post {
  return buildPost(row, { source: "db", id: row.id });
}

export async function listArticles(): Promise<ArticleRow[]> {
  const { rows } = await pool.query<Row>(`select ${columns} from articles order by date desc, id desc`);
  return rows.map(fromRow);
}

export async function getArticle(id: number): Promise<ArticleRow | null> {
  const { rows } = await pool.query<Row>(`select ${columns} from articles where id = $1`, [id]);
  return rows[0] ? fromRow(rows[0]) : null;
}

/** The current slug of the article that used to live at `slug`, if any. */
export async function findMovedSlug(slug: string): Promise<string | null> {
  const { rows } = await pool.query<{ slug: string }>(
    "select slug from articles where $1 = any(previous_slugs) and not draft limit 1",
    [slug],
  );
  return rows[0]?.slug ?? null;
}

export async function slugTaken(slug: string, exceptId?: number) {
  const { rows } = await pool.query(
    "select 1 from articles where (slug = $1 or $1 = any(previous_slugs)) and id <> $2 limit 1",
    [slug, exceptId ?? -1],
  );
  return rows.length > 0;
}

export async function insertArticle(f: ArticleFields): Promise<number> {
  const { rows } = await pool.query<{ id: number }>(
    `insert into articles (slug, draft, title, meta_title, description, keyword, keywords, category,
       date, updated, author, cover, cover_alt, services, faqs, body)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,nullif($10,'')::date,$11,$12,$13,$14,$15,$16)
     returning id`,
    params(f),
  );
  return rows[0].id;
}

/**
 * Saves every field. When a published article changes slug, the old one is
 * remembered so /articles/<old> can redirect permanently to the new URL.
 */
export async function updateArticle(id: number, f: ArticleFields, keepOldSlug: string | null) {
  await pool.query(
    `update articles set slug = $1, draft = $2, title = $3, meta_title = $4, description = $5,
       keyword = $6, keywords = $7, category = $8, date = $9, updated = nullif($10,'')::date,
       author = $11, cover = $12, cover_alt = $13, services = $14, faqs = $15, body = $16,
       previous_slugs = case
         when $18::text is null then array_remove(previous_slugs, $1)
         else array_remove(array_append(array_remove(previous_slugs, $18), $18), $1)
       end,
       updated_at = now()
     where id = $17`,
    [...params(f), id, keepOldSlug],
  );
}

export async function setDraft(id: number, draft: boolean) {
  await pool.query("update articles set draft = $1, updated_at = now() where id = $2", [draft, id]);
}

export async function deleteArticle(id: number) {
  await pool.query("delete from articles where id = $1", [id]);
}

function params(f: ArticleFields) {
  return [
    f.slug,
    f.draft,
    f.title,
    f.metaTitle,
    f.description,
    f.keyword,
    f.keywords,
    f.category,
    f.date,
    f.updated,
    f.author,
    f.cover,
    f.coverAlt,
    f.services,
    JSON.stringify(f.faqs),
    f.body,
  ];
}

export async function saveMedia(contentType: string, data: Buffer): Promise<string> {
  const { rows } = await pool.query<{ id: string }>(
    "insert into article_media (content_type, size, data) values ($1, $2, $3) returning id",
    [contentType, data.length, data],
  );
  return rows[0].id;
}

export async function getMedia(id: string) {
  const { rows } = await pool.query<{ content_type: string; data: Buffer }>(
    "select content_type, data from article_media where id = $1",
    [id],
  );
  return rows[0] ?? null;
}
