import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Plumbline — design for products that are better than they look";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Fraunces, instanced to wght 900 and subset to this string only (9KB).
  const [fraunces, archivo] = await Promise.all([
    readFile(path.join(process.cwd(), "src/fonts/Fraunces-OG.ttf")),
    readFile(path.join(process.cwd(), "src/fonts/Archivo-OG.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#DDE0DC",
          padding: "72px 80px 72px 184px",
          fontFamily: "Archivo",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 144,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: "rgba(21,25,27,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 134,
            top: 128,
            width: 21,
            height: 21,
            backgroundColor: "#B07D1E",
            transform: "rotate(45deg)",
          }}
        />

        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#5A6360" }}>
          PLUMBLINE
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Fraunces",
            fontSize: 104,
            lineHeight: 1.02,
            letterSpacing: -3,
            color: "#15191B",
            maxWidth: 900,
          }}
        >
          Your product is better than it looks.
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#5A6360" }}>
          Design for dev tools and B2B software
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 900 as const, style: "normal" as const },
        { name: "Archivo", data: archivo, weight: 500 as const, style: "normal" as const },
      ],
    },
  );
}
