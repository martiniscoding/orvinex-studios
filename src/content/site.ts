/**
 * All copy and data for the site.
 *
 * ⚠ DEMO CONTENT — Plumbline is a fictional studio built as a portfolio
 * piece. Projects, outcomes, testimonials and numbers are invented. See README.
 */
export const DEMO_CONTENT = true;

export const site = {
  name: "Plumbline",
  tagline: "Design for products that are better than they look",
  email: "theo@plumbline.studio",
  booking: "https://cal.com/plumbline/intro",
};

export const nav: { id: string; label: string; soon?: boolean }[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "pricing", label: "Pricing" },
  { id: "careers", label: "Careers", soon: true },
];

export const hero = {
  credibility: "Shipped 11 products since 2023",
  /* `dim: true` renders in the light blue-grey, the rest in navy. */
  headline: [
    { text: "The studio", tone: "ink" },
    { text: "for products", tone: "dim" },
    { text: "that are", tone: "ink" },
    { text: "better", tone: "accent" },
    { text: "than they look", tone: "dim" },
  ],
  sub:
    "Product UI, brand systems and launch sites for dev tools and B2B " +
    "software. One designer, who wrote production code for six years.",
  primary: { label: "Book a call", href: "https://cal.com/plumbline/intro" },
  secondary: { label: "See the work", href: "#work" },
};

export const problem = {
  eyebrow: "Where it goes wrong",
  lead: "You shipped something genuinely hard. Then you sent the link to an investor, they looked at it for about nine seconds, and priced it like a side project.",
  prefix: "There's a word for it —",
  word: "UNDERSOLD",
  bullets: ["Not the engineering", "Not the pricing", "The nine seconds"],
  close: {
    before: "A product that works this well should not have to argue for itself. It should ",
    marked: "read as serious",
    after: " on sight.",
  },
};

export const solution = {
  eyebrow: "What's the solution?",
  lead: "That's why I built",
  frames: [
    { id: "brand", caption: "the marks…", label: "Brand system", pin: "red", rotate: -3 },
    { id: "ui", caption: "day one screens", label: "Product UI", pin: "clip", rotate: 2.2 },
    { id: "icons", caption: "on your grid", label: "Icon set", pin: "green", rotate: -1.6 },
    { id: "system", caption: "npm install", label: "Design system", pin: "tape", rotate: 3.4 },
    { id: "site", caption: "sells while you sleep", label: "Launch site", pin: "clip", rotate: -2.4 },
  ],
} as const;

export const approach = {
  eyebrow: "Approach",
  title: "A weight on a string",
  body: [
    "A plumb line is the oldest instrument on a building site: a weight " +
      "hanging off a string. It has no taste and no opinion. It only shows " +
      "you what is true and what is leaning.",
    "That is the method. Before anything gets styled, it gets hung straight " +
      "— the hierarchy, the spacing, the words. Most products that look " +
      "cheap are not badly decorated. They are out of true, and every " +
      "screen repeats the error.",
  ],
  toggle: {
    off: "Off plumb",
    on: "Plumb",
    caption: "Same content, same component. The only change is alignment, spacing and type.",
  },
};

export const services = [
  { title: "Product UI", body: "Dashboards, settings, onboarding — the screens that decide whether people stay." },
  { title: "Design systems", body: "Tokens, components and docs your engineers pull straight into the codebase." },
  { title: "Brand systems", body: "A mark, a palette and typography that survive contact with a real product." },
  { title: "Launch sites", body: "One page that explains what you built and asks for the meeting." },
  { title: "Icon sets", body: "Drawn to your grid and stroke, exported as an npm package." },
  { title: "Pricing pages", body: "The page founders postpone for a year. It usually pays for the project." },
];

