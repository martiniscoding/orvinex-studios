/**
 * Original cover artwork for the work section (5.10). Each is an abstraction
 * of what the product does, drawn in the studio palette.
 */
import type { JSX } from "react";

const S = {
  ink: "var(--color-ink)",
  slate: "var(--color-slate)",
  brass: "var(--color-brass)",
  oxide: "var(--color-oxide)",
  chalk: "var(--color-chalk)",
  paper: "var(--color-paper-deep)",
};

function Plate({ children, bg = S.chalk }: { children: React.ReactNode; bg?: string }) {
  return (
    <svg viewBox="0 0 480 300" className="block h-auto w-full" role="presentation">
      <rect width="480" height="300" fill={bg} />
      {children}
    </svg>
  );
}

/** Ravel — CI runs as stacked, overlapping timelines. */
const ravel = (
  <Plate>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i} transform={`translate(60 ${58 + i * 32})`}>
        <line x1="0" y1="6" x2="360" y2="6" stroke={S.ink} strokeOpacity="0.12" strokeWidth="1" />
        <rect x={i * 26} y="0" width={120 + (i % 3) * 60} height="12" fill={i === 3 ? S.brass : S.ink} opacity={i === 3 ? 1 : 0.75 - i * 0.09} />
      </g>
    ))}
    <line x1="186" y1="40" x2="186" y2="256" stroke={S.oxide} strokeWidth="1" strokeDasharray="4 4" />
    <circle cx="186" cy="154" r="5" fill={S.oxide} />
  </Plate>
);

/** Ledgerpost — two ledgers, tied together by arcs. */
const ledgerpost = (
  <Plate bg={S.ink}>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <g key={i}>
        <rect x="56" y={54 + i * 28} width="120" height="10" fill={S.chalk} opacity={0.18 + (i % 3) * 0.14} />
        <rect x="304" y={54 + i * 28} width="120" height="10" fill={S.chalk} opacity={0.18 + ((i + 2) % 3) * 0.14} />
      </g>
    ))}
    {[0, 2, 4].map((i) => (
      <path
        key={i}
        d={`M176 ${59 + i * 28} C 230 ${59 + i * 28}, 250 ${59 + (i + 1) * 28}, 304 ${59 + (i + 1) * 28}`}
        fill="none"
        stroke={S.brass}
        strokeWidth="1.5"
      />
    ))}
  </Plate>
);

/** Bracket — flag states, half on, half off. */
const bracket = (
  <Plate>
    {Array.from({ length: 12 }, (_, i) => {
      const on = [1, 3, 4, 7, 10].includes(i);
      return (
        <g key={i} transform={`translate(${64 + (i % 4) * 96} ${70 + Math.floor(i / 4) * 68})`}>
          <rect width="60" height="28" rx="14" fill={on ? S.oxide : "none"} stroke={S.ink} strokeOpacity={on ? 0 : 0.35} strokeWidth="1" />
          <circle cx={on ? 44 : 16} cy="14" r="9" fill={on ? S.chalk : S.ink} opacity={on ? 1 : 0.55} />
        </g>
      );
    })}
    <path d="M40 46 h-12 v208 h12" fill="none" stroke={S.brass} strokeWidth="2" />
    <path d="M440 46 h12 v208 h-12" fill="none" stroke={S.brass} strokeWidth="2" />
  </Plate>
);

/** Northbound — flow lines converging on one heading. */
const northbound = (
  <Plate bg={S.paper}>
    {[0, 1, 2, 3, 4].map((i) => (
      <path
        key={i}
        d={`M40 ${70 + i * 40} C 180 ${70 + i * 40}, 250 150, 400 150`}
        fill="none"
        stroke={S.ink}
        strokeOpacity={0.16 + i * 0.04}
        strokeWidth="1.5"
      />
    ))}
    <path d="M400 150 h-18" stroke={S.brass} strokeWidth="2" />
    <path d="M398 142 l14 8 l-14 8 z" fill={S.brass} />
    <g transform="translate(96 40)">
      <line x1="0" y1="0" x2="0" y2="18" stroke={S.oxide} strokeWidth="1" />
      <path d="M0 18 L7 27 L0 44 L-7 27 Z" fill={S.oxide} />
    </g>
  </Plate>
);

export const coverArt: Record<string, JSX.Element> = {
  ravel,
  ledgerpost,
  bracket,
  northbound,
};

/** 5.13 — a drawn signature rather than a stock headshot. */
export function Signature({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 285 72" className={className} role="img" aria-label="Theo Ansell, signed">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Theo */}
        <path d="M14 24 C 34 16, 56 15, 76 18" />
        <path d="M48 12 C 42 32, 40 48, 46 55 C 51 61, 59 55, 63 47" />
        <path d="M70 13 C 68 32, 68 48, 71 57" />
        <path d="M71 41 C 76 33, 87 32, 87 43 C 87 50, 86 53, 86 57" />
        <path d="M93 49 C 101 48, 108 45, 106 40 C 104 36, 95 38, 93 45 C 91 53, 101 58, 109 52" />
        <path d="M120 40 C 128 36, 134 40, 133 46 C 132 54, 121 57, 117 50 C 114 45, 118 40, 124 39" />
        {/* Ansell */}
        <path d="M152 58 C 159 38, 167 19, 171 19 C 175 19, 181 39, 186 58" />
        <path d="M159 46 L181 46" />
        <path d="M193 58 C 191 48, 193 39, 198 38 C 203 37, 205 47, 205 58" />
        <path d="M214 53 C 221 52, 226 48, 224 44 C 222 41, 214 43, 214 48 C 214 54, 222 56, 227 52" />
        <path d="M234 51 C 241 50, 247 47, 245 42 C 243 38, 235 40, 234 47 C 233 54, 241 58, 248 53" />
        <path d="M256 16 C 253 34, 253 49, 257 57" />
        <path d="M265 16 C 262 34, 262 49, 270 56" />
      </g>
      <path
        d="M14 66 C 92 60, 186 62, 262 67"
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
