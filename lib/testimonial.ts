/** Types and pure helpers for client reviews. Safe on both sides of the boundary. */

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  photo: string | null;
  published: boolean;
  position: number;
};

/**
 * Cap on a stored photo, in characters of data URL.
 *
 * Photos live in a text column rather than object storage — there is no
 * bucket, and a 256px avatar is small enough that one is hard to justify.
 * The admin panel resizes before upload, so anything near this ceiling is a
 * client that has bypassed the picker; 512KB of base64 is roughly a 380KB
 * image, which still fits comfortably in a row.
 */
export const MAX_PHOTO_CHARS = 512 * 1024;

/** Longest side of an uploaded photo, in pixels, after the browser resizes it. */
export const PHOTO_SIZE = 256;

/**
 * Accepts a browser-uploaded data URL or a link to an image someone hosts
 * elsewhere. Everything else — `javascript:`, plain http, a bare filename —
 * is refused rather than written into an `<img src>`.
 */
export function normalizePhoto(value: string | null | undefined): {
  photo: string | null;
  error: string | null;
} {
  const photo = (value ?? "").trim();
  if (!photo) return { photo: null, error: null };

  if (photo.startsWith("data:image/")) {
    if (photo.length > MAX_PHOTO_CHARS) {
      return { photo: null, error: "That photo is too large. Try a smaller image." };
    }
    return { photo, error: null };
  }

  if (photo.startsWith("https://") || photo.startsWith("/")) {
    return { photo, error: null };
  }

  return {
    photo: null,
    error: "A photo must be an uploaded image or an https:// link.",
  };
}

/** Fallback for a review with no photo: up to two initials. */
export function initials(name: string) {
  const letters = name
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("");
  return (letters || name.trim().slice(0, 1) || "?").slice(0, 2).toUpperCase();
}

