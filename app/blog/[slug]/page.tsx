import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/JsonLd";
import { Markdown } from "@/components/blog/Markdown";
import { Footer } from "@/components/Footer";
import { Navbar1 } from "@/components/ui/navbar-1";
import { getPublishedPost, listPublishedPosts } from "@/lib/blog";
import { postStructuredData } from "@/lib/blog-schema";
import { formatPostDate, readingTime } from "@/lib/post";
import { BOOKING_URL } from "@/lib/site";

/**
 * Statically rendered and held for an hour. Publishing or editing calls
 * revalidatePath, so a change is live immediately — the window only bounds how
 * long a stale page could survive if a revalidate call were ever missed.
 * Serving HTML from cache rather than querying Postgres per request is worth
 * real Core Web Vitals points, which feed ranking.
 */
export const revalidate = 3600;

/** Pre-render the posts that exist at build time; new slugs render on demand. */
export async function generateStaticParams() {
  const posts = await listPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPublishedPost(params.slug);
  if (!post) return { title: "Not found", robots: { index: false } };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `https://orvinex.store/blog/${post.slug}`,
      siteName: "Orvinex",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const post = await getPublishedPost(params.slug);
  // A draft or a bad slug must 404 rather than render an empty shell — an
  // unpublished post should be indistinguishable from one that never existed.
  if (!post) notFound();

  const others = (await listPublishedPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd data={postStructuredData(post)} />
      <Navbar1 />
      <main>
        <article className="relative overflow-hidden pt-32 sm:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[380px] bg-grid mask-hero-grid opacity-70"
          />

          <div className="mx-auto max-w-[42rem] px-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13.5px] text-muted outline-none transition-colors hover:text-ink focus-visible:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} />
              All posts
            </Link>

            <h1 className="mt-7 font-display text-[clamp(1.95rem,4.4vw,2.85rem)] font-bold leading-[1.1] tracking-[-0.035em] text-ink text-balance">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] tracking-[0.08em] text-ink/35">
              <time dateTime={post.publishedAt ?? undefined}>
                {formatPostDate(post.publishedAt)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{readingTime(post.content)} min read</span>
            </div>

            <hr className="mt-8 border-ink/[0.08]" />

            <div className="mt-8 pb-4">
              <Markdown>{post.content}</Markdown>
            </div>

            {/* Closing CTA — the reader finished, so ask for the meeting. */}
            <aside className="mt-14 rounded-2xl border border-ink/[0.09] bg-surface/70 p-7">
              <h2 className="font-display text-[19px] font-bold tracking-tight text-ink">
                Building something like this?
              </h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                We design, build and grow software for founders worldwide. Tell
                us what you are working on and we will tell you what it takes.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-deep px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-primary"
              >
                Book a call
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </a>
            </aside>

            {others.length > 0 && (
              <nav className="mb-24 mt-14" aria-label="More posts">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                  Keep reading
                </h2>
                <ul className="mt-5">
                  {others.map((other) => (
                    <li key={other.id}>
                      <Link
                        href={`/blog/${other.slug}`}
                        className="group block border-t border-ink/[0.08] py-5 outline-none"
                      >
                        <span className="font-display text-[16.5px] font-semibold tracking-tight text-ink transition-colors group-hover:text-primary">
                          {other.title}
                        </span>
                        <span className="mt-1 block text-[14px] text-muted">
                          {other.excerpt}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
