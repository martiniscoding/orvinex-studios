import { getPosts } from "@/lib/posts";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const revalidate = 3600;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of published articles, full text included. */
export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const url = `${site.url}/articles/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.description)}</description>
      <content:encoded><![CDATA[${p.html.replaceAll("]]>", "]]]]><![CDATA[>")}]]></content:encoded>
      <category>${esc(p.category)}</category>
      <dc:creator>${esc(p.author)}</dc:creator>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(site.name)} articles</title>
    <link>${site.url}/articles</link>
    <atom:link href="${site.url}/articles/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${esc(site.tagline)}</description>
    <language>en</language>
${posts[0] ? `    <lastBuildDate>${new Date(`${posts[0].updated}T00:00:00Z`).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
