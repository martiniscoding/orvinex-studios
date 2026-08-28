"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Star, Trash2 } from "lucide-react";

import { formatPostDate, type PostSummary } from "@/lib/post";
import { deletePost, setPostFeatured, setPostStatus } from "./actions";

export function PostsTable({ posts }: { posts: PostSummary[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  // Which row is awaiting a second click to confirm deletion.
  const [confirming, setConfirming] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (!result.ok) setError(result.error ?? "That did not work.");
      router.refresh();
    });
  }

  if (posts.length === 0) {
    return (
      <p className="rounded-2xl border border-ink/[0.08] bg-surface/50 px-6 py-10 text-center text-[14.5px] text-muted">
        No posts yet. Write the first one.
      </p>
    );
  }

  return (
    <div>
      {error && (
        <p className="mb-4 text-[13px] text-red-400" role="alert">
          {error}
        </p>
      )}

      <ul className="rounded-2xl border border-ink/[0.08] bg-surface/50">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-ink/[0.06] px-5 py-4 last:border-b-0"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="truncate font-display text-[15.5px] font-semibold tracking-tight text-ink transition-colors hover:text-primary"
                >
                  {post.title}
                </Link>
                {post.featured && (
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary">
                    Start here
                  </span>
                )}
              </div>
              <p className="mt-1 truncate font-mono text-[12px] text-ink/30">
                /blog/{post.slug} · {formatPostDate(post.publishedAt)}
              </p>
            </div>

            <button
              type="button"
              disabled={pending}
              onClick={() => run(() => setPostFeatured(post.id, !post.featured))}
              aria-label={
                post.featured ? "Remove Start here label" : "Mark as Start here"
              }
              className={`rounded-full border p-2 transition-colors disabled:opacity-40 ${
                post.featured
                  ? "border-primary/40 text-primary"
                  : "border-ink/10 text-ink/40 hover:text-ink"
              }`}
            >
              <Star
                className="h-3.5 w-3.5"
                strokeWidth={2}
                fill={post.featured ? "currentColor" : "none"}
              />
            </button>

            <select
              value={post.status}
              disabled={pending}
              onChange={(e) => run(() => setPostStatus(post.id, e.target.value))}
              className="rounded-full border border-ink/10 bg-ink/[0.04] px-3 py-1.5 text-[13px] text-ink outline-none focus:border-primary/60 disabled:opacity-40"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            {post.status === "published" && (
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View post"
                className="rounded-full border border-ink/10 p-2 text-ink/40 transition-colors hover:text-ink"
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            )}

            {confirming === post.id ? (
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    setConfirming(null);
                    run(() => deletePost(post.id));
                  }}
                  className="rounded-full bg-red-500/90 px-3 py-1.5 text-[12.5px] font-semibold text-ink disabled:opacity-40"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(null)}
                  className="text-[12.5px] text-ink/50 hover:text-ink"
                >
                  Cancel
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(post.id)}
                aria-label="Delete post"
                className="rounded-full border border-ink/10 p-2 text-ink/40 transition-colors hover:border-red-500/40 hover:text-red-400"
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
