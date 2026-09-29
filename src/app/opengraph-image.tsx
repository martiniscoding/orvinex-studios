import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Orvinex — design and development for ambitious products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [phudu, inter, logo] = await Promise.all([
    readFile(path.join(process.cwd(), "src/fonts/Phudu-OG.ttf")),
    readFile(path.join(process.cwd(), "src/fonts/Inter-OG.ttf")),
    readFile(path.join(process.cwd(), "public/work/logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          backgroundColor: "#f2f1ed",
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
            backgroundColor: "#fbfaf8",
            padding: "56px 60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={44} height={44} alt="" />
            <span style={{ fontFamily: "Phudu", fontSize: 30, color: "#1e2430", letterSpacing: 1 }}>
              ORVINEX
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
            <span style={{ color: "#1e2430" }}>Design and build&nbsp;</span>
            <span style={{ color: "#838b98" }}>for products&nbsp;</span>
            <span style={{ color: "#1e2430" }}>that dominate&nbsp;</span>
            <span style={{ color: "#838b98" }}>their market</span>
          </div>

          <div style={{ display: "flex", fontSize: 26, color: "#575f6d" }}>
            Websites, web apps, mobile apps and custom software
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
