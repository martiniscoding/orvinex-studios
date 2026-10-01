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
      "Custom software built around how your business already works: ERP, internal tools, integrations and automation, delivered in two-week cycles.",
    h1: "Software built around your business, not the other way round",
    lead: "Off-the-shelf tools make you adapt to their assumptions. Custom software adapts to yours, and pays for itself the moment it removes the manual work your team has quietly absorbed for years.",
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
          "We write the assumptions down at the start: expected volumes, the systems we must integrate with, who signs off. When one turns out to be wrong, the conversation is about the assumption rather than about blame.",
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
          "Most custom builds arrive with a front end attached: see ",
          {
            text: "web application development",
            href: "/services/web-applications",
          },
          ". Order and stock handling for an online store is part of this work too: inventory, order operations and marketplace sync are custom software like any other.",
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
        a: "We stay on through the first weeks of real use, which is when the problems worth catching appear. After that you can retain us for ongoing work or take it in-house. The handover is written so either is possible.",
      },
    ],
  },
  {
    id: "web-applications",
    metaTitle: "Web Application Development Services | Orvinex",
    metaDescription:
      "SaaS products, dashboards and customer portals on modern stacks: documented, load-tested before launch, handed over as code you own.",
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
          "Modern, boring and well supported: React and Next.js on the front, TypeScript throughout, Postgres underneath, deployed on infrastructure you can move off. We pick tools with large communities and long support horizons, because your application will outlive the framework's current fashion cycle.",
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
      "Native iOS and Android builds or a single cross-platform codebase: architecture, interface, store submission and the release cadence after launch.",
    h1: "Apps people keep on their home screen",
    lead: "Most apps are installed once and deleted within a week. The ones that survive earn a place by being fast, obvious and worth opening again, which is a design and engineering problem long before it is a marketing one.",
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
          " (React Native or Flutter) makes sense for most business applications. One codebase, both stores, meaningfully lower cost to build and maintain.",
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
          "Phones lose signal in lifts, basements and on trains. We decide early what the app does with no connection (queue writes, serve cached reads, or block with a clear message) rather than discovering the answer through crash reports.",
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
          "Apps almost always need a back end and an admin surface, and that is ",
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
    id: "rag-chatbots",
    metaTitle: "AI Chatbot & RAG Assistant Development | Orvinex",
    metaDescription:
      "Assistants that answer from your own documentation with the source attached, tested against a graded answer set before they ever reach a customer.",
    h1: "Assistants that answer from your documents, not from guesswork",
    lead: "A general chatbot bolted onto your website will confidently invent your refund policy. Retrieval-augmented generation fixes that by making the model answer only from documents you control, and show its source.",
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
            ": a graded list of real questions with correct answers, run against every change.",
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
          " is the better shape. Either way it needs somewhere to live, usually ",
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
        a: "Anything with text: PDFs, help centres, ticket histories, product catalogues, internal wikis. The quality ceiling is your documentation; if it is contradictory, the assistant will be too.",
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
      "Narrow internal AI tools that do one job dependably, built around the tasks quietly eating hours from your team each week.",
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
          "Before any model is chosen, we sit with your team and find where the hours actually go. It is usually somewhere unremarkable: reformatting supplier quotes, triaging inbound email, summarising call notes into the CRM, checking documents against a checklist.",
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
          "The interface is usually a small web tool or an addition to software you already open, not another login.",
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
        a: "They use it when it is faster than what they do now and lives where they already work. Adoption failures are almost always design failures: an extra login, or a tool that is right eighty percent of the time with no way to correct the rest.",
      },
      {
        q: "Which models do you use?",
        a: "Whichever fits the task, the latency budget and the cost per run. Most work does not need the largest model, and we will not bill you as though it does.",
      },
    ],
  },
];
