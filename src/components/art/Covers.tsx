/**
 * Original artwork. The project covers went with the work carousel; the
 * signature below is still used by the closing note.
 */

/** A drawn signature rather than a stock headshot. */
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
        stroke="var(--color-accent)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
