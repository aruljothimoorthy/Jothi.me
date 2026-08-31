import { Reveal, SectionLabel } from "@/components/motion";
import { ViewMoreLink } from "@/components/PageNav";
import { experienceItems, HOME_EXPERIENCE_PREVIEW_COUNT } from "@/data/experience";

const previewItems = experienceItems.slice(0, HOME_EXPERIENCE_PREVIEW_COUNT);

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden px-4 py-16 sm:px-5 lg:py-20">
      <div className="pointer-events-none absolute top-1/3 left-[-12%] h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-cyan/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>Education & Work</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="m-typo-section mt-4 mb-10 font-display text-3xl font-semibold tracking-tight sm:mb-16 sm:text-5xl">
            Experience <span className="gradient-text">& Journey</span>
          </h2>
        </Reveal>

        <div className="relative pl-7 sm:pl-10">
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-cyan via-purple to-transparent light:from-[#CBD5E1] light:via-[#94A3B8] light:to-transparent sm:left-[11px]" />

          {previewItems.map((item, i) => (
            <Reveal key={item.title} delay={0.1 * i} className="relative mb-10 last:mb-0 sm:mb-14">
              <span className="absolute -left-[25px] top-2 h-3 w-3 rounded-full bg-cyan shadow-[0_0_16px_rgba(103,232,249,0.8)] ring-4 ring-cyan/15 light:shadow-[0_0_12px_rgba(8,145,178,0.4)] sm:-left-[33px]" />

              <p className="mb-2 font-mono text-[10px] tracking-widest text-cyan sm:text-[11px]">{item.period}</p>
              <h3 className="m-typo-exp-title font-display text-xl font-semibold text-foreground transition hover:text-cyan sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-cyan/80">{item.sub}</p>
              <p className="m-typo-desc mt-1 text-sm text-foreground/80">{item.org}</p>
              <p className="m-typo-exp-desc mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.body}</p>
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
            </Reveal>
          ))}
        </div>

        {experienceItems.length > HOME_EXPERIENCE_PREVIEW_COUNT ? (
          <ViewMoreLink to="/experience" label="View Full Experience" />
        ) : null}
      </div>
    </section>
  );
}
