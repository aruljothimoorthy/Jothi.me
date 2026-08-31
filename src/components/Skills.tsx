import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Layers,
  Zap,
  Smartphone,
  Palette,
  Terminal,
} from "lucide-react";
import {
  SiBootstrap,
  SiCss,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import type { ComponentType, CSSProperties } from "react";
import type { IconType } from "react-icons";
import { Reveal } from "@/components/motion";
import { ViewMoreLink } from "@/components/PageNav";

type SkillPill = {
  name: string;
  Icon: IconType | ComponentType<{ className?: string; size?: number; style?: CSSProperties }>;
  color: string;
};

const FRONTEND: SkillPill[] = [
  { name: "HTML5", Icon: SiHtml5, color: "#38bdf8" },
  { name: "CSS3", Icon: SiCss, color: "#38bdf8" },
  { name: "JavaScript", Icon: SiJavascript, color: "#38bdf8" },
  { name: "React.js", Icon: Code2, color: "#38bdf8" },
  { name: "TypeScript", Icon: SiTypescript, color: "#38bdf8" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#38bdf8" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38bdf8" },
];

const BACKEND: SkillPill[] = [
  { name: "Node.js", Icon: Zap, color: "#38bdf8" },
  { name: "Express.js", Icon: SiExpress, color: "#38bdf8" },
];

const DATABASE: SkillPill[] = [
  { name: "MySQL", Icon: Database, color: "#38bdf8" },
  { name: "SQL", Icon: Database, color: "#38bdf8" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#38bdf8" },
];

const PROGRAMMING: SkillPill[] = [
  { name: "Java", Icon: FaJava, color: "#38bdf8" },
];

const ORBIT_NODES = [
  { name: "Web", Icon: Globe, color: "#38bdf8", top: "6%", left: "50%" },
  { name: "Layers", Icon: Layers, color: "#38bdf8", top: "22%", left: "88%" },
  { name: "Code", Icon: Code2, color: "#38bdf8", top: "50%", left: "96%" },
  { name: "Mobile", Icon: Smartphone, color: "#38bdf8", top: "78%", left: "88%" },
  { name: "Design", Icon: Palette, color: "#38bdf8", top: "94%", left: "50%" },
  { name: "Power", Icon: Zap, color: "#38bdf8", top: "78%", left: "12%" },
  { name: "Database", Icon: Database, color: "#38bdf8", top: "50%", left: "4%" },
  { name: "Terminal", Icon: Terminal, color: "#38bdf8", top: "22%", left: "12%" },
] as const;

function SkillPillBadge({ skill }: { skill: SkillPill }) {
  const Icon = skill.Icon;
  return (
    <div
      data-cursor="hover"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0b101d]/90 px-3 py-1.5 transition duration-300 hover:border-cyan-400/45 hover:bg-[#10172a] hover:shadow-[0_0_18px_rgba(56,189,248,0.18)] light:border-[#E2E8F0] light:bg-white light:shadow-[0_4px_24px_rgba(15,23,42,0.06)] light:hover:border-[rgba(8,145,178,0.4)] light:hover:bg-[#ECFEFF]"
    >
      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: skill.color }} size={14} />
      <span className="m-typo-skill whitespace-nowrap font-sans text-xs font-medium text-slate-200 light:text-[#0F172A] sm:text-[13px]">
        {skill.name}
      </span>
    </div>
  );
}

function CategoryBlock({ title, skills }: { title: string; skills: SkillPill[] }) {
  return (
    <div>
      <p className="mb-2.5 font-mono text-[10px] font-semibold tracking-[0.22em] text-cyan-400 uppercase sm:text-[11px]">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <SkillPillBadge key={s.name} skill={s} />
        ))}
      </div>
    </div>
  );
}

