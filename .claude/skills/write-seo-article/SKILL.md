---
name: write-seo-article
description: Research, write and audit an SEO article for the Orvinex articles section (content/articles). Use when the user asks to write, draft, plan, improve or refresh an article, or to find keywords or topics for articles.
---

# Write an SEO article for the Orvinex articles section

Read `content/articles/README.md` first; it holds the rules and frontmatter reference. This skill is the procedure.

## 1. Settle the keyword

- If the user gave a topic but no keyword, propose 3–5 candidate keywords with their likely search intent and ask them to pick one. Favour specific, lower-competition queries tied to a service (see the cluster table in the README).
- Check `content/articles/*.md` frontmatter: no two articles may share a `keyword`. If an existing article already covers the intent, offer to improve that one instead of writing a competitor to it.
- Check `src/content/serviceDetails.ts`: the article must not target the same intent as a service page. Articles answer pre-hire questions; service pages sell.

## 2. Research the results page

Use WebSearch (and WebFetch for the top results) on the exact keyword:

- The intent and format the top 5 share (guide, list, comparison, how-to), and roughly how long they are.
- The subtopics every one of them covers: the article must cover these too.
- The gaps: what none of them answer well. The article's advantage comes from here and from Orvinex's first-hand experience.
- "People also ask" and related searches: these become `keywords`, `##` headings and `faqs`.
- Authoritative sources for any facts to cite (official docs, standards bodies, primary research). Record the URLs.

Summarise this to the user in a few lines along with an outline (H2/H3s), and continue unless they want changes.

## 3. Write the draft

- `npm run new:post -- "<keyword>"`, then fill in the file. Keep `draft: true`.
- Voice: direct, plain English, British spelling, confident without hype. Match the copy in `src/content/site.ts`.
- Answer the query in the first paragraph, with the keyword in the first two sentences.
- Use Orvinex's real work where relevant: projects in `src/content/works.ts`, client reviews in `site.ts`, the process in `workflow`. Never invent statistics, clients, results, quotes or prices. The pricing in site.ts is placeholder, so don't quote it. If a claim needs a number you don't have, either cite a source you actually opened or leave the number out.
- Link: the article's first service page with descriptive anchor text, 2+ other internal pages (`/work`, other services, related articles, `/#contact`), and 1+ authoritative external source.
- 1,200–2,500 words depending on what the top results need; no padding.
- 3–5 FAQs drawn from "People also ask", each answered in 1–3 sentences.

## 4. Audit and fix

Run `npm run seo:check -- <slug>`. Fix every error. Fix warnings unless fixing one would make the writing worse, and tell the user which you left and why.

## 5. Interlink

Find 1–3 existing published articles on related topics and add a natural link from each to the new article (not the reverse only). Re-run the audit for any file you touched.

## 6. Hand over

Tell the user:
- The file path and preview URL (`http://localhost:3000/articles/<slug>` with `npm run dev`).
- The keyword, meta title and description.
- Anything they must verify or add from their own experience. First-hand details are what make the article rank, and only they have them.
- That it's still a draft: they review, set `draft: false`, deploy, then request indexing in Google Search Console.

Never set `draft: false` yourself unless the user explicitly asks.
