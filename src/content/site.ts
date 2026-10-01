/**
 * All copy and data for the site.
 *
 * Orvinex (orvinex.store). Pricing figures are still placeholders.
 */
import type { HowWeWorkContent } from "@/components/HowWeWork";

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
  { id: "pricing", label: "Pricing", href: "/pricing" },
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
    "We build web and mobile apps, custom software and AI tools like " +
    "chatbots and assistants. One senior team takes your product from the " +
    "first sketch to launch, and stays with you after.",
  primary: { label: "Start your project", href: "/#contact" },
  secondary: { label: "See the work", href: "/work" },
  contact: { label: "Contact us", href: "#contact" },
  /* The badge on the hero image. `figure` is set bold. */
  proof: { before: "Helped founders generate", figure: "$5M+", after: "in revenue" },
  /** The small line under the proof, with a flag for each country listed. */
  reach: { before: "Worked with clients in", figure: "12+ countries", countries: ["de", "fi", "cn", "in"] as const },
};

export const problem = {
  eyebrow: "Where it goes wrong",
  lead: "You shipped something genuinely hard. Then you sent the link to an investor, they looked at it for about nine seconds, and priced it like a side project.",
  prefix: "There's a word for it:",
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
    "Most companies hire one agency to build the product and another to add the AI, " +
    "then spend every week relaying messages between them. Orvinex runs both from " +
    "a single team on a single roadmap, measured against the same number.",
};

