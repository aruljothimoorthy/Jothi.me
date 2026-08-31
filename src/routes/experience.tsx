import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/motion";
import { experienceItems } from "@/data/experience";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Aruljothi K" },
      {
        name: "description",
        content: "Full education and work experience of Aruljothi K.",
      },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <main className="relative min-h-screen px-4 py-20 sm:px-5 lg:py-20">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-10 lg:mb-8">
          <SectionLabel>Education & Work</SectionLabel>
          <h1 className="m-typo-section mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Full <span className="gradient-text">Experience</span>
          </h1>
        </div>

        <div className="relative pl-7 sm:pl-10">
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-cyan via-purple to-transparent sm:left-[11px]" />
          {experienceItems.map((item) => (
            <div key={item.title} className="relative mb-10 last:mb-0 lg:mb-8">
              <span className="absolute -left-[25px] top-2 h-3 w-3 rounded-full bg-cyan shadow-[0_0_16px_rgba(103,232,249,0.8)] ring-4 ring-cyan/15 light:shadow-[0_0_12px_rgba(8,145,178,0.4)] sm:-left-[33px]" />
              <p className="mb-2 font-mono text-[10px] tracking-widest text-cyan sm:text-[11px]">{item.period}</p>
              <h3 className="m-typo-exp-title font-display text-xl font-semibold sm:text-2xl">{item.title}</h3>
              <p className="mt-1 font-mono text-xs text-purple/90">{item.sub}</p>
              <p className="m-typo-desc mt-1 text-sm text-foreground/80">{item.org}</p>
              <p className="m-typo-exp-desc mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/8 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground light:border-[#E2E8F0] light:bg-[#F1F5F9] light:text-[#475569]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
