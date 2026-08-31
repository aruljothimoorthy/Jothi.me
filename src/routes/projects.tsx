import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionLabel, Magnetic, TiltCard } from "@/components/motion";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Aruljothi K" },
      {
        name: "description",
        content: "Complete portfolio of projects by Aruljothi K.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="relative min-h-screen px-4 py-20 sm:px-5 lg:py-20">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 lg:mb-8">
          <SectionLabel>Featured Work</SectionLabel>
          <h1 className="m-typo-section mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            All <span className="gradient-text">Projects</span>
          </h1>
          <p className="m-typo-body mt-4 max-w-xl text-sm text-muted-foreground">
            Full catalogue of builds — platforms, dashboards, and intelligent systems.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div key={p.title} className="card-hover-lift group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-[#0a0e1f]/55 backdrop-blur-xl light:border-[#E2E8F0] light:bg-[rgba(255,255,255,0.8)] light:shadow-[0_4px_24px_rgba(15,23,42,0.06)]">
            <TiltCard
              className="relative h-full"
            >
              <div className="relative overflow-hidden bg-[#05060f] light:bg-[#F1F5F9]">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className={`aspect-[16/10] w-full transition duration-700 ${
                      p.imageFit === "contain"
                        ? "object-contain p-2 group-hover:scale-[1.02]"
                        : "object-cover group-hover:scale-110"
                    }`}
                  />
                ) : (
                  <div
                    className={`aspect-[16/10] w-full bg-gradient-to-br ${p.gradient} flex items-center justify-center`}
                    aria-hidden
                  >
                    <span className="font-display text-4xl font-bold text-white/20 light:text-[#CBD5E1]">{p.title.charAt(0)}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-[#05060f]/40 to-transparent opacity-90" />
                <span className="absolute top-4 right-4 rounded-md border border-white/10 bg-black/50 px-2 py-0.5 font-mono text-[11px] text-cyan backdrop-blur light:border-[#E2E8F0] light:bg-white/90">
                  0{i + 1}
                </span>
                <ArrowUpRight
                  className="absolute bottom-4 right-4 text-white opacity-0 transition group-hover:opacity-100 light:text-[#0891B2]"
                  size={18}
                />
              </div>
              <div className="relative p-6">
                <h3
                  className={`m-typo-project-title mb-2 font-display text-lg font-semibold transition group-hover:brightness-125 ${p.titleColor}`}
                >
                  {p.title}
                </h3>
                <p className="m-typo-project-desc mb-5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/8 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground light:border-[#E2E8F0] light:bg-[#ECFEFF] light:text-[#0E7490]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2.5">
                  <Magnetic strength={8} className={p.githubUrl ? "flex-1" : "w-full"}>
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="m-typo-btn inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-cyan/25 bg-cyan/10 px-3 py-2.5 font-medium text-cyan transition hover:bg-cyan hover:text-primary-foreground"
                    >
                      <ExternalLink size={13} /> Live Demo
                    </a>
                  </Magnetic>
                  {p.githubUrl ? (
                    <Magnetic strength={8} className="flex-1">
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        className="btn-secondary m-typo-btn inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/12 px-3 py-2.5 font-medium text-muted-foreground transition hover:border-purple/40 hover:text-foreground"
                      >
                        <Github size={13} /> GitHub
                      </a>
                    </Magnetic>
                  ) : null}
                </div>
              </div>
            </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
