import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Plumbline — design for products that are better than they look";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [phudu, inter] = await Promise.all([
    readFile(path.join(process.cwd(), "src/fonts/Phudu-OG.ttf")),
    readFile(path.join(process.cwd(), "src/fonts/Inter-OG.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          backgroundColor: "#f7efe6",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: 28,
            backgroundColor: "#fffbf6",
            padding: "56px 60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 22,
                height: 22,
                backgroundColor: "#ff6b4a",
                clipPath: "polygon(50% 0%, 100% 34%, 50% 100%, 0% 34%)",
              }}
            />
            <span style={{ fontFamily: "Phudu", fontSize: 30, color: "#2c1e4a", letterSpacing: 1 }}>
              PLUMBLINE
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -2.6,
              lineHeight: 1.08,
              maxWidth: 940,
            }}
          >
            <span style={{ color: "#2c1e4a" }}>The studio&nbsp;</span>
            <span style={{ color: "#8f82a8" }}>for products&nbsp;</span>
            <span style={{ color: "#2c1e4a" }}>that are&nbsp;</span>
            <span style={{ color: "#e14e2e" }}>better&nbsp;</span>
            <span style={{ color: "#8f82a8" }}>than they look</span>
          </div>

          <div style={{ display: "flex", fontSize: 26, color: "#6b5e85" }}>
            Design for dev tools and B2B software
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
