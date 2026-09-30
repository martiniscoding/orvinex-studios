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

/**
 * The hero headline: a high-contrast display serif. Instanced to the single
 * weight the headline uses — it is preloaded above the fold and competes with
 * the hero image for the critical path.
 */
export const playfair = localFont({
  src: [
    { path: "../fonts/PlayfairDisplay-Variable.woff2", weight: "400", style: "normal" },
    // The accent phrase is set in the true italic, not a browser-slanted roman.
    { path: "../fonts/PlayfairDisplay-Italic-Variable.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
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
