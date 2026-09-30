import localFont from "next/font/local";

/** UI and body. */
export const inter = localFont({
  src: "../fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "Helvetica Neue", "sans-serif"],
});
