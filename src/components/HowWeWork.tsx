/**
 * HowWeWork — a self-contained "how we work" bento section.
 * ---------------------------------------------------------------------------
 * Drop this one file into any React 18+ project. It needs nothing else:
 * no Tailwind, no design tokens, no CSS import, no other components. Every
 * illustration is inline SVG, so there are no image assets and it stays
 * crisp at any size, and every animation is CSS, so there is no JS on the
 * client (it works as a React Server Component as-is).
 *
 * USE
 *   import HowWeWork from "./HowWeWork";
 *   <HowWeWork />                        // ships with placeholder copy
 *   <HowWeWork content={myContent} />    // see HowWeWorkContent below
 *
 * RECOLOUR
 *   Set any of the --hww-* custom properties on the section or a parent:
 *   <HowWeWork style={{ "--hww-accent": "#f4511e" }} />
 *   The brand colours of the tool marks (Slack, Figma, Google…) are left
 *   alone on purpose — those are other people's logos.
 *
 * LAYOUT
 *   Three columns that split their height differently, so the tiles vary in
 *   size while every column starts and ends on the same line. The grid keeps
 *   one aspect ratio, so the cards scale together instead of reflowing.
 *   Under 1024px it collapses to a single stack.
 *
 * BEHAVIOUR
 *   Each card is a small hover scene. It is gated behind `@media (hover:hover)`
 *   so nothing is left half-played on a touch screen, and the whole thing is
 *   switched off for `prefers-reduced-motion`. The resting state is the
 *   finished composition — the motion only ever adds.
 *
 * SWAPPING THE TOOL TILES
 *   Edit the `tools` array. `col`/`row` is the resting cell, `to` is the cell
 *   it slides to on hover; keep the six destinations distinct so none collide.
 * ---------------------------------------------------------------------------
 */
import type { CSSProperties, ReactNode } from "react";

/* ===========================================================================
   Content
   ======================================================================== */

export type CardId =
  | "collab"
  | "updates"
  | "handoff"
  | "tools"
  | "support"
  | "proven"
  | "nocode";

export type HowWeWorkContent = {
  /** Rendered as: `${headingLead} <accent>${headingAccent}</accent> ${headingTail}` */
  headingLead: string;
  headingAccent: string;
  headingTail: string;
  intro: string;
  /** Shown in the Proven Experience card as "<projects> Projects". */
  projects: string;
  /** One entry per card. The ids are fixed — each has its own illustration. */
  cards: { id: CardId; title: string; body: string; featured?: boolean }[];
};

export const defaultContent: HowWeWorkContent = {
  headingLead: "Design Decisions Grounded In",
  headingAccent: "Business",
  headingTail: "Impact",
  intro:
    "A transparent process, developer-ready systems, and direct collaboration — so ideas move smoothly from concept to shipped product.",
  projects: "50+",
  cards: [
    {
      id: "collab",
      title: "Design Directly with Designers",
      body: "You work directly with designers, no handoffs, no middle layers, no delays.",
    },
    {
      id: "updates",
      title: "Real-Time Project Updates",
      body: "You get clear, real-time progress with regular updates and shared visibility.",
    },
    {
      id: "handoff",
      title: "Built for Seamless Execution",
      body: "Every design is structured, documented, and ready for smooth development handoff.",
      featured: true,
    },
    {
      id: "tools",
      title: "Industry-Leading Design Tools",
      body: "We design with modern, industry-leading tools trusted by high-performing teams.",
    },
    {
      id: "support",
      title: "Ongoing & Dependable Support",
      body: "We stay involved after delivery to support iterations, fixes, and future needs.",
    },
    {
      id: "proven",
      title: "Proven Experience",
      body: "We've delivered 50+ projects for startups and growing products across industries.",
    },
    {
      id: "nocode",
      title: "No-Code Development",
      body: "We use no-code and low-code tools to ship faster without sacrificing scalability.",
    },
  ],
};

/* ===========================================================================
   Styles — everything the section needs, scoped behind `.hww`
   ======================================================================== */

