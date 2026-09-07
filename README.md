# Plumbline

A single-page site for a design studio, built as a portfolio piece.

**Live sections:** hero → proof line → type specimen → the gap (pinned) →
UNDERSOLD (the naming moment) → what you get (pinned collage) → approach →
services → work → pricing → testimonials → founder's note → footer.

---

## ⚠ Everything here is demo content

Plumbline is a **fictional studio**. It was invented for this build; there is no
client behind it. Specifically invented, and unsafe to ship as-is:

| What | Where | Status |
| --- | --- | --- |
| Studio name, positioning, founder | `src/content/site.ts` | Invented |
| Projects, scopes and outcomes | `work` in `site.ts` | Invented |
| Testimonials and the people quoted | `testimonials` in `site.ts` | **Invented** |
| Prices, timelines, "11 products shipped since 2023" | `pricing`, `hero` | Invented |

`src/content/site.ts` exports `DEMO_CONTENT = true` as a marker. Before this
goes anywhere near a real studio, replace every field with something checkable
— and if a real client has no testimonials, **delete the section** rather than
softening these. Fabricated praise on an agency's own site is a liability.

Two sections were already cut for exactly that reason: there is no client-logo
marquee (no real logos) and no showreel (no video). The proof line and the type
specimen stand in their place.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind v4 · GSAP + ScrollTrigger ·
Lenis · self-hosted `next/font/local`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # never pipe this through `head` — SIGPIPE leaves .next inconsistent
npm start
```

## How it is put together

**The plumb line.** A hairline brass rule at `--plumb-x` runs the whole page.
Headings sit on it, content hangs to its right, and a brass bob rides it —
scrubbed to page progress, swinging with scroll velocity. It is the layout
spine, the progress indicator and the studio's own metaphor at once.

**Type.** Fraunces for display, Archivo for text, both self-hosted. Fraunces is
instanced at `wght 900 / opsz 144 / SOFT 0`, keeping only the `WONK` axis
variable — it is used on exactly one word. That took the file from 120KB to
27KB and moved LCP by 0.4s.

**Artwork.** There is no photography and no stock. Every frame in the collage,
every project cover and the signature are original SVG drawn in
`src/components/art/`. The page ships zero raster images, which is why there is
no `next/image` anywhere.

**Motion.** Two categories only:

- *Scrubbed* — the narrative beats, the letter reveal, the collage frames.
- *Triggered* — the marquee, the nav state, the mobile menu.

All of it lives in `src/components/MotionLayer.tsx` inside one
`gsap.matchMedia`, so `prefers-reduced-motion` reverts every tween and kills
every ScrollTrigger in one call. Pinning is native `position: sticky`, so the
static fallback is the real layout, not a broken one. Lenis drives
`gsap.ticker` and `ScrollTrigger.update`; nothing on the site listens to
`scroll` directly.

The hero sequence is deliberately **CSS, not GSAP** — GSAP is loaded in a
deferred chunk, and gating the headline on it cost 0.4s of LCP.

A boot script in the layout adds `.motion` to `<html>` before first paint and
removes it after 2.5s if the motion layer never reports ready, so a failed
chunk can never leave content hidden.

## Numbers

Lighthouse, mobile, production build:

| | |
| --- | --- |
| Performance | 97 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| FCP / LCP | 0.9s / 2.6s |
| CLS / TBT | 0 / 0ms |

Checked at 375, 768 and 1440.
