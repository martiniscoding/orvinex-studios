/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * /blog moved to /articles.
   *
   * Permanent (308) rather than temporary: these URLs were live, in the
   * sitemap and in the RSS feed, so anything that already crawled or linked
   * them needs to be told the move is final — that is what passes ranking
   * signals to the new address instead of stranding them on a 404.
   *
   * Keep these. They cost nothing and there is no expiry date on an old link.
   */
  async redirects() {
    return [
      { source: "/blog", destination: "/articles", permanent: true },
      { source: "/blog/rss.xml", destination: "/articles/rss.xml", permanent: true },
      { source: "/blog/:slug", destination: "/articles/:slug", permanent: true },
      {
        source: "/blog/:slug/opengraph-image",
        destination: "/articles/:slug/opengraph-image",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
