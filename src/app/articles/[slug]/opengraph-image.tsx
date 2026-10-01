import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getPost, getPosts } from "@/lib/posts";

export const alt = "Orvinex articles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

/** The share card for an article: its title on the site's OG layout. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  const [phudu, inter, logo] = await Promise.all([
    readFile(path.join(process.cwd(), "src/fonts/Phudu-OG.ttf")),
    // Full Latin set: article titles can contain any letter, unlike the home
    // card, whose Inter-OG.ttf holds only the glyphs of its fixed text.
    readFile(path.join(process.cwd(), "src/fonts/Inter-SemiBold-Latin.ttf")),
    readFile(path.join(process.cwd(), "public/work/logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const title = post?.title ?? "Orvinex articles";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 28, backgroundColor: "#f2f1ed", fontFamily: "Inter" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: 28,
            backgroundColor: "#fbfaf8",
            padding: "56px 60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={logoSrc} width={44} height={44} alt="" />
              <span style={{ fontFamily: "Phudu", fontSize: 30, color: "#1e2430", letterSpacing: 1 }}>ORVINEX</span>
            </div>
            {post && <span style={{ fontSize: 24, color: "#ff3131" }}>{post.category}</span>}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: title.length > 70 ? 56 : 68,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.1,
              color: "#1e2430",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>

          <div style={{ display: "flex", fontSize: 24, color: "#575f6d" }}>
            {post ? `${post.author} · ${post.readingMinutes} min read` : "orvinex.store/articles"}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Phudu", data: phudu, weight: 700 as const, style: "normal" as const },
        { name: "Inter", data: inter, weight: 600 as const, style: "normal" as const },
      ],
    },
  );
}
