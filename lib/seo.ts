/**
 * Live SEO analysis for the post editor.
 *
 * Pure and dependency-free so the editor can run it on every keystroke without
 * a round trip. Thresholds are the conventional ones: Google truncates titles
 * around 60 characters and descriptions around 158, and the checks that carry
 * real weight are the boring ones — is the phrase you want to rank for
 * actually in the title, the URL, the opening paragraph and a subheading.
 *
 * These are hygiene checks. They confirm a post is *crawlable and legible*,
 * which is the floor; they cannot judge whether it is worth reading, which is
 * what actually ranks.
 */

export type CheckStatus = "pass" | "warn" | "fail";

export type SeoCheck = {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
  /** Keyword checks are skipped entirely when no keyword is set. */
  weight: number;
};

export type SeoReport = {
  checks: SeoCheck[];
  score: number;
  wordCount: number;
};

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 158;
const WORDS_MIN = 300;
const WORDS_GOOD = 700;

function norm(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

/** Whole-phrase match, so "AI" does not match "chain". */
function contains(haystack: string, phrase: string) {
  if (!phrase.trim()) return false;
  const escaped = phrase.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|\\W)${escaped}(\\W|$)`, "i").test(haystack);
}

export function analyzePost(input: {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  keyword: string;
  /** Section the page lives under, so the URL check shows the real path. */
  urlPrefix?: string;
}): SeoReport {
  const { title, excerpt, content, slug } = input;
  const urlPrefix = input.urlPrefix ?? "/blog";
  const keyword = norm(input.keyword);
  const body = norm(content);
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  // Markdown headings: ## or ### at the start of a line.
  const headings = content.match(/^#{2,3}\s+.+$/gm) ?? [];
  // Links, excluding images (which are the same syntax prefixed with !).
  const links = Array.from(
    content.matchAll(/(^|[^!])\[[^\]]+\]\(([^)]+)\)/g),
    (m) => m[2]!
  );
  const internal = links.filter(
    (href) => href.startsWith("/") || href.includes("orvinex.store")
  );
  const external = links.filter(
    (href) => href.startsWith("http") && !href.includes("orvinex.store")
  );
  const firstParagraph = norm(
    content.split(/\n{2,}/).find((block) => !block.trim().startsWith("#")) ?? ""
  );

  const checks: SeoCheck[] = [
    {
      id: "title-length",
      label: "Title length",
      weight: 2,
      ...(title.length === 0
        ? { status: "fail" as const, detail: "No title yet." }
        : title.length > TITLE_MAX
          ? {
              status: "warn" as const,
              detail: `${title.length} characters — Google truncates around ${TITLE_MAX}.`,
            }
          : title.length < TITLE_MIN
            ? {
                status: "warn" as const,
                detail: `${title.length} characters — short titles waste result space.`,
              }
            : {
                status: "pass" as const,
                detail: `${title.length} characters.`,
              }),
    },
    {
      id: "desc-length",
      label: "Meta description",
      weight: 2,
      ...(excerpt.length === 0
        ? { status: "fail" as const, detail: "No excerpt — this is the snippet in search results." }
        : excerpt.length > DESC_MAX
          ? {
              status: "warn" as const,
              detail: `${excerpt.length} characters — truncated after about ${DESC_MAX}.`,
            }
          : excerpt.length < DESC_MIN
            ? {
                status: "warn" as const,
                detail: `${excerpt.length} characters — aim for ${DESC_MIN}–${DESC_MAX}.`,
              }
            : { status: "pass" as const, detail: `${excerpt.length} characters.` }),
    },
    {
      id: "length",
      label: "Depth",
      weight: 2,
      ...(words < WORDS_MIN
        ? {
            status: "fail" as const,
            detail: `${words} words — thin pages rarely rank. Aim past ${WORDS_MIN}.`,
          }
        : words < WORDS_GOOD
          ? {
              status: "warn" as const,
              detail: `${words} words — competitive queries usually need ${WORDS_GOOD}+.`,
            }
          : { status: "pass" as const, detail: `${words} words.` }),
    },
    {
      id: "headings",
      label: "Subheadings",
      weight: 1,
      ...(headings.length === 0
        ? {
            status: "fail" as const,
            detail: "No ## headings — readers skim, and headings are what they skim.",
          }
        : headings.length < 2
          ? { status: "warn" as const, detail: "Only one subheading." }
          : { status: "pass" as const, detail: `${headings.length} subheadings.` }),
    },
    {
      id: "internal-links",
      label: "Internal links",
      weight: 2,
      ...(internal.length === 0
        ? {
            status: "fail" as const,
            detail: "None. Link to /services or another post — internal links spread authority.",
          }
        : { status: "pass" as const, detail: `${internal.length} internal link(s).` }),
    },
    {
      id: "external-links",
      label: "External sources",
      weight: 1,
      ...(external.length === 0
        ? { status: "warn" as const, detail: "None. Citing sources supports credibility." }
        : { status: "pass" as const, detail: `${external.length} outbound link(s).` }),
    },
    {
      id: "slug",
      label: "URL",
      weight: 1,
      ...(slug.length === 0
        ? { status: "fail" as const, detail: "No URL yet." }
        : slug.length > 60
          ? { status: "warn" as const, detail: `${slug.length} characters — long URLs get truncated.` }
          : { status: "pass" as const, detail: `${urlPrefix}/${slug}` }),
    },
  ];

  if (keyword) {
    checks.push(
      {
        id: "kw-title",
        label: "Keyword in title",
        weight: 3,
        ...(contains(norm(title), keyword)
          ? { status: "pass" as const, detail: "Present." }
          : {
              status: "fail" as const,
              detail: "Missing — the title is the strongest on-page signal.",
            }),
      },
      {
        id: "kw-slug",
        label: "Keyword in URL",
        weight: 2,
        ...(norm(slug.replace(/-/g, " ")).includes(keyword)
          ? { status: "pass" as const, detail: "Present." }
          : { status: "warn" as const, detail: "Missing from the slug." }),
      },
      {
        id: "kw-desc",
        label: "Keyword in description",
        weight: 2,
        ...(contains(norm(excerpt), keyword)
          ? { status: "pass" as const, detail: "Present." }
          : {
              status: "warn" as const,
              detail: "Missing — Google bolds matched terms in the snippet.",
            }),
      },
      {
        id: "kw-intro",
        label: "Keyword in opening",
        weight: 2,
        ...(contains(firstParagraph, keyword)
          ? { status: "pass" as const, detail: "Present in the first paragraph." }
          : {
              status: "warn" as const,
              detail: "Not in the opening paragraph.",
            }),
      },
      {
        id: "kw-heading",
        label: "Keyword in a subheading",
        weight: 1,
        ...(headings.some((h) => contains(norm(h), keyword))
          ? { status: "pass" as const, detail: "Present." }
          : { status: "warn" as const, detail: "Not in any subheading." }),
      },
      {
        id: "kw-density",
        label: "Keyword use",
        weight: 1,
        ...(() => {
          const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const hits = (body.match(new RegExp(escaped, "g")) ?? []).length;
          const density = words ? (hits / words) * 100 : 0;
          if (hits === 0) {
            return { status: "fail" as const, detail: "Never used in the body." };
          }
          if (density > 2.5) {
            return {
              status: "warn" as const,
              detail: `${hits} uses (${density.toFixed(1)}%) — reads as stuffing.`,
            };
          }
          return {
            status: "pass" as const,
            detail: `${hits} uses (${density.toFixed(1)}%).`,
          };
        })(),
      }
    );
  }

  const total = checks.reduce((sum, c) => sum + c.weight, 0);
  const earned = checks.reduce(
    (sum, c) => sum + c.weight * (c.status === "pass" ? 1 : c.status === "warn" ? 0.5 : 0),
    0
  );

  return {
    checks,
    score: total ? Math.round((earned / total) * 100) : 0,
    wordCount: words,
  };
}
