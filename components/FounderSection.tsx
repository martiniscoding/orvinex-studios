"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { GraduationCap, Quote } from "lucide-react";
import { Reveal } from "./ui/Reveal";

export function FounderSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124,92,255,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        {/* ── Founder photo slot ─────────────────────────────────────── */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute -inset-3 -z-10 rounded-[32px] bg-gradient-to-br from-primary/30 via-primary/5 to-transparent blur-2xl" />

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[26px] border border-white/10 bg-surface">
              <Image
                src="/founder.png"
                alt="Rohan Kumar Singh, Founder of Orvinex"
                fill
                priority={false}
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover object-top grayscale contrast-[1.05]"
              />
              {/* Fade the base of the portrait into the section so the
                  credential chip sits on a calm backdrop. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
              />
            </div>

            {/* IIT Madras credential chip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d15]/90 px-4 py-3 backdrop-blur-xl"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-deep">
                <GraduationCap className="h-[18px] w-[18px] text-white" strokeWidth={2} />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-white">
                  IIT Madras
                </span>
                <span className="block text-[11.5px] text-muted">
                  Alumni Excellence
                </span>
              </span>
            </motion.div>
          </div>
        </Reveal>

        {/* ── Copy ───────────────────────────────────────────────────── */}
        <div>
          <Reveal delay={0.05}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
              The Mind Behind Orvinex
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.2vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              Rohan Kumar Singh
            </h2>
            <p className="mt-3 text-[15px] font-medium text-primary/90">
              Founder &amp; Lead Architect | IIT Madras
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted">
              With a foundation from IIT Madras, Rohan built Orvinex to bridge
              the gap between business vision and technical execution. We
              believe that software should be an asset, not a liability.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <figure className="relative mt-8 max-w-xl rounded-2xl border border-white/[0.08] bg-surface/70 p-6 sm:p-7">
              <Quote
                className="absolute -top-3 left-6 h-7 w-7 rotate-180 text-primary"
                fill="currentColor"
                strokeWidth={0}
              />
              <blockquote className="text-[15px] leading-relaxed text-white/85">
                &ldquo;We established Orvinex with a singular goal: to eliminate
                the friction of building software. You don&apos;t need to hire
                freelancers or manage complex technical teams. We work here as
                your dedicated engineers, ensuring absolute perfection.&rdquo;
              </blockquote>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
