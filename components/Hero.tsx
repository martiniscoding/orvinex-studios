"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

import { DustField } from "./ui/DustField";
import { WorkGallery } from "./ui/WorkGallery";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[min(100svh,940px)] items-center overflow-hidden bg-background px-5 pb-24 pt-28 sm:pt-36"
    >
      {/* ── Fine grid, faded out toward the edges ─────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-grid mask-hero-grid"
      />

      {/* ── Top-center violet bloom ───────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.06, 1] }}
        transition={{
          opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 9, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none absolute -top-[38vh] left-1/2 -z-20 h-[85vh] w-[130vw] max-w-[1500px] -translate-x-1/2 rounded-full blur-[90px] sm:-top-[42vh]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(139,92,246,0.55) 0%, rgba(124,92,255,0.32) 32%, rgba(109,74,255,0.12) 55%, transparent 72%)",
        }}
      />

      {/* Hotter inner core of the top glow */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-[22vh] left-1/2 -z-20 h-[45vh] w-[70vw] max-w-[820px] -translate-x-1/2 rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(167,139,250,0.5) 0%, rgba(124,92,255,0.22) 45%, transparent 70%)",
        }}
      />

      {/* ── Drifting dust, stirred by the cursor ──────────────────────── */}
      <DustField className="-z-20" />

      {/* ── The curved light arc ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[14%] -z-10 h-[46vh] min-h-[280px] overflow-hidden sm:top-[16%]"
      >
        <svg
          className="absolute left-1/2 h-full w-[150%] max-w-none -translate-x-1/2 sm:w-[120%]"
          viewBox="0 0 1440 420"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="arcStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c5cff" stopOpacity="0" />
              <stop offset="16%" stopColor="#7c5cff" stopOpacity="0.35" />
              <stop offset="34%" stopColor="#b8a5ff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="66%" stopColor="#b8a5ff" stopOpacity="0.85" />
              <stop offset="84%" stopColor="#7c5cff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="arcBloom" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6d4aff" stopOpacity="0" />
              <stop offset="30%" stopColor="#8b5cf6" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6d4aff" stopOpacity="0" />
            </linearGradient>

            <filter id="arcBlur" x="-20%" y="-200%" width="140%" height="500%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>

          {/* Soft bloom underneath the hairline */}
          <motion.path
            d="M -60 400 C 340 40, 1100 40, 1500 400"
            stroke="url(#arcBloom)"
            strokeWidth="10"
            strokeLinecap="round"
            filter="url(#arcBlur)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 2.1, delay: 0.25, ease: EASE },
              opacity: { duration: 1, delay: 0.25 },
            }}
          />

          {/* The hairline itself */}
          <motion.path
            d="M -60 400 C 340 40, 1100 40, 1500 400"
            stroke="url(#arcStroke)"
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 2.1, delay: 0.25, ease: EASE },
              opacity: { duration: 0.8, delay: 0.25 },
            }}
          />
        </svg>

        {/* White-hot highlight sitting at the apex of the arc */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.45, 0.8, 0.45] }}
          transition={{
            opacity: {
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.4,
            },
          }}
          className="absolute left-1/2 top-[16%] h-24 w-[38vw] max-w-[460px] -translate-x-1/2 rounded-full blur-[52px]"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(167,139,250,0.35) 40%, transparent 72%)",
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex w-full flex-col items-start text-left"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[12.5px] font-medium text-white/80 backdrop-blur-sm">
            <Sparkles
              className="h-3.5 w-3.5 text-primary"
              strokeWidth={2}
              fill="currentColor"
            />
            Based in India, Serving Globally
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 font-display text-[clamp(2.3rem,5.6vw,3.95rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white"
        >
          Build digital solutions that dominate your market.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted sm:text-[16.5px]"
        >
          You don&apos;t need to hire anyone. We work here as your dedicated
          engineering team, providing absolute technical certainty from concept
          to launch.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary-deep px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_32px_-8px_rgba(124,92,255,0.95)] transition-colors hover:bg-primary hover:shadow-glow-lg sm:w-auto"
          >
            Start Your Project
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.2}
            />
          </motion.a>

          <motion.a
            href="#services"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.02] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-white/[0.07] sm:w-auto"
          >
            Explore Services
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.2}
            />
          </motion.a>
        </motion.div>
      </motion.div>

        {/* ── Recent work, drifting past in two opposed columns ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
        >
          <WorkGallery className="h-[380px] sm:h-[480px] lg:h-[min(660px,66svh)]" />
        </motion.div>
      </div>

      {/* ── Bottom violet bleed, mirroring the top glow ───────────────── */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-[30vh] left-1/2 -z-20 h-[55vh] w-[120vw] max-w-[1400px] -translate-x-1/2 rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124,92,255,0.42) 0%, rgba(109,74,255,0.18) 45%, transparent 70%)",
        }}
      />

      {/* Hard fade into the section that follows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}
