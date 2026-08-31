import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Github,
  Linkedin,
  ArrowUpRight,
  Mail,
  MessageCircle,
  FileText,
} from "lucide-react";
import { Magnetic, fadeUp, stagger } from "@/components/motion";
import { SocialDock } from "@/components/SocialDock";
import aruljothi from "./assets/aruljothi.png";
import joImg from "./assets/jo.png";
import resumePdf from "./assets/Aruljothi k_Bsc(cs)2024_CGPA 8.56.pdf";

const roles = [
  "React Developer",
  "MERN Stack Developer",
  "Full-Stack Developer",
];

const MOBILE_INTRO =
  "MERN Stack Developer building full-stack web applications with MongoDB, Express, React, and Node.js — polished interfaces and purposeful motion.";

const socials = [
  {
    Icon: Mail,
    href: "mailto:aruljothi128r@gmail.com",
    label: "Email",
    external: true,
  },
  {
    Icon: Github,
    href: "https://github.com/aruljothimoorthy",
    label: "GitHub",
    external: true,
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/aruljothi-moorthy",
    label: "LinkedIn",
    external: true,
  },
  {
    Icon: FileText,
    href: resumePdf,
    label: "Resume",
    external: true,
  },
] as const;

function AvailabilityBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/[0.07] ${
        compact ? "px-2.5 py-1" : "px-3 py-1.5 sm:px-3.5"
      }`}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-cyan" />
      </span>
      <span
        className={`truncate font-mono uppercase tracking-[0.14em] text-cyan ${
          compact ? "text-[8px] tracking-[0.12em]" : "text-[9px] sm:text-[10px] sm:tracking-[0.2em]"
        }`}
      >
        AVAILABLE FOR OPPORTUNITIES — 2026
      </span>
    </span>
  );
}

function ProfileFlipCard({
  reduce,
  isFlipped,
  onFlipChange,
  className = "",
  mobile = false,
}: {
  reduce: boolean;
  isFlipped: boolean;
  onFlipChange: (flipped: boolean | ((prev: boolean) => boolean)) => void;
  className?: string;
  mobile?: boolean;
}) {
  const faceRadius = mobile ? "rounded-full" : "rounded-[1.75rem]";

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--hero-photo-glow) 0%, transparent 65%)",
        }}
        animate={reduce ? undefined : { opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="relative cursor-pointer"
        style={{ perspective: "1000px" }}
        onMouseEnter={() => onFlipChange(true)}
        onMouseLeave={() => onFlipChange(false)}
        onClick={() => onFlipChange((prev) => !prev)}
      >
        <motion.div
          animate={
            reduce
              ? { rotateY: isFlipped ? 180 : 0 }
              : {
                  y: [0, -10, 0],
                  rotateY: isFlipped ? 180 : 0,
                }
          }
          transition={{
            y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 0.6, ease: "easeInOut" },
          }}
          style={{ transformStyle: "preserve-3d" }}
          className={`relative z-10 w-full ${mobile ? "aspect-square" : "aspect-[4/5]"}`}
        >
          <div
            className={`absolute inset-0 h-full w-full overflow-hidden border border-white/10 bg-navy shadow-[var(--hero-card-shadow)] light:border-[#E2E8F0] ${faceRadius}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src={aruljothi}
              alt="Aruljothi K"
              loading="eager"
              className={`h-full w-full max-w-none object-cover ${mobile ? "object-top" : ""}`}
            />
            {!mobile && (
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 via-black/40 to-transparent px-5 py-5 font-mono text-[10px] text-white/60">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> CHENNAI · IN
                </span>
                <span>V.2026</span>
              </div>
            )}
          </div>

          <div
            className={`absolute inset-0 h-full w-full overflow-hidden border border-cyan/40 bg-navy shadow-[var(--hero-card-shadow-flip)] light:border-[#E2E8F0] ${faceRadius}`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <img
              src={joImg}
              alt="Aruljothi Art"
              loading="eager"
              className={`h-full w-full max-w-none object-cover ${mobile ? "object-top" : ""}`}
            />
            {!mobile && (
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 via-black/40 to-transparent px-5 py-5 font-mono text-[10px] text-cyan">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> ARTWORK VERSION
                </span>
                <span>JO.PNG</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RoleDisplay({
  roleIdx,
  onSelectRole,
  centered = false,
}: {
  roleIdx: number;
  onSelectRole: (index: number) => void;
  centered?: boolean;
}) {
  return (
    <>
      <div className={`mb-3 min-h-[2.75rem] sm:min-h-[3.75rem] ${centered ? "flex justify-center" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.p
            key={roles[roleIdx]}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
            className={`m-typo-subhead font-display text-[1.65rem] font-bold tracking-tight role-gradient sm:text-4xl md:text-[2.75rem] ${
              centered ? "max-w-[20rem] px-2 leading-snug" : ""
            }`}
          >
            {roles[roleIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className={`mb-6 flex items-center gap-2 sm:mb-10 ${centered ? "justify-center" : ""}`}>
        {roles.map((role, i) => (
          <button
            key={role}
            type="button"
            aria-label={`Show ${role}`}
            onClick={() => onSelectRole(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === roleIdx ? "w-6 bg-cyan" : "w-1.5 bg-white/25 hover:bg-white/40 light:bg-slate-300 light:hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion() ?? false;
  const [roleIdx, setRoleIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <motion.section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-20 pt-24 max-[768px]:min-h-0 max-[768px]:items-start max-[768px]:overflow-x-clip max-[768px]:pb-12 max-[768px]:pt-28 sm:min-h-screen sm:px-8 sm:pb-24 sm:pt-28 lg:px-10 lg:pt-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.65 }}
    >
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* —— Mobile layout (≤768px) —— */}
        <div className="flex w-full flex-col items-center text-center min-[769px]:hidden">
          <motion.div variants={fadeUp} className="relative mb-5 mt-4 w-full max-w-[220px] xs:max-w-[240px]">
            <ProfileFlipCard
              reduce={reduce}
              isFlipped={isFlipped}
              onFlipChange={setIsFlipped}
              mobile
            />
            <div className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2">
              <AvailabilityBadge compact />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="m-typo-hero mb-3 max-w-full px-1 font-display text-[2.65rem] font-bold leading-[1.05] tracking-tight"
          >
            <span className="text-foreground">Aruljothi</span>{" "}
            <span className="name-accent">K</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="w-full">
            <RoleDisplay roleIdx={roleIdx} onSelectRole={setRoleIdx} centered />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="m-typo-body -mt-2 mb-6 max-w-md px-2 text-[15px] leading-relaxed text-muted-foreground light:text-[#475569]"
          >
            {MOBILE_INTRO}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex w-full max-w-sm flex-row gap-3 px-2"
          >
            <a
              href="#contact"
              data-cursor="hover"
              className="btn-primary m-typo-btn inline-flex min-h-[3rem] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border border-cyan/50 bg-black/5 px-3 py-3.5 font-medium text-foreground shadow-[0_0_24px_rgba(94,239,255,0.12)] transition hover:border-cyan hover:bg-cyan/10 dark:bg-black/40 dark:text-white"
            >
              <MessageCircle size={16} className="shrink-0 text-cyan" aria-hidden />
              <span className="truncate">Contact Me</span>
            </a>
            <a
              href="#projects"
              data-cursor="hover"
              className="btn-secondary m-typo-btn inline-flex min-h-[3rem] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border border-cyan/50 bg-cyan/10 px-3 py-3.5 font-medium text-cyan shadow-[0_0_24px_rgba(94,239,255,0.15)] transition hover:bg-cyan hover:text-primary-foreground"
            >
              <span className="truncate">View Project</span>
              <ArrowUpRight size={16} className="shrink-0" aria-hidden />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-5 w-full max-w-sm">
            <SocialDock items={socials} />
          </motion.div>
        </div>

        {/* —— Desktop / tablet layout (≥769px) — unchanged —— */}
        <div className="hidden min-[769px]:grid min-[769px]:grid-cols-1 min-[769px]:items-center min-[769px]:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="max-w-xl">
            <motion.div variants={fadeUp} className="mb-6 inline-flex max-w-full items-center gap-2">
              <AvailabilityBadge />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="m-typo-hero mb-4 font-display text-[2.65rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[1.02]"
            >
              <span className="text-foreground">Aruljothi</span>{" "}
              <span className="name-accent">K</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground sm:text-xs"
            >
              MERN Stack <span className="text-cyan">·</span> Full-Stack{" "}
              <span className="text-cyan">·</span> React
            </motion.p>

            <motion.p
  variants={fadeUp}
  className="m-typo-body mb-8 max-w-md text-[15px] leading-relaxed text-muted-foreground light:text-[#475569] sm:text-base"
>
  Full Stack Developer specializing in{" "}
  <span className="font-medium text-foreground">
    Java Full Stack & MERN Stack
  </span>{" "}
  development, building scalable web applications with clean code,
  responsive interfaces, and practical solutions.
</motion.p>

            <motion.div variants={fadeUp}>
              <RoleDisplay roleIdx={roleIdx} onSelectRole={setRoleIdx} />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Magnetic className="w-full sm:w-auto">
                <a
                  href="#contact"
                  data-cursor="hover"
                  className="btn-primary m-typo-btn inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-cyan/50 bg-black/5 px-5 py-3 font-medium text-foreground shadow-[0_0_24px_rgba(94,239,255,0.15)] transition hover:border-cyan hover:bg-cyan/10 dark:bg-black/40 dark:text-white sm:w-auto"
                >
                  <MessageCircle size={16} className="text-cyan" />
                  Contact Me
                  <span className="relative ml-0.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                    <span className="relative h-2 w-2 rounded-full bg-cyan" />
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={12} className="w-full sm:w-auto">
                <a
                  href="#projects"
                  data-cursor="hover"
                  className="btn-secondary m-typo-btn inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-5 py-3 font-medium text-muted-foreground transition hover:border-cyan/40 hover:text-foreground dark:border-white/20 dark:bg-black/30 dark:text-white/85 dark:hover:border-white/40 dark:hover:text-white sm:w-auto"
                >
                  View Projects <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="relative mx-auto w-full max-w-[280px] sm:max-w-[380px] lg:ml-auto"
          >
            <ProfileFlipCard
              reduce={reduce}
              isFlipped={isFlipped}
              onFlipChange={setIsFlipped}
            />
            <SocialDock items={socials} />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