function PrimaryStackOrbit() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] lg:max-w-[460px]">
      {/* Soft glow behind rings */}
      <div
        className="pointer-events-none absolute inset-[12%] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.45) 0%, rgba(14,116,144,0.15) 45%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Concentric orbital rings */}
      <div className="absolute inset-[4%] rounded-full border border-cyan-400/15" />
      <div className="absolute inset-[12%] rounded-full border border-dashed border-cyan-400/25" />
      <div className="absolute inset-[22%] rounded-full border border-cyan-500/20" />

      {/* Center card */}
      <div className="card-hover-lift absolute inset-[24%] xs:inset-[26%] sm:inset-[28%] z-10 flex flex-col items-center justify-center rounded-2xl border border-cyan-400/35 bg-[#070b14]/95 px-2 py-3 text-center shadow-[0_0_40px_rgba(56,189,248,0.28)] backdrop-blur-md xs:px-3 sm:rounded-3xl sm:px-5 sm:py-5 light:border-[#E2E8F0] light:bg-white light:shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
        <p className="font-mono text-[8px] font-semibold tracking-[0.2em] text-cyan-400 uppercase xs:text-[9px] sm:text-[10px]">
          PRIMARY STACK
        </p>
        <h3 className="mt-1 font-display text-base font-semibold leading-tight tracking-tight text-white light:text-[#0F172A] xs:text-lg sm:mt-2 sm:text-xl">
          Full Stack Developer
        </h3>
        <p className="mt-1 font-mono text-[8px] leading-tight tracking-wide text-slate-400 light:text-[#64748B] xs:text-[9px] sm:mt-2 sm:text-[10px]">
          React.js · Node.js · Java
        </p>
      </div>

      {ORBIT_NODES.map((item, i) => (
        <motion.div
          key={item.name}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ top: item.top, left: item.left }}
          animate={reduce ? undefined : { y: [0, -7, 0] }}
          transition={{
            duration: 3.2 + i * 0.28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        >
          <div
            data-cursor="hover"
            title={item.name}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/50 bg-[#090e1a] shadow-[0_0_20px_rgba(56,189,248,0.35)] transition hover:scale-110 xs:h-10 xs:w-10 sm:h-11 sm:w-11 light:border-[#CBD5E1] light:bg-white light:shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
          >
            <item.Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" style={{ color: item.color }} size={18} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden px-2 py-12 text-slate-100 light:text-[#0F172A] sm:px-6 lg:py-16">
      <div
        className="pointer-events-none absolute right-[8%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-30 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.55) 0%, rgba(14,116,144,0.2) 45%, transparent 75%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="max-w-xl">
          <Reveal>
            <p className="font-mono text-[10px] font-semibold tracking-[0.28em] text-cyan-400 uppercase sm:text-xs">
              CAPABILITIES
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="m-typo-section mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Skills &{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent light:from-[#0891B2] light:to-[#0284C7]">
                Stack
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="m-typo-body mt-3 max-w-md text-sm leading-relaxed text-slate-400 light:text-[#64748B] sm:text-base">
              Full Stack Developer crafting scalable, modern web applications.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:gap-8 xl:gap-12">
          {/* Left — skill pills */}
          <div className="order-2 space-y-7 text-lg lg:order-1">
            <Reveal delay={0.1}>
              <CategoryBlock title="FRONTEND" skills={FRONTEND} />
            </Reveal>
            <Reveal delay={0.14}>
              <CategoryBlock title="BACKEND" skills={BACKEND} />
            </Reveal>
            <Reveal delay={0.18}>
              <CategoryBlock title="DATABASE" skills={DATABASE} />
            </Reveal>
            <Reveal delay={0.22}>
              <CategoryBlock title="PROGRAMMING" skills={PROGRAMMING} />
            </Reveal>
          </div>

          {/* Right — PRIMARY STACK orbit */}
          <Reveal delay={0.12} className="order-1 lg:order-2">
            <PrimaryStackOrbit />
          </Reveal>
        </div>

        {/* View More button centered across mobile, laptop, and desktop views with minimal top spacing */}
        <div className="mt-0 flex justify-center pt-2 sm:pt-4">
          <ViewMoreLink to="/skills" label="View Full Skills" />
        </div>
      </div>
    </section>
  );
}