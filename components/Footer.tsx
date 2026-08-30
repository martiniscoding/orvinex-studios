"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "./ui/Logo";
import { Reveal } from "./ui/Reveal";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/#about" },
      { label: "Our Services", href: "/services" },
      { label: "Articles", href: "/articles" },
    ],
  },
  {
    heading: "Expertise",
    links: [
      { label: "Custom Software", href: "/services#custom-software" },
      { label: "AI & RAG Assistants", href: "/services#rag-chatbots" },
      { label: "E-commerce Software", href: "/services#ecommerce-management" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[380px] w-[120vw] max-w-[1200px] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124,92,255,0.2) 0%, transparent 70%)",
        }}
      />

      <Reveal className="relative mx-auto max-w-6xl px-5 pb-10 pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:gap-8">
          <div>
            <Logo markSize={34} />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted">
              We eliminate the need for an in-house software team. We are your
              complete technical partner&mdash;from ideation to launch to
              ongoing growth.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white">
                {column.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-muted transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white">
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:orvinexsoftwaresolution@gmail.com"
                  className="group flex items-start gap-2.5 text-[14px] text-muted transition-colors duration-200 hover:text-white"
                >
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    strokeWidth={1.9}
                  />
                  <span className="break-all">
                    orvinexsoftwaresolution@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918272891238"
                  className="flex items-center gap-2.5 text-[14px] text-muted transition-colors duration-200 hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.9} />
                  +91-8272891238
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 sm:flex-row">
          <p className="text-[13px] text-muted">
            &copy; 2026 Orvinex Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[13px] text-muted transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </Link>
            <a
              href="#"
              className="text-[13px] text-muted transition-colors duration-200 hover:text-white"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