const CSS = `
.hww {
  --hww-accent: var(--color-accent, #b8321f);
  --hww-ink: #1e2430;
  --hww-muted: #575f6d;
  --hww-card: #ffffff;
  --hww-line: #eceae6;
  --hww-bar: #e7e5e1;
  --hww-fill: #f5f4f1;
  --hww-grey: #d3d0cb;
  --hww-tile: #191d24;
  --hww-featured: #b9a8ea;
  --hww-radius: 22px;
  --hww-gap: 14px;
  --hww-ease: cubic-bezier(0.22, 1, 0.36, 1);
  color: var(--hww-ink);
}
.hww *, .hww *::before, .hww *::after { box-sizing: border-box; }

/* --- heading row --- */
.hww-head { display: flex; flex-direction: column; gap: 20px; }
.hww-title {
  margin: 0;
  max-width: 20ch;
  font-size: clamp(1.75rem, 3.2vw, 2.5rem);
  line-height: 1.14;
  font-weight: 600;
  letter-spacing: -0.035em;
}
.hww-title span { color: var(--hww-accent); }
.hww-intro {
  margin: 0;
  max-width: 40ch;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--hww-muted);
}

/* --- the bento --- */
.hww-grid { display: grid; gap: var(--hww-gap); margin-top: 40px; }
.hww-col { display: grid; gap: var(--hww-gap); }

.hww-card {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  padding: 20px;
  border: 1px solid var(--hww-line);
  border-radius: var(--hww-radius);
  background: var(--hww-card);
  box-shadow: 0 1px 2px rgba(30, 36, 48, 0.04), 0 16px 36px -28px rgba(30, 36, 48, 0.4);
  transition: box-shadow 0.5s var(--hww-ease);
}
.hww-card--featured { border: 1.5px solid var(--hww-featured); }
.hww-card h3 {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: -0.015em;
}
.hww-card p {
  margin: 6px 0 0;
  max-width: 44ch;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--hww-muted);
}

/* Stacked, each card reserves the height its own artwork needs. */
.hww-art { position: relative; flex: 1; margin-top: 20px; min-height: 140px; }
.hww-art svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hww-art[data-art="collab"] { min-height: 235px; }
.hww-art[data-art="tools"] { min-height: 300px; }
.hww-art[data-art="handoff"] { min-height: 375px; }

@media (min-width: 1024px) {
  .hww-head {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 48px;
  }
  .hww-intro { padding-top: 8px; text-align: right; }
  .hww-grid { grid-template-columns: repeat(3, 1fr); aspect-ratio: 1505 / 1260; }
  .hww-col[data-col="1"] { grid-template-rows: 560fr 680fr; }
  .hww-col[data-col="2"] { grid-template-rows: 417fr 410fr 410fr; }
  .hww-col[data-col="3"] { grid-template-rows: 838fr 410fr; }
  .hww-card { padding: 24px; }
  .hww-art,
  .hww-art[data-art="collab"],
  .hww-art[data-art="tools"],
  .hww-art[data-art="handoff"] { min-height: 0; }
}

/* --- the hover scene ---
   Parts carry their own offset, delay and target colour as custom
   properties, so a move is one number in the markup rather than a rule. */
.hww-card .hww-drift {
  transform: rotate(var(--r0, 0deg));
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.75s var(--hww-ease);
  transition-delay: var(--delay, 0ms);
}
.hww-card .hww-fade-out { transition: opacity 0.5s var(--hww-ease); }
.hww-card .hww-fade-in {
  opacity: 0;
  transition: opacity 0.5s var(--hww-ease);
  transition-delay: var(--delay, 0ms);
}
.hww-card .hww-swap-fill { transition: fill 0.6s var(--hww-ease); }
.hww-card .hww-swap-stroke { transition: stroke 0.5s var(--hww-ease); }
.hww-card .hww-wire { opacity: 0; transition: opacity 0.4s var(--hww-ease); }

@media (hover: hover) {
  .hww-card:hover {
    box-shadow: 0 1px 2px rgba(30, 36, 48, 0.05), 0 26px 50px -30px rgba(30, 36, 48, 0.5);
  }
  .hww-card:hover .hww-drift {
    transform: translate(var(--dx, 0px), var(--dy, 0px)) rotate(var(--dr, 0deg));
  }
  .hww-card:hover .hww-fade-out { opacity: 0; }
  .hww-card:hover .hww-fade-in { opacity: 1; }
  .hww-card:hover .hww-swap-fill { fill: var(--to-fill); }
  .hww-card:hover .hww-swap-stroke { stroke: var(--hww-accent); }
  .hww-card:hover .hww-wire {
    opacity: 1;
    animation: hww-flow 0.9s linear infinite;
    animation-delay: var(--delay, 0ms);
  }
}

@keyframes hww-flow { to { stroke-dashoffset: -22; } }

@media (prefers-reduced-motion: reduce) {
  .hww *, .hww *::before, .hww *::after {
    transition-duration: 0.001ms !important;
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;

/* ===========================================================================
   Ink
   ======================================================================== */

const INK = "var(--hww-ink)";
const LINE = "var(--hww-line)";
const BAR = "var(--hww-bar)";
const FILL = "var(--hww-fill)";
const GREY = "var(--hww-grey)";
const TILE_INK = "var(--hww-tile)";
const ACCENT = "var(--hww-accent)";

/** Custom properties travel as inline styles, so the CSS above can read each
    part's own offset, delay and target colour. */
const vars = (o: Record<string, string | number>) => o as CSSProperties;

/* ===========================================================================
   Glyphs — each drawn in a 24×24 box
   ======================================================================== */

const glyphs = {
  framer: <path d="M4 0h16v8h-8zm0 8h16l-8 8H4zm0 8h8v8z" />,
  webflow: (
    <path d="M23 5.8l-5.9 12.4h-4.4l2.4-5.1h-.1c-1.6 2.5-4 4.3-7.2 5.1H2.3L8 5.8h4.4l-2.7 5.9h.1c1.7-2.4 3.4-4.3 4.4-5.9h4.1l-2.6 5.8h.1c1.6-2.4 3.3-4.3 4.3-5.8z" />
  ),
  slack: (
    <>
      <rect x="1" y="7.2" width="10" height="3.6" rx="1.8" />
      <rect x="13.4" y="1" width="3.6" height="10" rx="1.8" />
      <rect x="13" y="13.2" width="10" height="3.6" rx="1.8" />
      <rect x="7.2" y="13" width="3.6" height="10" rx="1.8" />
    </>
  ),
  discord: (
    <>
      <path d="M19.3 5.3A16 16 0 0015.4 4l-.5 1a14.6 14.6 0 00-5.8 0l-.5-1a16 16 0 00-3.9 1.3C2.2 9 1.4 12.6 1.8 16.1a16 16 0 004.8 2.4l1-1.7a10.4 10.4 0 01-1.6-.8l.4-.3a11.4 11.4 0 009.8 0l.4.3a10.4 10.4 0 01-1.6.8l1 1.7a16 16 0 004.8-2.4c.5-4.1-.7-7.6-2.5-10.8z" />
      <ellipse cx="9" cy="12.4" rx="1.5" ry="1.8" fill="#fff" />
      <ellipse cx="15" cy="12.4" rx="1.5" ry="1.8" fill="#fff" />
    </>
  ),
  camera: (
    <>
      <rect x="1.5" y="6" width="14" height="12" rx="3.5" />
      <path d="M16.8 11.2l5-3.1a.6.6 0 01.9.5v6.8a.6.6 0 01-.9.5l-5-3.1z" />
    </>
  ),
  google: (
    <path d="M12 10.1v4h5.6a4.9 4.9 0 01-5.6 3.6 5.7 5.7 0 110-11.4 5.3 5.3 0 013.6 1.4l2.8-2.8A9.4 9.4 0 0012 2.4a9.6 9.6 0 100 19.2c5.5 0 9.2-3.9 9.2-9.4 0-.7 0-1.4-.2-2.1z" />
  ),
  figma: (
    <>
      <path d="M4 4a4 4 0 014-4h4v8H8a4 4 0 01-4-4z" />
      <path d="M12 0h4a4 4 0 010 8h-4z" />
      <path d="M4 12a4 4 0 014-4h4v8H8a4 4 0 01-4-4z" />
      <circle cx="16" cy="12" r="4" />
      <path d="M4 20a4 4 0 014-4h4v4a4 4 0 11-8 0z" />
    </>
  ),
  /* A cube in isometric — the "component" mark in the updates graph. */
  cube: (
    <>
      <path
        d="M12 1.6l9.4 5.2v10.4L12 22.4 2.6 17.2V6.8z"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M2.8 6.9L12 12l9.2-5.1M12 12v10.2" fill="none" strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2l9 5-9 5-9-5z" />
      <path d="M3 12l9 5 9-5" fill="none" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 17l9 5 9-5" fill="none" strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="2" />
      <ellipse cx="12" cy="12" rx="4" ry="9.5" fill="none" strokeWidth="2" />
      <path d="M2.8 9h18.4M2.8 15h18.4" fill="none" strokeWidth="2" />
    </>
  ),
  growth: (
    <>
      <path
        d="M3 18.5L10 11l4 4 7.2-7.2"
        fill="none"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2 7.2h6.6v6.6"
        fill="none"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  /* The little frame that marks each no-code block. */
  box: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="none" strokeWidth="2.2" />
      <rect x="7.5" y="7.5" width="9" height="9" rx="1.6" fill="none" strokeWidth="2.2" />
    </>
  ),
  code: (
    <path
      d="M8.6 7.4L4 12l4.6 4.6M15.4 7.4L20 12l-4.6 4.6"
      fill="none"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  /* The hand dragging the Contact block. */
  hand: (
    <path d="M9 3a1.6 1.6 0 013.2 0v7h.6V4.6a1.6 1.6 0 013.2 0V11h.6V7.2a1.6 1.6 0 013.2 0v7.9c0 3.7-2.7 6.6-6.5 6.6-2.1 0-3.8-.8-5-2.2l-3.6-4.3a1.7 1.7 0 012.5-2.1L9 16.2z" />
  ),
};

type GlyphName = keyof typeof glyphs;

/* The colour each mark wakes up in when its card is hovered. Slack and Figma
   are drawn again below, since they are more than one colour. */
const glyphTint: Partial<Record<GlyphName, string>> = {
  discord: "#5865F2",
  camera: "#00AC47",
  framer: "#0055FF",
  webflow: "#146EF5",
  google: "#4285F4",
  cube: "#7C5CFF",
  globe: "#0ACF83",
  growth: "var(--hww-accent)",
  layers: "#E8A33D",
};

const glyphsColor: Partial<Record<GlyphName, ReactNode>> = {
  slack: (
    <>
      <rect x="1" y="7.2" width="10" height="3.6" rx="1.8" fill="#36C5F0" />
      <rect x="13.4" y="1" width="3.6" height="10" rx="1.8" fill="#2EB67D" />
      <rect x="13" y="13.2" width="10" height="3.6" rx="1.8" fill="#ECB22E" />
      <rect x="7.2" y="13" width="3.6" height="10" rx="1.8" fill="#E01E5A" />
    </>
  ),
  figma: (
    <>
      <path d="M4 4a4 4 0 014-4h4v8H8a4 4 0 01-4-4z" fill="#F24E1E" />
      <path d="M12 0h4a4 4 0 010 8h-4z" fill="#A259FF" />
      <path d="M4 12a4 4 0 014-4h4v8H8a4 4 0 01-4-4z" fill="#FF7262" />
      <circle cx="16" cy="12" r="4" fill="#1ABCFE" />
      <path d="M4 20a4 4 0 014-4h4v4a4 4 0 11-8 0z" fill="#0ACF83" />
    </>
  ),
};

/* ===========================================================================
   Small parts
   ======================================================================== */

/** Drops a glyph into place, scaled from its 24×24 box and centred on (x, y).
    Stroke is inherited so the outline-drawn glyphs survive, but switched off
    by width so the filled ones stay crisp. */
function Glyph({
  name,
  x,
  y,
  size = 24,
  fill = GREY,
  color = false,
  delay = 0,
}: {
  name: GlyphName;
  x: number;
  y: number;
  size?: number;
  fill?: string;
  /** Wake the mark into its own colour while the card is hovered. */
  color?: boolean;
  delay?: number;
}) {
  const s = size / 24;
  const tint = glyphTint[name];
  const lit = glyphsColor[name];
  const wakes = color && (tint !== undefined || lit !== undefined);
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) translate(-12 -12)`}>
      <g className={wakes ? "hww-fade-out" : undefined} fill={fill} stroke={fill} strokeWidth={0}>
        {glyphs[name]}
      </g>
      {wakes && (
        <g
          className="hww-fade-in"
          style={vars({ "--delay": `${delay}ms` })}
          fill={tint}
          stroke={tint}
          strokeWidth={0}
        >
          {lit ?? glyphs[name]}
        </g>
      )}
    </g>
  );
}