export const serviceGroups = [
  {
    id: "build",
    label: "Build",
    services: [
      { id: "custom-software", code: "B·01", title: "Custom Software Development", body: "The system your business actually runs on, built to fit rather than forced from a template.", tags: ["ERP", "Internal tools", "Automation"] },
      { id: "web-applications", code: "B·02", title: "Web Application Development", body: "Fast, secure, scalable platforms: SaaS products, dashboards, customer portals.", tags: ["SaaS", "Dashboards", "Portals", "APIs"] },
      { id: "mobile-apps", code: "B·03", title: "Mobile App Development", body: "Native iOS and Android builds, or a single cross-platform codebase that serves both.", tags: ["iOS", "Android", "React Native", "Flutter"] },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    services: [
      { id: "rag-chatbots", code: "I·01", title: "AI Chatbots & RAG Assistants", body: "Assistants that answer from your documentation rather than from guesswork.", tags: ["Retrieval", "Vector search", "Evaluation sets"] },
      { id: "personalised-ai-tools", code: "I·02", title: "Personalised AI Tools", body: "Internal tools shaped around how your team already works.", tags: ["Copilots", "Agents", "Workflow automation"] },
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
  /* Three fixed tiers. The copy is the client's own, keep it verbatim. */
  plans: [
    {
      id: "mvp",
      name: "MVP Launch",
      tagline: "Perfect for founders who want to validate fast",
      price: 400,
      features: [
        "Mobile app or Web app",
        "Core features only",
        "App Store submission or Website deployment",
        "30 days post launch support",
        "Complete source code ownership",
        "Unlimited revisions within scope",
        "Weekly progress updates",
      ],
    },
    {
      id: "full",
      name: "Full Product",
      tagline: "For founders ready to launch and scale",
      price: 800,
      featured: true,
      features: [
        "Mobile app + Web app",
        "Full feature set",
        "Custom UI/UX design",
        "App Store submission + Website deployment",
        "60 days post launch support",
        "Complete source code ownership",
        "Unlimited revisions within scope",
        "Weekly progress updates",
      ],
    },
    {
      id: "scale",
      name: "Scale Ready",
      tagline: "For startups building serious products",
      price: 1200,
      features: [
        "Everything in Full Product",
        "AI integration",
        "SaaS platform",
        "Admin dashboard",
        "Payment integration",
        "Dedicated project manager",
        "90 days post launch support",
        "Complete source code ownership",
        "Unlimited revisions within scope",
        "Weekly progress updates",
      ],
    },
  ],
  startsAt: "Starts at",
  cta: "Book a Call",
  includedLabel: "What's Included",
};

/**
 * Real client reviews from orvinex.store. The wording is the clients' own;
 * only em dashes were swapped for other punctuation (site-wide style: no em
 * dashes). Don't reword them. `highlight` must be an exact substring of `quote`;
 * `work` is the slug in works.ts of the project the review is about.
 */
export const testimonials = [
  {
    quote: "Rohan built our student portal end to end. It is the first real tech product my company has shipped, and our students loved it. He also supported us for six months after launch.",
    highlight: "our students loved it",
    name: "Sreyash Gupta",
    role: "JEE Society · 100K+ subscribers on YouTube",
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
  /** The on-page heading: `accent` is set in the hand font, underlined. */
  heading: { before: "What our", accent: "customers", after: "say" },
  note: "unedited, promise",
};

/**
 * Copy for the HowWeWork bento. The card ids are fixed by the component (each
 * has its own illustration); only the words are ours.
 */
export const howWeWork: HowWeWorkContent = {
  headingLead: "Engineering Decisions Grounded In",
  headingAccent: "Business",
  headingTail: "Impact",
  intro:
    "A transparent process, one senior team and direct collaboration, so ideas move smoothly from concept to shipped product.",
  projects: "50+",
  cards: [
    {
      id: "collab",
      title: "Work Directly with the Builders",
      body: "The people on your first call are the people writing the code. No handoffs, no middle layers, no delays.",
    },
    {
      id: "updates",
      title: "Real-Time Project Updates",
      body: "A preview link updated every 48 hours, so you see real progress instead of status reports.",
    },
    {
      id: "handoff",
      title: "Built for Seamless Execution",
      body: "The team that designs your product also builds it, so every screen is structured, documented and nothing is lost in handoff.",
      featured: true,
    },
    {
      id: "tools",
      title: "Industry-Leading Tools",
      body: "We work in the modern tools high-performing teams already trust, from Figma to Slack and Google Meet.",
    },
    {
      id: "support",
      title: "Ongoing & Dependable Support",
      body: "Two weeks of fixes after launch are included, and we stay involved for iterations and future needs.",
    },
    {
      id: "proven",
      title: "Proven Experience",
      body: "We have delivered 50+ projects for startups and growing companies across industries.",
    },
    {
      id: "nocode",
      title: "Modular by Design",
      body: "Products are assembled from tested, reusable building blocks, so they ship faster without sacrificing scalability.",
    },
  ],
};

/** Answers only restate what the site already commits to elsewhere. */
export const faq: {
  eyebrow: string;
  title: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  items: { q: string; a: string; link?: { label: string; href: string } }[];
} = {
  eyebrow: "FAQ",
  title: ["Frequently Asked", "Questions"],
  primary: { label: "Start a project", href: "/#contact" },
  secondary: { label: "See the work", href: "/work" },
  items: [
    {
      q: "What is Orvinex?",
      a: "Orvinex is a software and AI development studio founded by Rohan Kumar Singh, an IIT Madras alumnus. We work as your dedicated design and engineering team, from the first sketch to launch and beyond.",
    },
    {
      q: "What services do you offer?",
      a: "Custom software, web applications, mobile apps for iOS and Android, AI chatbots and RAG assistants, and personalised AI tools. Most projects need more than one of these, and the same team handles all of it.",
      link: { label: "See all services", href: "/services" },
    },
    {
      q: "How do we get started?",
      a: "Book a call or send the contact form. We begin with discovery: a questionnaire and a competitive audit, so we understand your business and your users before anything is designed.",
    },
    {
      q: "How will we collaborate?",
      a: "You get a preview link that is updated every 48 hours, so you always see real progress instead of status reports. The team that designs your product also builds it, so nothing is lost in handoff.",
    },
    {
      q: "How long does a project typically take?",
      a: "A website takes 15 to 20 days, a brand system 20 to 25 days, and a web or mobile app 30 to 40 days. Larger custom software is scoped on the first call.",
    },
    {
      q: "How much does it cost?",
      a: "Prices are fixed and published, so you know the number before we start. There is also a monthly retainer if you need ongoing design and engineering.",
      link: { label: "See pricing", href: "/pricing" },
    },
    {
      q: "Who owns the code and design files?",
      a: "You do. The code lives in your repo and the Figma file is yours to keep. Two weeks of fixes after launch are included.",
    },
  ],
};

export const workflow = {
  eyebrow: "Process",
  title: ["From idea to launch,", "in six clear steps"],
  /** The phrase in the second line set in the accent red, as in the hero. */
  accent: "six clear steps",
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
  /* Set like the other page titles: ink, with the key phrase and the closing
     full stop in the accent red. */
  titleAccent: "Fixed price",
  titleRest: ", written down before we start",
  title: "Fixed price, written down before we start.",
  body:
    "Three ways to start, with the numbers on the page. No discovery call " +
    "needed to find out what it costs.",
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
