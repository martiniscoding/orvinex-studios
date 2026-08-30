import { PHOTO_SIZE } from "@/lib/testimonial";

/**
 * What the picker accepts off disk. The file never travels at this size — it
 * is resized to a {@link PHOTO_SIZE} square in the browser first — so the
 * limit only exists to stop a 50MP camera file from stalling the tab while it
 * decodes.
 */
export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("That file could not be read."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("That file is not an image we can read."));
    image.src = src;
  });
}

/**
 * Turns a picked file into a small square data URL, entirely in the browser.
 *
 * Photos are stored in a text column, so what leaves here is what the database
 * holds and what every visitor downloads — a 256px square lands around 15KB,
 * which is cheaper than the round trip an image host would add.
 *
 * The crop is centred rather than fitted: avatars are shown in a circle, and
 * letterboxing a portrait into a square would put bars inside the ring.
 */
export async function resizePhoto(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("That file is not an image.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("That image is over 12MB. Try a smaller one.");
  }

  const source = await loadImage(await readAsDataUrl(file));
  const canvas = document.createElement("canvas");
  canvas.width = PHOTO_SIZE;
  canvas.height = PHOTO_SIZE;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser cannot resize images.");

  const side = Math.min(source.width, source.height);
  context.drawImage(
    source,
    (source.width - side) / 2,
    (source.height - side) / 2,
    side,
    side,
    0,
    0,
    PHOTO_SIZE,
    PHOTO_SIZE
  );

  // WebP keeps transparency and is the smaller of the two. A canvas that
  // cannot encode it silently returns a PNG, which is why the result is
  // checked rather than trusted.
  const webp = canvas.toDataURL("image/webp", 0.85);
  if (webp.startsWith("data:image/webp")) return webp;

  // JPEG has no alpha, so anything transparent would come out black. Painting
  // a background *under* what is already drawn fills only those pixels.
  context.globalCompositeOperation = "destination-over";
  context.fillStyle = "#14141c";
  context.fillRect(0, 0, PHOTO_SIZE, PHOTO_SIZE);
  return canvas.toDataURL("image/jpeg", 0.85);
}
