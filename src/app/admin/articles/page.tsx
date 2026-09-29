import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { formatDate, getFilePosts, type Post } from "@/lib/articles";
import { listArticles, toPost } from "@/lib/article-store";
import { auditPost } from "@/lib/seo-audit";
import AdminHeader from "../AdminHeader";
import { createArticle } from "./actions";
import { scoreColour, statusOf } from "./status";

export const dynamic = "force-dynamic";

export default async function ArticlesAdminPage() {
  const session = await requireAdmin();
  const [rows, files] = [await listArticles(), getFilePosts()];
  const posts = rows.map(toPost);
  const all: Post[] = [...files, ...posts];
  const audited = (p: Post) => auditPost({ ...p, draft: false }, all.filter((o) => o !== p));

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
      <AdminHeader email={session.user.email} active="articles" />

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display-serif text-[clamp(2rem,4vw,2.75rem)]">Articles</h1>
          <p className="mt-1 text-sm text-muted">
            Write, audit and publish. An article can only go live once it passes every SEO check.
          </p>
        </div>
        <form action={createArticle}>
          <button
            type="submit"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-2"
          >
            New article
          </button>
        </form>
      </div>

      {posts.length ? (
        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-card">
          {posts.map((p, i) => {
            const status = statusOf(p);
            const audit = audited(p);
            return (
              <li key={p.id}>
                <Link
                  href={`/admin/articles/${p.id}`}
                  className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-panel sm:flex-row sm:items-center sm:gap-6 sm:px-6"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{p.title || <span className="text-faint">Untitled</span>}</p>
                    <p className="mt-0.5 truncate text-sm text-muted">
                      {p.keyword ? <>“{p.keyword}”</> : "No keyword yet"} · {p.words.toLocaleString("en")} words ·{" "}
                      {status.label === "Draft" ? `edited ${formatDate(rows[i].updatedAt.toISOString().slice(0, 10))}` : formatDate(p.date)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <span className={`h-2 w-2 rounded-full ${status.dot}`} aria-hidden="true" />
                      {status.label}
                    </span>
                    <span className={`w-20 text-right font-semibold tabular-nums ${scoreColour(audit.score)}`}>
                      SEO {audit.score}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-8 rounded-[var(--radius-card)] border border-dashed border-line bg-card/60 px-6 py-16 text-center">
          <p className="font-medium">No articles written here yet.</p>
          <p className="mt-1 text-sm text-muted">Start one with “New article”. It stays a private draft until you publish it.</p>
        </div>
      )}

      {files.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold text-ink">Markdown articles</h2>
          <p className="mt-1 text-sm text-muted">
            These live as files in <code className="rounded bg-hush px-1.5 py-0.5">content/articles</code> and are
            edited in code. They count towards the duplicate-keyword and link checks.
          </p>
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-card">
            {files.map((p) => {
              const status = statusOf(p);
              const audit = audited(p);
              return (
                <li key={p.slug} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.title}</p>
                    <p className="mt-0.5 truncate text-sm text-muted">{p.file}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <span className={`h-2 w-2 rounded-full ${status.dot}`} aria-hidden="true" />
                      {status.label}
                    </span>
                    <span className={`w-20 text-right font-semibold tabular-nums ${scoreColour(audit.score)}`}>
                      SEO {audit.score}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
