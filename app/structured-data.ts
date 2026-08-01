/**
 * schema.org JSON-LD for the landing page.
 *
 * Emitted as a single `@graph` so every entity (organization, founder, site,
 * page) is one connected object rather than four disconnected islands —
 * crawlers resolve the `@id` cross-references into a single knowledge entity.
 *
 * Keep the service list in sync with `components/ServicesGrid.tsx`. Google's
 * structured-data guidelines expect the markup to describe content that is
 * actually visible on the page.
 */

const SITE_URL = "https://orvinex.store";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const FOUNDER_ID = `${SITE_URL}/#founder`;
const LOGO_ID = `${SITE_URL}/#logo`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

const EMAIL = "orvinexsoftwaresolution@gmail.com";
const TELEPHONE = "+91-8272891238";

/** `areaServed` accepts plain text; "Worldwide" is the conventional value. */
const AREA_SERVED = "Worldwide";

const SERVICES = [
  {
    name: "Mobile App Development",
    description:
      "Native and cross-platform iOS and Android applications, from product definition through store release.",
  },
  {
    name: "Custom Software Development",
    description:
      "Bespoke business software and internal platforms built around an organisation's own workflows.",
  },
  {
    name: "Web Application Development",
    description:
      "Production web applications and SaaS platforms, including architecture, build, and ongoing engineering.",
  },
  {
    name: "AI Product Development",
    description:
      "AI-powered products and integrations, including LLM-backed features, automation, and intelligent workflows.",
  },
  {
    name: "SEO Services",
    description:
      "Technical and on-page search engine optimisation for measurable organic growth.",
  },
  {
    name: "Digital Marketing",
    description:
      "Full-funnel digital marketing campaigns across search, social, and paid channels.",
  },
  {
    name: "Growth Marketing",
    description:
      "Data-driven growth experimentation, conversion optimisation, and retention strategy.",
  },
];

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORGANIZATION_ID,
      name: "Orvinex Software Solutions",
      alternateName: "Orvinex",
      url: SITE_URL,
      logo: { "@id": LOGO_ID },
      image: { "@id": LOGO_ID },
      description:
        "Orvinex Software Solutions is a software development agency building custom software, web and mobile applications, and AI products for clients worldwide.",
      slogan: "Build digital solutions that dominate your market.",
      email: EMAIL,
      telephone: TELEPHONE,
      // Country only. Orvinex is based in India but positions worldwide, so
      // no city is claimed — and no street address is published anywhere yet.
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      areaServed: AREA_SERVED,
      founder: { "@id": FOUNDER_ID },
      knowsAbout: [
        "Custom Software Development",
        "Web Application Development",
        "Mobile App Development",
        "Artificial Intelligence",
        "SaaS Development",
        "Enterprise Resource Planning",
        "Search Engine Optimization",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: EMAIL,
          telephone: TELEPHONE,
          areaServed: AREA_SERVED,
          availableLanguage: ["English"],
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software Development Services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: AREA_SERVED,
          },
        })),
      },
      // TODO: add `sameAs: [...]` once the LinkedIn / X / Instagram profiles
      // exist — that is how Google confirms this is one entity across the web.
      // The Footer social links are still `href="#"` placeholders.
    },
    {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: `${SITE_URL}/logo.png`,
      contentUrl: `${SITE_URL}/logo.png`,
      width: 2000,
      height: 2000,
      caption: "Orvinex Software Solutions logo",
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Rohan Kumar Singh",
      jobTitle: "Founder & Lead Architect",
      image: `${SITE_URL}/founder.png`,
      worksFor: { "@id": ORGANIZATION_ID },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Indian Institute of Technology Madras",
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Orvinex",
      description:
        "Software development agency building custom software, web and mobile applications, and AI products worldwide.",
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": WEBPAGE_ID,
      url: SITE_URL,
      name: "Orvinex | Software Development Agency",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      primaryImageOfPage: { "@id": LOGO_ID },
      inLanguage: "en",
    },
  ],
};
