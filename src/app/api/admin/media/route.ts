import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { saveMedia } from "@/lib/article-store";

const MAX_BYTES = 4 * 1024 * 1024;

/** Image types, told apart by their first bytes rather than the browser's claim. */
function sniff(b: Buffer): string | null {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  if (b.toString("ascii", 0, 3) === "GIF") return "image/gif";
  if (b.toString("ascii", 4, 8) === "ftyp" && /^avi[fs]$/.test(b.toString("ascii", 8, 12))) return "image/avif";
  return null;
}

/** Uploads an article image; responds with its public URL. */
export async function POST(req: Request) {
  if (!(await auth.api.getSession({ headers: req.headers }))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const file = (await req.formData().catch(() => null))?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Images must be 4 MB or smaller. Compress it (e.g. squoosh.app) and try again." }, { status: 413 });
  }

  const data = Buffer.from(await file.arrayBuffer());
  const type = sniff(data);
  if (!type) return NextResponse.json({ error: "Use a JPEG, PNG, WebP, AVIF or GIF image." }, { status: 415 });

  const id = await saveMedia(type, data);
  return NextResponse.json({ url: `/media/${id}` });
}
