/**
 * Original artwork for the pinned collage (5.7). Drawn here rather than
 * sourced: the studio has no photography, and stock would undercut the point.
 * Everything is drafting-board vocabulary — guides, ticks, callouts.
 */
import type { JSX } from "react";

const S = {
  ink: "var(--color-ink)",
  slate: "var(--color-muted)",
  brass: "var(--color-lime-deep)",
  oxide: "var(--color-sky-deep)",
  chalk: "#ffffff",
  paper: "var(--color-hush)",
};

function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 320 220" className="block h-auto w-full" role="presentation">
      <rect width="320" height="220" fill={S.chalk} />
      <g stroke={S.ink} strokeOpacity="0.07" strokeWidth="1">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 27.5} x2="320" y2={(i + 1) * 27.5} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 32} y1="0" x2={(i + 1) * 32} y2="220" />
        ))}
      </g>
      {children}
    </svg>
  );
}

function Bob({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <line x1="0" y1="-18" x2="0" y2="0" stroke={S.ink} strokeWidth="1" />
      <path d="M0 0 L9 11 L0 32 L-9 11 Z" fill={S.brass} />
      <path d="M-9 11 L9 11" stroke={S.ink} strokeOpacity="0.35" strokeWidth="1" />
    </g>
  );
}

const brand = (
  <Sheet>
    <Bob x={62} y={54} s={1.5} />
    <Bob x={128} y={72} s={0.9} />
    <Bob x={168} y={78} s={0.55} />
    <rect x="40" y="150" width="106" height="9" fill={S.ink} />
    <rect x="152" y="150" width="46" height="9" fill={S.ink} opacity="0.35" />
    <g>
      {[S.ink, S.brass, S.oxide, S.slate, S.paper].map((c, i) => (
        <rect key={i} x={40 + i * 26} y={174} width="20" height="20" fill={c} />
      ))}
    </g>
    <line x1="228" y1="36" x2="228" y2="194" stroke={S.brass} strokeWidth="1" strokeDasharray="3 4" />
    <text x="236" y="44" fontSize="8" fill={S.slate} fontFamily="var(--font-sans)" letterSpacing="1.4">
      MARK
    </text>
    <text x="236" y="158" fontSize="8" fill={S.slate} fontFamily="var(--font-sans)" letterSpacing="1.4">
      WORD
    </text>
    <text x="236" y="188" fontSize="8" fill={S.slate} fontFamily="var(--font-sans)" letterSpacing="1.4">
      PALETTE
    </text>
  </Sheet>
);

const ui = (
  <Sheet>
    <rect x="24" y="26" width="272" height="168" fill={S.paper} />
    <rect x="24" y="26" width="66" height="168" fill={S.ink} />
    <rect x="24" y="26" width="272" height="20" fill={S.ink} opacity="0.9" />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x="34" y={60 + i * 16} width={i === 1 ? 44 : 34} height="5" fill={S.chalk} opacity={i === 1 ? 1 : 0.4} />
    ))}
    <rect x="102" y="58" width="80" height="7" fill={S.ink} />
    <g>
      {[26, 44, 33, 58, 40, 66, 51].map((h, i) => (
        <rect key={i} x={102 + i * 16} y={150 - h} width="10" height={h} fill={i === 5 ? S.brass : S.ink} opacity={i === 5 ? 1 : 0.25} />
      ))}
    </g>
    <line x1="102" y1="150" x2="284" y2="150" stroke={S.ink} strokeOpacity="0.35" strokeWidth="1" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x="102" y={162 + i * 10} width={140 - i * 26} height="4" fill={S.slate} opacity="0.4" />
    ))}
    <rect x="228" y="56" width="56" height="16" fill={S.oxide} />
  </Sheet>
);

