import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { Reveal, SectionLabel, TiltCard, Magnetic } from "@/components/motion";
import { ViewMoreLink } from "@/components/PageNav";

export function Projects() {
  // First 3 projects only
  const featured = projects.slice(0, 3);

  return (
    <section id="projects" className="relative overflow-hidden px-4 py-16 sm:px-5 lg:py-20">
      {/* Background Glow */}
      <div className="pointer-events-none absolute bottom-[-15%] left-[-10%] h-[480px] w-[480px] rounded-full bg-cyan/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-10 flex flex-col items-start gap-2 lg:mb-8">
          <Reveal>
            <SectionLabel>FEATURED WORK</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="m-typo-section font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Projects
            </h2>
          </Reveal>
        </div>

        {/* 3 Projects Grid */}
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.title || i} delay={0.06 * i}>
              <div className="card-hover-lift group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117]/80 backdrop-blur-xl light:border-[#E2E8F0] light:bg-[rgba(255,255,255,0.8)] light:shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
              <TiltCard className="relative flex h-full flex-col justify-between p-5 sm:p-6">
                
                {/* Top Accent Line — matches title color */}
                <div className={`mb-6 h-[2px] w-12 rounded-full bg-current ${p.titleColor}`} />

                <div className="flex-1">
                  {/* Title */}
                  <h3
                    className={`m-typo-project-title mb-3 font-display text-lg font-bold transition group-hover:brightness-125 sm:text-xl ${p.titleColor}`}
                  >
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="m-typo-project-desc mb-6 text-sm leading-relaxed text-slate-400 light:text-[#64748B]">
                    {p.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {p.tags?.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-cyan/10 bg-cyan/5 px-2.5 py-1 font-mono text-[11px] font-medium text-cyan/80 light:bg-[#ECFEFF] light:text-[#0E7490]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links — Live always; GitHub only when available */}
                  <div className="flex flex-row items-center gap-2 pt-2 sm:gap-3">
                    <Magnetic strength={5} className={p.githubUrl ? "min-w-0 flex-1" : "w-full"}>
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="m-typo-btn inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-cyan/30 bg-cyan/10 px-2.5 py-2 font-medium text-cyan transition hover:bg-cyan hover:text-black sm:px-3"
                      >
                        <ExternalLink size={13} /> Live Demo
                      </a>
                    </Magnetic>
                    {p.githubUrl ? (
                      <Magnetic strength={5} className="min-w-0 flex-1">
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="hover"
                          className="m-typo-btn inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-2 font-medium text-slate-300 transition hover:border-white/30 hover:text-white sm:px-3 light:border-[#CBD5E1] light:bg-white light:text-[#475569] light:hover:border-[#0891B2] light:hover:text-[#0891B2]"
                        >
                          <Github size={13} /> GitHub
                        </a>
                      </Magnetic>
                    ) : null}
                  </div>
                </div>

              </TiltCard>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View All Projects Button */}
        <ViewMoreLink to="/projects" />
      </div>
    </section>
  );
}