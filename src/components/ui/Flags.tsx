import type { ReactNode } from "react";

/** A five-point star centred on (cx, cy), pointing up and turned by `rot` degrees. */
function star(cx: number, cy: number, r: number, rot = 0) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = ((i * 36 - 90 + rot) * Math.PI) / 180;
    const d = i % 2 ? r * 0.382 : r;
    return `${(cx + d * Math.cos(a)).toFixed(2)},${(cy + d * Math.sin(a)).toFixed(2)}`;
  });
  return pts.join(" ");
}

/* Each flag is drawn on a 20×20 square and clipped to a circle. */
const flags = {
  de: {
    name: "Germany",
    art: (
      <>
        <rect width="20" height="7" fill="#000" />
        <rect y="6.67" width="20" height="6.67" fill="#dd0000" />
        <rect y="13.33" width="20" height="6.67" fill="#ffce00" />
      </>
    ),
  },
  fi: {
    name: "Finland",
    art: (
      <>
        <rect width="20" height="20" fill="#fff" />
        <rect x="5.5" width="3.6" height="20" fill="#002f6c" />
        <rect y="8.2" width="20" height="3.6" fill="#002f6c" />
      </>
    ),
  },
  cn: {
    name: "China",
    art: (
      <>
        <rect width="20" height="20" fill="#ee1c25" />
        <polygon points={star(6.5, 7, 3.4)} fill="#ffff00" />
        <polygon points={star(11.2, 3.6, 1, 23)} fill="#ffff00" />
        <polygon points={star(13, 5.8, 1, 45)} fill="#ffff00" />
        <polygon points={star(13, 8.8, 1, 0)} fill="#ffff00" />
        <polygon points={star(11.2, 11, 1, 23)} fill="#ffff00" />
      </>
    ),
  },
  in: {
    name: "India",
    art: (
      <>
        <rect width="20" height="7" fill="#ff9933" />
        <rect y="6.67" width="20" height="6.67" fill="#fff" />
        <rect y="13.33" width="20" height="6.67" fill="#138808" />
        <circle cx="10" cy="10" r="2.3" fill="none" stroke="#000080" strokeWidth="0.7" />
        <circle cx="10" cy="10" r="0.6" fill="#000080" />
      </>
    ),
  },
} satisfies Record<string, { name: string; art: ReactNode }>;

export type Country = keyof typeof flags;

/** A small round flag. `size` is the diameter in pixels. */
export function Flag({ country, size = 18, className = "" }: { country: Country; size?: number; className?: string }) {
  const { name, art } = flags[country];
  const clip = `flag-${country}`;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" role="img" aria-label={name} className={className}>
      <clipPath id={clip}>
        <circle cx="10" cy="10" r="10" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>{art}</g>
    </svg>
  );
}
