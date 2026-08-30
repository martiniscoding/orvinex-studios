import { listPublishedPosts } from "@/lib/articles";
import { SITE_URL } from "@/app/structured-data";

export const revalidate = 3600;

/** XML text nodes cannot carry raw &, < or >. */
function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * RSS feed.
 *
 * Not a ranking factor on its own, but it is how aggregators, newsletters and
 * Google Reader-style tools pick posts up — which produces the inbound links
 * that are a ranking factor.
 */
export async function GET() {
  const posts = await listPublishedPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/articles/${post.slug}`;
      const date = new Date(post.publishedAt ?? post.updatedAt).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${date}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Orvinex Blog</title>
    <link>${SITE_URL}/articles</link>
    <description>Practical writing on custom software, AI products and growth from the Orvinex engineering team.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/articles/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
