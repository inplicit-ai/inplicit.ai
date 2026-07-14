/**
 * IcebergSection — full-bleed "Explizit vs. Implizit" iceberg for Inplicit.
 *
 * Above the waterline = Inplicit light design (white + warm amber gradient) with
 * the explicit, visible tools (Slack, Teams, Jira, Confluence, Notion, Drive).
 * Below the waterline = the dark, implicit layer: hidden human signals that stay
 * blurred until the user clicks „Aufdecken". On reveal the depths sharpen, the
 * signals light up and connect, and the „Management Intelligence" panel opens.
 *
 * Pure CSS/SVG geometry, Framer Motion for motion, Tailwind for layout. German
 * labels. Brand palette + all copy live in the CONFIG block below.
 *
 * The iceberg SVG works in a 760×760 viewBox with the waterline at y=300
 * (39.47% from the top). The wrapper is lifted by translateY(-39.47%) so the
 * SVG waterline lands exactly on the light/dark boundary; HTML labels reuse the
 * same coordinates converted to %, so they stay pinned at any size.
 */

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

/* ── Brand palette ───────────────────────────────────────────────────────── */
const C = {
  ink: "#0a0a0a",
  inkSoft: "#52525b",
  inkFaint: "#8a8a93",
  amber: "#c2660c",
  amberStrong: "#a8550a",
  amberBright: "#f5a623",
  amberSoft: "#fbf0e0",
  // ice (above water, on white)
  iceWhite: "#f4f9ff",
  iceLight: "#d8e8f8",
  iceMid: "#bcd7f0",
  iceShadow: "#8fb7e0",
  // submerged (below water, on navy)
  sub1: "#3a7fbf",
  sub2: "#2c6aa6",
  sub3: "#1d4f86",
  sub4: "#143a64",
} as const;

/* ── Copy ────────────────────────────────────────────────────────────────── */
const COPY = {
  visibleBadge: "Explizit & sichtbar",
  hiddenBadge: "Implizit & unsichtbar",
  headline: "Machen Sie sichtbar, was Ihre Systeme nicht wissen.",
  subline:
    "Inplicit verbindet Tool-Daten mit gezielten KI-Interviews und deckt den menschlichen Kontext auf, der zwischen Prozessen, Teams und Entscheidungen verborgen liegt.",
  scrollCta: "Verborgenen Organisationskontext erkennen",
  uncover: "Aufdecken",
  uncoverHint: "Den impliziten Kontext sichtbar machen",
};

/* Explicit knowledge tools above the waterline. */
const TOOLS: { name: string; mark: ReactNode; pos: string }[] = [
  { name: "Celonis", mark: <CelonisMark />, pos: "left-1/2 top-[6%] -translate-x-1/2" },
  { name: "Slack", mark: <SlackMark />, pos: "left-[11%] top-[24%]" },
  { name: "Teams", mark: <TeamsMark />, pos: "left-[6%] top-[50%]" },
  { name: "Jira", mark: <JiraMark />, pos: "right-[9%] top-[22%]" },
  { name: "Confluence", mark: <ConfluenceMark />, pos: "right-[6%] top-[49%]" },
  { name: "Notion", mark: <NotionMark />, pos: "left-[18%] top-[71%]" },
  { name: "Drive", mark: <DriveMark />, pos: "right-[16%] top-[71%]" },
];

/* Hidden signals below the waterline (760×1040 viewBox coordinates). */
const HIDDEN: { x: number; y: number; label: string; side: "left" | "right" }[] = [
  { x: 322, y: 512, label: "Workarounds", side: "left" },
  { x: 472, y: 548, label: "Wissensinseln", side: "right" },
  { x: 292, y: 612, label: "informelle Entscheidungen", side: "left" },
  { x: 482, y: 648, label: "kulturelle Reibung", side: "right" },
  { x: 320, y: 722, label: "unausgesprochene Blocker", side: "left" },
  { x: 458, y: 742, label: "Hidden Expertise", side: "right" },
  { x: 372, y: 852, label: "Automatisierungspotenzial", side: "left" },
];

