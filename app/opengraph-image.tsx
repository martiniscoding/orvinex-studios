import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Orvinex — custom software, AI and growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The default social card for the whole site.
 *
 * Sitting at the app root means every route inherits it unless it defines its
 * own, which articles and the article index do. Before this, sharing the home
 * page, the services index or any service page produced a link with no image
 * at all — measurably worse click-through wherever links are previewed.
 *
 * Colours are literal: this renders through satori rather than a browser, and
 * satori resolves no CSS custom properties.
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
            top: -300,
            left: 200,
            width: 950,
            height: 660,
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
            fontSize: 66,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Build digital solutions that dominate your market.
        </div>

        <div style={{ display: "flex", color: "#a1a1aa", fontSize: 26 }}>
          Custom software · AI products · Growth — orvinex.store
        </div>
      </div>
    ),
    size
  );
}
