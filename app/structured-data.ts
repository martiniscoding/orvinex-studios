/**
 * schema.org JSON-LD.
 *
 * Split in two on purpose. `siteStructuredData` describes entities that are
 * true on every URL — the organization, its logo, the founder, the site — and
 * is emitted by the root layout. Page-level nodes live with their page:
 * `homeStructuredData` here, articles in lib/blog-schema.ts.
 *
 * Emitting the landing page's WebPage node site-wide, as this file used to,
 * meant every blog post also declared a WebPage whose url was the homepage.
 *
 * Entities are one connected `@graph` rather than disconnected islands —
 * crawlers resolve the `@id` cross-references into a single knowledge entity.
 *
 * Keep the service list in sync with `components/ServicesGrid.tsx`. Google's
 * structured-data guidelines expect the markup to describe content that is
 * actually visible on the page.
 */

export const SITE_URL = "https://orvinex.store";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;
export const LOGO_ID = `${SITE_URL}/#logo`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

const EMAIL = "orvinexsoftwaresolution@gmail.com";
const TELEPHONE = "+91-8272891238";

/** `areaServed` accepts plain text; "Worldwide" is the conventional value. */
const AREA_SERVED = "Worldwide";

export const siteStructuredData = {
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
  ],
};

/**
 * The landing page's own nodes.
 *
 * The offer catalogue is built from the live services rather than a second
 * hardcoded list: it used to sit in the site-wide graph, which meant adding a
 * service in the admin panel silently left the markup describing the old set.
 *
 * Emitting a second node with the ORGANIZATION_ID is deliberate — consumers
 * merge nodes sharing an @id within a document, so this adds the catalogue to
 * the organization the layout already declared rather than creating a rival.
 */
export function homeStructuredData(
  services: { title: string; description: string }[]
) {
  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software Development Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: { "@id": ORGANIZATION_ID },
            areaServed: AREA_SERVED,
          },
        })),
      },
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
}