const LINKS: [number, number][] = [
  [0, 2],
  [1, 3],
  [2, 4],
  [2, 6],
  [3, 5],
  [4, 6],
  [5, 6],
  [0, 1],
];

const INSIGHTS = [
  {
    title: "87 % bestätigen kritische Wissensinseln",
    sub: "Aus den Interviews: Schlüsselwissen hängt an einzelnen Personen.",
    tone: "#f6717f",
  },
  {
    title: "5 wiederkehrende Prozessbrüche genannt",
    sub: "In 31 Interviews benannt — Übergaben verlieren Kontext.",
    tone: "#f4b552",
  },
  {
    title: "Automatisierungspotenzial in Team Operations",
    sub: "73 % nennen manuelle Routinen mit hohem Wiederholungsgrad.",
    tone: C.amberBright,
  },
] as const;

const VBW = 760;
const VBH = 1040;
const WL = 430 / VBH; // waterline fraction (~41.3%) — taller tip + bigger body
const px = (x: number) => `${(x / VBW) * 100}%`;
const py = (y: number) => `${(y / VBH) * 100}%`;

/* ── Component ───────────────────────────────────────────────────────────── */
export default function IcebergSection() {
  const darkRef = useRef<HTMLDivElement>(null);
  const inView = useInView(darkRef, { once: true, margin: "-20%" });
  const reduce = useReducedMotion() ?? false;
  const [revealed, setRevealed] = useState(false);

  const scrollToDepths = () =>
    darkRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <ScopedStyles />

      {/* ═══════════ LAYER 0 — backgrounds + waterline ═══════════ */}
      <div aria-hidden className="absolute inset-0 z-0">
        {/* above-water sky (light) */}
        <div
          className="absolute inset-x-0 top-0 h-screen"
          style={{
            background:
              "radial-gradient(80% 60% at 50% -10%, rgba(194,102,12,0.14) 0%, rgba(194,102,12,0) 60%)," +
              "radial-gradient(60% 50% at 85% 20%, rgba(245,166,35,0.10) 0%, rgba(245,166,35,0) 55%)," +
              "linear-gradient(180deg, #ffffff 0%, #fdfaf6 62%, #f4eee5 100%)",
          }}
        />
        {/* below-water depths (dark) */}
        <div
          className="absolute inset-x-0 bottom-0 top-[100vh] overflow-hidden"
          style={{
            background:
              "radial-gradient(90% 70% at 80% 12%, rgba(245,166,35,0.10) 0%, rgba(8,12,22,0) 55%)," +
              "linear-gradient(180deg, #0b1120 0%, #0a0f1c 55%, #070b15 100%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(150,180,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(150,180,220,0.05) 1px, transparent 1px)",
              backgroundSize: "46px 46px",
              maskImage: "radial-gradient(110% 80% at 45% 25%, #000 35%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(110% 80% at 45% 25%, #000 35%, transparent 100%)",
            }}
          />
        </div>
        {/* full-bleed waterline */}
        <div className="absolute inset-x-0 top-[100vh]">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,166,35,0.55) 30%, rgba(255,255,255,0.55) 50%, rgba(245,166,35,0.55) 70%, transparent)",
            }}
          />
          <div className="h-28 w-full" style={{ background: "linear-gradient(180deg, rgba(245,166,35,0.10), transparent)" }} />
        </div>
      </div>

      {/* ═══════════ LAYER 1 — iceberg straddling the waterline ═══════════ */}
      <div className="pointer-events-none absolute left-1/2 top-[100vh] z-10 -translate-x-1/2 lg:left-[40%]">
        <div className="relative w-[min(840px,94vw)]" style={{ aspectRatio: `${VBW} / ${VBH}`, transform: `translateY(-${WL * 100}%)` }}>
          <IcebergShape />
          <ImplicitLayer revealed={revealed} reduce={reduce} seen={inView} />

          {/* hidden signal labels */}
          {HIDDEN.map((n, i) => (
            <Label key={n.label} node={n} revealed={revealed} reduce={reduce} delay={0.15 + i * 0.12} />
          ))}
        </div>
      </div>

      {/* ═══════════ LAYER 2 — content (above the iceberg) ═══════════ */}
      <div className="relative z-20">
        {/* ── above water ── */}
        <div className="relative flex min-h-screen w-full flex-col">
          {/* desktop floating tool logos */}
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
            {TOOLS.map((t, i) => (
              <div key={t.name} className={`absolute ${t.pos}`}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.2 + i * 0.08, duration: 0.6 }}
                  className="ipl-float"
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  <ToolChip name={t.name} mark={t.mark} />
                </motion.div>
              </div>
            ))}
          </div>

          {/* hero, vertically centered */}
          <div className="relative mx-auto flex flex-1 max-w-6xl flex-col items-center justify-center px-6 pt-20 text-center">
            <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-neutral-950 sm:text-5xl lg:text-[3.4rem]">
              {COPY.headline}
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
              {COPY.subline}
            </p>

            <button
              onClick={scrollToDepths}
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgba(0,0,0,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {COPY.scrollCta}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-y-0.5">
                <path d="M8 3v9M4 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* mobile tool row */}
            <div className="mt-9 flex flex-wrap justify-center gap-2 md:hidden">
              {TOOLS.map((t) => (
                <ToolChip key={t.name} name={t.name} mark={t.mark} compact />
              ))}
            </div>
          </div>

          {/* surface label — just above the waterline */}
          <div className="flex justify-center pb-10">
            <Badge variant="light" label={COPY.visibleBadge} />
          </div>
        </div>

        {/* ── below water ── */}
        <div ref={darkRef} className="pointer-events-none relative min-h-[124vh] w-full">
          {/* implicit badge */}
          <div className="flex justify-center pt-12">
            <Badge variant="dark" label={COPY.hiddenBadge} />
          </div>

          {/* Aufdecken trigger — screen-centered, sitting over the submerged
              iceberg mass (~0.42 × berg width below the waterline, so it scales
              with the berg). Fades out on reveal. */}
          <motion.div
            className="absolute left-1/2 z-10 -translate-x-1/2"
            style={{ top: "calc(min(840px, 94vw) * 0.42)", pointerEvents: revealed ? "none" : "auto" }}
            animate={{ opacity: revealed ? 0 : 1, y: revealed ? 8 : 0 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          >
            <div className="flex flex-col items-center gap-2 whitespace-nowrap">
              <button
                onClick={() => setRevealed(true)}
                className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${C.amberBright} 0%, ${C.amber} 100%)`,
                  boxShadow: `0 14px 40px -12px ${C.amber}`,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8s2.5-4.5 6-4.5S14 8 14 8s-2.5 4.5-6 4.5S2 8 2 8Z" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="8" cy="8" r="1.8" fill="currentColor" />
                </svg>
                {COPY.uncover}
              </button>
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">{COPY.uncoverHint}</span>
            </div>
          </motion.div>

          {/* Management Intelligence panel (opens on reveal) */}
          <div className="mx-auto max-w-6xl px-6">
            {/* mobile spacer so the card sits below the iceberg in flow */}
            <div aria-hidden className="h-[620px] sm:h-[700px] lg:hidden" />
            <motion.div
              initial={false}
              animate={{
                opacity: revealed ? 1 : 0,
                x: revealed ? 0 : 40,
                pointerEvents: revealed ? "auto" : "none",
              }}
              transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-full max-w-md lg:absolute lg:right-[5%] lg:top-[20%] lg:mx-0 lg:w-[380px]"
            >
              <IntelCard revealed={revealed} reduce={reduce} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Iceberg tip (above water, always sharp) ───────────────────────────────── */
function IcebergShape() {
  return (
    <svg viewBox={`0 0 ${VBW} ${VBH}`} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
      <defs>
        <filter id="ipl-tipshadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#2a5180" floodOpacity="0.24" />
        </filter>
      </defs>

      {/* ice tip (above water, on white) — broad, tall, faceted */}
      <g filter="url(#ipl-tipshadow)">
        <polygon points="372,44 262,190 158,430 372,430" fill={C.iceLight} />
        <polygon points="372,44 372,430 478,175" fill={C.iceWhite} />
        <polygon points="478,175 372,430 586,430" fill={C.iceMid} />
      </g>
      <polyline points="158,430 262,190 372,44 478,175 586,430" fill="none" stroke={C.iceShadow} strokeWidth="1.8" opacity="0.85" />
    </svg>
  );
}

/* ── Implicit layer (submerged berg + nodes + connections + scan beam).
 *    Blurred until revealed, then sharpens — so scrolling shows the underwater
 *    iceberg as a soft blur and the „Aufdecken" click brings it into focus.  */
function ImplicitLayer({ revealed, reduce, seen }: { revealed: boolean; reduce: boolean; seen: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${VBW} ${VBH}`}
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      style={{
        filter: revealed ? "blur(0px)" : "blur(10px)",
        transition: reduce ? "none" : "filter 1s ease",
      }}
    >
      <defs>
        <radialGradient id="ipl-nodeglow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={C.amberBright} stopOpacity="0.95" />
          <stop offset="100%" stopColor={C.amberBright} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ipl-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.amberBright} stopOpacity="0" />
          <stop offset="0.5" stopColor={C.amberBright} stopOpacity="0.34" />
          <stop offset="1" stopColor={C.amberBright} stopOpacity="0" />
        </linearGradient>
        <filter id="ipl-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.4" />
        </filter>
      </defs>

      {/* submerged body — large, faceted, darker = deeper */}
      <g>
        <polygon points="158,430 112,580 372,600 372,430" fill={C.sub1} />
        <polygon points="372,430 372,600 632,580 586,430" fill={C.sub2} />
        <polygon points="112,580 286,770 372,1000 372,600" fill={C.sub3} />
        <polygon points="372,600 372,1000 458,770 632,580" fill={C.sub4} />
        <polygon points="158,430 586,430 632,580 112,580" fill={C.amberBright} opacity="0.05" />
      </g>

      {/* scan beam (one sweep on reveal) */}
      {!reduce && (
        <motion.g
          initial={{ y: 0, opacity: 0 }}
          animate={revealed ? { y: [0, 560], opacity: [0, 0.9, 0.9, 0] } : { y: 0, opacity: 0 }}
          transition={{ duration: 1.9, ease: "easeInOut", times: [0, 0.12, 0.85, 1] }}
        >
          <rect x="120" y="414" width="500" height="34" fill="url(#ipl-beam)" />
          <rect x="120" y="430" width="500" height="2.4" fill={C.amberBright} opacity="0.9" />
          <rect x="120" y="430" width="500" height="7" fill={C.amberBright} opacity="0.4" filter="url(#ipl-soft)" />
        </motion.g>
      )}

      {/* connections */}
      {LINKS.map(([a, b], i) => {
        const A = HIDDEN[a];
        const B = HIDDEN[b];
        return (
          <motion.line
            key={`l-${i}`}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke={C.amberBright}
            strokeWidth={1.1}
            initial={{ pathLength: 0, opacity: 0.12 }}
            animate={revealed ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0.4, opacity: 0.12 }}
            transition={{ delay: reduce ? 0 : 0.5 + i * 0.08, duration: reduce ? 0 : 0.7 }}
          />
        );
      })}

      {/* nodes */}
      {HIDDEN.map((n, i) => (
        <motion.g
          key={`n-${i}`}
          initial={{ opacity: 0.35 }}
          animate={revealed ? { opacity: 1 } : { opacity: seen ? 0.4 : 0.2 }}
          transition={{ delay: reduce ? 0 : 0.2 + i * 0.1, duration: reduce ? 0 : 0.5 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle className="ipl-pulse" cx={n.x} cy={n.y} r={16} fill="url(#ipl-nodeglow)" />
          <circle cx={n.x} cy={n.y} r={5} fill="#fff3df" />
          <circle cx={n.x} cy={n.y} r={5} fill="none" stroke={C.amberBright} strokeWidth={1.3} />
        </motion.g>
      ))}
    </svg>
  );
}

