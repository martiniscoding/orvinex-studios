import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

import { Markdown } from "@/components/articles/Markdown";
import { Footer } from "@/components/Footer";
import { Navbar1 } from "@/components/ui/navbar-1";
import { Reveal } from "@/components/ui/Reveal";

const LAST_UPDATED = "31 August 2026";
const CONTACT_EMAIL = "orvinexsoftwaresolution@gmail.com";

const description =
  "Terms and Conditions governing software development, payments, delivery, testing, deployment, intellectual property and client engagements with Orvinex Software Solutions.";

export const metadata: Metadata = {
  title: "Terms & Conditions — Orvinex Software Solutions",
  description,
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    url: "https://orvinex.store/terms",
    siteName: "Orvinex",
    title: "Terms & Conditions | Orvinex",
    description,
    images: ["/opengraph-image"],
  },
};

const TERMS = `
## 1. About these terms

Orvinex Software Solutions ("Orvinex", "we", "us", or "our") is a software development agency based in India. We design and build websites, web applications, software products, APIs, dashboards and other digital solutions for clients worldwide.

These Terms and Conditions ("Terms") govern our software development engagements unless a separate written agreement signed by both parties states otherwise.

By approving a project, making a payment, or instructing us to begin development, the client ("you" or "client") agrees to these Terms.

The exact scope, features, timelines and deliverables of an individual project may also be defined in a proposal, quotation, statement of work, project document, email confirmation, or other written communication agreed between both parties.

---

## 2. Project scope

Before development begins, we will agree on the general scope of the project, which may include:

- Product or website requirements
- Features and functionality
- Technology stack
- Design requirements
- Development milestones
- Estimated timeline
- Deliverables
- Deployment requirements
- Third-party services or integrations

We build according to the agreed scope.

Requests that materially change the agreed scope may be treated as additional work and may require a separate quotation, revised timeline, or additional payment.

Minor adjustments that do not materially change the agreed functionality may be handled as part of the existing project at our discretion.

---

## 3. Project payment structure

Our standard software development payment structure is divided into four stages.

### Stage 1 — Initial payment: 15%

A **15% initial payment** is required before development work begins.

This payment confirms the project and allows us to allocate development resources and begin work.

---

### Stage 2 — MVP completion: 40%

After the agreed **MVP (Minimum Viable Product)** has been developed and the first project review meeting has taken place, **40% of the total project fee** becomes payable.

The MVP is intended to demonstrate the core functionality and direction of the product.

Payment at this stage is not dependent on every final feature being completed. The remaining development work will continue according to the agreed project scope and milestones.

---

### Stage 3 — Pre-deployment: 20%

Once the product has been substantially built and is ready for deployment, the next **20% of the total project fee** becomes payable.

This payment is due **before production deployment**.

Deployment may be scheduled once this payment has been received.

---

### Stage 4 — Deployment, delivery & testing: 25%

The final **25% of the total project fee** becomes payable after:

- Production deployment
- Delivery of the agreed product
- Completion of the agreed testing process
- Resolution of material issues identified during the agreed testing period

The complete project fee therefore follows this structure:

| Stage | Payment |
| --- | ---: |
| Project initiation | **15%** |
| MVP completion + first meeting | **40%** |
| Product completion before deployment | **20%** |
| Deployment + delivery + testing | **25%** |
| **Total** | **100%** |

---

## 4. Payment terms

All payments must be made according to the agreed project schedule.

Development milestones may be paused if a payment becomes overdue.

If a payment remains outstanding, Orvinex may temporarily suspend development, deployment, access to project environments, or delivery of project materials until the outstanding amount is received.

Any resulting delay may extend the original project timeline.

Unless specifically agreed otherwise in writing, third-party costs are separate from our development fees. These may include:

- Hosting
- Domain registration
- Cloud services
- Paid APIs
- Email services
- Payment gateway charges
- Software licences
- App store fees
- Other external services

---

## 5. Client responsibilities

Successful software development requires timely cooperation from both sides.

The client is responsible for providing, where applicable:

- Accurate project requirements
- Business rules and necessary information
- Brand assets and content
- API credentials or third-party access
- Feedback and approvals
- Required legal or compliance information
- Access to hosting, domains or other services where necessary

If required information, feedback, approvals, credentials, content or decisions are delayed, the project timeline may be extended accordingly.

Orvinex is not responsible for delays caused by the client's failure to provide information or approvals required to continue development.

---

## 6. Reviews, feedback and approvals

Project reviews may take place through meetings, demonstrations, messages, emails or other agreed communication channels.

The client should provide consolidated and reasonably clear feedback after each review.

Where a milestone has been reviewed and approved, subsequent changes that materially alter the approved work may be treated as additional scope.

We encourage clients to raise concerns as early as possible so that issues can be addressed during the relevant development stage.

---

## 7. Changes to the project

Software products can evolve during development.

If you request new functionality, significant design changes, additional integrations, changes to business logic, or other work outside the agreed scope, Orvinex may provide a separate estimate for that work.

Additional work may affect:

- Project cost
- Delivery timeline
- Development milestones
- Deployment date

No additional work that materially increases the project scope is required to be performed without reasonable agreement between the parties.

---

## 8. Testing and bug fixes

Before final delivery, we will test the agreed functionality of the product.

A bug means functionality that does not operate substantially according to the agreed requirements.

A feature request, change in requirements, new business rule, or newly requested functionality is not considered a bug.

Material bugs identified during the agreed testing period will be reviewed and, where they fall within the agreed scope, corrected by Orvinex.

Issues caused by third-party services, infrastructure changes, client modifications, unsupported environments, or changes made after delivery may fall outside the original development scope.

---

## 9. Deployment and delivery

Deployment means making the agreed product available in the production environment specified for the project.

The client is responsible for providing necessary production access and third-party accounts where those accounts are owned by the client.

Where Orvinex manages deployment, we will deploy the product according to the agreed technical setup.

After deployment and completion of the agreed delivery and testing process, the project will be considered delivered.

Future maintenance, feature development, infrastructure management, or ongoing support is not automatically included unless separately agreed.

---

## 10. Intellectual property

Unless otherwise agreed in writing, the client receives the rights to use the final custom-developed project deliverables after all outstanding project payments have been paid.

Third-party libraries, frameworks, open-source software, fonts, APIs, plugins, hosting services and other external components remain subject to their respective licences and terms.

Orvinex may retain ownership of its pre-existing tools, reusable libraries, internal development processes, generic components, know-how, templates and software utilities that were not created specifically for the client's project.

The client does not receive ownership of Orvinex's internal tools or reusable technology merely because they were used while building the project.

---

## 11. Third-party services

A project may depend on third-party platforms or services.

Examples include:

- Cloud hosting providers
- Payment gateways
- Email providers
- Authentication services
- AI APIs
- Maps and location services
- Analytics platforms
- App stores
- Domain providers

Orvinex is not responsible for outages, policy changes, pricing changes, API changes, account restrictions, discontinued services, or failures caused by third-party providers.

Where a third-party service is required, the client may be responsible for maintaining the relevant account and subscription.

---

## 12. Security

We take reasonable technical measures during development to build software responsibly.

However, no software, server, network, API or online service can be guaranteed to be completely secure.

The client is responsible for maintaining secure credentials and access to accounts under its control.

After delivery, the client is also responsible for securing its production environment unless an ongoing security or infrastructure management service has been separately agreed.

---

## 13. Confidentiality

Both parties may receive confidential information during a project.

Each party agrees to use confidential information only for purposes connected with the project and to take reasonable steps to prevent unauthorized disclosure.

Confidential information does not include information that:

- Is publicly available
- Was already lawfully known
- Is independently developed
- Is received lawfully from another source
- Must be disclosed by law or a valid legal requirement

If the parties require a dedicated Non-Disclosure Agreement, that agreement may govern confidentiality in greater detail.

---

## 14. Project timelines

Any project timeline provided by Orvinex is an estimate unless a specific deadline has been expressly agreed in writing.

Timelines may change because of:

- Scope changes
- Delayed feedback
- Delayed payments
- Missing content or credentials
- Third-party dependencies
- Technical issues
- Infrastructure problems
- Events outside reasonable control

We will make reasonable efforts to communicate significant timeline changes when they become known.

---

## 15. Cancellation and termination

Either party may request termination of a project.

If the client terminates the project after development has started, payments relating to completed milestones and work already performed remain payable.

Amounts already paid may not automatically be refundable because they may represent development time, resources, planning, design, engineering or other work already performed.

If Orvinex terminates a project without client breach, we will communicate the reason and make reasonable arrangements regarding completed work and outstanding obligations.

Termination does not remove the obligation to pay amounts that became due before termination.

---

## 16. Refunds

Payments correspond to project milestones and development work.

Because software development involves allocated engineering time and project resources, payments for completed work are generally non-refundable.

Any refund or credit will be considered based on the specific circumstances and any separate written agreement between the parties.

---

## 17. Portfolio and project showcase

Unless the client expressly requests otherwise in writing, Orvinex may mention completed projects in its portfolio, website, case studies, presentations or marketing materials.

We will not intentionally disclose confidential business information, private credentials, source code, customer data, or other sensitive information merely for promotional purposes.

A client may request that a project remain confidential, and we will consider such requests reasonably.

---

## 18. Warranties and limitations

We will perform development services with reasonable care and skill.

However, we do not guarantee that:

- The product will generate a particular amount of revenue
- The product will achieve a specific business result
- A particular number of users will use the product
- Third-party services will remain available
- Search rankings or marketing performance will reach a specific level
- The product will be completely free from defects
- The product will satisfy requirements that were not communicated or agreed

Business outcomes depend on many factors outside the control of a software development agency.

---

## 19. Limitation of liability

To the maximum extent permitted by applicable law, Orvinex will not be liable for indirect, incidental, special, consequential or loss-of-profit damages arising from the project.

This may include loss of:

- Revenue
- Business opportunities
- Data
- Expected profits
- Reputation
- Customers

Nothing in these Terms is intended to exclude liability that cannot legally be excluded under applicable law.

---

## 20. Force majeure

Neither party will be considered responsible for failure or delay caused by circumstances reasonably beyond its control.

This may include major infrastructure failures, natural disasters, war, government actions, widespread internet outages, cyber incidents affecting essential providers, or other extraordinary events.

The affected party should communicate material delays when reasonably possible.

---

## 21. Communication

Project communication may take place through email, messaging platforms, project management tools, video meetings or other channels agreed between the parties.

Important approvals, scope changes and commercial decisions should preferably be confirmed in writing so that both parties have a clear record of the agreement.

---

## 22. Changes to these terms

We may update these Terms from time to time.

The "Last updated" date at the top of this page will indicate when the latest version was published.

For an active project, any separately signed agreement or written project contract between Orvinex and the client will take precedence over these general website Terms where the two documents conflict.

---

## 23. Governing law

These Terms are intended to be governed by the applicable laws of India.

Any dispute will first be attempted to be resolved through good-faith discussion between the parties.

Where a dispute cannot be resolved amicably, the parties may pursue the remedies available under applicable law.

---

## 24. Contact us

If you have questions about these Terms, project payments, scope, delivery or any other contractual matter, contact us at:

**${CONTACT_EMAIL}**

Orvinex Software Solutions, India.
`;

