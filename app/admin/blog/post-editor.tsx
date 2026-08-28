"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, PencilLine } from "lucide-react";

import { Markdown } from "@/components/blog/Markdown";
import { slugify } from "@/lib/post";
import { createPost, updatePost, type PostInput } from "./actions";
import { SeoPanel } from "./seo-panel";

const inputClass =
  "w-full rounded-xl border border-ink/[0.09] bg-ink/[0.03] px-4 py-3 text-[14.5px] text-ink placeholder:text-ink/25 outline-none transition-colors focus:border-primary/60 focus:bg-ink/[0.05] focus:ring-2 focus:ring-primary/25";

const labelClass = "mb-2 block text-[13px] font-medium text-ink/80";

type Props = {
  /** Absent when writing a new post. */
  post?: PostInput & { id: string };
};

export function PostEditor({ post }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [keyword, setKeyword] = useState(post?.keyword ?? "");

  const [tab, setTab] = useState<"write" | "preview">("write");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // The slug follows the title until it is edited by hand, after which it is
  // left alone — silently rewriting a published URL loses its inbound links.
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const effectiveSlug = slugTouched ? slug : slugify(title);

  function handleTitle(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaved(false);

    const input: PostInput = {
      title,
      slug: effectiveSlug,
      excerpt,
      content,
      status,
      featured,
      keyword,
    };

    startTransition(async () => {
      const result = post
        ? await updatePost(post.id, input)
        : await createPost(input);

      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSaved(true);
      if (!post) {
        router.replace(`/admin/blog/${result.id}`);
      } else {
        setSlug(result.slug);
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={submit} className="pb-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} />
          All posts
        </Link>

        <div className="flex items-center gap-3">
          {error && (
            <span className="text-[13px] text-red-400" role="alert">
              {error}
            </span>
          )}
          {saved && !error && (
            <span className="text-[13px] text-emerald-400" role="status">
              Saved
            </span>
          )}
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-primary-deep px-6 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-primary disabled:opacity-40"
          >
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
            placeholder="How we cut a six-week review to five days"
            className={inputClass}
          />

          <label htmlFor="excerpt" className="mb-2 mt-6 block text-[13px] font-medium text-ink/80">
            Excerpt
            <span className="ml-2 font-normal text-ink/35">
              shown on the index and in search results
            </span>
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="One or two sentences on what the reader gets."
            className={`${inputClass} resize-y`}
          />

          <div className="mb-2 mt-6 flex items-center justify-between">
            <span className="text-[13px] font-medium text-ink/80">Content</span>
            <div className="flex gap-1 rounded-full border border-ink/[0.09] p-0.5">
              {(["write", "preview"] as const).map((mode) => {
                const Icon = mode === "write" ? PencilLine : Eye;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTab(mode)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-medium capitalize transition-colors ${
                      tab === mode
                        ? "bg-primary-deep text-ink"
                        : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          {tab === "write" ? (
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={24}
              placeholder={"## A heading\n\nWrite in Markdown. **Bold**, _italic_, [links](https://orvinex.store), lists, quotes and code fences all work."}
              className={`${inputClass} resize-y font-mono text-[13.5px] leading-relaxed`}
            />
          ) : (
            <div className="min-h-[420px] rounded-xl border border-ink/[0.09] bg-ink/[0.02] px-5 py-4">
              {content.trim() ? (
                <Markdown>{content}</Markdown>
              ) : (
                <p className="text-[14px] text-ink/35">
                  Nothing to preview yet.
                </p>
              )}
            </div>
          )}
        </div>

        <aside className="space-y-6 lg:pt-[26px]">
          <SeoPanel
            title={title}
            excerpt={excerpt}
            content={content}
            slug={effectiveSlug}
            keyword={keyword}
            onKeywordChange={setKeyword}
          />

          <div className="rounded-2xl border border-ink/[0.09] bg-surface/60 p-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45">
              Visibility
            </span>

            <div className="mt-4 space-y-2">
              {(["draft", "published"] as const).map((value) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-2.5 text-[14px] text-ink/80"
                >
                  <input
                    type="radio"
                    name="status"
                    value={value}
                    checked={status === value}
                    onChange={() => setStatus(value)}
                    className="h-3.5 w-3.5 accent-[#6d4aff]"
                  />
                  <span className="capitalize">{value}</span>
                </label>
              ))}
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-2.5 border-t border-ink/[0.08] pt-4 text-[14px] text-ink/80">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 accent-[#6d4aff]"
              />
              <span>
                Start here
                <span className="mt-0.5 block text-[12.5px] text-ink/40">
                  Pins this post to the top. Only one at a time.
                </span>
              </span>
            </label>
          </div>

          <div className="rounded-2xl border border-ink/[0.09] bg-surface/60 p-5">
            <label htmlFor="slug" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45">
              URL
            </label>
            <input
              id="slug"
              value={effectiveSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              className={`${inputClass} mt-3 font-mono text-[13px]`}
            />
            <p className="mt-2 break-all text-[12px] text-ink/35">
              /blog/{effectiveSlug || "…"}
            </p>
          </div>
        </aside>
      </div>
    </form>
  );
}
