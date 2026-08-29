"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";

/** WhatsApp glyph — lucide has no brand icons, so this is inlined. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path
        fillRule="evenodd"
        d="M12.04 2C6.55 2 2.1 6.45 2.1 11.93c0 1.76.46 3.47 1.34 4.98L2 22.05l5.28-1.38a9.9 9.9 0 0 0 4.75 1.21h.01c5.48 0 9.93-4.45 9.93-9.93a9.87 9.87 0 0 0-2.9-7.02A9.87 9.87 0 0 0 12.04 2Zm0 18.13h-.01a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.55 3.71-8.26 8.27-8.26a8.2 8.2 0 0 1 5.83 2.42 8.2 8.2 0 0 1 2.42 5.84c0 4.56-3.71 8.25-8.26 8.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
        >
          <motion.a
            href="https://wa.me/918272891238"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0d0d15]/90 py-3 pl-3.5 pr-4 text-[13.5px] font-semibold text-white shadow-[0_10px_35px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors hover:border-[#25D366]/50"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
            Chat on WhatsApp
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="group flex items-center gap-2 rounded-full bg-primary-deep py-3 pl-5 pr-4 text-[13.5px] font-semibold text-white shadow-[0_0_28px_-8px_rgba(124,92,255,0.95)] transition-colors hover:bg-primary"
          >
            Start a Project
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.2}
            />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
