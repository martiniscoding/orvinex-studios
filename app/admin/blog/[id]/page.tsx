import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { auth } from "@/lib/auth";
import { getPostById } from "@/lib/blog";
import { LoginForm } from "../../login-form";
import { AdminHeader } from "../../admin-header";
import { PostEditor } from "../post-editor";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return <LoginForm />;

  const post = await getPostById(params.id);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <AdminHeader current="blog" />
        <h1 className="mb-8 mt-8 font-display text-[26px] font-bold tracking-tight text-ink">
          Edit post
        </h1>
        <PostEditor
          post={{
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            status: post.status,
            featured: post.featured,
            keyword: post.keyword ?? "",
          }}
        />
      </div>
    </main>
  );
}
