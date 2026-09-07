/** Original line icons, 20px grid, 1.6 stroke — drawn, not imported. */
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const HomeIcon = () => (
  <svg {...base}>
    <path d="M3 8.5 10 3l7 5.5V16a1 1 0 0 1-1 1h-3v-5H7v5H4a1 1 0 0 1-1-1z" />
  </svg>
);

export const WorkIcon = () => (
  <svg {...base}>
    <rect x="2.5" y="5.5" width="11" height="9" rx="2" />
    <path d="M6 5.5V4.2a1.2 1.2 0 0 1 1.2-1.2h8.6A1.2 1.2 0 0 1 17 4.2v8.6a1.2 1.2 0 0 1-1.2 1.2H14" />
  </svg>
);

export const SparkIcon = () => (
  <svg {...base}>
    <path d="M10 2.6 11.7 7l4.7 1.6-4.7 1.7L10 15l-1.7-4.7L3.6 8.6 8.3 7z" />
    <path d="M15.6 13.4 16.3 15l1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7z" />
  </svg>
);

export const PriceIcon = () => (
  <svg {...base}>
    <circle cx="10" cy="10" r="7.2" />
    <path d="M12.2 7.4c-.5-.8-1.3-1.2-2.3-1.2-1.3 0-2.2.6-2.2 1.6 0 2.3 4.6 1 4.6 3.3 0 1.1-1 1.7-2.4 1.7-1.1 0-2-.4-2.5-1.2M10 5v10" />
  </svg>
);

export const CareerIcon = () => (
  <svg {...base}>
    <rect x="2.6" y="6" width="14.8" height="10" rx="2" />
    <path d="M7.4 6V4.8A1.8 1.8 0 0 1 9.2 3h1.6a1.8 1.8 0 0 1 1.8 1.8V6M2.6 10.4h14.8" />
  </svg>
);

export const ArrowIcon = () => (
  <svg {...base} width="18" height="18" viewBox="0 0 18 18">
    <path d="M3.5 9h11M10 4.5 14.5 9 10 13.5" />
  </svg>
);

export const CheckIcon = () => (
  <svg {...base} width="18" height="18" viewBox="0 0 18 18" strokeWidth={2}>
    <path d="M3.5 9.5 7 13l7.5-8" />
  </svg>
);

export const ClockIcon = () => (
  <svg {...base} width="15" height="15" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="7.4" />
    <path d="M10 5.6V10l2.9 1.9" />
  </svg>
);

/** Call: a video tile. Message: a paper plane. Drawn, not brand marks. */
/* `mono` for use on an accent fill, where the colour icon goes muddy. */
export const CallIcon = ({ mono = false }: { mono?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <rect
      x="2"
      y="5"
      width="12.5"
      height="12"
      rx="3.2"
      fill={mono ? "var(--color-ink)" : "var(--color-sky)"}
    />
    <path
      d="M14.5 9.6l4.2-2.6a.7.7 0 0 1 1.1.6v6.8a.7.7 0 0 1-1.1.6l-4.2-2.6z"
      fill={mono ? "var(--color-ink)" : "var(--color-mint)"}
    />
  </svg>
);

export const MessageIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="9" fill="var(--color-grape)" />
    <path d="M6 11.2 15.6 7l-2.1 9.2-3-2.6-1.6 2.1-.3-3.2z" fill="#fff" />
    <path d="M8.6 12.5 15.6 7l-6.2 6.6z" fill="#f3e8ff" />
  </svg>
);

/** The studio mark: a plumb bob. */
export const Mark = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 26 26" fill="none" aria-hidden="true">
    <path d="M13 2v6.4" stroke="var(--color-ink)" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M13 7.6 19.4 13 13 24 6.6 13z" fill="var(--color-coral)" />
    <path d="M13 7.6 19.4 13 13 15.5z" fill="var(--color-sun)" />
    <path d="M6.6 13h12.8" stroke="var(--color-ink)" strokeOpacity=".3" strokeWidth="1.2" />
  </svg>
);
