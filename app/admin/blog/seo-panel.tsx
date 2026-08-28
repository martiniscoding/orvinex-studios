"use client";

import { useMemo } from "react";
import { AlertTriangle, Check, X } from "lucide-react";

import { analyzePost } from "@/lib/seo";

const ICONS = {
  pass: { Icon: Check, className: "text-emerald-400" },
  warn: { Icon: AlertTriangle, className: "text-amber-400" },
  fail: { Icon: X, className: "text-red-400" },
} as const;

function scoreTone(score: number) {
  if (score >= 85) return { label: "Strong", className: "text-emerald-400" };
  if (score >= 60) return { label: "Workable", className: "text-amber-400" };
  return { label: "Needs work", className: "text-red-400" };
}

/**
 * Live on-page SEO checks, recomputed as you type.
 *
 * Deliberately framed as hygiene: it confirms the post is crawlable and
 * legible, which is the floor. It cannot tell whether the post is worth
 * reading, which is what actually ranks.
 */
export function SeoPanel(props: {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  keyword: string;
  onKeywordChange: (value: string) => void;
  /** Defaults to the blog; service pages pass their own section. */
  urlPrefix?: string;
}) {
  const { title, excerpt, content, slug, keyword, onKeywordChange } = props;
  const urlPrefix = props.urlPrefix ?? "/blog";

  const report = useMemo(
    () => analyzePost({ title, excerpt, content, slug, keyword, urlPrefix }),
    [title, excerpt, content, slug, keyword, urlPrefix]
  );

  const tone = scoreTone(report.score);

  return (
    <div className="rounded-2xl border border-ink/[0.09] bg-surface/60 p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45">
          SEO
        </span>
        <span className={`font-display text-[15px] font-bold ${tone.className}`}>
          {report.score}
          <span className="ml-1.5 text-[11px] font-medium uppercase tracking-wider">
            {tone.label}
          </span>
        </span>
      </div>

      <label htmlFor="keyword" className="mb-2 mt-4 block text-[12.5px] text-ink/70">
        Focus keyword
      </label>
      <input
        id="keyword"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        placeholder="mvp development agency"
        className="w-full rounded-lg border border-ink/[0.09] bg-ink/[0.03] px-3 py-2 text-[13.5px] text-ink placeholder:text-ink/25 outline-none transition-colors focus:border-primary/60"
      />
      {!keyword.trim() && (
        <p className="mt-2 text-[12px] leading-relaxed text-ink/35">
          Set the phrase this post should rank for to unlock the keyword checks.
        </p>
      )}

      <ul className="mt-5 space-y-3 border-t border-ink/[0.08] pt-4">
        {report.checks.map((check) => {
          const { Icon, className } = ICONS[check.status];
          return (
            <li key={check.id} className="flex gap-2.5">
              <Icon
                className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${className}`}
                strokeWidth={2.6}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block text-[13px] font-medium text-ink/85">
                  {check.label}
                </span>
                <span className="block text-[12px] leading-snug text-ink/40">
                  {check.detail}
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 border-t border-ink/[0.08] pt-3 text-[11.5px] leading-relaxed text-ink/30">
        These are hygiene checks. Clearing them keeps a post from being held
        back by mechanics — it does not make it worth reading, which is what
        actually ranks.
      </p>
    </div>
  );
}
