import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Shell, { Container } from "@/components/Shell";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import ArticleView from "@/components/ArticleView";
import { findMovedSlug } from "@/lib/article-store";
import { getPost, getPosts, getRelated } from "@/lib/posts";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

// Articles published from the admin after a deploy render on first request.
export const dynamicParams = true;
// Lets scheduled articles appear on their date; publishing revalidates at once.
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const url = `/articles/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.description,
    keywords: [post.keyword, ...post.keywords],
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: site.name,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      section: post.category,
      tags: [post.keyword, ...post.keywords],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
    // Drafts are only served by `next dev`, but never let one be indexed.
    robots: post.draft ? { index: false, follow: false } : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    // A published admin article whose URL changed: send readers and Google on.
    const moved = await findMovedSlug(slug).catch(() => null);
    if (moved) permanentRedirect(`/articles/${moved}`);
    notFound();
  }

  const related = await getRelated(post);

  return (
    <Shell>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Articles", path: "/articles" },
            { name: post.title, path: `/articles/${post.slug}` },
          ]),
          ...(post.faqs.length ? [faqSchema(post.faqs)] : []),
        ]}
      />
      <Container className="pb-4">
        <ArticleView post={post} related={related} />

        <Footer />
      </Container>
    </Shell>
  );
}
