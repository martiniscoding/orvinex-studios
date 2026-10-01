import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { html, summary } from "@/content/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy: What We Collect and Why | Orvinex",
  description:
    "How Orvinex collects, uses and protects personal information. No analytics, no tracking cookies, no advertising pixels.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="31 August 2026" summary={summary} html={html} />;
}
