/**
 * The long-form page for each service, verbatim from
 * orvinex.store/services/<id>. Keep the copy unedited. `id` matches the
 * service ids in site.ts and is the route: /services/<id>.
 */

/** A run of text, optionally bold, italic or linked. */
export type Inline =
  string | { text: string; strong?: boolean; em?: boolean; href?: string };

export type Block =
  | { type: "h2" | "h3"; text: string }
  | { type: "p"; content: Inline[] }
  | { type: "ul" | "ol"; items: Inline[][] };

export type ServiceDetail = {
  id: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  tags: string[];
  body: Block[];
  faqs: { q: string; a: string }[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: "custom-software",
    metaTitle: "Custom Software Development Company | Orvinex",
    metaDescription:
      "Custom software built around how your business already works — ERP, internal tools, integrations and automation, delivered in two-week cycles.",
    h1: "Software built around your business, not the other way round",
    lead: "Off-the-shelf tools make you adapt to their assumptions. Custom software adapts to yours — and pays for itself the moment it removes the manual work your team has quietly absorbed for years.",
    tags: ["ERP", "Internal tools", "Automation"],
    body: [
      {
        type: "h2",
        text: "When custom is the right call",
      },
      {
        type: "p",
        content: [
          "Buying is usually cheaper. We will say so when it is. Custom development earns its cost in three situations:",
        ],
      },
      {
        type: "ul",
        items: [
          [
            {
              text: "The process is your advantage.",
              strong: true,
            },
            " If how you quote, dispatch or reconcile is genuinely better than your competitors, generic software will flatten it.",
          ],
          [
            {
              text: "The integrations do not exist.",
              strong: true,
            },
            " Your ERP, your warehouse system and your accountant's spreadsheet do not talk, and the glue is a person.",
          ],
          [
            {
              text: "Licence costs scale faster than you do.",
              strong: true,
            },
            " Per-seat pricing that made sense at ten users rarely does at eighty.",
          ],
        ],
      },
      {
        type: "p",
        content: [
          "If none of those apply, we will point you at the product you should buy instead.",
        ],
      },
      {
        type: "h2",
        text: "What we build",
      },
      {
        type: "p",
        content: [
          "Internal platforms, ERP modules, dispatch and inventory systems, approval workflows, reporting layers, and the integrations that connect them to what you already run. Typically a web application your team opens in a browser, with role-based access and an audit trail.",
        ],
      },
      {
        type: "h2",
        text: "How the work runs",
      },
      {
        type: "p",
        content: [
          "Two-week cycles, each ending with something you can actually use in a staging environment you have access to throughout. You see the real system as it is built, so handover day contains no surprises.",
        ],
      },
      {
        type: "p",
        content: [
          "We write the assumptions down at the start — expected volumes, the systems we must integrate with, who signs off. When one turns out to be wrong, the conversation is about the assumption rather than about blame.",
        ],
      },
      {
        type: "h2",
        text: "What you are left with",
      },
      {
        type: "p",
        content: [
          "Documented, tested code in a repository you own, deployment you can run without us, and a written handover. No proprietary runtime, no licence that expires, no dependency on us being available.",
        ],
      },
      {
        type: "h2",
        text: "Where this connects",
      },
      {
        type: "p",
        content: [
          "Most custom builds arrive with a front end attached — see ",
          {
            text: "web application development",
            href: "/services/web-applications",
          },
          " — and if the process you are systematising is order and stock handling, ",
          {
            text: "e-commerce management software",
            href: "/services/ecommerce-management",
          },
          " is the more specific version of this work.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a custom software project take?",
        a: "A focused internal tool is usually six to ten weeks. A full ERP module or multi-role platform runs three to six months. Discovery gives you a written estimate before you commit to the build.",
      },
      {
        q: "Do we own the code?",
        a: "Yes, entirely. The repository is yours from the first commit, along with the deployment configuration and documentation. There is no proprietary runtime you have to keep licensing from us.",
      },
      {
        q: "Can you work with our existing systems?",
        a: "That is usually the point. We integrate with ERPs, accounting platforms, warehouse systems and third-party APIs. Where a system has no API, we will tell you honestly what the workaround costs to maintain.",
      },
      {
        q: "What happens after launch?",
        a: "We stay on through the first weeks of real use, which is when the problems worth catching appear. After that you can retain us for ongoing work or take it in-house — the handover is written so either is possible.",
      },
    ],
  },
  {
    id: "web-applications",
    metaTitle: "Web Application Development Services | Orvinex",
    metaDescription:
      "SaaS products, dashboards and customer portals on modern stacks — documented, load-tested before launch, handed over as code you own.",
    h1: "Web applications that hold up when they get busy",
    lead: "Most web apps are fine at ten users and painful at ten thousand. We build for the second number from the start, without over-engineering the first.",
    tags: ["SaaS", "Dashboards", "Portals", "APIs"],
    body: [
      {
        type: "h2",
        text: "What we build",
      },
      {
        type: "p",
        content: [
          "SaaS products, customer portals, admin dashboards, booking and scheduling platforms, and the APIs behind them. If it runs in a browser and has to stay up, it is our work.",
        ],
      },
      {
        type: "h2",
        text: "The parts people skip",
      },
      {
        type: "p",
        content: [
          "Anyone can ship a working prototype. The difference shows up later, in the parts that are invisible on launch day:",
        ],
      },
      {
        type: "ul",
        items: [
          [
            {
              text: "Load testing before launch, not after the incident.",
              strong: true,
            },
            " We know what breaks first and at what volume, because we go looking for it.",
          ],
          [
            {
              text: "Real authentication and authorisation.",
              strong: true,
            },
            " Sessions that can be revoked, roles that are enforced on the server rather than hidden in the interface.",
          ],
          [
            {
              text: "Observability from day one.",
              strong: true,
            },
            " When something is slow at 2am, the logs say why.",
          ],
          [
            {
              text: "Migrations that are reversible.",
              strong: true,
            },
            " Schema changes that can be rolled back without a restore from backup.",
          ],
        ],
      },
      {
        type: "h2",
        text: "The stack",
      },
      {
        type: "p",
        content: [
          "Modern, boring and well supported — React and Next.js on the front, TypeScript throughout, Postgres underneath, deployed on infrastructure you can move off. We pick tools with large communities and long support horizons, because your application will outlive the framework's current fashion cycle.",
        ],
      },
      {
        type: "h2",
        text: "Performance is a feature",
      },
      {
        type: "p",
        content: [
          "A page that takes four seconds loses a meaningful share of its users before it renders. We treat Core Web Vitals as a build requirement rather than a post-launch clean-up, which also happens to be what search engines measure.",
        ],
      },
      {
        type: "h2",
        text: "Where this connects",
      },
      {
        type: "p",
        content: [
          "If the platform also needs to be on a phone, ",
          {
            text: "mobile app development",
            href: "/services/mobile-apps",
          },
          " covers that side. If it is an internal system rather than a product you sell, ",
          {
            text: "custom software development",
            href: "/services/custom-software",
          },
          " is the closer fit.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you take over an existing application?",
        a: "Often, yes. We start with a short audit that tells you what is salvageable, what needs replacing, and what it costs either way. Sometimes the honest answer is a rewrite, and we will say so with reasons.",
      },
      {
        q: "How do you handle scaling?",
        a: "We build to your realistic twelve-month volume, load-test against it, and leave headroom that does not cost money while unused. Over-provisioning for hypothetical traffic is a common and expensive mistake.",
      },
      {
        q: "Do you do design as well as development?",
        a: "Yes. Interface design, interaction and front-end build are one job here, not a handoff between two agencies with different opinions.",
      },
    ],
  },
  {
    id: "mobile-apps",
    metaTitle: "Mobile App Development Company | iOS & Android | Orvinex",
    metaDescription:
      "Native iOS and Android builds or a single cross-platform codebase — architecture, interface, store submission and the release cadence after launch.",
    h1: "Apps people keep on their home screen",
    lead: "Most apps are installed once and deleted within a week. The ones that survive earn a place by being fast, obvious and worth opening again — which is a design and engineering problem long before it is a marketing one.",
    tags: ["iOS", "Android", "React Native", "Flutter"],
    body: [
      {
        type: "h2",
        text: "Native or cross-platform",
      },
      {
        type: "p",
        content: [
          "We will recommend one, with reasons, rather than defaulting to whichever we prefer building.",
        ],
      },
      {
        type: "p",
        content: [
          {
            text: "Cross-platform",
            strong: true,
          },
          " — React Native or Flutter — makes sense for most business applications. One codebase, both stores, meaningfully lower cost to build and maintain.",
        ],
      },
      {
        type: "p",
        content: [
          {
            text: "Native",
            strong: true,
          },
          " earns its extra cost when the app leans on the device: heavy camera or sensor use, background processing, tight platform integration, or when animation smoothness is the product.",
        ],
      },
      {
        type: "h2",
        text: "What we own",
      },
      {
        type: "p",
        content: [
          "Architecture, interface design, the build itself, store submission and the review process, and the release cadence afterwards. App Store review rejections are routine and we handle them; you should not be reading Apple's guidelines.",
        ],
      },
      {
        type: "h2",
        text: "Offline is not an edge case",
      },
      {
        type: "p",
        content: [
          "Phones lose signal in lifts, basements and on trains. We decide early what the app does with no connection — queue writes, serve cached reads, or block with a clear message — rather than discovering the answer through crash reports.",
        ],
      },
      {
        type: "h2",
        text: "After launch",
      },
      {
        type: "p",
        content: [
          "Releases every two to four weeks, crash reporting wired up before the first public build, and a rollback path that does not require an emergency store review. Both platforms ship OS updates annually that break things; staying current is maintenance, not a new project.",
        ],
      },
      {
        type: "h2",
        text: "Where this connects",
      },
      {
        type: "p",
        content: [
          "Apps almost always need a back end and an admin surface — that is ",
          {
            text: "web application development",
            href: "/services/web-applications",
          },
          ". Once it ships, getting it installed is a distribution problem, which is where ",
          {
            text: "growth marketing",
            href: "/services/growth-marketing",
          },
          " starts.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should we build for iOS or Android first?",
        a: "Follow your users. In India, Android usually carries the volume; if you are selling to Western consumers or to enterprises, iOS often carries the revenue. With cross-platform, the question mostly goes away.",
      },
      {
        q: "How long does app store review take?",
        a: "Apple typically reviews within a day or two, though a rejection adds a cycle. Google is usually faster. We build the buffer into the launch plan rather than promising a date we do not control.",
      },
      {
        q: "Do you publish under our developer account?",
        a: "Yes, always. Your company owns the listings, the reviews and the ratings. An app published under an agency account is a liability you inherit later.",
      },
    ],
  },
  {
    id: "ecommerce-management",
    metaTitle: "E-commerce Management Software Development | Orvinex",
    metaDescription:
      "One place to run the storefront: stock accurate across channels, orders that reconcile themselves, catalogue updates in minutes not hours.",
    h1: "One place to run the storefront",
    lead: "Selling on three channels usually means three inventories, three price lists and one person reconciling them by hand at the end of the week. That person is your bottleneck, and it is a software problem.",
    tags: ["Inventory", "Order ops", "Marketplace sync"],
    body: [
      {
        type: "h2",
        text: "What breaks first",
      },
      {
        type: "p",
        content: [
          "Multi-channel sellers hit the same walls in the same order:",
        ],
      },
      {
        type: "ol",
        items: [
          [
            {
              text: "Stock drifts.",
              strong: true,
            },
            " You oversell an item that sold out on another channel an hour ago.",
          ],
          [
            {
              text: "Pricing diverges.",
              strong: true,
            },
            " A promotion goes live in one place and not another.",
          ],
          [
            {
              text: "Orders stop reconciling.",
              strong: true,
            },
            " Returns, partial refunds and marketplace fees mean the numbers no longer agree with the bank.",
          ],
          [
            {
              text: "Catalogue updates take an afternoon.",
              strong: true,
            },
            " Because they are done three times.",
          ],
        ],
      },
      {
        type: "h2",
        text: "What we build",
      },
      {
        type: "p",
        content: [
          "A single operational layer over the channels you already sell on. Inventory that syncs both directions, a catalogue you update once, order flows that handle returns and partial refunds without manual journal entries, and reporting that reconciles against what actually landed in the account.",
        ],
      },
      {
        type: "p",
        content: [
          "We connect to the marketplaces, payment rails and courier APIs you use rather than asking you to change platforms.",
        ],
      },
      {
        type: "h2",
        text: "The reconciliation nobody enjoys",
      },
      {
        type: "p",
        content: [
          "Marketplace payouts are net of fees, adjustments and returns that may relate to orders from weeks ago. We build the matching logic so the finance conversation is about exceptions rather than about the whole ledger.",
        ],
      },
      {
        type: "h2",
        text: "Built to survive a sale day",
      },
      {
        type: "p",
        content: [
          "Peak traffic is the point at which stock accuracy matters most and systems are least forgiving. We load-test against your worst realistic hour, not your average one.",
        ],
      },
      {
        type: "h2",
        text: "Where this connects",
      },
      {
        type: "p",
        content: [
          "Before entering a new category, ",
          {
            text: "marketplace research",
            href: "/services/marketplace-research",
          },
          " tells you whether the margin survives the fees. Once you are selling, ",
          {
            text: "SEO optimisation",
            href: "/services/seo",
          },
          " is what stops you renting all of your traffic.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we have to leave Shopify or WooCommerce?",
        a: "No. In most cases the storefront stays exactly where it is and we build the operational layer above it. Replatforming is expensive and rarely the actual problem.",
      },
      {
        q: "Which marketplaces can you integrate?",
        a: "Anything with a documented API — Amazon, Flipkart, Meesho, eBay and the rest. Where an API is limited, we will tell you up front what cannot be automated rather than discovering it mid-build.",
      },
      {
        q: "How is stock kept accurate across channels?",
        a: "A single source of truth with reservations at the point of order, plus reconciliation passes that catch drift. Perfect real-time sync is marketing language; what you want is drift that is small, detected and corrected.",
      },
    ],
  },
  {
    id: "rag-chatbots",
    metaTitle: "AI Chatbot & RAG Assistant Development | Orvinex",
    metaDescription:
      "Assistants that answer from your own documentation with the source attached, tested against a graded answer set before they ever reach a customer.",
    h1: "Assistants that answer from your documents, not from guesswork",
    lead: "A general chatbot bolted onto your website will confidently invent your refund policy. Retrieval-augmented generation fixes that by making the model answer only from documents you control — and show its source.",
    tags: ["Retrieval", "Vector search", "Evaluation sets"],
    body: [
      {
        type: "h2",
        text: "How retrieval changes the answer",
      },
      {
        type: "p",
        content: [
          "A plain language model answers from what it absorbed in training. It has never read your manual, so when asked about your product it produces something plausible and wrong.",
        ],
      },
      {
        type: "p",
        content: [
          "Retrieval-augmented generation puts a search step in front: find the relevant passages in ",
          {
            text: "your",
            em: true,
          },
          " documentation, hand them to the model, and require the answer to come from them. Every reply can then cite the page it came from, which your team can check.",
        ],
      },
      {
        type: "h2",
        text: "What we build",
      },
      {
        type: "ul",
        items: [
          [
            {
              text: "The retrieval layer",
              strong: true,
            },
            " over your manuals, help centre, tickets, product data or policy documents.",
          ],
          [
            {
              text: "The evaluation set",
              strong: true,
            },
            " — a graded list of real questions with correct answers, run against every change.",
          ],
          [
            {
              text: "The escalation path",
              strong: true,
            },
            ' for when the assistant does not know, because "I could not find this, here is a human" beats a confident fabrication.',
          ],
          [
            {
              text: "The interface",
              strong: true,
            },
            ", whether that is a website widget, an internal tool or a channel inside your existing support desk.",
          ],
        ],
      },
      {
        type: "h2",
        text: "Evaluation is the whole job",
      },
      {
        type: "p",
        content: [
          "Anyone can demo a chatbot that answers three questions well. The engineering is in knowing it still answers two hundred correctly after you change the prompt, swap the model, or add a thousand new documents. We build that test set first and treat a regression in it as a build failure.",
        ],
      },
      {
        type: "h2",
        text: "Where the data goes",
      },
      {
        type: "p",
        content: [
          "We are explicit about which provider processes your content, what is retained, and which documents are in scope. If that has to stay inside your own infrastructure, we will tell you what that costs before you commit.",
        ],
      },
      {
        type: "h2",
        text: "Where this connects",
      },
      {
        type: "p",
        content: [
          "If the job is a narrow internal task rather than answering questions from documents, ",
          {
            text: "personalised AI tools",
            href: "/services/personalised-ai-tools",
          },
          " is the better shape. Either way it needs somewhere to live — usually ",
          {
            text: "a web application",
            href: "/services/web-applications",
          },
          ".",
        ],
      },
    ],
    faqs: [
      {
        q: "Will it make things up?",
        a: "Grounding in retrieval reduces it substantially but never to zero, which is why we build citations and an evaluation set. A responsible assistant is one whose failure modes are measured and visible, not one claimed to be perfect.",
      },
      {
        q: "What documents can it use?",
        a: "Anything with text — PDFs, help centres, ticket histories, product catalogues, internal wikis. The quality ceiling is your documentation; if it is contradictory, the assistant will be too.",
      },
      {
        q: "Is our data used to train someone's model?",
        a: "Not under the configurations we deploy. We use API tiers that exclude your content from training and we put that in writing as part of the scope.",
      },
      {
        q: "How much does it cost to run?",
        a: "Ongoing cost is per question and depends on model and document volume. We estimate it during discovery and design the retrieval so most questions never reach the most expensive model.",
      },
    ],
  },
  {
    id: "personalised-ai-tools",
    metaTitle: "Custom AI Tools & Internal Copilots | Orvinex",
    metaDescription:
      "Narrow internal AI tools that do one job dependably — built around the tasks quietly eating hours from your team each week.",
    h1: "Narrow AI tools that do one job properly",
    lead: "General assistants get opened twice and forgotten. The tools that stick are unglamorous and specific: they take one task somebody does forty times a week and make it take a minute.",
    tags: ["Copilots", "Agents", "Workflow automation"],
    body: [
      {
        type: "h2",
        text: "We start by finding the task",
      },
      {
        type: "p",
        content: [
          "Before any model is chosen, we sit with your team and find where the hours actually go. It is usually somewhere unremarkable — reformatting supplier quotes, triaging inbound email, summarising call notes into the CRM, checking documents against a checklist.",
        ],
      },
      {
        type: "p",
        content: [
          "The best candidates share three traits: done often, judgement-light, and currently done by someone expensive.",
        ],
      },
      {
        type: "h2",
        text: "What we build",
      },
      {
        type: "p",
        content: [
          "Drafting tools that produce your first version in your own format. Triage that routes and tags before a human looks. Extraction that pulls structured data out of invoices, contracts or forms. Summarisation that writes into the system your team already uses, not a separate window.",
        ],
      },
      {
        type: "p",
        content: [
          "The interface is usually a small web tool or an addition to software you already open — not another login.",
        ],
      },
      {
        type: "h2",
        text: "Keeping a human in the loop",
      },
      {
        type: "p",
        content: [
          "For anything that leaves the building or touches money, the tool proposes and a person approves. That single design decision is the difference between automation that gets adopted and automation that gets switched off after one bad output.",
        ],
      },
      {
        type: "h2",
        text: "Measuring whether it worked",
      },
      {
        type: "p",
        content: [
          "We agree the number before we build: minutes saved per task, share of items needing correction, volume handled without escalation. If the tool does not move it after a month of real use, that is a finding, and we would rather report it than let the thing quietly rot.",
        ],
      },
      {
        type: "h2",
        text: "Where this connects",
      },
      {
        type: "p",
        content: [
          "If the task is answering questions from your documentation, ",
          {
            text: "AI chatbots and RAG assistants",
            href: "/services/rag-chatbots",
          },
          " is the more specific service. Tools that touch business records usually sit alongside ",
          {
            text: "custom software",
            href: "/services/custom-software",
          },
          ".",
        ],
      },
    ],
    faqs: [
      {
        q: "How do we know which tasks to automate?",
        a: "Discovery includes a short shadowing exercise with the team doing the work. The candidates that surface are almost never the ones named in the first meeting.",
      },
      {
        q: "Will our team actually use it?",
        a: "They use it when it is faster than what they do now and lives where they already work. Adoption failures are almost always design failures — an extra login, or a tool that is right eighty percent of the time with no way to correct the rest.",
      },
      {
        q: "Which models do you use?",
        a: "Whichever fits the task, the latency budget and the cost per run. Most work does not need the largest model, and we will not bill you as though it does.",
      },
    ],
  },
  {
    id: "marketplace-research",
    metaTitle: "Marketplace & Product Research Services | Orvinex",
    metaDescription:
      "Demand sizing, competitor teardowns and live pricing from the marketplaces you plan to enter — returned as a decision document.",
    h1: "The numbers before the commitment",
    lead: "Most product decisions are made on an anecdote and a strong feeling. A few weeks of research costs a fraction of a build, and it occasionally saves you the entire build.",
    tags: ["Demand sizing", "Competitor teardowns", "Pricing"],
    body: [
      {
        type: "h2",
        text: "What we actually go and find",
      },
      {
        type: "ul",
        items: [
          [
            {
              text: "Real demand.",
              strong: true,
            },
            " Search volume, marketplace listing counts, review velocity on comparable products — evidence that people are already trying to buy this.",
          ],
          [
            {
              text: "Who owns it now.",
              strong: true,
            },
            " The incumbents, their pricing, their weaknesses in reviews, and how entrenched they really are.",
          ],
          [
            {
              text: "Live pricing and margin.",
              strong: true,
            },
            " Actual selling prices, marketplace fee structures and what is left over, rather than list prices.",
          ],
          [
            {
              text: "The cost of entry.",
              strong: true,
            },
            " What it takes to rank, be seen, or get shelf space, and how long that typically takes.",
          ],
        ],
      },
      {
        type: "h2",
        text: "The deliverable",
      },
      {
        type: "p",
        content: [
          "A written decision document. Not a slide deck of encouraging charts — a document that states what we found, how confident we are in each finding, and what would have to be true for this to work.",
        ],
      },
      {
        type: "p",
        content: [
          "It includes the case against. If the evidence says the category is saturated, the margin is gone, or the incumbent is too strong, that is what the document will say. That is the cheapest outcome you can buy from us.",
        ],
      },
      {
        type: "h2",
        text: "Why we sit inside the engineering team",
      },
      {
        type: "p",
        content: [
          "Research done by people who also build the thing asks different questions. We size the technical work alongside the market, so the recommendation accounts for what it would genuinely cost to compete — not just whether a gap exists.",
        ],
      },
      {
        type: "h2",
        text: "Where this connects",
      },
      {
        type: "p",
        content: [
          "If the research says build, ",
          {
            text: "custom software development",
            href: "/services/custom-software",
          },
          " and ",
          {
            text: "e-commerce management software",
            href: "/services/ecommerce-management",
          },
          " are the usual next steps. If it says the category is winnable but crowded, start with ",
          {
            text: "SEO optimisation",
            href: "/services/seo",
          },
          ".",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a research engagement take?",
        a: "Two to four weeks for a single category or product decision. Longer if it spans several markets or requires primary interviews.",
      },
      {
        q: "What if the answer is not to build?",
        a: "Then we write that, with the evidence. It is the most valuable result we can deliver and by far the cheapest thing in the room compared with a six-month build.",
      },
      {
        q: "Do you do customer interviews?",
        a: "When the decision hinges on why people buy rather than whether they do. We will tell you during scoping whether desk research is sufficient for the question you are asking.",
      },
    ],
  },
  {
    id: "seo",
    metaTitle: "SEO Services & Technical Optimisation | Orvinex",
    metaDescription:
      "Technical foundations fixed first, content mapped to real search intent, authority earned through links worth having. Rankings that compound.",
    h1: "Rankings that compound instead of spike",
    lead: "SEO done badly is a monthly invoice for blog posts nobody reads. Done properly it is the only acquisition channel that keeps working after you stop paying for it.",
    tags: ["Technical SEO", "Content", "Digital PR"],
    body: [
      {
        type: "h2",
        text: "Technical foundations first",
      },
      {
        type: "p",
        content: [
          "There is no point publishing into a site search engines struggle to crawl. We start with the mechanics, because they gate everything after:",
        ],
      },
      {
        type: "ul",
        items: [
          [
            "Crawlability, indexation and the pages accidentally excluded from both",
          ],
          [
            "Core Web Vitals, which are a measured ranking input, not a nice-to-have",
          ],
          ["Structured data, so results can qualify for richer treatment"],
          [
            "Canonicals, redirects and the duplicate URLs quietly splitting your authority",
          ],
        ],
      },
      {
        type: "h2",
        text: "Content mapped to intent",
      },
      {
        type: "p",
        content: [
          "We map queries to what the searcher actually wants — to learn, to compare, or to buy — and build pages for each. A page trying to serve all three serves none.",
        ],
      },
      {
        type: "p",
        content: [
          "That mapping decides what gets written, in what order, and which existing pages should be improved rather than replaced. Most sites have more to gain from fixing twenty existing pages than from publishing twenty new ones.",
        ],
      },
      {
        type: "h2",
        text: "Links worth having",
      },
      {
        type: "p",
        content: [
          "We do not buy links. We build the assets other people have a reason to cite — original research, tools, genuinely useful documentation — and do the outreach. It is slower, and it does not evaporate at the next algorithm update.",
        ],
      },
      {
        type: "h2",
        text: "Reporting you can act on",
      },
      {
        type: "p",
        content: [
          "Rankings for the queries that matter, organic traffic that converts, and the index coverage issues holding pages back. Not a list of vanity keywords chosen because they were already ranking.",
        ],
      },
      {
        type: "h2",
        text: "Where this connects",
      },
      {
        type: "p",
        content: [
          "Technical SEO is largely an engineering job, which is why it sits next to ",
          {
            text: "web application development",
            href: "/services/web-applications",
          },
          " here rather than in a separate agency. For paid channels run against the same funnel, see ",
          {
            text: "digital marketing",
            href: "/services/digital-marketing",
          },
          ". We write about this work on ",
          {
            text: "our articles",
            href: "https://orvinex.store/articles",
          },
          ".",
        ],
      },
    ],
    faqs: [
      {
        q: "How long before we see results?",
        a: "Technical fixes can move things within weeks. Content and authority take three to six months to compound, and anyone promising page one in thirty days is either buying links or choosing keywords nobody searches for.",
      },
      {
        q: "Do you guarantee rankings?",
        a: "No, and neither should anyone else — nobody controls the algorithm. We commit to the work, report against the queries that matter to your revenue, and show what moved.",
      },
      {
        q: "Can you work on a site you did not build?",
        a: "Yes. We start with a technical audit that tells you what is holding the site back and what each fix is worth, so you can decide what is worth doing.",
      },
    ],
  },
  {
    id: "digital-marketing",
    metaTitle: "Digital Marketing Services | Paid & Organic | Orvinex",
    metaDescription:
      "Campaigns measured in revenue rather than impressions — paid and organic run as one funnel, reported on acquisition cost, payback period and lifetime value.",
    h1: "Campaigns measured in revenue, not impressions",
    lead: "Impressions, reach and engagement are inputs. The only numbers that decide next quarter's budget are what a customer costs to acquire, how long they take to pay that back, and what they are worth after.",
    tags: ["Paid search", "Paid social", "Lifecycle"],
    body: [
      {
        type: "h2",
        text: "One funnel, not separate channels",
      },
      {
        type: "p",
        content: [
          "Paid and organic are usually run by different people optimising different metrics, which is how you end up paying for clicks to a page that was never designed to convert them.",
        ],
      },
      {
        type: "p",
        content: [
          "We run them as one system: the search data informs the content, the content lowers paid costs, and the landing pages are built by the same team that built the product. Nothing is thrown over a wall.",
        ],
      },
      {
        type: "h2",
        text: "What we set up before spending anything",
      },
      {
        type: "ul",
        items: [
          [
            {
              text: "Conversion tracking that survives ad blockers and cookie consent",
              strong: true,
            },
            ", so the numbers you optimise against are real",
          ],
          [
            {
              text: "Attribution you can defend",
              strong: true,
            },
            ", with its limits stated rather than hidden",
          ],
          [
            {
              text: "Landing pages built to convert",
              strong: true,
            },
            ", not the homepage with a campaign parameter attached",
          ],
        ],
      },
      {
        type: "p",
        content: [
          "Spending before this exists is how budgets disappear into channels nobody can evaluate afterwards.",
        ],
      },
      {
        type: "h2",
        text: "The three numbers we report",
      },
      {
        type: "p",
        content: [
          {
            text: "Acquisition cost",
            strong: true,
          },
          " — fully loaded, including our fee. ",
          {
            text: "Payback period",
            strong: true,
          },
          " — how many months until that customer has repaid it. ",
          {
            text: "Lifetime value",
            strong: true,
          },
          " — measured from your data, not an industry benchmark.",
        ],
      },
      {
        type: "p",
        content: [
          "Everything else is diagnostic. These decide whether to spend more.",
        ],
      },
      {
        type: "h2",
        text: "Where we stop",
      },
      {
        type: "p",
        content: [
          "If the payback period will not work at any realistic conversion rate, we will say so rather than spend the budget finding out slowly. Sometimes the honest answer is that the pricing or the product needs to change before the marketing can.",
        ],
      },
      {
        type: "h2",
        text: "Where this connects",
      },
      {
        type: "p",
        content: [
          "Paid gets more efficient when organic is working — see ",
          {
            text: "SEO optimisation",
            href: "/services/seo",
          },
          ". Once acquisition is stable, ",
          {
            text: "growth marketing",
            href: "/services/growth-marketing",
          },
          " is where the compounding gains are.",
        ],
      },
    ],
    faqs: [
      {
        q: "What budget do we need to start?",
        a: "Enough to reach statistical significance in a reasonable window — usually a few lakh per month for paid search in a competitive category. Below that you are buying noise, and we will tell you so.",
      },
      {
        q: "Do you handle creative as well as media buying?",
        a: "Yes. Creative is the largest lever in paid social and the one most often outsourced to whoever is cheapest, which is why so much of it fails.",
      },
      {
        q: "How quickly can we tell if it is working?",
        a: "Two to six weeks for a directional read on paid, depending on volume. Anyone declaring success in week one is reading noise.",
      },
    ],
  },
  {
    id: "growth-marketing",
    metaTitle: "Growth Marketing & Experimentation | Orvinex",
    metaDescription:
      "Experiment-led growth for teams past product-market fit: instrumented funnels, disciplined testing, budget only behind what has proven it returns.",
    h1: "Growth that follows the evidence",
    lead: "Growth marketing is not a louder version of marketing. It is a method: instrument the funnel, form a hypothesis, test it properly, and put budget only behind what has already proven it returns.",
    tags: ["Analytics", "A/B testing", "Retention"],
    body: [
      {
        type: "h2",
        text: "This assumes product-market fit",
      },
      {
        type: "p",
        content: [
          "If people are not yet retaining, experimentation will make you efficient at filling a leaking bucket. We will tell you if that is where you are, because the honest next step is product work, not campaigns.",
        ],
      },
      {
        type: "h2",
        text: "Instrument first",
      },
      {
        type: "p",
        content: [
          "Most funnels cannot be improved because nobody can see them. Before any test runs we make the steps measurable end to end — where people arrive, where they activate, where they drop, and what the ones who stay did differently in week one.",
        ],
      },
      {
        type: "p",
        content: [
          "That usually surfaces the biggest win before a single experiment is designed.",
        ],
      },
      {
        type: "h2",
        text: "Testing with enough discipline to believe the result",
      },
      {
        type: "p",
        content: [
          "A test needs a hypothesis, a metric agreed in advance, and enough traffic to reach significance. Without those you are reading noise and calling it insight.",
        ],
      },
      {
        type: "p",
        content: [
          "We run a prioritised backlog across the whole funnel — acquisition, activation, retention, referral — rather than only the top, where most agencies stop because it is the easiest part to invoice for.",
        ],
      },
      {
        type: "h2",
        text: "Retention is where the money is",
      },
      {
        type: "p",
        content: [
          "Improving activation by a few points compounds through everything downstream and lowers acquisition cost without touching a campaign. It is unglamorous, it rarely makes the case study, and it is usually the highest-return work available.",
        ],
      },
      {
        type: "h2",
        text: "Where this connects",
      },
      {
        type: "p",
        content: [
          "Experimentation assumes traffic to experiment on, which usually comes from ",
          {
            text: "digital marketing",
            href: "/services/digital-marketing",
          },
          " and ",
          {
            text: "SEO optimisation",
            href: "/services/seo",
          },
          ". Testing product surfaces often needs engineering — that is ",
          {
            text: "web application development",
            href: "/services/web-applications",
          },
          ".",
        ],
      },
    ],
    faqs: [
      {
        q: "How is this different from digital marketing?",
        a: "Digital marketing runs channels. Growth marketing runs experiments across the whole funnel, including product surfaces like onboarding and activation that a media agency has no access to.",
      },
      {
        q: "How many experiments run at once?",
        a: "As many as your traffic supports without contaminating each other. For most companies that is two to four meaningful tests at a time, not the twenty a backlog tool would let you start.",
      },
      {
        q: "What if we do not have enough traffic to test?",
        a: "Then we do qualitative work and fix the obvious instead of pretending a test at low volume means anything. Underpowered tests are worse than none, because they produce confident conclusions from noise.",
      },
    ],
  },
];
