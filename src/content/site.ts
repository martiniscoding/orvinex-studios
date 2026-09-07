/**
 * All copy and data for the site.
 *
 * ⚠ DEMO CONTENT — Plumbline is a fictional studio built as a portfolio
 * piece. The projects, outcomes and testimonials below are invented and are
 * flagged with DEMO_CONTENT. They must be replaced with verifiable facts
 * before this page goes near a real client. See README.
 */
export const DEMO_CONTENT = true;

export const site = {
  name: "Plumbline",
  tagline: "Design for products that are better than they look",
  email: "theo@plumbline.studio",
  booking: "https://cal.com/plumbline/intro",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Pricing", href: "#pricing" },
];

export const hero = {
  credibility: "11 products shipped since 2023",
  headline: ["Your product is", "better than", "it looks."],
  sub:
    "Plumbline is a one-designer studio for dev tools and B2B software. " +
    "I design the interface, the brand and the site — and I wrote " +
    "production code for six years, so handoff is a pull request, not a PDF.",
  primary: { label: "Book a call", href: "https://cal.com/plumbline/intro" },
  secondary: { label: "See the work", href: "#work" },
};

/** 5.3 — no real client logos exist, so the logo marquee is cut. */
export const proof = {
  line: "11 products shipped since 2023. No account manager, no handoff deck — you work with me, in your repo.",
  ticker: [
    "Product UI",
    "Brand systems",
    "Design systems",
    "Launch sites",
    "Icon sets",
    "Pricing pages",
    "Docs design",
    "Dashboards",
    "Onboarding flows",
  ],
};

/** 5.5 — pinned narrative. Six beats, each landing separately. */
export const problem = {
  eyebrow: "02 — The gap",
  beats: [
    "You shipped something genuinely hard.",
    "Then you sent the link to an investor.",
    "They looked at it for about nine seconds.",
    "And priced it like a side project.",
    "Not because the work is weak.",
    "Because nothing on the screen argued otherwise.",
  ],
};

/** 5.6 — the naming moment. */
export const naming = {
  lead: "There is a word for that gap.",
  word: "UNDERSOLD",
  after:
    "Undersold: when the surface of a product argues for less than the " +
    "product is. It is the cheapest problem you have and the most expensive " +
    "one to leave alone.",
};

/** 5.7 — pinned collage. Frames are original artwork, no stock. */
export const frames = [
  {
    id: "brand",
    label: "Brand system",
    note: "Marks, palette, rules. One page your team can actually follow.",
    rotate: -3,
  },
  {
    id: "ui",
    label: "Product UI",
    note: "The screens people spend their working day inside.",
    rotate: 2,
  },
  {
    id: "icons",
    label: "Icon set",
    note: "Drawn on your UI's grid, so nothing floats or wobbles.",
    rotate: -1.5,
  },
  {
    id: "system",
    label: "Design system",
    note: "Tokens and components your engineers import, not screenshot.",
    rotate: 4,
  },
  {
    id: "site",
    label: "Launch site",
    note: "The page that has to sell while you are asleep.",
    rotate: -2.5,
  },
] as const;

/** 5.8 — philosophy, built on the studio's own object. */
export const approach = {
  eyebrow: "04 — Approach",
  title: "A weight on a string",
  body: [
    "A plumb line is the oldest instrument on a building site: a weight " +
      "hanging off a string. It has no taste and no opinion. It only shows " +
      "you what is true and what is leaning.",
    "That is the method. Before anything gets styled, it gets hung straight " +
      "— the hierarchy, the spacing, the words. Most products that look " +
      "cheap are not badly decorated. They are out of true, and every " +
      "screen repeats the error.",
    "Which is why the work here starts in the interface and ends in the " +
      "brand, not the other way round.",
  ],
  toggle: {
    off: "Off plumb",
    on: "Plumb",
    caption:
      "Same content, same component. The only change is alignment, spacing and type.",
  },
};

export const services = [
  {
    title: "Product UI",
    body: "Dashboards, settings, onboarding — the screens that decide whether people stay.",
  },
  {
    title: "Design systems",
    body: "Tokens, components and docs your engineers pull straight into the codebase.",
  },
  {
    title: "Brand systems",
    body: "A mark, a palette and typography that survive contact with a real product.",
  },
  {
    title: "Launch sites",
    body: "One page that explains what you built and asks for the meeting.",
  },
  {
    title: "Icon sets",
    body: "Drawn to your grid and stroke, exported as an npm package.",
  },
  {
    title: "Pricing pages",
    body: "The page founders postpone for a year. It usually pays for the project.",
  },
];

