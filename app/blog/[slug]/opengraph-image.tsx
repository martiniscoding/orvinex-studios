import { ImageResponse } from "next/og";

import { getPublishedPost } from "@/lib/blog";
import { formatPostDate, readingTime } from "@/lib/post";

export const runtime = "nodejs";
export const alt = "Orvinex blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card that appears when a post is shared.
 *
 * Drawn rather than uploaded, so every post gets one without anyone
 * remembering to make it — a link with no image is a measurably worse click
 * through rate on social and in some search surfaces.
 *
 * No custom font is fetched: next/og would need the file bundled, and a failed
 * fetch at request time yields a broken card rather than a plain one.
 */
export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPublishedPost(params.slug);
  const title = post?.title ?? "Orvinex";
  const meta = post
    ? `${formatPostDate(post.publishedAt)} · ${readingTime(post.content)} min read`
    : "orvinex.store";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0f",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -280,
            left: 240,
            width: 900,
            height: 620,
            background:
              "radial-gradient(ellipse at center, rgba(124,92,255,0.55) 0%, rgba(124,92,255,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              border: "4px solid #7c5cff",
              display: "flex",
            }}
          />
          <div style={{ color: "#ffffff", fontSize: 30, fontWeight: 700 }}>
            Orvinex
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#ffffff",
            fontSize: title.length > 70 ? 58 : 70,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", color: "#a1a1aa", fontSize: 26 }}>
          {meta}
        </div>
      </div>
    ),
    size
  );
}
