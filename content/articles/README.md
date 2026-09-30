# Writing articles for Orvinex

Articles are Markdown files in this folder. The file name is the URL:
`custom-software-vs-off-the-shelf.md` → `orvinex.store/articles/custom-software-vs-off-the-shelf`.
Files starting with `_` (like `_template.md`) are never published.

## Two ways to write

- **In the admin panel** (easiest): sign in at `/admin`, open **Articles → New article**. The editor audits the article live as you type (score, checklist, Google preview), autosaves drafts, handles image uploads, and only lets you publish once there are no SEO errors. Publishing puts it live immediately; a future publish date schedules it (it appears within the hour of that date). Changing the URL of a live article makes the old URL redirect permanently to the new one. These articles are stored in the database.
- **As Markdown files** in this folder, following the workflow below. Useful for articles drafted with Claude Code or kept in git.

Both kinds appear together on `/articles`, in the sitemap and in the RSS feed, and are audited by the same rules (`src/lib/seo-audit.ts`). No two articles, of either kind, may share a URL or a keyword.

## The workflow (Markdown files)

1. **Pick one keyword.** One article, one search query, never shared with another article. See [Choosing what to write](#choosing-what-to-write).
2. **Start the file:** `npm run new:post -- "your keyword"`. This copies `_template.md` with the keyword and today's date filled in, as a draft.
3. **Research the results page.** Google the keyword in a private window. Note what the top 5 results cover, what format they use (guide, list, comparison), the "People also ask" questions, and what they all miss. Your article must answer the query better than all of them, and add something they don't have.
4. **Write it.** Run `npm run dev` and open `localhost:3000/articles/<file-name>`; drafts show there with a "Draft" badge, and edits appear on refresh.
5. **Audit it:** `npm run seo:check -- <file-name>`. Fix every error, and every warning you can.
6. **Publish:** set `draft: false`, commit, deploy. `npm run build` re-runs the audit and refuses to build if a published article has errors.
7. **Tell Google:** in [Google Search Console](https://search.google.com/search-console), use URL Inspection → *Request indexing* on the new URL. (Submit `https://orvinex.store/sitemap.xml` once, the first time.)

Or ask Claude Code to do steps 1–5 for you: *"write an article about …"* uses the `write-seo-article` skill in `.claude/skills/`.

## What the system does for you

Every article automatically gets:

- A canonical URL, meta title and description, Open Graph and Twitter tags
- A generated share image with the title (`/articles/<slug>/opengraph-image`)
- Structured data: `Article` (with the founder as author), `BreadcrumbList`, and `FAQPage` when there are FAQs
- A place in `sitemap.xml` with its last-updated date, and in the RSS feed at `/articles/rss.xml`
- A table of contents from your `##` and `###` headings, reading time, related articles, and a call to action for its first service
- `target="_blank" rel="noopener"` on external links, lazy-loaded images, scrollable tables

## Frontmatter

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | The H1. Contains the keyword. Under ~70 characters. |
| `metaTitle` | no | The title in Google results. Keyword first, 50–60 characters. Defaults to `<title> \| Orvinex`. |
| `description` | yes | The snippet in Google. 120–160 characters, contains the keyword, earns the click. |
| `keyword` | yes | The one query this article targets. Unique across all articles. |
| `keywords` | no | Secondary queries and variants: "People also ask", related searches. |
| `category` | yes | A short topic label, e.g. `Custom software`, `Mobile apps`, `AI`, `SEO`. |
| `date` | yes | `YYYY-MM-DD`. A future date keeps the article hidden until a build on or after that day. |
| `updated` | no | Set it when you meaningfully revise an article. Shown as "Updated …" and sent to Google. |
| `author` | no | Defaults to the founder, whose bio and photo appear in the byline. |
| `services` | no | Service ids from `src/content/site.ts`. Shown as "Related services"; the first drives the closing call to action. |
| `cover`, `coverAlt` | no | An image in `/public/images/articles/`, with alt text. |
| `faqs` | no | 3–5 `q`/`a` pairs. Rendered on the page and marked up as FAQ structured data. |
| `draft` | no | `true` shows the article in `npm run dev` only. |

## What the audit checks

**Errors** (block the build for published articles): keyword missing from the title, meta title, description or first 100 words; under 600 words; an `#` H1 in the body; fewer than three `##` sections; skipped heading levels; no internal links; broken internal links; images without alt text; unknown service ids; the same keyword, meta title or description as another article.

**Warnings:** meta title over 60 or under 30 characters; description outside 120–160; under 1,200 words; keyword used fewer than 3 times or above ~2.5% density; no heading with the keyword; fewer than 3 internal links; no external source; no link to the article's own service; paragraphs over 110 words; no FAQs; keyword overlapping a service page title.

## Writing rules that actually move rankings

- **Match the search intent.** If the top results for your keyword are comparison guides, write a comparison guide. If they're lists, write a list. Google has already told you what searchers want.
- **Answer first.** The first paragraph answers the query directly. Context comes after.
- **Show real experience.** Google weighs first-hand experience heavily. Use what Orvinex has actually built (see `/work`), real decisions, real trade-offs. This is the one thing competitors' generic articles can't copy.
- **Never invent facts.** No made-up statistics, client names, results or quotes. Every number either comes from your own work or links to its source.
- **Write for skimmers.** Short paragraphs, descriptive `##` headings, lists and tables where they genuinely help.
- **Link on purpose.** Every article links to its service page with descriptive anchor text (*custom software development*, not *click here*), and to 2–4 related articles. When you publish a new article, add a link to it from an older related one.
- **Keep articles alive.** Revisit top articles every 6–12 months: update facts, add what you've learned, set `updated`.

## Choosing what to write

Build **topic clusters** around the services, since those are the pages that turn readers into clients. Each service page is the hub; articles answer the questions people search before they're ready to hire.

| Service page | Articles that feed it (starting ideas, check the demand before writing) |
| --- | --- |
| `/services/custom-software` | custom software vs off-the-shelf software · custom software development cost · how to write a software requirements document |
| `/services/web-applications` | how to build a customer portal · SaaS MVP development timeline · web app vs website |
| `/services/mobile-apps` | React Native vs Flutter · app development cost in India · how to publish an app on the App Store |
| `/services/rag-chatbots` | what is a RAG chatbot · AI chatbot for customer support · chatbot vs live chat |
| (edtech, from `/work`) | how to build a student portal · online coaching platform features · LMS vs custom learning platform |

**Choosing a keyword:** prefer specific, lower-competition phrases (*"how to build a student portal"*) over broad ones (*"software development"*) while the site is young. Check demand with Google's autocomplete, "People also ask", related searches, [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/) or Search Console. Search Console becomes the best source once articles start ranking: look for queries where you're on page 2, and write or improve the article that answers them.

## Publishing cadence

Consistency beats volume. One excellent article a week, each linked into its cluster, compounds faster than ten thin ones. Expect three to six months before new articles rank well on a young domain.
