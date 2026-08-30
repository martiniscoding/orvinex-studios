import {
  BarChart3,
  Bot,
  Code2,
  Globe,
  LineChart,
  Search,
  ShoppingBag,
  Smartphone,
  TrendingUp,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export type BandId = "build" | "intelligence" | "grow";

/**
 * NOTE: the live catalogue now lives in the `service_pages` table and is read
 * through lib/service-catalogue.ts, so services can be added from the admin
 * panel without a deploy.
 *
 * What remains here is the band definitions — three of them, carrying design
 * decisions like the aperture arc count and column layout, so adding a fourth
 * is a design change rather than content entry — plus the SERVICES array,
 * which is kept only as the seed used to populate an empty database.
 */

export type Service = {
  /** Band letter + position, e.g. "B·02". Encodes where the service sits in
   *  the catalogue, so the ledger and the cards can be cross-referenced. */
  code: string;
  /** Anchor target — the ledger in the hero jumps to the matching card. */
  slug: string;
  icon: LucideIcon;
  title: string;
  /** Short form used in the hero ledger, where the full title would wrap. */
  short: string;
  description: string;
  /** What you actually get — real deliverables, not decoration. */
  stack: string[];
  band: BandId;
  /** Shown in the six-card teaser on the landing page. */
  featured: boolean;
};

export const BANDS: {
  id: BandId;
  label: string;
  letter: string;
  blurb: string;
  /** Arc count in the card's aperture. Each band winds a different number of
   *  turns, so the three groups read apart without leaving the palette. */
  arcs: number;
  /** Large-screen column count. Build holds four services, which would strand
   *  one card alone on a second row of three — it gets a 2x2 instead. */
  columns: 2 | 3;
}[] = [
  {
    id: "build",
    label: "Build",
    letter: "B",
    blurb:
      "The software your business runs on — designed, written, shipped and maintained by the same team.",
    arcs: 5,
    columns: 2,
  },
  {
    id: "intelligence",
    label: "Intelligence",
    letter: "I",
    blurb:
      "AI and research work that earns its keep: grounded in your own data, measured against real answers.",
    arcs: 3,
    columns: 3,
  },
  {
    id: "grow",
    label: "Grow",
    letter: "G",
    blurb:
      "Demand generation that reports in revenue rather than impressions, run as one system with the build.",
    arcs: 7,
    columns: 3,
  },
];

export const SERVICES: Service[] = [
  {
    code: "B·01",
    slug: "custom-software",
    icon: Code2,
    title: "Custom Software Development",
    short: "Custom Software",
    description:
      "The system your business actually runs on, built to fit rather than forced from a template. ERP, internal tools, integrations, automation — we retire the spreadsheets and manual handoffs quietly costing your team hours every week.",
    stack: ["ERP", "Internal tools", "Automation"],
    band: "build",
    featured: true,
  },
  {
    code: "B·02",
    slug: "web-applications",
    icon: Globe,
    title: "Web Application Development",
    short: "Web Applications",
    description:
      "Fast, secure, scalable platforms — SaaS products, dashboards, customer portals. Built on modern stacks, documented properly, load-tested before launch, and handed over as clean code your future engineers will thank you for.",
    stack: ["SaaS", "Dashboards", "Portals", "APIs"],
    band: "build",
    featured: true,
  },
  {
    code: "B·03",
    slug: "mobile-apps",
    icon: Smartphone,
    title: "Mobile App Development",
    short: "Mobile Apps",
    description:
      "Native iOS and Android builds, or a single cross-platform codebase that serves both. We own the architecture, the interface, the store submission and the release cadence after launch — so you ship an app people keep on their home screen.",
    stack: ["iOS", "Android", "React Native", "Flutter"],
    band: "build",
    featured: true,
  },
  {
    code: "B·04",
    slug: "ecommerce-management",
    icon: ShoppingBag,
    title: "E-commerce Management Software",
    short: "E-commerce Ops",
    description:
      "One place to run the storefront. Stock that stays accurate across every channel you sell on, orders that reconcile themselves, and catalogue or pricing changes that take minutes instead of an afternoon — wired into the marketplaces and payment rails you already use.",
    stack: ["Inventory", "Order ops", "Marketplace sync"],
    band: "build",
    featured: false,
  },
  {
    code: "I·01",
    slug: "rag-chatbots",
    icon: Bot,
    title: "AI Chatbots & RAG Assistants",
    short: "RAG Assistants",
    description:
      "Assistants that answer from your documentation rather than from guesswork. We build the retrieval layer over your own manuals, tickets and product data, so every reply comes back with the source attached — and we test it against a graded answer set before it ever reaches a customer.",
    stack: ["Retrieval", "Vector search", "Evaluation sets"],
    band: "intelligence",
    featured: false,
  },
  {
    code: "I·02",
    slug: "personalised-ai-tools",
    icon: Wand2,
    title: "Personalised AI Tools",
    short: "Personalised AI Tools",
    description:
      "Internal tools shaped around how your team already works. Drafting, triage, summarising, research — we find the tasks quietly eating hours each week, then build the narrow tool that does that one job dependably, instead of a general assistant nobody opens twice.",
    stack: ["Copilots", "Agents", "Workflow automation"],
    band: "intelligence",
    featured: false,
  },
  {
    code: "I·03",
    slug: "marketplace-research",
    icon: BarChart3,
    title: "Marketplace Research",
    short: "Marketplace Research",
    description:
      "The numbers before the commitment. We size real demand, map who already owns it, and pull live pricing, ranking and review data from the marketplaces you plan to enter — then hand back a decision document that includes the case for not building it.",
    stack: ["Demand sizing", "Competitor teardowns", "Pricing"],
    band: "intelligence",
    featured: false,
  },
  {
    code: "G·01",
    slug: "seo",
    icon: Search,
    title: "SEO Optimisation",
    short: "SEO Optimisation",
    description:
      "Rankings that compound instead of spike. Technical foundations fixed first, content mapped to real search intent, authority earned through links worth having — the work that keeps sending qualified traffic long after the invoice clears.",
    stack: ["Technical SEO", "Content", "Digital PR"],
    band: "grow",
    featured: true,
  },
  {
    code: "G·02",
    slug: "digital-marketing",
    icon: LineChart,
    title: "Digital Marketing",
    short: "Digital Marketing",
    description:
      "Campaigns measured in revenue, not impressions. We build the funnel end to end, run paid and organic as one system, and report on the numbers that decide your budget: acquisition cost, payback period, lifetime value.",
    stack: ["Paid search", "Paid social", "Lifecycle"],
    band: "grow",
    featured: true,
  },
  {
    code: "G·03",
    slug: "growth-marketing",
    icon: TrendingUp,
    title: "Growth Marketing",
    short: "Growth Marketing",
    description:
      "Experiment-led growth for teams past product-market fit. We instrument the funnel, test relentlessly across acquisition, activation and retention, then put budget only behind what has already proven it returns.",
    stack: ["Analytics", "A/B testing", "Retention"],
    band: "grow",
    featured: true,
  },
];

export function servicesInBand(band: BandId, only?: { featured: boolean }) {
  return SERVICES.filter(
    (service) =>
      service.band === band &&
      (only?.featured ? service.featured : true)
  );
}
