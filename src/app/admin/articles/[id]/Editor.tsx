"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ClipboardEvent, type DragEvent, type ReactNode } from "react";
import { prose } from "@/components/prose";
import { slugify } from "@/lib/slug";
import type { Check } from "@/lib/seo-audit";
import { analyseArticle, deleteArticle, publishArticle, saveArticle, unpublishArticle } from "../actions";
import { scoreColour, statusOf } from "../status";
import type { Analysis, ArticleDraft, SaveResult } from "../types";

type Props = {
  id: number;
  initial: ArticleDraft;
  initialDraft: boolean;
  initialVersion: string;
  initialAnalysis: Analysis;
  services: { id: string; title: string; group: string }[];
  linkTargets: { group: string; label: string; href: string }[];
  categories: string[];
  founderName: string;
  siteHost: string;
};

const input =
  "w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";
const today = () => new Date().toISOString().slice(0, 10);

/** Drafts save themselves this long after the last keystroke. Live articles never do. */
const AUTOSAVE_MS = 4000;
const ANALYSE_MS = 600;

async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/media", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data.url;
}

export default function Editor(props: Props) {
  const { id } = props;
  const [f, setF] = useState<ArticleDraft>(props.initial);
  const [saved, setSaved] = useState(() => JSON.stringify(props.initial));
  const [draft, setDraft] = useState(props.initialDraft);
  const [version, setVersion] = useState(props.initialVersion);
  const [liveSlug, setLiveSlug] = useState(props.initial.slug);
  const [analysis, setAnalysis] = useState(props.initialAnalysis);
  const [busy, setBusy] = useState<null | "save" | "publish" | "unpublish" | "upload">(null);
  const [message, setMessage] = useState<{ kind: "error" | "ok"; text: string; conflict?: boolean } | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [slugTouched, setSlugTouched] = useState(!props.initial.slug.startsWith("untitled-"));
  const [keywordsText, setKeywordsText] = useState(props.initial.keywords.join("\n"));
  const body = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const busyRef = useRef(false);
  const router = useRouter();

  // The title box grows with the title instead of reserving empty lines.
  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [f.title]);

  const dirty = JSON.stringify(f) !== saved;
  const status = statusOf({ draft, date: f.date });
  const { audit } = analysis;

  const set = useCallback(<K extends keyof ArticleDraft>(key: K, value: ArticleDraft[K]) => {
    setF((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Until the URL is set by hand, a draft's URL follows its keyword (or title).
  useEffect(() => {
    if (slugTouched || !draft) return;
    const auto = slugify(f.keyword || f.title);
    if (auto && auto !== f.slug) set("slug", auto);
  }, [f.keyword, f.title, f.slug, slugTouched, draft, set]);

  // Live audit and preview, a moment after typing stops.
  const analyseSeq = useRef(0);
  useEffect(() => {
    const seq = ++analyseSeq.current;
    const t = setTimeout(() => {
      analyseArticle(id, f)
        .then((a) => {
          if (seq === analyseSeq.current) setAnalysis(a);
        })
        .catch(() => {
          if (seq === analyseSeq.current)
            setMessage({ kind: "error", text: "Couldn't check the article. Your session may have expired; sign in again in another tab." });
        });
    }, ANALYSE_MS);
    return () => clearTimeout(t);
  }, [id, f]);

  const run = useCallback(
    async (kind: "save" | "publish" | "unpublish", quiet = false): Promise<boolean> => {
      if (busyRef.current) return false;
      busyRef.current = true;
      setBusy(kind);
      if (!quiet) setMessage(null);
      const snapshot = f;
      try {
        const res: SaveResult =
          kind === "unpublish"
            ? await unpublishArticle(id)
            : await (kind === "publish" ? publishArticle : saveArticle)(id, snapshot, version);
        if (!res.ok) {
          setMessage({ kind: "error", text: res.error, conflict: res.conflict });
          return false;
        }
        setVersion(res.version);
        setDraft(res.draft);
        setSavedAt(new Date());
        if (kind !== "unpublish") {
          setSaved(JSON.stringify(snapshot));
          setLiveSlug(res.slug);
        }
        if (kind === "publish") {
          setMessage({
            kind: "ok",
            text: res.date > today() ? `Scheduled: it goes live on ${res.date}.` : "Published. It's live now.",
          });
        } else if (kind === "unpublish") {
          setMessage({ kind: "ok", text: "Unpublished. It's a draft again and no longer on the site." });
        } else if (!quiet) {
          setMessage({ kind: "ok", text: res.draft ? "Draft saved." : "Live article updated." });
        }
        return true;
      } catch {
        setMessage({ kind: "error", text: "Couldn't reach the server. Check your connection and try again." });
        return false;
      } finally {
        busyRef.current = false;
        setBusy(null);
      }
    },
    [f, id, version],
  );

  // In-app navigation skips beforeunload: save a draft first, or confirm
  // before dropping edits to a live article.
  const leave = async (href: string) => {
    if (dirty) {
      if (draft) {
        if (!(await run("save", true))) return; // the error is on screen; stay
      } else if (!confirm("Leave without updating the live article? Your changes will be lost.")) return;
    }
    router.push(href);
  };

  // Drafts autosave. Live articles only change when you press Update.
  useEffect(() => {
    if (!draft || !dirty) return;
    const t = setTimeout(() => run("save", true), AUTOSAVE_MS);
    return () => clearTimeout(t);
  }, [draft, dirty, run]);

  // Cmd/Ctrl+S saves; leaving with unsaved changes asks first.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        run("save");
      }
    };
    const onLeave = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [dirty, run]);

  /* ---------- Markdown helpers ---------- */

  const edit = (next: string, selStart: number, selEnd = selStart) => {
    set("body", next);
    requestAnimationFrame(() => {
      const el = body.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(selStart, selEnd);
    });
  };

  const wrap = (before: string, after: string, placeholder: string) => {
    const el = body.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b, value } = el;
    const inner = value.slice(a, b) || placeholder;
    edit(value.slice(0, a) + before + inner + after + value.slice(b), a + before.length, a + before.length + inner.length);
  };

  const prefixLines = (prefix: string | ((i: number) => string)) => {
    const el = body.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b, value } = el;
    const start = value.lastIndexOf("\n", a - 1) + 1;
    const endIdx = value.indexOf("\n", b);
    const end = endIdx === -1 ? value.length : endIdx;
    const lines = value
      .slice(start, end)
      .split("\n")
      .map((l, i) => (typeof prefix === "function" ? prefix(i) : prefix) + l.replace(/^(#{1,6} |> |- |\d+\. )/, ""));
    const text = lines.join("\n");
    edit(value.slice(0, start) + text + value.slice(end), start + text.length);
  };

  const insertBlock = (block: string, cursorOffset = block.length) => {
    const el = body.current;
    const value = el?.value ?? f.body;
    const at = el ? el.selectionEnd : value.length;
    const before = value.slice(0, at);
    const pad = before === "" ? "" : before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
    const next = before + pad + block + "\n\n" + value.slice(at).replace(/^\n+/, "");
    const pos = before.length + pad.length + cursorOffset;
    edit(next, pos);
  };

  const insertLink = (href: string, label: string) => {
    const el = body.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b, value } = el;
    const text = value.slice(a, b) || label;
    const md = `[${text}](${href})`;
    edit(value.slice(0, a) + md + value.slice(b), a + 1, a + 1 + text.length);
  };

  const addImages = async (files: File[]) => {
    for (const file of files.filter((x) => x.type.startsWith("image/"))) {
      setBusy("upload");
      try {
        const url = await uploadImage(file);
        // Empty alt on purpose: the audit flags it until you describe the image.
        insertBlock(`![](${url})`, 2);
        setMessage({ kind: "ok", text: "Image added. Type a description between the [ ] for screen readers and Google Images." });
      } catch (err) {
        setMessage({ kind: "error", text: err instanceof Error ? err.message : "Upload failed." });
      } finally {
        setBusy(null);
      }
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const files = [...e.clipboardData.files];
    if (files.some((x) => x.type.startsWith("image/"))) {
      e.preventDefault();
      addImages(files);
    }
  };
  const onDrop = (e: DragEvent<HTMLTextAreaElement>) => {
    const files = [...e.dataTransfer.files];
    if (files.length) {
      e.preventDefault();
      addImages(files);
    }
  };

  const tools: { label: string; title: string; run: () => void }[] = [
    { label: "H2", title: "Section heading", run: () => prefixLines("## ") },
    { label: "H3", title: "Sub-heading", run: () => prefixLines("### ") },
    { label: "B", title: "Bold", run: () => wrap("**", "**", "bold text") },
    { label: "I", title: "Italic", run: () => wrap("_", "_", "italic text") },
    { label: "•", title: "Bulleted list", run: () => prefixLines("- ") },
    { label: "1.", title: "Numbered list", run: () => prefixLines((i) => `${i + 1}. `) },
    { label: "❝", title: "Quote", run: () => prefixLines("> ") },
    { label: "Link", title: "Link to another site", run: () => wrap("[", "](https://)", "link text") },
    {
      label: "Table",
      title: "Table",
      run: () => insertBlock("| Option | Best for | Trade-off |\n| --- | --- | --- |\n| | | |", 2),
    },
  ];

  /* ---------- Derived ---------- */

  const metaTitle = f.metaTitle.trim() || `${f.title.trim()} | Orvinex`;
  const primaryService = props.services.find((s) => s.id === f.services[0]);
  const slugChangedLive = !draft && f.slug !== liveSlug;
  const failing = audit.checks.filter((c) => !c.ok).sort((a, b) => (a.level === b.level ? 0 : a.level === "error" ? -1 : 1));
  const passing = audit.checks.filter((c) => c.ok);
  const linkGroups = useMemo(() => [...new Set(props.linkTargets.map((t) => t.group))], [props.linkTargets]);

  const primaryLabel = draft ? (f.date > today() ? "Schedule" : "Publish") : "Update";
  const primaryDisabled = busy !== null || audit.errors > 0 || (!draft && !dirty);

  return (
    <div className="pb-24">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-line bg-shell/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/admin/articles"
              onClick={(e) => {
                if (!dirty) return;
                e.preventDefault();
                leave("/admin/articles");
              }}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              ← Articles
            </Link>
            <span className="flex items-center gap-2 text-sm font-medium">
              <span className={`h-2 w-2 rounded-full ${status.dot}`} aria-hidden="true" />
              {status.label}
            </span>
            <span className="hidden text-sm text-faint sm:inline" aria-live="polite">
              {busy === "save"
                ? "Saving…"
                : busy === "upload"
                  ? "Uploading image…"
                  : dirty
                    ? draft
                      ? "Unsaved changes"
                      : "Unsaved changes (press Update to go live)"
                    : savedAt
                      ? `Saved ${savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                      : "Saved"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`/admin/articles/${id}/preview`}
              target="_blank"
              rel="noopener noreferrer"
              title="Opens the last saved version exactly as readers will see it"
              className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              Preview
            </a>
            {status.label === "Published" && (
              <a
                href={`/articles/${liveSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                View live
              </a>
            )}
            {draft && (
              <button
                type="button"
                onClick={() => run("save")}
                disabled={busy !== null || !dirty}
                className="rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink disabled:opacity-50"
              >
                Save draft
              </button>
            )}
            <button
              type="button"
              onClick={() => run(draft ? "publish" : "save")}
              disabled={primaryDisabled}
              title={audit.errors ? `Fix ${audit.errors} SEO error${audit.errors === 1 ? "" : "s"} to ${primaryLabel.toLowerCase()}` : undefined}
              className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {busy === "publish" ? "Publishing…" : primaryLabel}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {message && (
          <div
            role={message.kind === "error" ? "alert" : "status"}
            className={`mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm ${
              message.kind === "error" ? "border-accent/30 bg-accent/5 text-accent-deep" : "border-[#2f7d4f]/25 bg-[#2f7d4f]/5 text-[#1f5a38]"
            }`}
          >
            <span>{message.text}</span>
            <span className="flex gap-3">
              {message.conflict && (
                <button type="button" onClick={() => location.reload()} className="font-medium underline underline-offset-4">
                  Reload
                </button>
              )}
              <button type="button" onClick={() => setMessage(null)} className="text-faint hover:text-ink" aria-label="Dismiss">
                ✕
              </button>
            </span>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* ---------- Writing ---------- */}
          <div className="min-w-0">
            <label className="block">
              <span className="sr-only">Title</span>
              <textarea
                ref={titleRef}
                value={f.title}
                onChange={(e) => set("title", e.target.value.replace(/\n/g, " "))}
                placeholder="Article title (contains your keyword)"
                rows={1}
                className="display-serif w-full resize-none overflow-hidden bg-transparent text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] text-ink outline-none placeholder:text-faint"
              />
            </label>
            <p className="mt-1 text-xs text-faint">
              {f.title.length}/70 characters · {analysis.words.toLocaleString("en")} words · {analysis.readingMinutes} min read
            </p>

            <div className="mt-6 overflow-hidden rounded-[var(--radius-card)] border border-line bg-card">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-panel px-3 py-2">
                <div className="flex gap-1" role="tablist">
                  {(["write", "preview"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="tab"
                      aria-selected={tab === t}
                      onClick={() => setTab(t)}
                      className={`rounded-full px-3.5 py-1.5 text-sm font-medium capitalize ${
                        tab === t ? "bg-ink text-white" : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {tab === "write" && (
                  <div className="flex flex-wrap items-center gap-1">
                    {tools.map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        title={t.title}
                        onClick={t.run}
                        className="min-w-8 rounded-lg px-2 py-1 text-sm font-semibold text-ink-2 hover:bg-hush hover:text-ink"
                      >
                        {t.label}
                      </button>
                    ))}
                    <label
                      title="Upload an image (or paste / drop one into the text)"
                      className="cursor-pointer rounded-lg px-2 py-1 text-sm font-semibold text-ink-2 hover:bg-hush hover:text-ink"
                    >
                      Image
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
                        className="sr-only"
                        onChange={(e) => {
                          addImages([...(e.target.files ?? [])]);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    <select
                      aria-label="Insert an internal link"
                      value=""
                      onChange={(e) => {
                        const t = props.linkTargets.find((x) => x.href === e.target.value);
                        if (t) insertLink(t.href, t.label.replace(/ \(draft\)$/, ""));
                      }}
                      className="max-w-44 rounded-lg border border-line bg-card px-2 py-1 text-sm text-ink-2 outline-none"
                    >
                      <option value="">Internal link…</option>
                      {linkGroups.map((g) => (
                        <optgroup key={g} label={g}>
                          {props.linkTargets
                            .filter((t) => t.group === g)
                            .map((t) => (
                              <option key={t.href} value={t.href}>
                                {t.label}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {tab === "write" ? (
                <textarea
                  ref={body}
                  value={f.body}
                  onChange={(e) => set("body", e.target.value)}
                  onPaste={onPaste}
                  onDrop={onDrop}
                  spellCheck
                  placeholder={
                    "Open with the answer: use the keyword in the first two sentences and say who this is for.\n\n## First section\n\nShort paragraphs, concrete examples, real numbers.\n\nLink to a service, e.g. [custom software](/services/custom-software)."
                  }
                  className="block min-h-[70vh] w-full resize-y bg-card px-5 py-4 font-mono text-[0.9375rem] leading-[1.7] text-ink outline-none placeholder:text-faint"
                />
              ) : (
                <div className="min-h-[70vh] px-6 py-6 sm:px-10">
                  {analysis.html ? (
                    <article className={prose} dangerouslySetInnerHTML={{ __html: analysis.html }} />
                  ) : (
                    <p className="text-muted">Nothing written yet.</p>
                  )}
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-faint">
              Markdown: <code>## Heading</code>, <code>**bold**</code>, <code>- list</code>,{" "}
              <code>[link text](/services/seo)</code>. Paste or drop images straight in. Cmd/Ctrl+S saves.
            </p>

            {/* FAQs */}
            <section className="mt-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">FAQs</h2>
                  <p className="text-sm text-muted">
                    3–5 real questions people search, answered in 1–3 sentences. Shown under the article and marked up for Google.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => set("faqs", [...f.faqs, { q: "", a: "" }])}
                  className="shrink-0 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium hover:border-ink"
                >
                  Add question
                </button>
              </div>
              <ol className="mt-4 space-y-3">
                {f.faqs.map((faq, i) => (
                  <li key={i} className="rounded-2xl border border-line bg-card p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-2.5 text-sm font-semibold text-faint">{i + 1}.</span>
                      <div className="flex-1 space-y-2">
                        <input
                          value={faq.q}
                          onChange={(e) => set("faqs", f.faqs.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))}
                          placeholder="Question, as people would type it"
                          className={input}
                        />
                        <textarea
                          value={faq.a}
                          onChange={(e) => set("faqs", f.faqs.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))}
                          placeholder="A direct answer in 1–3 sentences"
                          rows={2}
                          className={`${input} resize-y`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => set("faqs", f.faqs.filter((_, j) => j !== i))}
                        className="mt-2 text-sm text-faint hover:text-accent"
                        aria-label={`Remove question ${i + 1}`}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* ---------- Sidebar ---------- */}
          <aside className="space-y-5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pb-8">
            {/* Score */}
            <Panel>
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-current text-xl font-bold tabular-nums ${scoreColour(audit.score)}`}
                  aria-label={`SEO score ${audit.score} out of 100`}
                >
                  {audit.score}
                </div>
                <div>
                  <p className="font-semibold">SEO score</p>
                  <p className="text-sm text-muted">
                    {audit.errors
                      ? `${audit.errors} error${audit.errors === 1 ? "" : "s"} block publishing`
                      : audit.warnings
                        ? `Ready to publish · ${audit.warnings} suggestion${audit.warnings === 1 ? "" : "s"}`
                        : "Every check passes"}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {failing.map((c, i) => (
                  <CheckRow key={i} check={c} />
                ))}
              </ul>
              {passing.length > 0 && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-sm font-medium text-muted">{passing.length} checks passed</summary>
                  <ul className="mt-2 space-y-2">
                    {passing.map((c, i) => (
                      <CheckRow key={i} check={c} />
                    ))}
                  </ul>
                </details>
              )}
            </Panel>

            {/* Google preview */}
            <Panel title="Google preview">
              <div className="rounded-xl border border-line bg-white p-4 font-[arial,sans-serif]">
                <p className="truncate text-xs text-[#4d5156]">
                  {props.siteHost} › articles › {f.slug}
                </p>
                <p className="mt-1 line-clamp-2 text-[1.125rem] leading-snug text-[#1a0dab]">
                  {metaTitle.length > 60 ? `${metaTitle.slice(0, 58)}…` : metaTitle}
                </p>
                <p className="mt-1 line-clamp-3 text-[0.8125rem] leading-[1.5] text-[#4d5156]">
                  {f.description ? (f.description.length > 160 ? `${f.description.slice(0, 157)}…` : f.description) : "Add a meta description…"}
                </p>
              </div>
            </Panel>

            {/* Search fields */}
            <Panel title="Search">
              <Field label="Target keyword" hint="The one search phrase this article should rank for.">
                <input
                  value={f.keyword}
                  onChange={(e) => set("keyword", e.target.value)}
                  placeholder="e.g. custom software vs off-the-shelf"
                  className={input}
                />
              </Field>
              <Field label="Secondary keywords" hint="One per line: variants, “People also ask”, related searches.">
                <textarea
                  value={keywordsText}
                  onChange={(e) => {
                    setKeywordsText(e.target.value);
                    set(
                      "keywords",
                      e.target.value
                        .split(/[\n,]/)
                        .map((k) => k.trim())
                        .filter(Boolean),
                    );
                  }}
                  rows={3}
                  className={`${input} resize-y`}
                />
              </Field>
              <Field label="URL" hint={slugChangedLive ? `The old URL /articles/${liveSlug} will redirect here permanently.` : "Short, lowercase, keyword first."}>
                <div className="flex items-center rounded-xl border border-line bg-card focus-within:border-ink">
                  <span className="pl-3.5 text-sm text-faint">/articles/</span>
                  <input
                    value={f.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"));
                    }}
                    onBlur={() => set("slug", slugify(f.slug))}
                    className="min-w-0 flex-1 bg-transparent py-2.5 pr-3.5 text-[0.9375rem] outline-none"
                  />
                </div>
              </Field>
              <Field label="SEO title" hint={<Counter n={metaTitle.length} min={30} max={60} note={f.metaTitle ? undefined : "default"} />}>
                <input
                  value={f.metaTitle}
                  onChange={(e) => set("metaTitle", e.target.value)}
                  placeholder={`${f.title || "Title"} | Orvinex`}
                  className={input}
                />
              </Field>
              <Field label="Meta description" hint={<Counter n={f.description.length} min={120} max={160} />}>
                <textarea
                  value={f.description}
                  onChange={(e) => set("description", e.target.value.replace(/\n/g, " "))}
                  rows={4}
                  placeholder="The snippet under your title in Google: contains the keyword and gives a reason to click."
                  className={`${input} resize-y`}
                />
              </Field>
            </Panel>

            {/* Details */}
            <Panel title="Details">
              <Field label="Category">
                <input list="article-categories" value={f.category} onChange={(e) => set("category", e.target.value)} className={input} />
                <datalist id="article-categories">
                  {props.categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </Field>
              <Field
                group
                label="Related services"
                hint={primaryService ? `“${primaryService.title}” drives the call to action. The first ticked is primary.` : "Tick the services this article leads to."}
              >
                <ul className="max-h-56 space-y-1 overflow-y-auto rounded-xl border border-line bg-card p-2">
                  {props.services.map((s) => {
                    const at = f.services.indexOf(s.id);
                    return (
                      <li key={s.id}>
                        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm hover:bg-panel">
                          <input
                            type="checkbox"
                            checked={at !== -1}
                            onChange={() =>
                              set("services", at === -1 ? [...f.services, s.id] : f.services.filter((x) => x !== s.id))
                            }
                          />
                          <span className="flex-1">{s.title}</span>
                          {at === 0 && <span className="rounded-full bg-hush px-2 text-xs font-medium">Primary</span>}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </Field>
              <Field label="Author">
                <input value={f.author} onChange={(e) => set("author", e.target.value)} placeholder={props.founderName} className={input} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Publish date" hint={f.date > today() ? "Future: scheduled" : undefined}>
                  <input type="date" value={f.date} onChange={(e) => set("date", e.target.value || today())} className={input} />
                </Field>
                <Field label="Last updated">
                  <input type="date" value={f.updated} onChange={(e) => set("updated", e.target.value)} className={input} />
                </Field>
              </div>
              {!draft && (
                <button
                  type="button"
                  onClick={() => set("updated", today())}
                  className="-mt-1 text-sm font-medium text-accent underline underline-offset-4"
                >
                  Mark as updated today
                </button>
              )}
            </Panel>

            {/* Cover */}
            <Panel title="Cover image">
              {f.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.cover} alt="" className="aspect-[16/9] w-full rounded-xl border border-line object-cover" />
              ) : (
                <p className="text-sm text-muted">Optional. Without one, the share image is generated from the title.</p>
              )}
              <div className="flex flex-wrap gap-2">
                <label className="cursor-pointer rounded-full border border-line bg-card px-4 py-2 text-sm font-medium hover:border-ink">
                  {f.cover ? "Replace" : "Upload"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    className="sr-only"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      if (!file) return;
                      setBusy("upload");
                      try {
                        set("cover", await uploadImage(file));
                      } catch (err) {
                        setMessage({ kind: "error", text: err instanceof Error ? err.message : "Upload failed." });
                      } finally {
                        setBusy(null);
                      }
                    }}
                  />
                </label>
                {f.cover && (
                  <button type="button" onClick={() => set("cover", "")} className="px-2 text-sm text-faint hover:text-accent">
                    Remove
                  </button>
                )}
              </div>
              {f.cover && (
                <Field label="Alt text" hint="Describe the image for screen readers and Google Images.">
                  <input value={f.coverAlt} onChange={(e) => set("coverAlt", e.target.value)} className={input} />
                </Field>
              )}
            </Panel>

            {/* Outline */}
            {analysis.toc.length > 0 && (
              <Panel title="Outline">
                <ol className="space-y-1.5 text-sm">
                  {analysis.toc.map((h, i) => (
                    <li key={i} className={h.depth === 3 ? "pl-4 text-muted" : "font-medium"}>
                      {h.text}
                    </li>
                  ))}
                </ol>
              </Panel>
            )}

            {/* Danger zone */}
            <Panel title="Manage">
              {!draft && (
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => {
                    if (confirm("Take this article off the site? It becomes a draft again.")) run("unpublish");
                  }}
                  className="w-full rounded-full border border-line bg-card px-4 py-2 text-sm font-medium hover:border-ink disabled:opacity-50"
                >
                  Unpublish
                </button>
              )}
              <form
                action={deleteArticle.bind(null, id)}
                onSubmit={(e) => {
                  if (!confirm("Delete this article permanently? This can't be undone.")) e.preventDefault();
                  else setSaved(JSON.stringify(f)); // don't trigger the unsaved-changes prompt
                }}
              >
                <button type="submit" className="w-full rounded-full px-4 py-2 text-sm font-medium text-faint hover:text-accent">
                  Delete article
                </button>
              </form>
            </Panel>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-[var(--radius-card)] border border-line bg-card p-5">
      {title && <h2 className="text-sm font-semibold">{title}</h2>}
      {children}
    </section>
  );
}

/** A labelled control. `group` is for several controls (checkboxes), which a <label> can't wrap. */
function Field({ label, hint, group, children }: { label: string; hint?: ReactNode; group?: boolean; children: ReactNode }) {
  const title = <span className="mb-1.5 block text-sm font-medium text-ink-2">{label}</span>;
  return (
    <div role={group ? "group" : undefined} aria-label={group ? label : undefined}>
      {group ? (
        <>
          {title}
          {children}
        </>
      ) : (
        <label className="block">
          {title}
          {children}
        </label>
      )}
      {hint && <p className="mt-1.5 text-xs text-faint">{hint}</p>}
    </div>
  );
}

function Counter({ n, min, max, note }: { n: number; min: number; max: number; note?: string }) {
  const ok = n >= min && n <= max;
  return (
    <span className={ok ? "text-[#2f7d4f]" : "text-[#a86f12]"}>
      {n} characters{note ? ` (${note})` : ""} · aim for {min}–{max}
    </span>
  );
}

function CheckRow({ check }: { check: Check }) {
  const icon = check.ok ? "✓" : check.level === "error" ? "✕" : "!";
  const colour = check.ok ? "text-[#2f7d4f]" : check.level === "error" ? "text-accent" : "text-[#a86f12]";
  return (
    <li className="flex gap-2.5 text-sm leading-snug">
      <span className={`mt-px w-3 shrink-0 text-center font-bold ${colour}`} aria-hidden="true">
        {icon}
      </span>
      <span className={check.ok ? "text-muted" : "text-ink-2"}>
        <span className="sr-only">{check.ok ? "Passed: " : check.level === "error" ? "Error: " : "Suggestion: "}</span>
        {check.text}
        <span className="ml-1.5 text-xs text-faint">{check.group}</span>
      </span>
    </li>
  );
}