/** DEMO_CONTENT: invented projects, original SVG covers, no stock. */
export const work = [
  { id: "ravel", client: "Ravel", what: "CI observability for monorepos", did: "Product UI, design system", outcome: "Set-up drop-off fell from 41% to 27%", year: "2025" },
  { id: "ledgerpost", client: "Ledgerpost", what: "Reconciliation for B2B payments", did: "Brand system, launch site", outcome: "Closed a seed round eight weeks after launch", year: "2025" },
  { id: "bracket", client: "Bracket", what: "Feature flags for small teams", did: "Icon set, product UI", outcome: "Support tickets about the flag editor halved", year: "2024" },
  { id: "northbound", client: "Northbound", what: "Warehouse ops for data teams", did: "Launch site, pricing page", outcome: "Demo requests up 2.4× in the first quarter", year: "2024" },
];

export const pricing = {
  tabs: [
    {
      id: "site",
      label: "Launch site",
      hue: "from-sun to-coral",
      name: "Launch site",
      price: 6400,
      timeline: "15–20 days",
      addons: [
        { id: "build", label: "Add development", note: "Next.js, deployed", price: 4200 },
        { id: "extra", label: "Extra pages", price: 800, unit: "/page" },
        { id: "motion", label: "Motion pass", price: 1400 },
      ],
      features: [
        "Messaging and copy drafted with you",
        "Desktop, tablet, mobile responsive",
        "Figma file, yours to keep",
        "No limit on revisions",
        "Updates every 48 hours",
      ],
    },
    {
      id: "brand",
      label: "Branding",
      hue: "from-grape/85 to-sky",
      name: "Brand system",
      price: 11500,
      timeline: "20–25 days",
      addons: [
        { id: "site", label: "Add launch site", price: 5400 },
        { id: "deck", label: "Pitch deck", price: 3000, unit: "/15 slides" },
      ],
      features: [
        "Positioning session and naming review",
        "Primary mark plus two lockups",
        "Palette, type scale and usage rules",
        "Social, deck and doc templates",
        "One-page guidelines, not a 60-page PDF",
      ],
    },
    {
      id: "ui",
      label: "Product UI",
      hue: "from-mint to-sky",
      name: "Interface project",
      price: 14000,
      timeline: "30–40 days",
      addons: [
        { id: "system", label: "Design system in code", price: 4500 },
        { id: "icons", label: "Icon set", price: 2200, unit: "/40 icons" },
      ],
      features: [
        "Audit of the current product, written up",
        "Up to 20 screens, desktop and mobile",
        "Interactive prototype for the core flow",
        "Component library in Figma",
        "Two rounds of revision, then handoff",
      ],
    },
  ],
  retainer: {
    name: "Plumbline retainer",
    hue: "from-sun to-mint",
    price: 8900,
    unit: "per month",
    features: [
      "Desktop, tablet, mobile responsive",
      "Figma file, yours to keep",
      "Weekly call, daily replies in your Slack",
      "Pause once for up to a month, no charge",
    ],
    taskLabel: "Active tasks",
    perTask: 2600,
  },
};

/**
 * DEMO_CONTENT. Written for a fictional studio. Delete outright before
 * shipping for a real client with no real testimonials.
 */
export const testimonials = [
  { quote: "We had a good product and a bad first impression. Theo fixed the second one in five weeks and our demo-to-trial rate moved the week we shipped it.", name: "Priya Raman", role: "Co-founder, Ravel" },
  { quote: "The handoff was a pull request against our own repo. I have never had that from a designer before, and it saved my engineers about a fortnight.", name: "Daniel Osei", role: "CTO, Bracket" },
  { quote: "Direct, fast, and happy to argue with me about the pricing page. It ended up being the best page on the site.", name: "Marta Kovač", role: "Founder, Ledgerpost" },
];

export const founder = {
  name: "Theo Ansell",
  role: "Designer, and the whole studio",
};

export const finalNote = {
  eyebrow: "Final note",
  paragraphs: [
    { text: "Thanks for reading this far. Last thing I want to add is this." },
    {
      text: "Plumbline is for founders who care how their product is read in the first nine seconds, and about what ",
      marked: "good design",
      after: " does to conversion and trust.",
    },
    { text: "If that's you, you will not have to think about how the product looks again. That is the promise." },
    { text: "You will not be handed to anyone. The person on the call is the person doing the work." },
  ],
  cta: { label: "Book a call", href: "https://cal.com/plumbline/intro" },
};
