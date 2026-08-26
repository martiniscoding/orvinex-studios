import Link from "next/link";
import { headers } from "next/headers";
import { Plus } from "lucide-react";

import { auth } from "@/lib/auth";
import { listAllPosts } from "@/lib/blog";
import { LoginForm } from "../login-form";
import { AdminHeader } from "../admin-header";
import { PostsTable } from "./posts-table";

export default async function AdminBlogPage() {
  // The gate lives on the page, not the layout — see the note in ../page.tsx.
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return <LoginForm />;

  const posts = await listAllPosts();
  const published = posts.filter((p) => p.status === "published").length;

  return (
    <main className="min-h-screen bg-background px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <AdminHeader current="blog" />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[26px] font-bold tracking-tight text-white">
              Posts
            </h1>
            <p className="mt-1 text-[14px] text-muted">
              {posts.length} total · {published} published ·{" "}
              {posts.length - published} draft
            </p>
          </div>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-full bg-primary-deep px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-primary"
          >
            <Plus className="h-4 w-4" strokeWidth={2.4} />
            New post
          </Link>
        </div>

        <div className="mt-6">
          <PostsTable posts={posts} />
        </div>
      </div>
    </main>
  );
}
