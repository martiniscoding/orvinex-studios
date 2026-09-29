/**
 * All copy and data for the site.
 *
 * Orvinex (orvinex.store). Pricing figures are still placeholders.
 */
export const DEMO_CONTENT = true;

export const site = {
  name: "Orvinex",
  /** Canonical origin, no trailing slash. Used for canonical URLs, the sitemap and structured data. */
  url: "https://orvinex.store",
  /** The name as set in the navbar. */
  wordmark: "Orvinex Studios",
  tagline: "Design and development for products that dominate their market",
  email: "orvinexsoftwaresolution@gmail.com",
  /** Google Calendar booking page; every "Book a call" opens it in a new tab. */
  booking:
    "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1jxrjQuBw6Xh_8vo9LyStM6pg4qNx_qw5-r5ryzQAdXdBh-Bqe35r51IDEgOBSsy_gbGO7e50w",
};

export const nav: {
  id: string;
  label: string;
  href: string;
  /** True when the item is a section of the home page, not its own route. */
  section?: boolean;
}[] = [
  { id: "home", label: "Home", href: "/#home", section: true },
  { id: "services", label: "Services", href: "/services" },
  { id: "work", label: "Work", href: "/work" },
  { id: "articles", label: "Articles", href: "/articles" },
  { id: "contact", label: "Contact", href: "/#contact", section: true },
];

export const hero = {
  /* One entry per line. The full stop after the last line is set in the
     accent by the component. */
  headline: ["Build products that", "dominate your market"],
  /** A word in the headline set in the accent red. */
  accent: "dominate",
  sub:
    "One senior team designs, builds and launches your product. The people " +
    "on your first call are the people writing the code, from the first " +
    "sketch to long after launch.",
  primary: { label: "Start your project", href: "/#contact" },
  secondary: { label: "See the work", href: "/work" },
  contact: { label: "Contact us", href: "#contact" },
  /* The badge on the hero image. `figure` is set bold. */
  proof: { before: "Helped founders generate", figure: "$10M+", after: "in revenue" },
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

/** Verbatim from orvinex.store/services. `id` is the anchor on /services. */
export const servicesIntro = {
  eyebrow: "Services",
  title: "Everything at one place, one team, and nobody to translate between.",
  body:
    "Most companies hire one agency to build the product, another to add the AI, " +
    "and a third to bring the traffic — then spend every week relaying messages " +
    "between them. Orvinex runs all three from a single team on a single roadmap, " +
    "measured against the same number.",
};

export const serviceGroups = [
  {
    id: "build",
    label: "Build",
    services: [
      { id: "custom-software", code: "B·01", title: "Custom Software Development", body: "The system your business actually runs on, built to fit rather than forced from a template.", tags: ["ERP", "Internal tools", "Automation"] },
      { id: "web-applications", code: "B·02", title: "Web Application Development", body: "Fast, secure, scalable platforms — SaaS products, dashboards, customer portals.", tags: ["SaaS", "Dashboards", "Portals", "APIs"] },
      { id: "mobile-apps", code: "B·03", title: "Mobile App Development", body: "Native iOS and Android builds, or a single cross-platform codebase that serves both.", tags: ["iOS", "Android", "React Native", "Flutter"] },
      { id: "ecommerce-management", code: "B·04", title: "E-commerce Management Software", body: "One place to run the storefront. Stock that stays accurate across every channel you sell on.", tags: ["Inventory", "Order ops", "Marketplace sync"] },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    services: [
      { id: "rag-chatbots", code: "I·01", title: "AI Chatbots & RAG Assistants", body: "Assistants that answer from your documentation rather than from guesswork.", tags: ["Retrieval", "Vector search", "Evaluation sets"] },
      { id: "personalised-ai-tools", code: "I·02", title: "Personalised AI Tools", body: "Internal tools shaped around how your team already works.", tags: ["Copilots", "Agents", "Workflow automation"] },
      { id: "marketplace-research", code: "I·03", title: "Marketplace Research", body: "The numbers before the commitment. We size real demand, map who already owns it.", tags: ["Demand sizing", "Competitor teardowns", "Pricing"] },
    ],
  },
  {
    id: "grow",
    label: "Grow",
    services: [
      { id: "seo", code: "G·01", title: "SEO Optimisation", body: "Rankings that compound instead of spike. Technical foundations fixed first.", tags: ["Technical SEO", "Content", "Digital PR"] },
      { id: "digital-marketing", code: "G·02", title: "Digital Marketing", body: "Campaigns measured in revenue, not impressions.", tags: ["Paid search", "Paid social", "Lifecycle"] },
      { id: "growth-marketing", code: "G·03", title: "Growth Marketing", body: "Experiment-led growth for teams past product-market fit.", tags: ["Analytics", "A/B testing", "Retention"] },
    ],
  },
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
      label: "Website",
      name: "Website, designed and built",
      price: 6400,
      timeline: "15–20 days",
      addons: [
        { id: "seo", label: "SEO foundations", note: "Technical SEO, set up", price: 4200 },
        { id: "extra", label: "Extra pages", price: 800, unit: "/page" },
        { id: "motion", label: "Motion pass", price: 1400 },
      ],
      features: [
        "Messaging and copy drafted with you",
        "Designed and built in Next.js, deployed",
        "Desktop, tablet, mobile responsive",
        "Your repo, your code, Figma file included",
        "Preview link updated every 48 hours",
      ],
    },
    {
      id: "brand",
      label: "Branding",
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
      label: "Web & mobile app",
      name: "App, designed and built",
      price: 14000,
      timeline: "30–40 days",
      addons: [
        { id: "system", label: "Design system in code", price: 4500 },
        { id: "icons", label: "Icon set", price: 2200, unit: "/40 icons" },
      ],
      features: [
        "Architecture and product plan, written up",
        "Up to 20 screens, designed and built",
        "Web app, iOS and Android, or all three",
        "Load-tested and documented before launch",
        "Store submission and release support",
      ],
    },
  ],
  retainer: {
    name: "Orvinex retainer",
    price: 8900,
    unit: "per month",
    features: [
      "Design and engineering in one team",
      "Shipped to production, not just to Figma",
      "Weekly call, daily replies in your Slack",
      "Pause once for up to a month, no charge",
    ],
    taskLabel: "Active tasks",
    perTask: 2600,
    includes: [
      "Web development",
      "Mobile apps",
      "Custom software",
      "Product UI & UX",
      "Design systems",
      "Brand systems",
      "Launch sites",
    ],
  },
};

