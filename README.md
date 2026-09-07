# Plumbline

A single-page site for a design studio, built as a portfolio piece.

The layout follows **kree8.studio**: a fixed icon rail on the left, an inset
rounded content panel on the right, navy on light grey, and the same section
rhythm — hero → work → the problem, named in key caps → the polaroid board →
approach → services → pricing → testimonials → a signed final note.

**What was deliberately not copied:** their chameleon logo, their team photos,
their client logos, their testimonials and their copy. All artwork, icons and
words here are original. Their assets are theirs.

---

## ⚠ Everything here is demo content

Plumbline is a **fictional studio**. There is no client behind it. Invented,
and unsafe to ship as-is:

| What | Where | Status |
| --- | --- | --- |
| Studio name, positioning, founder | `src/content/site.ts` | Invented |
| Projects, scopes and outcomes | `work` | Invented |
| Testimonials and the people quoted | `testimonials` | **Invented** |
| Prices, timelines, "11 products since 2023" | `pricing`, `hero` | Invented |

`src/content/site.ts` exports `DEMO_CONTENT = true` as a marker. Replace every
field with something checkable before this goes near a real studio — and if a
real client has no testimonials, **delete the section** rather than softening
these. Fabricated praise on an agency's own site is a liability.

Where kree8 lists 130+ client logos, the rail carries a stat block instead:
there are no logos here that could be shown honestly.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind v4 · GSAP + ScrollTrigger ·
Lenis · self-hosted `next/font/local`.

```bash
npm install
npm run dev
npm run build   # never pipe through `head` — SIGPIPE leaves .next inconsistent
npm start
```

## How it is put together

**Shell.** `Sidebar` is `position: fixed` at `--rail` wide and collapses to a
top bar with a full-screen menu below `lg`. The rail's active item is driven by
an IntersectionObserver over the section ids, so it tracks what you are
actually looking at.

**Type.** Inter for UI and headlines, Phudu for the wordmark and the uppercase
card headings, Caveat for the five polaroid captions. All self-hosted. Inter is
instanced to drop the optical-size axis it never varies (73KB → 49KB), and
Caveat is `preload: false` — five captions below the fold must not compete with
Inter for the critical path.

**Colour.** Warm sand grounds (`#F7EFE6` shell, `#FFFBF6` panel) under a deep
violet ink, lit by a family of five accents — coral, sun, mint, sky, grape —
rather than one. A fixed `.ambient` layer washes sun, coral and mint behind
everything; it is its own composited layer rather than
`background-attachment: fixed`, which repaints on every scroll frame.

The rule that keeps it readable: **bright surfaces take ink text, never white.**
Ink on coral is 5.4:1, on sun 9.6:1, on mint 7.0:1, on sky 4.7:1, and on grape
4.7:1 once it is lightened to 85%. Every accent gradient is built from stops
that hold at or above 4.5:1 with ink on top. The two greys pass AA on the shell,
the tightest ground: `--color-muted` carries small text at 5.17:1,
`--color-faint` only large display type and icons at 3.11:1.

The accents are load-bearing, not decoration: each pricing tab has its own
gradient, each nav icon its own hue, each key cap its own pastel, and the
polaroid pins, divider dots and stat chips rotate through the same five.

**Artwork.** No photography, no stock. Every polaroid, project cover, icon and
the signature is original SVG in `src/components/art/` and
`src/components/Icons.tsx`. The page ships zero raster images, which is why
there is no `next/image` anywhere.

**Motion.** The hero sequence is CSS, so it never waits on the deferred GSAP
chunk — gating the LCP headline on it costs about 0.4s. Everything else is
`MotionLayer`: the key caps popping in and the polaroids landing, both
triggered once, both inside a single `gsap.matchMedia` so
`prefers-reduced-motion` reverts the lot in one call.

`data-motion` is rendered on `<html>` by the server so hydration matches, and
the boot script removes it before first paint for reduced-motion visitors, or
after 2.5s if the motion layer never reports ready — a failed chunk can never
strand hidden content.

Two rules learned the hard way and worth keeping: no component may call
`ScrollTrigger.getAll().kill()` (it wipes triggers it does not own — the reason
the reveals silently failed), and nothing may add classes to `<html>` from a
script, because React manages that attribute.

## Numbers

Lighthouse, mobile, production build:

| | |
| --- | --- |
| Performance | 94 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| FCP / LCP | 1.4s / 3.0s |
| CLS / TBT | 0 / 0ms |

Checked at 375, 768 and 1440.
