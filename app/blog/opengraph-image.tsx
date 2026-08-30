import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Orvinex Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card for the blog index. Without one, sharing /blog produced a link
 * with no image at all, which measurably costs click-through.
 *
 * Colours are literal: this renders through satori, not a browser, and satori
 * resolves no CSS custom properties.
 */
export default function Image() {
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
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
          }}
        >
          Writing from the people doing the building.
        </div>

        <div style={{ display: "flex", color: "#a1a1aa", fontSize: 26 }}>
          orvinex.store/blog
        </div>
      </div>
    ),
    size
  );
}
