"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, PencilLine, Plus, Trash2 } from "lucide-react";

import { Markdown } from "@/components/articles/Markdown";
import type { ServiceFaq } from "@/lib/service-page";
import { SERVICE_ICON_NAMES, iconFor } from "@/lib/service-icons";
import { BANDS } from "@/lib/services";
import { SeoPanel } from "../articles/seo-panel";
import {
  createServicePage,
  updateServicePage,
  type ServicePageInput,
} from "./actions";

const inputClass =
  "w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3 text-[14.5px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-primary/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/25";

const labelClass = "mb-2 block text-[13px] font-medium text-white/80";

export function ServiceEditor({
  slug,
  initial,
}: {
  /** Absent when adding a service. */
  slug?: string;
  initial: ServicePageInput;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState(initial.title);
  const [short, setShort] = useState(initial.short);
  const [cardText, setCardText] = useState(initial.cardText);
  const [stack, setStack] = useState(initial.stack.join(", "));
  const [band, setBand] = useState(initial.band);
  const [icon, setIcon] = useState(initial.icon);
  const [featured, setFeatured] = useState(initial.featured);
  const [headline, setHeadline] = useState(initial.headline);
  const [intro, setIntro] = useState(initial.intro);
  const [body, setBody] = useState(initial.body);
  const [faq, setFaq] = useState<ServiceFaq[]>(initial.faq);
  const [metaTitle, setMetaTitle] = useState(initial.metaTitle);
  const [metaDescription, setMetaDescription] = useState(initial.metaDescription);
  const [keyword, setKeyword] = useState(initial.keyword);

  const [tab, setTab] = useState<"write" | "preview">("write");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function updateFaq(index: number, patch: Partial<ServiceFaq>) {
    setFaq((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaved(false);

    const input: ServicePageInput = {
      title,
      short,
      cardText,
      stack: stack.split(",").map((entry) => entry.trim()).filter(Boolean),
      band,
      icon,
      featured,
      headline,
      intro,
      body,
      faq,
      metaTitle,
      metaDescription,
      keyword,
    };

    startTransition(async () => {
      const result = slug
        ? await updateServicePage(slug, input)
        : await createServicePage(input);

      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSaved(true);
      if (slug) router.refresh();
      else router.replace(`/admin/services/${result.slug}`);
    });
  }

  return (
    <form onSubmit={submit} className="pb-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} />
          All services
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
          {slug && (
            <a
              href={`/services/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13.5px] text-muted transition-colors hover:text-white"
            >
              View page
            </a>
          )}
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-primary-deep px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-primary disabled:opacity-40"
          >
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="mb-8 rounded-2xl border border-white/[0.09] bg-surface/40 p-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Catalogue entry
            </span>
            <p className="mt-1.5 text-[12.5px] text-white/35">
              How this service appears in the grid and the index.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="title" className={labelClass}>
                  Name
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Custom Software Development"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="short" className={labelClass}>
                  Short name
                  <span className="ml-2 font-normal text-white/35">
                    for the index
                  </span>
                </label>
                <input
                  id="short"
                  value={short}
                  onChange={(e) => setShort(e.target.value)}
                  placeholder="Custom Software"
                  className={inputClass}
                />
              </div>
            </div>

            <label htmlFor="cardText" className={`${labelClass} mt-4`}>
              Card description
            </label>
            <textarea
              id="cardText"
              value={cardText}
              onChange={(e) => setCardText(e.target.value)}
              rows={3}
              placeholder="What this is, in two or three sentences."
              className={`${inputClass} resize-y`}
            />

            <label htmlFor="stack" className={`${labelClass} mt-4`}>
              Tags
              <span className="ml-2 font-normal text-white/35">
                comma separated, up to eight
              </span>
            </label>
            <input
              id="stack"
              value={stack}
              onChange={(e) => setStack(e.target.value)}
              placeholder="ERP, Internal tools, Automation"
              className={inputClass}
            />

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="band" className={labelClass}>
                  Band
                </label>
                <select
                  id="band"
                  value={band}
                  onChange={(e) => setBand(e.target.value)}
                  className={inputClass}
                >
                  {BANDS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className={labelClass}>Icon</span>
                <div className="flex max-h-[92px] flex-wrap gap-1.5 overflow-y-auto rounded-xl border border-white/[0.09] bg-white/[0.03] p-2">
                  {SERVICE_ICON_NAMES.map((name) => {
                    const Icon = iconFor(name);
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setIcon(name)}
                        aria-label={name}
                        aria-pressed={icon === name}
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors ${
                          icon === name
                            ? "border-primary/60 bg-primary/15 text-white"
                            : "border-transparent text-white/45 hover:text-white"
                        }`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.9} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-2.5 border-t border-white/[0.08] pt-4 text-[14px] text-white/80">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 accent-[#6d4aff]"
              />
              <span>
                Show on the landing page
                <span className="mt-0.5 block text-[12.5px] text-white/40">
                  The teaser grid above the fold on the home page.
                </span>
              </span>
            </label>
          </div>

          <label htmlFor="headline" className={labelClass}>
            Headline
            <span className="ml-2 font-normal text-white/35">
              the big line at the top of the page
            </span>
          </label>
          <input
            id="headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className={inputClass}
          />

          <label htmlFor="intro" className={`${labelClass} mt-6`}>
            Intro
          </label>
          <textarea
            id="intro"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            rows={3}
            className={`${inputClass} resize-y`}
          />

          <div className="mb-2 mt-6 flex items-center justify-between">
            <span className="text-[13px] font-medium text-white/80">Body</span>
            <div className="flex gap-1 rounded-full border border-white/[0.09] p-0.5">
              {(["write", "preview"] as const).map((mode) => {
                const Icon = mode === "write" ? PencilLine : Eye;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTab(mode)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-medium capitalize transition-colors ${
                      tab === mode
                        ? "bg-primary-deep text-white"
                        : "text-white/60 hover:text-white"
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
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={26}
              className={`${inputClass} resize-y font-mono text-[13.5px] leading-relaxed`}
            />
          ) : (
            <div className="min-h-[460px] rounded-xl border border-white/[0.09] bg-white/[0.02] px-5 py-4">
              {body.trim() ? (
                <Markdown>{body}</Markdown>
              ) : (
                <p className="text-[14px] text-white/35">Nothing to preview.</p>
              )}
            </div>
          )}

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[13px] font-medium text-white/80">
                  Common questions
                </span>
                <p className="mt-1 text-[12.5px] text-white/35">
                  Shown on the page and marked up as FAQ structured data, which
                  can win extra space in search results.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFaq((prev) => [...prev, { q: "", a: "" }])}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-1.5 text-[13px] text-white/70 transition-colors hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
                Add
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {faq.length === 0 && (
                <p className="rounded-xl border border-white/[0.08] px-4 py-5 text-center text-[13.5px] text-white/35">
                  No questions yet.
                </p>
              )}
              {faq.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
                >
                  <div className="flex items-start gap-3">
                    <input
                      value={item.q}
                      onChange={(e) => updateFaq(index, { q: e.target.value })}
                      placeholder="Question"
                      className={`${inputClass} py-2 text-[14px] font-medium`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFaq((prev) => prev.filter((_, i) => i !== index))
                      }
                      aria-label="Remove question"
                      className="mt-1 shrink-0 rounded-full border border-white/10 p-2 text-white/40 transition-colors hover:border-red-500/40 hover:text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  </div>
                  <textarea
                    value={item.a}
                    onChange={(e) => updateFaq(index, { a: e.target.value })}
                    placeholder="Answer"
                    rows={3}
                    className={`${inputClass} mt-3 resize-y py-2 text-[14px]`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:pt-[26px]">
          <SeoPanel
            title={metaTitle.trim() || headline}
            excerpt={metaDescription.trim() || intro}
            content={body}
            slug={slug ?? ""}
            keyword={keyword}
            onKeywordChange={setKeyword}
            urlPrefix="/services"
          />

          <div className="rounded-2xl border border-white/[0.09] bg-surface/60 p-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              Search listing
            </span>
            <p className="mt-2 text-[12px] leading-relaxed text-white/35">
              How this page appears in results. Leave blank to fall back to the
              headline and intro.
            </p>

            <label htmlFor="metaTitle" className="mb-2 mt-4 block text-[12.5px] text-white/70">
              Title
            </label>
            <input
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder={`${title || "Service"} | Orvinex`}
              className="w-full rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 py-2 text-[13px] text-white placeholder:text-white/25 outline-none focus:border-primary/60"
            />

            <label htmlFor="metaDescription" className="mb-2 mt-4 block text-[12.5px] text-white/70">
              Description
            </label>
            <textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={4}
              className="w-full resize-y rounded-lg border border-white/[0.09] bg-white/[0.03] px-3 py-2 text-[13px] text-white placeholder:text-white/25 outline-none focus:border-primary/60"
            />
          </div>
        </aside>
      </div>
    </form>
  );
}
