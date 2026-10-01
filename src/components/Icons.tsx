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

export const LayersIcon = () => (
  <svg {...base}>
    <path d="M10 2.8 17.2 6.6 10 10.4 2.8 6.6z" />
    <path d="M2.8 10 10 13.8 17.2 10M2.8 13.4 10 17.2l7.2-3.8" />
  </svg>
);

export const ShieldIcon = () => (
  <svg {...base}>
    <path d="M10 2.6 16 5v4.6c0 3.7-2.5 6.5-6 7.8-3.5-1.3-6-4.1-6-7.8V5z" />
    <path d="M7.4 10.1 9.3 12l3.4-3.8" />
  </svg>
);

export const BoltIcon = () => (
  <svg {...base}>
    <path d="M11.2 2.6 4.6 11.2h5l-1 6.2 6.8-8.8h-5z" />
  </svg>
);

/** Call: a video tile. Message: a paper plane. Drawn, not brand marks. */
/**
 * The Google Meet mark. Used nominatively — it labels a link that opens a
 * Meet call, the way a Slack or GitHub icon labels a link to those. If the
 * booking flow ever stops creating Meet links, this icon has to go.
 */
export const CallIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={(size * 72) / 87}
    viewBox="0 0 87 72"
    fill="none"
    aria-hidden="true"
  >
    <path fill="#00832d" d="M49.5 36l8.53 9.75 11.47 7.33 2-17.02-2-16.64-11.69 6.44z" />
    <path fill="#0066da" d="M0 51.5V66c0 3.315 2.685 6 6 6h14.5l3-10.96-3-9.54-9.95-3z" />
    <path fill="#e94235" d="M20.5 0L0 20.5l10.55 3 9.95-3 2.95-9.41z" />
    <path fill="#2684fc" d="M20.5 20.5H0v31h20.5z" />
    <path
      fill="#00ac47"
      d="M82.6 8.68L69.5 19.42v33.66l13.16 10.79c1.97 1.54 4.85.13 4.85-2.37V11c0-2.53-2.95-3.92-4.91-2.32zM49.5 36v15.5h-29V72h43c3.315 0 6-2.685 6-6V53.08z"
    />
    <path fill="#ffba00" d="M63.5 0h-43v20.5h29V36l20-16.57V6c0-3.315-2.685-6-6-6z" />
  </svg>
);

export const MessageIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="9" fill="var(--color-ink)" />
    <path d="M6 11.2 15.6 7l-2.1 9.2-3-2.6-1.6 2.1-.3-3.2z" fill="#fff" />
    <path d="M8.6 12.5 15.6 7l-6.2 6.6z" fill="#c9cdd6" />
  </svg>
);

/** The Orvinex mark, on a transparent background so it sits straight on any
    light surface. On dark panels it sits on a white tile so the dark strokes
    stay visible. */
export const Mark = ({ size = 26, light = false }: { size?: number; light?: boolean }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/logo.png"
    alt=""
    aria-hidden="true"
    width={size}
    height={size}
    className={`shrink-0 ${light ? "rounded-md bg-white p-0.5" : ""}`}
    style={{ width: size, height: size }}
  />
);