/** A white disc with a third-party glyph inside — a node of a diagram. */
function Chip({
  x,
  y,
  name,
  r = 22,
  delay = 0,
}: {
  x: number;
  y: number;
  name: GlyphName;
  r?: number;
  delay?: number;
}) {
  return (
    <g>
      <circle cx={x} cy={y + 1.5} r={r} fill={INK} opacity="0.05" />
      <circle cx={x} cy={y} r={r} fill="#fff" stroke={LINE} strokeWidth="1.4" />
      <Glyph name={name} x={x} y={y} size={r} color delay={delay} />
    </g>
  );
}

/** A connector that only exists on hover, with dots running along it. */
function Wire({ d, delay = 0 }: { d: string; delay?: number }) {
  return (
    <path
      className="hww-wire"
      style={vars({ "--delay": `${delay}ms` })}
      d={d}
      fill="none"
      stroke={ACCENT}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeDasharray="0.1 11"
    />
  );
}

/** The accent node every diagram points at, sitting in its soft halo. */
function Node({
  x,
  y,
  w,
  label,
  halo = 2,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  halo?: 1 | 2;
}) {
  const h = 30;
  return (
    <g>
      {halo === 2 && (
        <rect
          x={x - w / 2 - 33}
          y={y - 38}
          width={w + 66}
          height="76"
          rx="38"
          fill={ACCENT}
          opacity="0.07"
        />
      )}
      <rect
        x={x - w / 2 - 16}
        y={y - 25}
        width={w + 32}
        height="50"
        rx="25"
        fill={ACCENT}
        opacity="0.13"
      />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2} fill={ACCENT} />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="11.5"
        fontWeight="600"
        fill="#fff"
      >
        {label}
      </text>
    </g>
  );
}