/** 5.10 — DEMO_CONTENT: invented projects, original SVG covers, no stock. */
export const work = [
  {
    id: "ravel",
    client: "Ravel",
    what: "CI observability for monorepos",
    did: "Product UI, design system",
    outcome: "Set-up drop-off fell from 41% to 27%",
    year: "2025",
  },
  {
    id: "ledgerpost",
    client: "Ledgerpost",
    what: "Reconciliation for B2B payments",
    did: "Brand system, launch site",
    outcome: "Closed a seed round eight weeks after launch",
    year: "2025",
  },
  {
    id: "bracket",
    client: "Bracket",
    what: "Feature flags for small teams",
    did: "Icon set, product UI",
    outcome: "Support tickets about the flag editor halved",
    year: "2024",
  },
  {
    id: "northbound",
    client: "Northbound",
    what: "Warehouse ops for data teams",
    did: "Launch site, pricing page",
    outcome: "Demo requests up 2.4× in the first quarter",
    year: "2024",
  },
];

/** 5.11 — published numbers. */
export const pricing = {
  tabs: [
    {
      id: "ui",
      label: "Product UI",
      oneOff: {
        name: "Interface project",
        price: "$14,000",
        timeline: "5–6 weeks",
        features: [
          "Audit of the current product, written up",
          "Up to 20 screens, desktop and mobile",
          "Interactive prototype for the core flow",
          "Component library in Figma",
          "Two rounds of revision, then handoff",
        ],
      },
      addons: [
        { label: "Design system in code", price: "+$4,500" },
        { label: "Icon set (40 icons)", price: "+$2,200" },
      ],
    },
    {
      id: "brand",
      label: "Brand system",
      oneOff: {
        name: "Brand project",
        price: "$11,500",
        timeline: "4–5 weeks",
        features: [
          "Positioning session and naming review",
          "Primary mark plus two lockups",
          "Palette, type scale and usage rules",
          "Social, deck and doc templates",
          "One-page guidelines, not a 60-page PDF",
        ],
      },
      addons: [
        { label: "Launch site design", price: "+$5,400" },
        { label: "Pitch deck (15 slides)", price: "+$3,000" },
      ],
    },
    {
      id: "site",
      label: "Launch site",
      oneOff: {
        name: "Site project",
        price: "$6,400",
        timeline: "2–3 weeks",
        features: [
          "Messaging and copy draft written with you",
          "One long page, designed mobile first",
          "Pricing and docs entry points",
          "Built in Next.js and deployed, if you want",
          "One round of revision after launch",
        ],
      },
      addons: [
        { label: "Blog and changelog templates", price: "+$1,800" },
        { label: "Motion pass", price: "+$1,400" },
      ],
    },
  ],
  retainer: {
    name: "Monthly retainer",
    price: "$8,900",
    unit: "per month",
    timeline: "Rolling, 30 days notice",
    features: [
      "Roughly 60 hours of design a month",
      "One active request at a time, queued in Linear",
      "Weekly call, daily replies in your Slack",
      "Everything above, in whatever mix you need",
      "Pause once for up to a month, no charge",
    ],
  },
};

/**
 * 5.12 — DEMO_CONTENT. These quotes are written for a fictional studio.
 * Delete this array outright before shipping for a real client with no
 * real testimonials; do not keep them as placeholders.
 */
export const testimonials = [
  {
    quote:
      "We had a good product and a bad first impression. Theo fixed the second one in five weeks and our demo-to-trial rate moved the week we shipped it.",
    name: "Priya Raman",
    role: "Co-founder",
    company: "Ravel",
  },
  {
    quote:
      "The handoff was a pull request against our own repo. I have never had that from a designer before, and it saved my engineers about a fortnight.",
    name: "Daniel Osei",
    role: "CTO",
    company: "Bracket",
  },
  {
    quote:
      "Direct, fast, and happy to argue with me about the pricing page. It ended up being the best page on the site.",
    name: "Marta Kovač",
    role: "Founder",
    company: "Ledgerpost",
  },
];

export const founder = {
  name: "Theo Ansell",
  role: "Designer, and the whole studio",
  note: [
    "I wrote production code for six years before I did this full time, " +
      "which is why I care so much about how a design lands in a codebase.",
    "You will not be handed to anyone. If we work together, the person on " +
      "the call is the person doing the work.",
  ],
};

export const closing = {
  title: "If the product is good, the page should say so.",
  body:
    "Send me the link and tell me what you are worried about. If I am not " +
    "the right person, I will say that on the call and point you somewhere " +
    "better.",
  cta: { label: "Book a call", href: "https://cal.com/plumbline/intro" },
};
