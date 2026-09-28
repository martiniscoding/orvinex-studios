# Plumbline

A single-page site for a design studio, built as a portfolio piece.

The layout follows **kree8.studio**: a fixed icon rail on the left and an inset
rounded content panel on the right.

- `/` — hero → work → the problem, named in key caps → the polaroid board →
  approach → services → a pricing band → testimonials → a signed final note.
- `/pricing` — its own route, after kree8's pricing page: tabs straight in, the
  one-time project card, a rule, then the retainer in its own colour wash with
  the service chips.

Pricing is a separate page because that is where people go looking for it, and
because it is the only interactive part of the site — moving it took the
landing page from 52.5 kB of route JS to 2.8 kB. The landing page keeps a band
carrying the lowest number and a link, so the story does not end without one.

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

**Shell.** `Shell` renders the nav and a centred container; both routes go
through it. `Navbar` is a floating pill: translucent with white type over the
hero image, solid once the hero has scrolled past. That switch is an
IntersectionObserver on a sentinel the hero renders, not a scroll listener, so
it costs nothing per frame. The active link is driven the same way over the
section ids on the home page, and by `usePathname` elsewhere.

**The hero image.** `public/hero.jpg` is the supplied painting rotated upright
— it arrived as a landscape scene saved 90° on its side. Two scrims sit over
it: a vertical one to seat the type and a horizontal one so the protection
stays on the left and the painting keeps its colour on the right. AVIF is
enabled in `next.config.ts` and the image is served at `quality={62}`, which
takes the LCP asset from 105KB to 41KB.

**Type.** Inter for UI and headlines, Phudu for the wordmark and the uppercase
card headings, Caveat for the five polaroid captions. All self-hosted. Inter is
instanced to drop the optical-size axis it never varies (73KB → 49KB), and
Caveat is `preload: false` — five captions below the fold must not compete with
Inter for the critical path.

**Colour.** Quiet warm neutrals — `#F2F1ED` shell, `#FBFAF8` panel, white
cards — under a deep slate ink, with one accent (`#2E6E5B`) used sparingly:
ticks, active states, the logo mark and the retainer card. Nothing else is
coloured.

Contrast is set against the shell, the tightest ground: `--color-muted` carries
small text at 5.69:1 and `--color-faint` only large display type and icons at
3.04:1. The two dark price cards take white text at 60–75% opacity, which is
why the retainer card uses the deeper accent — at the lighter one the label
fell under 4.5:1.

**Artwork.** Beyond the hero painting there is no photography and no stock:
every polaroid, project cover, icon and the signature is original SVG in
`src/components/art/` and `src/components/Icons.tsx`.

**Motion.** The hero sequence is CSS — the eyebrow, headline, sub, buttons and
feature card rise in on a stagger. It is CSS rather than GSAP so it never waits
on the deferred chunk — gating the LCP headline on it costs about 0.4s. Everything else is
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
| | `/` | `/pricing` |
| --- | --- | --- |
| Performance | 95 | 96 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP / LCP | 1.4s / 2.9s | 1.2s / 2.7s |
| CLS / TBT | 0 / 0ms | 0 / 0ms |

Checked at 375, 768 and 1440.