/** A multiplayer cursor: the arrow lies back on its point at (x, y) with the
    name tag floating above it. */
function Cursor({
  x,
  y,
  label,
  tone = "ink",
  flip = false,
}: {
  x: number;
  y: number;
  label: string;
  tone?: "ink" | "accent";
  flip?: boolean;
}) {
  const fill = tone === "accent" ? ACCENT : INK;
  const w = label.length * 6.5 + 17;
  const tagX = flip ? -w - 2 : 18;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g transform="rotate(-58)">
        <path d="M0 0v16.4l4.1-3.8 2.7 5.7 3.1-1.4-2.7-5.4 5.1-.4z" fill={fill} />
      </g>
      <rect x={tagX} y="-27" width={w} height="20" rx="6" fill={fill} />
      <text x={tagX + w / 2} y="-16.4" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">
        {label}
      </text>
    </g>
  );
}

/** Skeleton text run. */
function Bar({
  x,
  y,
  w,
  h = 9,
  fill = BAR,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />;
}

/* ===========================================================================
   1. Design Directly with Designers
   Hover: the three tags glide apart a beat at a time, and the accent
   highlight slides down a line with the "You" cursor.
   ======================================================================== */

function Collab() {
  return (
    <svg viewBox="0 0 366 300" role="presentation">
      {/* The shared canvas, running off the right and bottom edges. */}
      <g>
        <rect x="91" y="4" width="266" height="330" rx="13" fill="#fff" stroke={LINE} strokeWidth="1.4" />
        <circle cx="122" cy="27" r="12" fill={BAR} />
        <Bar x={149} y={22} w={50} h={9} />
        <Bar x={211} y={22} w={41} h={9} />
        <circle cx="315" cy="27" r="6" fill={BAR} />
        <circle cx="336" cy="27" r="6" fill={BAR} />
        <path d="M91 50h266" stroke={LINE} strokeWidth="1.4" />
        <rect x="104" y="60" width="245" height="94" rx="9" fill={FILL} />
        <Bar x={190} y={76} w={125} />
        <Bar x={199} y={94} w={116} />
        <Bar x={224} y={112} w={91} />
        <rect x="104" y="166" width="95" height="62" rx="9" fill={FILL} />
        <rect x="207" y="166" width="95" height="62" rx="9" fill={FILL} />
        <rect x="310" y="166" width="95" height="62" rx="9" fill={FILL} />
        <rect x="104" y="240" width="95" height="62" rx="9" fill={FILL} />
        <rect x="207" y="240" width="95" height="62" rx="9" fill={FILL} />
        <rect x="310" y="240" width="95" height="62" rx="9" fill={FILL} />
      </g>

      {/* The client's own window, on top and clipped by the card. */}
      <g>
        <rect x="10" y="140" width="130" height="180" rx="13" fill="#fff" stroke={LINE} strokeWidth="1.4" />
        <circle cx="28" cy="160" r="9" fill={BAR} />
        <Bar x={43} y={156} w={44} h={9} />
        <path d="M10 180h130" stroke={LINE} strokeWidth="1.4" />
        <Bar x={24} y={212} w={74} />
        {/* The line "you" have selected, which follows your cursor down. */}
        <g className="hww-drift" style={vars({ "--dy": "18px" })}>
          <rect x="24" y="194" width="100" height="9" rx="4.5" fill={ACCENT} />
        </g>
        <rect x="24" y="230" width="100" height="46" rx="8" fill={FILL} />
        <Bar x={24} y={288} w={66} />
      </g>

      {/* Everyone moves at once, a beat apart. */}
      <g className="hww-drift" style={vars({ "--dx": "38px", "--dy": "-26px" })}>
        <Cursor x={214} y={124} label="Designer" />
      </g>
      <g className="hww-drift" style={vars({ "--dx": "10px", "--dy": "62px", "--delay": "90ms" })}>
        <Cursor x={24} y={148} label="You" tone="accent" />
      </g>
      <g className="hww-drift" style={vars({ "--dx": "82px", "--dy": "-24px", "--delay": "180ms" })}>
        <Cursor x={148} y={274} label="Designer" flip />
      </g>
    </svg>
  );
}

/* ===========================================================================
   2. Industry-Leading Design Tools
   Hover: the six tiles slide to new cells in sequence, and a hand appears.
   ======================================================================== */

const TILE = 88;
const X_STEP = 98;
const Y_STEP = 110;

type Tool = {
  col: number;
  row: number;
  /** The cell it slides to while the card is hovered. */
  to: [number, number];
  name: GlyphName | "ae" | "ai";
  accent?: boolean;
};

const tools: Tool[] = [
  { col: 0, row: 0, to: [0, 1], name: "framer" },
  { col: 1, row: 1, to: [2, 1], name: "cube" },
  { col: 3, row: 1, to: [3, 0], name: "webflow" },
  { col: 2, row: 2, to: [1, 2], name: "figma", accent: true },
  { col: 1, row: 3, to: [2, 3], name: "ae" },
  { col: 3, row: 3, to: [3, 2], name: "ai" },
];

function Tools() {
  return (
    <svg viewBox="0 0 382 418" role="presentation">
      <defs>
        <filter id="hww-tile-lift" x="-40%" y="-40%" width="180%" height="190%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#1e2430" floodOpacity="0.26" />
        </filter>
      </defs>

      {/* Every slot is laid down, including the ones under a tool, so a
          vacated cell still shows its empty tile once the set reshuffles. */}
      {Array.from({ length: 16 }, (_, i) => (
        <rect
          key={i}
          x={(i % 4) * X_STEP}
          y={Math.floor(i / 4) * Y_STEP}
          width={TILE}
          height={TILE}
          rx="18"
          fill={FILL}
        />
      ))}

      {/* The filled ones sit a touch proud of the grid and cast a shadow. */}
      {tools.map((t, i) => {
        const size = TILE + 8;
        const x = t.col * X_STEP - 4;
        const y = t.row * Y_STEP - 4;
        const cx = x + size / 2;
        const cy = y + size / 2;
        const style = vars({
          "--dx": `${(t.to[0] - t.col) * X_STEP}px`,
          "--dy": `${(t.to[1] - t.row) * Y_STEP}px`,
          "--delay": `${i * 60}ms`,
        });
        return (
          <g key={`${t.col}-${t.row}`} className="hww-drift" style={style} filter="url(#hww-tile-lift)">
            <rect x={x} y={y} width={size} height={size} rx="21" fill={t.accent ? ACCENT : TILE_INK} />
            {t.name === "ae" || t.name === "ai" ? (
              <text
                x={cx}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="30"
                fontWeight="700"
                letterSpacing="-0.02em"
                fill="#fff"
              >
                {t.name === "ae" ? "Ae" : "Ai"}
              </text>
            ) : (
              <Glyph name={t.name} x={cx} y={cy} size={t.name === "figma" ? 38 : 40} fill="#fff" />
            )}
          </g>
        );
      })}

      {/* The hand that just moved them. */}
      <g className="hww-fade-in" style={vars({ "--delay": "260ms" })}>
        <g className="hww-drift" style={vars({ "--dx": "-86px", "--dy": "-96px", "--delay": "260ms" })}>
          <Glyph name="hand" x={216} y={264} size={26} fill={INK} />
        </g>
      </g>
    </svg>
  );
}

/* ===========================================================================
   3. Real-Time Project Updates
   Hover: the tools wake into their own colours while dotted wires fire out
   from the pill to all of them at once.
   ======================================================================== */

function Updates() {
  return (
    <svg viewBox="0 0 340 162" role="presentation">
      {/* Two long runs pass through the node — in at the top left, out at the
          bottom right — with the tools floating free around them. */}
      <g fill="none" stroke={LINE} strokeWidth="1.6">
        <path d="M30 4v70q0 8 8 8h34" />
        <path d="M268 82h30q8 0 8 8v68" />
      </g>

      <Wire d="M172 58C176 44 180 32 184 26" />
      <Wire d="M110 74C94 66 76 56 66 48" />
      <Wire d="M230 68C236 56 242 42 246 36" />
      <Wire d="M230 96C238 108 246 120 250 126" />
      <Wire d="M110 92C94 102 76 114 66 120" />

      <Glyph name="slack" x={186} y={18} size={27} color />
      <Glyph name="discord" x={56} y={40} size={30} color />
      <Glyph name="framer" x={248} y={28} size={25} color />
      <Glyph name="camera" x={252} y={132} size={28} color />
      <Glyph name="cube" x={58} y={126} size={27} color />

      <Node x={170} y={82} w={128} label="Project Updates" />
    </svg>
  );
}

/* ===========================================================================
   4. Ongoing & Dependable Support
   Hover: the badges turn full colour together, the lines go accent, and
   dashes run back down them toward the pill.
   ======================================================================== */

function Support() {
  return (
    <svg viewBox="0 0 340 156" role="presentation">
      <g className="hww-swap-stroke" stroke={LINE} strokeWidth="1.6" fill="none">
        <path d="M68 46l46 26M68 112l46-26M272 46l-46 26M272 112l-46-26" />
      </g>
      {/* No stagger here: all four light up together. */}
      <Wire d="M114 72L68 46" />
      <Wire d="M114 86L68 112" />
      <Wire d="M226 72L272 46" />
      <Wire d="M226 86L272 112" />

      <Chip x={44} y={32} name="camera" />
      <Chip x={44} y={124} name="slack" />
      <Chip x={296} y={32} name="google" />
      <Chip x={296} y={124} name="figma" />
      <Node x={170} y={78} w={88} label="Support" halo={1} />
    </svg>
  );
}

/* ===========================================================================
   5. Proven Experience
   Hover: the three badges light up, and the stems beneath them turn accent.
   ======================================================================== */

function Proven({ projects }: { projects: string }) {
  return (
    <svg viewBox="0 0 340 156" role="presentation">
      <g stroke={LINE} strokeWidth="1.6" fill="none">
        <path d="M60 48v42q0 10 10 10h34" />
        <path d="M170 48v34" />
        <path d="M280 48v42q0 10-10 10h-34" />
      </g>
      <g
        className="hww-swap-stroke"
        stroke="#d8d5d0"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M60 53v16M170 53v16M280 53v16" />
      </g>
      <Chip x={60} y={26} name="globe" r={21} />
      <Chip x={170} y={26} name="growth" r={21} delay={110} />
      <Chip x={280} y={26} name="layers" r={21} delay={220} />
      <Node x={170} y={110} w={118} label={`${projects} Projects`} />
    </svg>
  );
}

/* ===========================================================================
   6. Built for Seamless Execution
   Hover: a Designer cursor drags the accent block across the design file, a
   dot travels down the connector, then a Developer tag lands in the build.
   ======================================================================== */

function Handoff() {
  return (
    <svg viewBox="0 0 340 469" role="presentation">
      {/* The design file. */}
      <rect x="12" y="8" width="320" height="164" rx="13" fill="#fff" stroke={LINE} strokeWidth="1.3" />
      <Glyph name="figma" x={30} y={33} size={17} fill={GREY} />
      <Bar x={78} y={29} w={51} h={10} />
      <Bar x={137} y={29} w={37} h={10} />
      <rect x="254" y="24" width="61" height="19" rx="9.5" fill={FILL} />
      <path d="M12 51h320" stroke={LINE} strokeWidth="1.3" />
      <Bar x={41} y={64} w={125} h={11} />
      <Bar x={41} y={83} w={98} h={11} />
      <Bar x={41} y={102} w={115} h={11} />
      {/* The designer nudges the accent block… */}
      <g className="hww-drift" style={vars({ "--dx": "30px", "--dy": "16px" })}>
        <rect x="89" y="120" width="49" height="17" rx="8.5" fill={ACCENT} />
      </g>
      <rect x="176" y="57" width="107" height="92" rx="12" fill="none" stroke={LINE} strokeWidth="1.6" />
      <rect x="215" y="83" width="92" height="82" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.6" />
      {/* …drawn after the frames, so the tag is never hidden behind one. */}
      <g className="hww-fade-in">
        <g className="hww-drift" style={vars({ "--dx": "30px", "--dy": "16px" })}>
          <Cursor x={124} y={131} label="Designer" tone="accent" />
        </g>
      </g>

      {/* Straight into the build, with a handle at each end. */}
      <g fill="none" stroke={LINE} strokeWidth="1.6">
        <path d="M45 172v18q0 8 8 8h235q8 0 8 8v26" />
      </g>
      <Wire d="M45 172v18q0 8 8 8h235q8 0 8 8v26" delay={260} />
      <circle cx="45" cy="173" r="3.4" fill={GREY} />
      <circle cx="296" cy="235" r="3.4" fill={GREY} />

      {/* The shipped build. */}
      <rect x="12" y="237" width="320" height="229" rx="13" fill="#fff" stroke={LINE} strokeWidth="1.3" />
      <rect x="25" y="250" width="21" height="20" rx="6" fill={INK} />
      <Glyph name="code" x={35.5} y={260} size={13} fill="#fff" />
      <Bar x={56} y={256} w={33} h={8} />
      <Bar x={233} y={256} w={29} h={8} />
      <Bar x={270} y={256} w={24} h={8} />
      <Bar x={301} y={256} w={19} h={8} />
      <path d="M12 274h320" stroke={LINE} strokeWidth="1.3" />
      {/* Indented runs, so it reads as code rather than prose. */}
      <Bar x={33} y={292} w={74} />
      <Bar x={33} y={314} w={148} />
      <Bar x={196} y={314} w={54} fill={INK} />
      <Bar x={33} y={336} w={96} />
      <Bar x={73} y={358} w={122} />
      <Bar x={73} y={380} w={86} />
      <Bar x={33} y={402} w={110} />
      <Bar x={33} y={424} w={68} />
      {/* The developer picks it up at the other end. */}
      <g className="hww-fade-in" style={vars({ "--delay": "620ms" })}>
        <Cursor x={256} y={356} label="Developer" flip />
      </g>
    </svg>
  );
}

/* ===========================================================================
   7. No-Code Development
   Hover: the tilted Contact block drops into the dashed slot, straightens,
   turns dark, the hand releases, and a line joins it under Container.
   ======================================================================== */

function NoCode() {
  const block = (x: number, y: number, w: number, label: string, tone: "ink" | "accent") => (
    <g>
      {tone === "accent" && (
        <rect
          className="hww-fade-out"
          x={x - 7}
          y={y - 7}
          width={w + 14}
          height="48"
          rx="24"
          fill={ACCENT}
          opacity="0.14"
        />
      )}
      <rect
        className={tone === "accent" ? "hww-swap-fill" : undefined}
        style={tone === "accent" ? vars({ "--to-fill": INK }) : undefined}
        x={x}
        y={y}
        width={w}
        height="34"
        rx="17"
        fill={tone === "accent" ? ACCENT : INK}
      />
      <Glyph name="box" x={x + 22} y={y + 17} size={16} fill="#fff" />
      <text x={x + 38} y={y + 17} dominantBaseline="central" fontSize="12.5" fontWeight="600" fill="#fff">
        {label}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 340 158" role="presentation">
      <g fill="none" stroke={LINE} strokeWidth="1.8">
        <path d="M150 21h122q8 0 8 8v27" />
      </g>
      <circle cx="143" cy="21" r="6" fill={GREY} />
      <rect x="274" y="51" width="12" height="12" rx="3" fill={GREY} />

      <rect
        className="hww-fade-out"
        x="20"
        y="58"
        width="112"
        height="36"
        rx="18"
        fill="none"
        stroke="#b6b2ab"
        strokeWidth="1.8"
        strokeDasharray="8 7"
      />

      {/* Once Contact lands, Container owns both children. */}
      <path
        className="hww-fade-in"
        style={vars({ "--delay": "560ms" })}
        d="M68 38V50Q68 59 77 59"
        fill="none"
        stroke={LINE}
        strokeWidth="1.8"
      />

      {block(2, 4, 132, "Container", "ink")}
      {block(216, 62, 112, "Header", "ink")}

      {/* Held at an angle, then dropped square into the dashed slot. */}
      <g
        className="hww-drift"
        style={vars({ "--r0": "-4deg", "--dx": "-84px", "--dy": "-51px", "--dr": "0deg" })}
      >
        {block(104, 110, 112, "Contact", "accent")}
        <g className="hww-fade-out">
          <Glyph name="hand" x={166} y={144} size={21} fill={INK} />
        </g>
      </g>
    </svg>
  );
}

/* ===========================================================================
   Assembly
   ======================================================================== */

function Art({ id, projects }: { id: CardId; projects: string }) {
  switch (id) {
    case "collab":
      return <Collab />;
    case "tools":
      return <Tools />;
    case "updates":
      return <Updates />;
    case "support":
      return <Support />;
    case "proven":
      return <Proven projects={projects} />;
    case "handoff":
      return <Handoff />;
    case "nocode":
      return <NoCode />;
  }
}

function Card({
  id,
  content,
}: {
  id: CardId;
  content: HowWeWorkContent;
}) {
  const card = content.cards.find((c) => c.id === id);
  if (!card) return null;
  return (
    <article className={`hww-card${card.featured ? " hww-card--featured" : ""}`}>
      <h3>{card.title}</h3>
      <p>{card.body}</p>
      <div className="hww-art" data-art={id}>
        <Art id={id} projects={content.projects} />
      </div>
    </article>
  );
}

export default function HowWeWork({
  content = defaultContent,
  className = "",
  style,
}: {
  content?: HowWeWorkContent;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section className={`hww ${className}`} style={style} aria-labelledby="hww-title">
      {/* Kept with the component so this file stays a true drop-in. Move it
          into a global stylesheet if you'd rather not ship a <style> tag. */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="hww-head">
        <h2 className="hww-title" id="hww-title">
          {content.headingLead} <span>{content.headingAccent}</span> {content.headingTail}
        </h2>
        <p className="hww-intro">{content.intro}</p>
      </div>

      {/* Columns split their height differently, so the tiles vary in size
          while every column still starts and ends on the same line. */}
      <div className="hww-grid">
        <div className="hww-col" data-col="1">
          <Card id="collab" content={content} />
          <Card id="tools" content={content} />
        </div>
        <div className="hww-col" data-col="2">
          <Card id="updates" content={content} />
          <Card id="support" content={content} />
          <Card id="proven" content={content} />
        </div>
        <div className="hww-col" data-col="3">
          <Card id="handoff" content={content} />
          <Card id="nocode" content={content} />
        </div>
      </div>
    </section>
  );
}
