import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Every colour resolves through a CSS variable declared in
        // globals.css, so the same utility is correct in both themes.
        background: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        /** Foreground. Replaces the hardcoded `white` the dark theme used. */
        ink: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          deep: "rgb(var(--primary-deep) / <alpha-value>)",
        },
        glow: "rgb(var(--primary) / <alpha-value>)",
        hairline: "rgb(var(--fg) / 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      borderColor: {
        DEFAULT: "rgb(var(--fg) / 0.08)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgb(var(--primary) / calc(0.55 * var(--wash)))",
        "glow-lg": "0 10px 60px -10px rgb(var(--primary) / calc(0.7 * var(--wash)))",
        /** The lift under a violet button. */
        "glow-btn": "0 0 24px -6px rgb(var(--primary) / calc(0.9 * var(--wash)))",
        "glow-btn-lg": "0 0 32px -8px rgb(var(--primary) / calc(0.95 * var(--wash)))",
        "glow-pill": "0 0 22px -4px rgb(var(--primary) / calc(0.9 * var(--wash)))",
        /** Cards on a light ground need a real shadow, not a glow. */
        card: "0 1px 2px rgb(var(--fg) / 0.04), 0 10px 30px -14px rgb(var(--fg) / 0.14)",
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
