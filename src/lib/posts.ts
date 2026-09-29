/**
 * The article list the site reads: Markdown files plus admin-written rows,
 * merged and filtered by `visible`. Database articles are cached under the
 * "articles" tag; the admin revalidates it on every save that affects the
 * site, and the hourly expiry lets scheduled (future-dated) articles appear
 * on their own.
 */
import { unstable_cache } from "next/cache";
import { getFilePosts, newestFirst, relatedTo, visible, type Post } from "@/lib/articles";
import { listArticles, toPost } from "@/lib/article-store";

export const ARTICLES_TAG = "articles";

const getDbPosts = unstable_cache(async () => (await listArticles()).map(toPost), ["db-articles"], {
  tags: [ARTICLES_TAG],
  revalidate: 3600,
});

/** Every article from both sources, drafts included, newest first. */
export async function getAllPosts(): Promise<Post[]> {
  const files = getFilePosts();
  const taken = new Set(files.map((p) => p.slug));
  // A file wins a slug clash; the admin refuses such slugs anyway.
  let rows: Post[] = [];
  try {
    rows = (await getDbPosts()).filter((p) => !taken.has(p.slug));
  } catch (err) {
    // The file articles still render if the database is unreachable; the
    // failure isn't cached, so the next request tries again.
    console.error("Could not load articles from the database", err);
  }
  return [...files, ...rows].sort(newestFirst);
}

export async function getPosts(): Promise<Post[]> {
  return visible(await getAllPosts());
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function getRelated(post: Post, n = 3): Promise<Post[]> {
  return relatedTo(post, await getPosts(), n);
}