export default function TermsPage() {
  return (
    <>
      <Navbar1 />

      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-grid mask-hero-grid opacity-70"
          />

          <Reveal className="mx-auto max-w-[46rem] px-5">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
                <li>
                  <Link
                    href="/"
                    className="outline-none transition-colors hover:text-white focus-visible:text-white"
                  >
                    Home
                  </Link>
                </li>

                <li aria-hidden="true" className="text-white/25">
                  /
                </li>

                <li aria-current="page" className="text-white/70">
                  Terms & Conditions
                </li>
              </ol>
            </nav>

            <h1 className="mt-7 font-display text-[clamp(2.1rem,4.6vw,3rem)] font-bold leading-[1.07] tracking-[-0.035em] text-white">
              Terms & Conditions
            </h1>

            <p className="mt-4 font-mono text-[12px] tracking-[0.08em] text-white/35">
              Last updated {LAST_UPDATED}
            </p>

            <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/[0.06] p-6">
              <h2 className="font-display text-[16px] font-bold tracking-tight text-white">
                The short version
              </h2>

              <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                Our software projects are paid in four stages:{" "}
                <strong className="text-white">15%</strong> at project
                initiation, <strong className="text-white">40%</strong> after
                the MVP and first project meeting,{" "}
                <strong className="text-white">20%</strong> before deployment,
                and the final <strong className="text-white">25%</strong> after
                deployment, delivery and testing.
              </p>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-primary outline-none transition-colors hover:text-white focus-visible:text-white"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
                {CONTACT_EMAIL}
              </a>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[46rem] px-5 pb-24 pt-10">
          <Markdown>{TERMS}</Markdown>
        </section>
      </main>

      <Footer />
    </>
  );
}