/* ── Hidden signal label (HTML, pinned to SVG node) ────────────────────────── */
function Label({
  node,
  revealed,
  reduce,
  delay,
}: {
  node: { x: number; y: number; label: string; side: "left" | "right" };
  revealed: boolean;
  reduce: boolean;
  delay: number;
}) {
  const isLeft = node.side === "left";
  return (
    <div
      className="pointer-events-none absolute z-10 hidden whitespace-nowrap sm:block"
      style={{
        left: px(node.x),
        top: py(node.y),
        transform: isLeft ? "translate(calc(-100% - 16px), -50%)" : "translate(16px, -50%)",
        filter: revealed ? "blur(0px)" : "blur(7px)",
        transition: reduce ? "none" : "filter 0.9s ease",
      }}
    >
      <motion.span
        className="text-[12.5px] font-medium tracking-wide"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: revealed ? 1 : 0.45, color: revealed ? C.amberBright : "#7c8aa0" }}
        transition={{ delay: reduce ? 0 : revealed ? delay : 0, duration: reduce ? 0 : 0.5 }}
        style={{ textShadow: revealed ? `0 0 14px ${C.amber}66` : "none" }}
      >
        {node.label}
      </motion.span>
    </div>
  );
}

/* ── Management Intelligence card ──────────────────────────────────────────── */
function IntelCard({ revealed, reduce }: { revealed: boolean; reduce: boolean }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-xl"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 30px 70px -30px rgba(0,0,0,0.8)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.amberBright}, transparent)` }} />

      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${C.amberBright}1f`, border: `1px solid ${C.amberBright}40` }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h3l2-5 2 10 2-5h3" stroke={C.amberBright} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-white">Management Intelligence</span>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-white/40">
          <span className="ipl-livedot h-1.5 w-1.5 rounded-full" style={{ background: C.amberBright }} />
          Live
        </span>
      </div>
      <p className="mb-5 pl-[38px] text-[11px] leading-snug text-white/45">Verdichtet aus Tool-Daten &amp; 31 gezielten KI-Interviews</p>

      <ul className="space-y-2.5">
        {INSIGHTS.map((ins, i) => (
          <motion.li
            key={ins.title}
            initial={false}
            animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : 16 }}
            transition={{ delay: reduce ? 0 : revealed ? 0.5 + i * 0.18 : 0, duration: reduce ? 0 : 0.5 }}
            className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
          >
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold"
              style={{ background: `${ins.tone}1f`, color: ins.tone, border: `1px solid ${ins.tone}40` }}
            >
              {i + 1}
            </span>
            <span>
              <span className="block text-[13.5px] font-medium leading-snug text-white">{ins.title}</span>
              <span className="mt-0.5 block text-[12px] leading-snug text-slate-400">{ins.sub}</span>
            </span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4">
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
          <span className="ipl-shimmer absolute inset-y-0 left-0 w-1/3 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${C.amberBright}, transparent)` }} />
        </div>
        <span className="text-[10px] uppercase tracking-wider text-white/35">In Echtzeit aktualisiert</span>
      </div>
    </div>
  );
}

