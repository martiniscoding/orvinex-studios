import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { html, summary } from "@/content/legal/terms";

export const metadata: Metadata = {
  title: "Terms & Conditions — Orvinex Software Solutions | Orvinex",
  description:
    "Terms and Conditions governing software development, payments, delivery, testing, deployment, intellectual property and client engagements with Orvinex Software Solutions.",
  alternates: { canonical: "/termsandconditions" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="31 August 2026" summary={summary} html={html} />
  );
}
