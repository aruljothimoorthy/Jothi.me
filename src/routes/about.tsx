import { useState, type CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  ExternalLink,
  Github,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { SiGithub, SiHackerrank, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { Reveal, Magnetic, ease } from "@/components/motion";
import { GitHubContributions } from "@/components/GitHubContributions";
import aruljothiImg from "@/components/assets/aruljothi.png";

const GITHUB_URL = "https://github.com/aruljothimoorthy";
const GITHUB_USERNAME = "aruljothimoorthy";

type ProfileLink = {
  label: string;
  handle: string;
  href: string;
  Icon: IconType | LucideIcon;
  accent: string;
  glow: string;
};

const PROFILE_LINKS: ProfileLink[] = [
  {
    label: "GitHub",
    handle: "aruljothimoorthy",
    href: GITHUB_URL,
    Icon: SiGithub,
    accent: "#e6edf3",
    glow: "rgba(230,237,243,0.18)",
  },
  {
    label: "LinkedIn",
    handle: "aruljothi-moorthy",
    href: "https://www.linkedin.com/in/aruljothi-moorthy",
    Icon: FaLinkedin,
    accent: "#0a66c2",
    glow: "rgba(10,102,194,0.28)",
  },
  {
    label: "HackerRank",
    handle: "aruljothi128v",
    href: "https://www.hackerrank.com/profile/aruljothi128v",
    Icon: SiHackerrank,
    accent: "#00ea64",
    glow: "rgba(0,234,100,0.22)",
  },
  {
    label: "LeetCode",
    handle: "Aruljothi128k",
    href: "https://leetcode.com/u/Aruljothi128k/",
    Icon: SiLeetcode,
    accent: "#ffa116",
    glow: "rgba(255,161,22,0.24)",
  },
  {
    label: "Naukri",
    handle: "My Profile",
    href: "https://www.naukri.com/mnjuser/profile",
    Icon: Briefcase,
    accent: "#275df5",
    glow: "rgba(39,93,245,0.28)",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aruljothi K" },
      {
        name: "description",
        content:
          "About Aruljothi K — MCS student at Anna University, Madras Institute of Technology, MERN Stack Developer.",
      },
    ],
  }),
  component: AboutPage,
});

const glass =
  "card-hover-lift relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(8,12,22,0.72)] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)] light:border-[#E2E8F0] light:bg-[rgba(255,255,255,0.8)] light:shadow-[0_4px_24px_rgba(15,23,42,0.06)]";

