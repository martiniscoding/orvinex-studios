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

**Colour.** Both greys are set to pass WCAG AA against the shell, which is the
tightest ground: `--color-muted` carries small text at 4.68:1, `--color-faint`
only large display type and icons at 3.10:1. The reference site's greys do not
pass; these do, and the two-tone headline still reads the same.

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