const icons = (
  <Sheet>
    <g stroke={S.ink} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(48 46)">
        <rect x="0" y="0" width="18" height="18" rx="2" />
        <path d="M4 9 h10 M9 4 v10" />
      </g>
      <g transform="translate(112 46)">
        <circle cx="9" cy="9" r="9" />
        <path d="M9 3 v6 l4 3" />
      </g>
      <g transform="translate(176 46)">
        <path d="M0 14 L6 4 L11 11 L18 0" />
      </g>
      <g transform="translate(240 46)">
        <path d="M2 4 h14 M2 9 h14 M2 14 h8" />
      </g>
      <g transform="translate(48 110)">
        <path d="M9 0 L18 6 v10 L9 20 L0 16 V6 Z" />
      </g>
      <g transform="translate(112 110)">
        <rect x="0" y="3" width="18" height="13" rx="6.5" />
        <circle cx="12" cy="9.5" r="3.4" fill={S.brass} stroke="none" />
      </g>
      <g transform="translate(176 110)">
        <path d="M0 10 h18 M13 5 l5 5 l-5 5" />
      </g>
      <g transform="translate(240 110)">
        <path d="M9 1 v18 M1 9 h16" />
        <circle cx="9" cy="9" r="8.5" strokeOpacity="0.35" />
      </g>
    </g>
    <g stroke={S.brass} strokeWidth="0.75" strokeDasharray="2 3" opacity="0.8">
      <line x1="40" y1="38" x2="284" y2="38" />
      <line x1="40" y1="74" x2="284" y2="74" />
      <line x1="40" y1="102" x2="284" y2="102" />
      <line x1="40" y1="138" x2="284" y2="138" />
    </g>
    <text x="40" y="176" fontSize="8" fill={S.slate} fontFamily="var(--font-sans)" letterSpacing="1.4">
      1.6PT STROKE — 20PX GRID
    </text>
  </Sheet>
);

const system = (
  <Sheet>
    {[
      ["--ink", S.ink],
      ["--brass", S.brass],
      ["--oxide", S.oxide],
      ["--slate", S.slate],
    ].map(([label, c], i) => (
      <g key={label as string} transform={`translate(34 ${36 + i * 26})`}>
        <rect width="18" height="18" fill={c as string} />
        <rect x="26" y="6" width="62" height="6" fill={S.ink} opacity="0.22" />
      </g>
    ))}
    <g transform="translate(150 34)">
      <rect width="136" height="22" fill={S.ink} />
      <rect y="30" width="136" height="22" fill="none" stroke={S.ink} strokeWidth="1" />
      <rect y="60" width="66" height="22" fill={S.oxide} />
      <rect x="74" y="60" width="62" height="22" fill={S.paper} />
      <rect y="90" width="136" height="1" fill={S.ink} opacity="0.2" />
      <rect y="98" width="96" height="8" fill={S.slate} opacity="0.35" />
      <rect y="112" width="120" height="8" fill={S.slate} opacity="0.2" />
    </g>
    <text x="34" y="160" fontSize="8" fill={S.slate} fontFamily="var(--font-sans)" letterSpacing="1.4">
      TOKENS
    </text>
    <text x="34" y="178" fontSize="8" fill={S.slate} fontFamily="var(--font-sans)" letterSpacing="1.4">
      → NPM
    </text>
    <line x1="34" y1="188" x2="286" y2="188" stroke={S.brass} strokeWidth="1" />
  </Sheet>
);

const site = (
  <Sheet>
    <rect x="30" y="24" width="260" height="14" fill={S.ink} opacity="0.85" />
    <rect x="30" y="56" width="196" height="14" fill={S.ink} />
    <rect x="30" y="78" width="150" height="14" fill={S.ink} />
    <rect x="30" y="100" width="118" height="14" fill={S.ink} opacity="0.3" />
    <rect x="30" y="130" width="76" height="20" fill={S.brass} />
    <rect x="114" y="130" width="62" height="20" fill="none" stroke={S.ink} strokeWidth="1" />
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${30 + i * 88} 166)`}>
        <rect width="72" height="30" fill={S.paper} />
        <rect x="8" y="9" width="40" height="5" fill={S.ink} opacity="0.4" />
        <rect x="8" y="19" width="54" height="4" fill={S.ink} opacity="0.18" />
      </g>
    ))}
    <line x1="240" y1="56" x2="240" y2="114" stroke={S.oxide} strokeWidth="1" />
    <path d="M236 56 h8 M236 114 h8" stroke={S.oxide} strokeWidth="1" />
    <text x="248" y="88" fontSize="8" fill={S.oxide} fontFamily="var(--font-sans)" letterSpacing="1.2">
      H1
    </text>
  </Sheet>
);

export const frameArt: Record<string, JSX.Element> = { brand, ui, icons, system, site };