/* ── Small UI bits ─────────────────────────────────────────────────────────── */
function Badge({ variant, label }: { variant: "light" | "dark"; label: string }) {
  const light = variant === "light";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
        light ? "border-black/10 bg-white/70 text-neutral-500 backdrop-blur" : "border-white/10 bg-white/[0.04] text-white/55 backdrop-blur"
      }`}
    >
      <span className="ipl-livedot h-1.5 w-1.5 rounded-full" style={{ background: light ? C.amber : C.amberBright, boxShadow: `0 0 10px ${light ? C.amber : C.amberBright}` }} />
      {label}
    </span>
  );
}

function ToolChip({ name, mark, compact }: { name: string; mark: ReactNode; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-2 rounded-xl border border-black/[0.06] bg-white ${compact ? "px-2.5 py-1.5" : "px-3 py-2"} shadow-[0_10px_26px_-14px_rgba(20,40,80,0.35)]`}>
      <span className="grid h-5 w-5 place-items-center">{mark}</span>
      <span className="text-[13px] font-medium text-neutral-800">{name}</span>
    </div>
  );
}

/* ── Tool brand marks (simplified inline SVG) ─────────────────────────────── */
function CelonisMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="#6a2bd9" />
      <path d="M15.6 9.1a4.4 4.4 0 1 0 0 5.8" stroke="#fff" strokeWidth="2.1" fill="none" strokeLinecap="round" />
    </svg>
  );
}
function SlackMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <rect x="10" y="1.5" width="4" height="8.5" rx="2" fill="#36C5F0" />
      <rect x="14" y="10" width="8.5" height="4" rx="2" fill="#2EB67D" />
      <rect x="10" y="14" width="4" height="8.5" rx="2" fill="#ECB22E" />
      <rect x="1.5" y="10" width="8.5" height="4" rx="2" fill="#E01E5A" />
    </svg>
  );
}
function TeamsMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <circle cx="18" cy="6.5" r="2.6" fill="#7B83EB" />
      <rect x="14.5" y="8.5" width="7.5" height="9" rx="2.4" fill="#5059C9" />
      <rect x="2.5" y="5.5" width="13" height="13" rx="3" fill="#5059C9" />
      <text x="9" y="14.5" fontSize="9" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="sans-serif">T</text>
    </svg>
  );
}
function JiraMark() {
  return (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden>
      <path d="M16 3 L29 16 L23 22 L16 15 L9 22 L3 16 Z" fill="#2684FF" opacity="0.55" />
      <path d="M16 10 L23 17 L16 24 L9 17 Z" fill="#2684FF" />
    </svg>
  );
}
function ConfluenceMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path d="M2 17q6-6.5 11-4.2t9 1.8" stroke="#2684FF" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <path d="M22 7q-6 6.5-11 4.2T2 9.4" stroke="#0052CC" strokeWidth="3.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
function NotionMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#fff" stroke="#111" strokeWidth="1.5" />
      <path d="M8 16.5V8l8 8.5V8" stroke="#111" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function DriveMark() {
  return (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden>
      <path d="M11 4 L21 4 L31 21 L21 21 Z" fill="#FFBA00" />
      <path d="M11 4 L1 21 L6 30 L16 13 Z" fill="#00AC47" />
      <path d="M6 30 L26 30 L31 21 L11 21 Z" fill="#2684FC" />
    </svg>
  );
}

/* ── Scoped keyframes ──────────────────────────────────────────────────────── */
function ScopedStyles() {
  return (
    <style>{`
      @keyframes iplPulse { 0%,100% { opacity:.4; transform:scale(1); } 50% { opacity:.75; transform:scale(1.2); } }
      .ipl-pulse { transform-box: fill-box; transform-origin: center; animation: iplPulse 3.2s ease-in-out infinite; }
      @keyframes iplLive { 0%,100% { opacity:.4; } 50% { opacity:1; } }
      .ipl-livedot { animation: iplLive 2.2s ease-in-out infinite; }
      @keyframes iplShimmer { 0% { transform: translateX(-120%); } 100% { transform: translateX(420%); } }
      .ipl-shimmer { animation: iplShimmer 2.6s ease-in-out infinite; }
      @keyframes iplFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
      .ipl-float { animation: iplFloat 6s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .ipl-pulse, .ipl-livedot, .ipl-shimmer, .ipl-float { animation: none !important; }
      }
    `}</style>
  );
}