/**
 * Real client reviews from orvinex.store. The wording is the clients' own;
 * only em dashes were swapped for other punctuation (site-wide style: no em
 * dashes). Don't reword them. `highlight` must be an exact substring of `quote`;
 * `work` is the slug in works.ts of the project the review is about.
 */
export const testimonials = [
  {
    quote: "Rohan built our student portal end to end. It is the first real tech product my company has shipped, and the students took to it straight away.",
    highlight: "the students took to it straight away",
    name: "Sreyash Gupta",
    role: "JEE Society",
    logo: "/reviews/jee-society.png",
    work: "jee-society",
  },
  {
    quote: "Orvinex built us a portal that runs the whole institute: students join live classes, teachers take them, and assignments go out and come back in the same place. A complete ecosystem, and everyone here loves working in it.",
    highlight: "A complete ecosystem",
    name: "A Star Teaching",
    role: "Coaching institute",
    logo: "/reviews/a-star-teaching.png",
    work: "a-star-coaching",
  },
  {
    quote: "Orvinex gave us a storefront that is clean and genuinely professional. The UI and UX are exactly what we asked for. They stayed with us long after launch, too, and the support never dropped off.",
    highlight: "the support never dropped off",
    name: "Maa Kamakhya Hardware",
    role: "Architectural hardware store",
    logo: "/reviews/maa-kamakhya.png",
    work: "maa-kamakhya",
  },
];

export const testimonialsIntro = {
  eyebrow: "Client Reviews",
  title: "The people we built for.",
};

