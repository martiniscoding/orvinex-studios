import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: the hero painting is the LCP element, and AVIF roughly
    // halves it against the WebP default.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
