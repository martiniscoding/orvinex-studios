# Orvinex — Landing Page

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Motion (`motion/react`) · lucide-react

```bash
npm install
npm run dev     # http://localhost:3000
```

## Structure

```
app/
  layout.tsx        Inter + Sora via next/font, SEO metadata
  page.tsx          section composition
  globals.css       grid patterns, gradient masks, marquee keyframes
components/
  Navbar.tsx        floating glass pill, scroll-spy, mobile drawer
  Hero.tsx          violet bloom, animated SVG arc, staggered entrance
  TrustLogos.tsx    infinite marquee
  FounderSection.tsx
  ServicesGrid.tsx
  AboutStats.tsx
  Testimonials.tsx
  ContactCTA.tsx    validated form (console.log on submit)
  Footer.tsx
  FloatingActions.tsx  WhatsApp + Start a Project
  ui/Reveal.tsx     whileInView fade-up helpers
  ui/Logo.tsx
```

## Open TODOs

- `components/FounderSection.tsx` — `{/* TODO: replace with founder photo */}` marks a
  4:5 placeholder card. Drop in a `next/image` there.
- `components/ContactCTA.tsx` — `handleSubmit` currently `console.log`s. Wire to an API
  route or CRM webhook at the marked TODO.
- `components/Navbar.tsx` — the `Articles` link points at an inert `#articles` hash until
  an insights route exists.

## Design tokens (`tailwind.config.ts`)

| Token | Value |
| --- | --- |
| `background` | `#0a0a0f` |
| `surface` | `#111118` |
| `primary` | `#7c5cff` |
| `primary-deep` | `#6d4aff` |
| `glow` | `#8b5cf6` |
| `muted` | `#a1a1aa` |