function AboutPage() {
  const reduce = useReducedMotion();
  const [eduHover, setEduHover] = useState(false);

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-transparent">
      <div
        className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 42%, rgba(14,60,100,0.45) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 lg:pb-14 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          {/* Intro */}
          <Reveal>
            <div>
              <h1 className="m-typo-section font-display text-4xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-cyan to-sky-400 bg-clip-text text-transparent">
                  Aruljothi K
                </span>
              </h1>

              <p className="m-typo-body mt-5 text-base leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-7">
                I&apos;m a{" "}
                <span className="font-medium text-foreground">1st-year MCS student</span> at{" "}
                <span className="font-medium text-foreground">
                  Anna University — Madras Institute of Technology
                </span>
                , pursuing a Master of Computer Science while building full-stack web applications
                with the MERN stack.
              </p>

              <p className="m-typo-body mt-4 text-base leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-7">
                My focus is on clean architecture, responsive UI, and practical engineering —
                from payment platforms and FinTech dashboards to healthcare systems. I care about
                code that ships reliably and interfaces that feel intentional.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-muted-foreground sm:py-1 sm:text-[11px] light:border-[#E2E8F0] light:bg-[#F1F5F9] light:text-[#475569]">
                  Chennai, India
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-muted-foreground sm:py-1 sm:text-[11px] light:border-[#E2E8F0] light:bg-[#F1F5F9] light:text-[#475569]">
                  Anna University · MIT
                </span>
                <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1.5 font-mono text-xs text-cyan sm:py-1 sm:text-[11px] light:border-[#0891B2] light:bg-[#ECFEFF] light:text-[#0E7490]">
                  MCS · 1st Year
                </span>
              </div>
            </div>
          </Reveal>

          {/* Education */}
          <Reveal delay={0.08}>
            <div>
              <h2 className="m-typo-section mb-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Education
              </h2>

              <motion.div
                data-cursor="hover"
                className={`${glass} p-5 sm:p-6`}
                onHoverStart={() => setEduHover(true)}
                onHoverEnd={() => setEduHover(false)}
              >
                <div className="flex gap-4 sm:gap-5">
                  <div className="relative shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-cyan/30 bg-cyan/10 font-display text-base font-bold text-cyan sm:h-16 sm:w-16 sm:text-base">
                      MIT
                    </div>
                    <motion.img
                      src={aruljothiImg}
                      alt="Aruljothi K"
                      className="absolute inset-0 h-16 w-16 rounded-xl border border-white/15 object-cover sm:h-16 sm:w-16"
                      initial={false}
                      animate={{ opacity: eduHover ? 1 : 0, scale: eduHover ? 1 : 0.92 }}
                      transition={{ duration: 0.25, ease }}
                    />
                    <span className="pointer-events-none absolute -bottom-5 left-0 whitespace-nowrap font-mono text-[11px] text-muted-foreground/70 sm:text-[9px]">
                      hover for photo
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="font-display text-xl font-semibold text-foreground sm:text-xl">
                      Anna University
                    </p>
                    <p className="mt-0.5 text-base font-medium text-cyan sm:text-sm">
                      Master of Computer Science (MCS)
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground sm:text-xs">
                      Madras Institute of Technology, Chennai
                    </p>

                    <div className="mt-4 space-y-2 font-mono text-sm text-muted-foreground sm:space-y-1.5 sm:text-xs">
                      <p>
                        <span className="text-foreground/80">Year · Semester:</span> 1st Year · 1st
                        Semester
                      </p>
                      <p>
                        <span className="text-foreground/80">Result:</span>{" "}
                        <span className="font-semibold text-cyan">63.44%</span>
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/35 bg-cyan/10 px-3 py-1.5 font-mono text-xs tracking-wide text-cyan sm:px-2.5 sm:py-1 sm:text-[10px]">
                        <GraduationCap size={14} className="sm:h-3 sm:w-3" />
                        1st Year
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* Profile links */}
        <Reveal delay={0.1} className="mt-10 sm:mt-12">
          <div>
            <p className="mb-4 font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase sm:text-[10px]">
              Profiles
            </p>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
              {PROFILE_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className={`${glass} group flex items-center gap-3 p-4 sm:p-4`}
                  initial={false}
                  style={
                    {
                      "--profile-accent": link.accent,
                      "--profile-glow": link.glow,
                    } as CSSProperties
                  }
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 transition duration-300 group-hover:border-[color:var(--profile-accent)]/40 group-hover:shadow-[0_0_20px_var(--profile-glow)] sm:h-10 sm:w-10 light:border-[#E2E8F0] light:bg-white"
                    style={{ backgroundColor: `${link.accent}14` }}
                  >
                    <link.Icon
                      className="h-5 w-5 transition duration-300 group-hover:scale-110 sm:h-[18px] sm:w-[18px]"
                      style={{ color: link.accent }}
                      aria-hidden
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold text-foreground sm:text-[13px]">
                      {link.label}
                    </p>
                    <p className="truncate font-mono text-xs text-muted-foreground sm:text-[10px]">
                      @{link.handle}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-muted-foreground/60 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--profile-accent)] sm:h-3.5 sm:w-3.5"
                    aria-hidden
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* GitHub contributions */}
        <Reveal delay={0.12} className="mt-10 sm:mt-12">
          <div className={`${glass} p-5 sm:p-6 md:p-7`}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Github size={18} className="text-cyan sm:h-4 sm:w-4" />
                <p className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase sm:text-[10px]">
                  GitHub Contributions
                </p>
              </div>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-1.5 font-mono text-sm text-cyan transition hover:text-cyan/80 sm:text-[11px]"
              >
                {GITHUB_USERNAME}
                <ExternalLink size={14} className="sm:h-3 sm:w-3" />
              </a>
            </div>

            <GitHubContributions username={GITHUB_USERNAME} />
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-8 flex justify-center sm:mt-10">
            <Magnetic>
              <Link
                to="/skills"
                data-cursor="hover"
                className="btn-primary m-typo-btn inline-flex items-center gap-2 rounded-full border border-cyan/35 bg-black/50 px-7 py-3.5 text-base font-medium text-cyan shadow-[0_0_28px_rgba(103,232,249,0.15)] transition hover:bg-cyan hover:text-primary-foreground sm:py-3 sm:text-sm"
              >
                View Skills <ArrowUpRight size={18} className="sm:h-4 sm:w-4" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
