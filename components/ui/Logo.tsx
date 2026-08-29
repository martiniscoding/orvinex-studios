import Image from "next/image";

import markSrc from "@/public/logo-mark.png";

type LogoProps = {
  className?: string;
  markSize?: number;
  showWordmark?: boolean;
};

/**
 * Official Orvinex lockup: the spiral mark alongside the wordmark.
 *
 * `logo-mark.png` is the mark cropped out of `logo.png` and given a real
 * alpha channel — the original ships on opaque black, which would read as a
 * square patch against the site's near-black background.
 */
export function Logo({
  className = "",
  markSize = 30,
  showWordmark = true,
}: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={markSrc}
        alt=""
        aria-hidden="true"
        width={markSize}
        height={markSize}
        priority
        className="shrink-0 select-none drop-shadow-[0_0_10px_rgba(124,92,255,0.5)]"
        style={{ width: markSize, height: markSize }}
      />
      {showWordmark && (
        <span className="font-display text-[19px] font-bold tracking-tight text-white">
          Orvinex
        </span>
      )}
    </span>
  );
}
