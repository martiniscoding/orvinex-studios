import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#111118",
        primary: {
          DEFAULT: "#7c5cff",
          deep: "#6d4aff",
        },
        glow: "#8b5cf6",
        muted: "#a1a1aa",
        hairline: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.08)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(124,92,255,0.55)",
        "glow-lg": "0 10px 60px -10px rgba(124,92,255,0.7)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        /* Vertical variants for the hero work gallery. Each column renders
           its set three times, so travelling exactly one set (-100%/3) lands
           the next copy where the previous one started and the loop is
           seamless. Keep this in step with REPEATS in WorkGallery. */
        "marquee-up": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-33.3333%)" },
        },
        "marquee-down": {
          from: { transform: "translateY(-33.3333%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        /* Halved alongside the split of the gallery into two four-item
           columns, so each screenshot still holds the eye for as long as it
           did when one column carried the whole set. */
        "marquee-up": "marquee-up 23s linear infinite",
        "marquee-down": "marquee-down 27s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
