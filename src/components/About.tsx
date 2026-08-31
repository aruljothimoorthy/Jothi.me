import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Hammer, MapPin, Target } from "lucide-react";
import { Reveal, SectionLabel, ease } from "@/components/motion";
import { ViewMoreLink } from "@/components/PageNav";

const TRAITS = [
  {
    title: "GROWTH",
    accent: "#c4b5fd",
    glow: "rgba(196,181,253,0.22)",
    icon: Compass,
    desc: "An explorer of systems, driven by curiosity and a deep desire to understand how things truly work.",
  },
  {
    title: "FOCUS",
    accent: "#67e8f9",
    glow: "rgba(103,232,249,0.22)",
    icon: Target,
    desc: "Deep work on efficiency and precision. Clarity of thought before clarity of code.",
  },
  {
    title: "CRAFT",
    accent: "#fbbf24",
    glow: "rgba(251,191,36,0.2)",
    icon: Hammer,
    desc: "Discipline and dedication in every line of code. Software is a craft — I treat it like one.",
  },
] as const;

const TREND = [
  { label: "Y1", spi: 8.2, cpi: 8.2 },
  { label: "Y2", spi: 8.5, cpi: 8.35 },
  { label: "Y3", spi: 8.7, cpi: 8.48 },
  { label: "Y4", spi: 8.9, cpi: 8.56 },
];

function AcademicChart() {
  const w = 420;
  const h = 120;
  const pad = 12;
  const maxY = 10;
  const minY = 7.5;

  const toX = (i: number) => pad + (i / (TREND.length - 1)) * (w - pad * 2);
  const toY = (v: number) => pad + ((maxY - v) / (maxY - minY)) * (h - pad * 2);

  const spiPath = TREND.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(p.spi)}`).join(" ");
  const cpiPath = TREND.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(p.cpi)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" aria-hidden>
      {[8, 8.5, 9].map((y) => (
        <line
          key={y}
          x1={pad}
          x2={w - pad}
          y1={toY(y)}
          y2={toY(y)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      <path d={cpiPath} fill="none" stroke="#67e8f9" strokeWidth="2.2" strokeLinecap="round" />
      <path d={spiPath} fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" />
      {TREND.map((p, i) => (
        <g key={p.label}>
          <circle cx={toX(i)} cy={toY(p.cpi)} r="3.2" fill="#67e8f9" />
          <circle cx={toX(i)} cy={toY(p.spi)} r="3.2" fill="#fbbf24" />
          <text
            x={toX(i)}
            y={h - 2}
            textAnchor="middle"
            fill="rgba(148,163,184,0.85)"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const glass =
  "card-hover-lift relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(8,12,22,0.72)] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)] light:border-[#E2E8F0] light:bg-[rgba(255,255,255,0.8)] light:shadow-[0_4px_24px_rgba(15,23,42,0.06)]";

export function About() {
  const reduce = useReducedMotion();
  const [locHover, setLocHover] = useState(false);

  return (
    <section id="about" className="relative overflow-hidden px-4 py-16 sm:px-5 lg:py-20">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(56,189,248,0.18), transparent 40%, rgba(103,232,249,0.1), transparent 75%)",
        }}
        aria-hidden
      />
      

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>Who I Am</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="m-typo-section mt-4 mb-8 font-display text-3xl font-semibold tracking-tight sm:mb-10 sm:text-5xl">
            About <span className="gradient-text">Me</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-12">
          {/* Location */}
          <Reveal className="md:col-span-4 md:self-start">
            <motion.div
              data-cursor="hover"
              onHoverStart={() => setLocHover(true)}
              onHoverEnd={() => setLocHover(false)}
              className={`${glass} px-5 pb-4 pt-4 sm:px-6 sm:pb-4 sm:pt-4`}
            >
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: locHover ? 1 : 0,
                  background:
                    "radial-gradient(circle at 70% 70%, rgba(56,189,248,0.18), transparent 55%)",
                }}
                aria-hidden
              />
              <div className="relative flex flex-col">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  <MapPin size={12} className="text-cyan" />
                  Location
                  <span className="text-white/20 light:text-[#CBD5E1]">·</span>
                  <span className="text-cyan/70">Hover to explore</span>
                </div>

                <div className="mt-4 sm:mt-5">
                  <p className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    CHENNAI
                  </p>
                  <p className="mt-1.5 font-display text-2xl font-medium tracking-tight text-cyan/90 sm:text-3xl">
                    Tharamani
                  </p>
                  <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
                    13.0827° N, 80.2707° E
                    <br />
                    GMT +5:30 · Tamil Nadu
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-xs text-foreground/85">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
                    </span>
                    Open to opportunities
                  </p>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* About bio */}
          <Reveal delay={0.06} className="md:col-span-8 md:self-start">
            <div className={`${glass} flex flex-col px-5 pb-4 pt-4 sm:px-6 sm:pb-4 sm:pt-4`}>
              <p className="font-mono text-[10px] tracking-[0.22em] text-cyan/80 uppercase">
                / About
              </p>
              <p className="m-typo-body mt-5 text-base leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-7">
                I&apos;m a{" "}
                <span className="font-medium text-foreground">I’m a 1st-year MCA student</span> at{" "}
                <span className="font-medium text-foreground">
                  Anna University — Madras Institute of Technology
                </span>
                , having completed my B.Sc. in Computer Science in 2024.I’m building my skills in both Java Full Stack and MERN Stack development, with a strong foundation in Core Java and hands-on experience in React.js, Node.js, and MySQL through practical projects.
              </p>
              <p className="mt-8 pt-2 font-mono text-xs italic text-cyan/75 sm:mt-10 sm:pt-3 sm:text-sm">
                &ldquo;Where pixel perfection meets seamless performance.&rdquo;
              </p>
            </div>
          </Reveal>

        
          {/* Trait cards — tablet+ only; hidden on phone */}
          <div className="col-span-1 hidden min-[769px]:grid min-[769px]:grid-cols-3 min-[769px]:gap-4 md:col-span-12">
  {TRAITS.map((t, i) => (
    <Reveal key={t.title} delay={0.12 + i * 0.05} className="min-w-0">
      <motion.div
        data-cursor="hover"
        className={`${glass} h-full p-2.5 sm:p-5 md:p-6`}
        style={{ boxShadow: `inset 0 1px 0 ${t.accent}33` }}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl"
          style={{ background: t.glow }}
          aria-hidden
        />
        <div className="relative">
          <div className="mb-1.5 flex items-center gap-1 sm:mb-3 sm:gap-2">
            <t.icon size={10} className="shrink-0 sm:h-3.5 sm:w-3.5" style={{ color: t.accent }} />
            <p
              className="truncate font-mono text-[7px] tracking-[0.1em] uppercase sm:text-[10px] sm:tracking-[0.22em]"
              style={{ color: t.accent }}
            >
              {t.title}
            </p>
          </div>
          <p className="m-typo-desc text-[9px] leading-tight text-muted-foreground sm:text-sm sm:leading-relaxed">
            {t.desc}
          </p>
        </div>
      </motion.div>
    </Reveal>
  ))}
</div>
        </div>

        <ViewMoreLink to="/about" label="View About" />
      </div>
    </section>
  );
}
