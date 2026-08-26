import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Navbar1 } from "@/components/ui/navbar-1";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { listPublishedPosts } from "@/lib/blog";
import { blogIndexStructuredData } from "@/lib/blog-schema";
import { formatPostDate } from "@/lib/post";
import { BOOKING_URL } from "@/lib/site";

const description =
  "Practical writing on custom software, AI products and growth — from the team doing the building, not the marketing department.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: {
    type: "website",
    url: "https://orvinex.store/blog",
    siteName: "Orvinex",
    title: "Blog | Orvinex",
    description,
  },
};

/** Cached; publishing calls revalidatePath, so the index updates instantly. */
export const revalidate = 3600;

function PostRow({
  post,
  featured,
}: {
  post: Awaited<ReturnType<typeof listPublishedPosts>>[number];
  featured: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-t border-white/[0.08] py-8 outline-none transition-colors first:border-t-0 focus-visible:bg-white/[0.03]"
    >
      {featured && (
        <span className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          Start here
        </span>
      )}

      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="max-w-2xl font-display text-[21px] font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-primary sm:text-[23px]">
          {post.title}
        </h2>
        <time
          dateTime={post.publishedAt ?? undefined}
          className="shrink-0 font-mono text-[12px] tracking-[0.08em] text-white/35"
        >
          {formatPostDate(post.publishedAt)}
        </time>
      </div>

      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
        {post.excerpt}
      </p>
    </Link>
  );
}

export default async function BlogIndexPage() {
  const posts = await listPublishedPosts();

  return (
    <>
      <JsonLd data={blogIndexStructuredData(posts)} />
      <Navbar1 />
      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-grid mask-hero-grid opacity-80"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[380px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124,92,255,0.2) 0%, transparent 70%)",
            }}
          />

          <Reveal className="mx-auto max-w-3xl px-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
              Blog
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.035em] text-white text-balance">
              Writing from the people doing the building.
            </h1>
            <p className="mt-6 text-[16px] leading-relaxed text-muted">
              {description}
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-deep px-6 py-3 text-[14.5px] font-semibold text-white shadow-[0_0_24px_-6px_rgba(124,92,255,0.9)] outline-none transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              Book a call
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </a>
          </Reveal>
        </section>

        <section className="mx-auto max-w-3xl px-5 pb-24 pt-16 sm:pt-20">
          {posts.length === 0 ? (
            <p className="border-t border-white/[0.08] pt-10 text-[15px] text-muted">
              No posts yet. The first one is being written.
            </p>
          ) : (
            <RevealGroup>
              {posts.map((post) => (
                <RevealItem key={post.id}>
                  <PostRow post={post} featured={post.featured} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
