"use client";

import { Star } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Orvinex delivered our custom ERP 2 weeks ahead of schedule. The code is immaculate and the system handles our 10k daily orders without breaking a sweat.",
    name: "Amit C.",
    title: "CEO, LogisticsTech",
  },
  {
    quote:
      "We hired them for a massive web application. Rohan and his team at Orvinex act like true technical co-founders. Best software company in Kolkata by far.",
    name: "Sarah J.",
    title: "Founder, FinSaaS",
  },
  {
    quote:
      "Their mobile app development team is insane. The Flutter app they built for us looks native and performs beautifully.",
    name: "Rahul M.",
    title: "Director, EduGrow",
  },
  {
    quote:
      "Not only did they build our platform, their SEO and digital marketing services skyrocketed our organic traffic by 300% in 4 months.",
    name: "Priya S.",
    title: "Marketing Head",
  },
  {
    quote:
      "If you need custom software development, stop looking. They fixed the spaghetti code our previous agency left and scaled our AWS infrastructure perfectly.",
    name: "Vikram B.",
    title: "Operations VP",
  },
];

function initials(name: string) {
  return name
    .replace(/\./g, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-background py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-40 -z-10 h-[420px] w-[560px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(139,92,246,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < 4 ? "text-primary" : "text-primary/40"
                }`}
                fill="currentColor"
                strokeWidth={0}
              />
            ))}
          </div>
          <h2 className="mt-5 font-display text-[clamp(1.95rem,4.4vw,3.05rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            4.8/5 Average Rating
          </h2>
          <p className="mt-4 text-[15.5px] text-muted">
            Based on our Top 15 Enterprise Client Reviews
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <RevealItem key={testimonial.name} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-surface">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 text-primary"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-white/85">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6d4aff] text-[13px] font-semibold text-white">
                    {initials(testimonial.name)}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[14px] font-semibold text-white">
                      {testimonial.name}
                    </span>
                    <span className="block text-[12.5px] text-muted">
                      {testimonial.title}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
