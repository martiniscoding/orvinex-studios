"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";
import { Logo } from "./Logo";

/**
 * Hrefs are root-relative so they resolve from every route, not just the
 * landing page — `#about` alone would be a dead hash on /services.
 *
 * `Articles` has no section yet; a dead `/#articles` hash is a no-op, not a
 * 404. TODO: point at /articles once the insights route ships.
 */
const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Articles", href: "/#articles" },
];

/** Sections that actually exist, in the order the scroll-spy should track. */
const SPY_IDS = ["home", "about", "services"];

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [active, setActive] = useState("/#home");
  // On a standalone route there are no spy sections to observe, so the pill
  // follows the pathname instead of the scroll position.
  const onLanding = pathname === "/";
  const current = onLanding ? active : pathname;

  const toggleMenu = () => setIsOpen((v) => !v);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lightweight scroll-spy so the purple pill follows the reader.
  useEffect(() => {
    if (!onLanding) return;
    const sections = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`/#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onLanding]);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex w-full justify-center px-4 py-5"
    >
      <div
        className={`relative z-10 flex w-full max-w-3xl items-center justify-between rounded-full border border-white/10 px-4 py-2.5 backdrop-blur-xl transition-colors duration-300 ${
          scrolled
            ? "bg-[#0d0d15]/85 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)]"
            : "bg-white/[0.045]"
        }`}
      >
        <Link
          href="/"
          className="shrink-0 transition-opacity hover:opacity-85"
          aria-label="Orvinex home"
        >
          <Logo markSize={28} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((item) => {
            const isActive = current === item.href;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                className={`relative rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary-deep shadow-[0_0_22px_-4px_rgba(124,92,255,0.9)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </motion.a>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <motion.a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Schedule a call — opens Google Calendar in a new tab"
          className="hidden items-center gap-2 rounded-full bg-primary-deep px-5 py-2 text-[13.5px] font-semibold text-white shadow-[0_0_24px_-6px_rgba(124,92,255,0.9)] transition-colors hover:bg-primary md:inline-flex"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
        >
          Schedule Call
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </motion.a>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          className="flex items-center text-white md:hidden"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <Menu className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background px-6 pt-24 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-primary/20 blur-[110px]"
            />

            <motion.button
              type="button"
              className="absolute right-6 top-6 p-2 text-white"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </motion.button>

            <div className="flex flex-col space-y-6">
              {NAV_LINKS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a
                    href={item.href}
                    className={`text-base font-medium transition-colors ${
                      current === item.href
                        ? "text-primary"
                        : "text-white/80 hover:text-white"
                    }`}
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Schedule a call — opens Google Calendar in a new tab"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-deep px-5 py-3 text-base font-semibold text-white shadow-[0_0_24px_-6px_rgba(124,92,255,0.9)] transition-colors hover:bg-primary"
                  onClick={toggleMenu}
                >
                  Schedule Call
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export { Navbar1 };
