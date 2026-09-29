/**
 * On-page SEO audit for every article in content/articles (the rules live in
 * src/lib/seo-audit.ts, shared with the admin editor).
 *
 *   npm run seo:check            all articles
 *   npm run seo:check -- <slug>  one article
 *
 * Errors fail the run. `npm run build` runs it first with --published, so a
 * published article with errors blocks the deploy; drafts never do. Warnings
 * are things to fix before publishing but won't block anything.
 */
import { getFilePosts, type Post } from "../src/lib/articles";
import { auditPost } from "../src/lib/seo-audit";

// Admin-written articles live in the database. Load them when it's reachable,
// so duplicate-keyword and link checks see the whole site; the admin audits
// them itself before publishing, so only files are audited here by default.
try {
  process.loadEnvFile(".env.local");
} catch {
  // No .env.local (e.g. on Vercel, where the env is already set).
}

async function loadDbPosts(): Promise<Post[]> {
  if (!process.env.DATABASE_URL) return [];
  try {
    const { listArticles, toPost } = await import("../src/lib/article-store");
    const { pool } = await import("../src/lib/db");
    const rows = await listArticles();
    await pool.end();
    return rows.map(toPost);
  } catch (err) {
    console.warn(`Couldn't load admin articles (${err instanceof Error ? err.message : err}); checking files only.`);
    return [];
  }
}

async function main() {
  const files = getFilePosts();
  const all = [...files, ...(await loadDbPosts())];

  const args = process.argv.slice(2);
  // --published: skip drafts, so an unfinished draft never blocks a deploy.
  const publishedOnly = args.includes("--published");
  const only = args.find((a) => !a.startsWith("--"));
  const posts = only ? all.filter((p) => p.slug === only) : files.filter((p) => !(publishedOnly && p.draft));
  if (only && posts.length === 0) {
    console.error(`No article with slug "${only}"`);
    process.exit(1);
  }

  const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
  const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
  const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
  const dim = (s: string) => `\x1b[2m${s}\x1b[0m`;

  let errors = 0;
  let warnings = 0;
  for (const p of posts) {
    const issues = auditPost(p, all.filter((o) => o !== p)).checks.filter((c) => !c.ok);
    const e = issues.filter((i) => i.level === "error");
    const w = issues.filter((i) => i.level === "warn");
    errors += e.length;
    warnings += w.length;
    const status = e.length ? red("✗") : w.length ? yellow("!") : green("✓");
    console.log(
      `\n${status} ${p.file}${p.draft ? dim(" (draft)") : ""}  ${dim(`${p.words} words · "${p.keyword}"`)}`,
    );
    for (const i of e) console.log(`  ${red("error")} ${i.text}`);
    for (const i of w) console.log(`  ${yellow("warn ")} ${i.text}`);
  }

  console.log(
    `\n${posts.length} article(s): ${errors ? red(`${errors} error(s)`) : green("0 errors")}, ${
      warnings ? yellow(`${warnings} warning(s)`) : "0 warnings"
    }\n`,
  );
  process.exit(errors ? 1 : 0);
}

main();