export const workflow = {
  eyebrow: "Process",
  title: ["Six steps that", "remove guesswork"],
  lead: "Engineering the future of enterprise software.",
  intro:
    "We are a specialized technology agency that eliminates the friction of building software. " +
    "We don't just write code. We engineer scalable, bank-grade architectures that allow your " +
    "business to grow infinitely without technical debt.",
  stats: [
    { value: "50+", label: "Enterprise Projects" },
    { value: "0%", label: "Failed Deliveries" },
    { value: "2Yrs", label: "Proven Excellence" },
    { value: "100%", label: "In-House Engineering" },
  ],
  pillars: [
    {
      id: "scale",
      title: "Scalable Architecture",
      body: "We don't build temporary fixes. Every line of code is structured to handle millions of queries, ensuring your software grows flawlessly with your user base.",
    },
    {
      id: "security",
      title: "Bank-Grade Security",
      body: "From strict data encryption to WAF implementation and CSRF protection, we treat your business data with the highest level of cryptographic security available.",
    },
    {
      id: "speed",
      title: "Rapid Deployment",
      body: "We utilize agile methodologies and modern CI/CD pipelines to drastically reduce development time without compromising on code quality or testing.",
    },
  ],
  steps: [
    {
      id: "discovery",
      tab: "Discovery",
      title: "Discovery & research",
      body: "We start by understanding the business properly: how your users think, what the product has to do, and what is stopping people from choosing you today.",
      outputs: ["Discovery questionnaire", "Competitive audit"],
    },
    {
      id: "strategy",
      tab: "Strategy",
      title: "Positioning & structure",
      body: "One clear sentence about what you do, then every page and section ordered around the question a buyer is asking at that moment.",
      outputs: ["Messaging doc", "Sitemap"],
    },
    {
      id: "wireframes",
      tab: "Wireframes",
      title: "Wireframes",
      body: "Grey boxes and real words. We agree on hierarchy and flow before a single colour is chosen, so styling never hides a structural problem.",
      outputs: ["Clickable wireframes", "Copy in context"],
    },
    {
      id: "design",
      tab: "Visual design",
      title: "Visual design",
      body: "Type, colour and components, hung straight. Every screen is designed at desktop, tablet and mobile, in a Figma file you keep.",
      outputs: ["Figma file", "Component library"],
    },
    {
      id: "build",
      tab: "Development",
      title: "Development",
      body: "Built by the same team that designed it, so nothing is lost in handoff. Scalable architecture, modern CI/CD, and updates on a preview link every 48 hours.",
      outputs: ["Preview deploys", "Your repo, your code"],
    },
    {
      id: "launch",
      tab: "QA & launch",
      title: "QA & launch",
      body: "Tested on real devices, tuned until it scores in the green, then shipped. Two weeks of fixes after launch are included.",
      outputs: ["Device QA", "Launch checklist"],
    },
  ],
} as const;

/** Verbatim from the founder section on orvinex.store. */
export const founder = {
  name: "Rohan Kumar Singh",
  role: "Founder & Lead Architect",
  school: "IIT Madras",
  badge: ["IIT Madras", "Alumni Excellence"],
  title: "The Mind Behind Orvinex",
  body:
    "With a foundation from IIT Madras, Rohan built Orvinex to bridge the gap " +
    "between business vision and technical execution. We believe that software " +
    "should be an asset, not a liability.",
  quote:
    "We established Orvinex with a singular goal: to eliminate the friction of " +
    "building software. You don't need to hire freelancers or manage complex " +
    "technical teams. We work here as your dedicated engineers, ensuring " +
    "absolute perfection.",
  photo: "/founder.png",
  alt: "Rohan Kumar Singh, Founder of Orvinex",
};

export const pricingTeaser = {
  eyebrow: "Pricing",
  title: "Fixed price, written down before we start.",
  body:
    "Design and development in every project, plus one retainer, with the " +
    "numbers on the page. No discovery call needed to find out what it costs.",
  cta: { label: "See pricing", href: "/pricing" },
};

export const finalNote = {
  eyebrow: "Final note",
  paragraphs: [
    { text: "Thanks for reading this far. Last thing I want to add is this." },
    {
      text: "Orvinex is for founders who want one team to design it, build it and launch it, and who care about what ",
      marked: "good design and solid engineering",
      after: " do to conversion and trust.",
    },
    { text: "If that's you, you will not have to hire freelancers or manage a technical team. We build the technology so you can build the business." },
    { text: "You will not be handed to anyone. The person on the call is the person doing the work." },
  ],
  cta: { label: "Book a call", href: site.booking },
};
