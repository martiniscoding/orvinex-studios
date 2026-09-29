import type { Metadata } from "next";
import Link from "next/link";
import Shell, { Container } from "@/components/Shell";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import { ArrowIcon } from "@/components/Icons";
import { formatDate, type Post } from "@/lib/articles";
import { getPosts } from "@/lib/posts";
import { absolute, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";

const title = "Articles on Software, AI and Growth | Orvinex";
const description =
  "Practical writing on custom software, AI products and growth — from the team doing the building, not the marketing department.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/articles",
    types: { "application/rss+xml": [{ url: "/articles/rss.xml", title: `${site.name} articles` }] },
  },
  openGraph: { title, description, url: "/articles", type: "website" },
};

// Scheduled articles appear within the hour; publishing revalidates at once.
export const revalidate = 3600;

export default async function ArticlesPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <Shell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Articles", path: "/articles" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": absolute("/articles#articles"),
            name: `${site.name} articles`,
            url: absolute("/articles"),
            description,
            publisher: { "@id": `${site.url}/#organization` },
            hasPart: posts.map((p) => ({ "@id": absolute(`/articles/${p.slug}#article`) })),
          },
        ]}
      />
      <Container className="pb-4">
        <div className="mb-12 lg:mb-16">
          <p className="eyebrow">Articles</p>
          <h1 className="display-serif mt-4 max-w-[18ch] text-[clamp(2.25rem,5.4vw,4rem)]">
            Guides for building <span className="text-accent italic">software that sells</span>
          </h1>
          <p className="mt-5 max-w-[56ch] text-[1.0625rem] text-muted">{description}</p>
        </div>

        {lead ? (
          <>
            <Card post={lead} featured />
            {rest.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <Card post={p} />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="rounded-[var(--radius-card)] border border-dashed border-line p-10 text-center text-muted">
            The first articles are on their way.
          </p>
        )}

        <Footer />
      </Container>
    </Shell>
  );
}

function Card({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article
      className={`group relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-card transition-shadow duration-300 hover:shadow-[0_18px_40px_-28px_rgba(30,36,48,0.45)] ${
        featured ? "p-7 sm:p-10" : "p-6"
      }`}
    >
      <p className="flex flex-wrap items-center gap-x-2 text-sm text-faint">
        <span className="font-medium text-accent">{post.category}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        {post.readingMinutes} min read
        {post.draft && (
          <span className="rounded-full bg-mark px-2 py-0.5 text-xs font-medium text-ink">Draft</span>
        )}
      </p>
      <h2
        className={`mt-3 font-semibold tracking-[-0.025em] text-balance ${
          featured ? "max-w-[28ch] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15]" : "text-[1.25rem] leading-[1.3]"
        }`}
      >
        {/* The stretched link makes the whole card clickable. */}
        <Link href={`/articles/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h2>
      <p className={`mt-3 flex-1 text-muted ${featured ? "max-w-[62ch] text-[1.0625rem]" : "text-[0.9375rem]"}`}>
        {post.description}
      </p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
        Read article
        <span className="transition-transform duration-300 group-hover:translate-x-0.5 [&_svg]:h-3.5 [&_svg]:w-3.5">
          <ArrowIcon />
        </span>
      </span>
    </article>
  );
}
