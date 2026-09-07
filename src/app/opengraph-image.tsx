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
          backgroundColor: "#eaebed",
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
            backgroundColor: "#f1f3f5",
            padding: "56px 60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 22,
                height: 22,
                backgroundColor: "#9be45c",
                clipPath: "polygon(50% 0%, 100% 34%, 50% 100%, 0% 34%)",
              }}
            />
            <span style={{ fontFamily: "Phudu", fontSize: 30, color: "#14334d", letterSpacing: 1 }}>
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
            <span style={{ color: "#14334d" }}>The studio&nbsp;</span>
            <span style={{ color: "#a9b6c2" }}>for products&nbsp;</span>
            <span style={{ color: "#14334d" }}>that are better&nbsp;</span>
            <span style={{ color: "#a9b6c2" }}>than they look</span>
          </div>

          <div style={{ display: "flex", fontSize: 26, color: "#7c8fa0" }}>
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
