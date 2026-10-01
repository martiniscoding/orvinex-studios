import Link from "next/link";
import { notFound } from "next/navigation";
import Shell, { Container } from "@/components/Shell";
import ArticleView from "@/components/ArticleView";
import { requireAdmin } from "@/lib/auth";
import { getArticle, toPost } from "@/lib/article-store";
import { getRelated } from "@/lib/posts";

export const dynamic = "force-dynamic";

/** The saved version of an article exactly as readers will see it. */
export default async function PreviewArticlePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const id = Number((await params).id);
  const row = Number.isInteger(id) ? await getArticle(id) : null;
  if (!row) notFound();
  const post = toPost(row);

  return (
    <Shell>
      <Container className="pb-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-mark/60 px-5 py-3 text-sm">
          <span>
            <strong className="font-semibold">Preview</strong> of the last saved version
            {post.draft ? ", not published yet." : "."}
          </span>
          <Link href={`/admin/articles/${id}`} className="font-medium underline underline-offset-4">
            Back to the editor
          </Link>
        </div>
        <ArticleView post={post} related={await getRelated(post)} />
      </Container>
    </Shell>
  );
}
