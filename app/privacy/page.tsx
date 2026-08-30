import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

import { Markdown } from "@/components/articles/Markdown";
import { Footer } from "@/components/Footer";
import { Navbar1 } from "@/components/ui/navbar-1";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The privacy policy is deliberately static rather than editable from the
 * admin panel. A legal document wants an audit trail of exactly what changed
 * and when, which git gives and a database column does not.
 *
 * Everything in it was checked against the code. If the site starts collecting
 * something new — analytics, a chat widget, a newsletter — this page has to
 * change in the same commit, or it becomes a false statement rather than an
 * out-of-date one.
 */
const LAST_UPDATED = "31 August 2026";
const CONTACT_EMAIL = "orvinexsoftwaresolution@gmail.com";

const description =
  "How Orvinex collects, uses and protects personal information. No analytics, no tracking cookies, no advertising pixels.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    url: "https://orvinex.store/privacy",
    siteName: "Orvinex",
    title: "Privacy Policy | Orvinex",
    description,
  },
};

const POLICY = `
## 1. Who we are

Orvinex Software Solutions ("Orvinex", "we", "us") is a software development
agency based in India, working with clients worldwide. This policy covers
**orvinex.store** and the enquiry process that follows from it.

It does not cover work we do inside a client's own systems under a separate
contract. That is governed by the agreement we sign with that client.

## 2. What we collect

### Information you give us

The contact form on this site asks for:

- **Your name** — so we know who we are replying to
- **Your email address** — so we can reply
- **Your phone number** — so we can reach you if email stalls
- **Your country** — optional; it tells us your time zone before we propose a call
- **Your project details** — whatever you choose to write

That is the entire form. There are no hidden fields, and nothing else about you
is attached to your submission.

If you book a call through the scheduling link, that booking is handled by
Google Calendar under Google's own privacy policy, not ours.

### Information collected automatically

**Your IP address** is used to rate limit the contact form — to stop automated
submissions flooding it. It is stored as part of a counter, kept for a short
window, and deleted automatically. It is not linked to your enquiry and is not
used to identify you.

**Standard server logs** are produced by our hosting provider. They contain the
usual request information, including IP addresses, and are retained by that
provider under their own policy.

### What we do not collect

We think this list matters more than the one above:

- **No analytics.** There is no Google Analytics, no Plausible, no PostHog, no
  equivalent. We do not measure your visit.
- **No tracking cookies.** The public site sets none at all.
- **No advertising or social pixels.** No Meta pixel, no LinkedIn Insight tag,
  no retargeting of any kind.
- **No session recording or heatmaps.**
- **No fingerprinting.**
- **No data brokers.** We do not buy, sell, rent or trade personal information,
  and never have.

Web fonts are served from our own domain rather than from Google Fonts, so
loading a page here does not tell Google that you visited.

## 3. Cookies

The public site sets **no cookies**.

A single session cookie exists on the /admin area, which only our own staff can
sign into. If you are not an Orvinex employee, you will never receive it. It is
strictly necessary for keeping that session signed in and does nothing else.

Because we set no cookies on the public site, there is no cookie banner. That is
not an oversight.

## 4. Why we use your information, and on what basis

| What | Why | Lawful basis (UK/EU GDPR) |
| --- | --- | --- |
| Contact form details | To answer your enquiry and, if it goes further, to scope and quote the work | Steps taken at your request before entering a contract |
| IP address, briefly | To stop the form being abused | Our legitimate interest in keeping the site working |
| Server logs | Security and diagnosing faults | Our legitimate interest in operating the site securely |

We do not use your information for automated decision-making or profiling.

## 5. Who else touches it

We keep the list of third parties as short as we can. Currently:

- **Vercel Inc.** — hosting and content delivery. Processes requests to this
  site, including IP addresses.
- **Neon Inc.** — the managed PostgreSQL database where enquiries are stored.

Both act as processors on our instructions. We share your information with
nobody else, except where the law requires it of us.

## 6. Where your information is stored

Our database is hosted in the **United States**. If you are writing to us from
India, the EU, the UK or anywhere else, your enquiry is transferred there and
stored there.

For transfers out of the UK and EEA we rely on the European Commission's
Standard Contractual Clauses, which our providers incorporate into their terms.

## 7. How long we keep it

**Enquiries are kept until you ask us to delete them.** We would rather be
straight about this than claim a retention schedule we do not operate. A live
enquiry may become a project, and the trail of what was discussed is worth
keeping. If a conversation goes nowhere and you would rather we did not keep
it, say so and we will remove it.

Rate-limiting records are deleted automatically once their window closes.

## 8. Your rights

Wherever you are, you can ask us to:

- **Tell you what we hold** about you, and give you a copy
- **Correct** anything inaccurate
- **Delete** it
- **Stop using it** for a particular purpose
- **Send it to you or someone else** in a portable format

If you are in the EEA or the UK, these are your rights under the GDPR, plus the
right to object to processing based on legitimate interests and the right to
complain to your data protection authority.

If you are in India, these are your rights under the Digital Personal Data
Protection Act 2023, including the right to nominate someone to exercise them on
your behalf.

**We do not charge for any of this, and we do not require a particular form of
words.** An email saying "delete my enquiry" is enough. We aim to act within
seven days and will not take longer than thirty.

## 9. How we protect it

- The site is served over HTTPS.
- The database is encrypted at rest by our provider and reachable only over an
  encrypted connection.
- The admin area requires a password, sign-up is disabled, and sessions can be
  revoked immediately.
- Access is limited to the people who need it to reply to you.

No system is perfectly secure, and we will not pretend otherwise. If we ever
suffer a breach affecting your information, we will tell you and the relevant
regulator as the law requires.

## 10. Children

This site is aimed at businesses and is not directed at children. We do not
knowingly collect information from anyone under 18. If you believe a child has
sent us something, tell us and we will delete it.

## 11. Changes

If we change this policy we will update the date at the top of the page. If a
change is significant — new categories of data, a new third party, a new purpose
— we will say so plainly here rather than quietly editing a sentence.

## 12. Contact us

For anything in this policy, including any request above:

**${CONTACT_EMAIL}**

Orvinex Software Solutions, India.

If you are in the EEA or UK and are not satisfied with our response, you may
complain to your national supervisory authority. If you are in India, you may
complain to the Data Protection Board of India.
`;

export default function PrivacyPage() {
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
                  Privacy Policy
                </li>
              </ol>
            </nav>

            <h1 className="mt-7 font-display text-[clamp(2.1rem,4.6vw,3rem)] font-bold leading-[1.07] tracking-[-0.035em] text-white">
              Privacy Policy
            </h1>

            <p className="mt-4 font-mono text-[12px] tracking-[0.08em] text-white/35">
              Last updated {LAST_UPDATED}
            </p>

            {/* The short version. Most people want one paragraph, not twelve
                sections, and burying it would be the wrong instinct here. */}
            <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/[0.06] p-6">
              <h2 className="font-display text-[16px] font-bold tracking-tight text-white">
                The short version
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                We collect what you type into the contact form, and nothing
                else. There are no analytics, no tracking cookies and no
                advertising pixels on this site. We do not sell your
                information. Ask us to delete your enquiry and we will.
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
          <Markdown>{POLICY}</Markdown>
        </section>
      </main>
      <Footer />
    </>
  );
}
