import localFont from "next/font/local";

/** UI and body. */
export const inter = localFont({
  src: "../fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "Helvetica Neue", "sans-serif"],
});

/** Condensed display: the wordmark and the uppercase card headings. */
export const phudu = localFont({
  src: "../fonts/Phudu-Variable.woff2",
  variable: "--font-phudu",
  weight: "300 900",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Handwriting, for the polaroid captions only. */
export const caveat = localFont({
  src: "../fonts/Caveat-Variable.woff2",
  variable: "--font-caveat",
  weight: "400 700",
  display: "swap",
  // Five captions, well below the fold — it must not compete with Inter for
  // the critical path.
  preload: false,
  fallback: ["cursive"],
});
