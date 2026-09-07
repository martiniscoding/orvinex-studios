import localFont from "next/font/local";

/**
 * Self-hosted variable faces. No external font CDN at runtime or build time.
 * Fraunces carries the display voice (opsz + WONK axes are used, not decorative).
 */
export const fraunces = localFont({
  // Instanced to wght 900 / opsz 144 / SOFT 0 — every use of this face on the
  // site is that instance. Only WONK stays variable, for the one word that
  // uses it. 120KB of unused axes became 27KB.
  src: "../fonts/Fraunces-Display.woff2",
  variable: "--font-fraunces",
  weight: "900",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const archivo = localFont({
  src: "../fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "400 700",
  display: "swap",
  fallback: ["system-ui", "Helvetica Neue", "sans-serif"],
});
