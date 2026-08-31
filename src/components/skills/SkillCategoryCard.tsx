import { useState, type ComponentType } from "react";
import {
  BookOpen,
  Boxes,
  Braces,
  Code2,
  Container,
  Database,
  Figma,
  FileCode2,
  GitBranch,
  Github,
  Globe,
  KeyRound,
  LayoutTemplate,
  Layers,
  Network,
  Package,
  Palette,
  Binary,
  Server,
  SquareCode,
  Wrench,
  Zap,
  Send,
  Chrome,
  Table2,
} from "lucide-react";

type SkillCategoryId = "foundations" | "languages" | "tools";
type IconComp = ComponentType<{ className?: string }>;

type SkillCategory = {
  id: SkillCategoryId;
  tab: string;
  title: string;
  description: string;
  TabIcon: IconComp;
  skills: { name: string; Icon: IconComp }[];
};

const CATEGORIES: SkillCategory[] = [
  {
    id: "foundations",
    tab: "Foundations",
    title: "Programming Foundations",
    description:
      "Core concepts that support problem-solving and application development.",
    TabIcon: BookOpen,
    skills: [
      { name: "OOP", Icon: Boxes },
      { name: "Data Structures", Icon: Network },
      { name: "Algorithms", Icon: Binary },
      { name: "API Design", Icon: Layers },
      { name: "Database Design", Icon: Database },
      { name: "Authentication", Icon: KeyRound },
      { name: "Responsive Design", Icon: LayoutTemplate },
      { name: "Git & Version Control", Icon: GitBranch },
    ],
  },
  {
    id: "languages",
    tab: "Languages",
    title: "Languages & Stack",
    description:
      "Frontend, backend, and database technologies I use to build full-stack web applications.",
    TabIcon: Code2,
    skills: [
      { name: "HTML5", Icon: LayoutTemplate },
      { name: "CSS3", Icon: Palette },
      { name: "JavaScript", Icon: Braces },
      { name: "React.js", Icon: SquareCode },
      { name: "TypeScript", Icon: FileCode2 },
      { name: "Tailwind CSS", Icon: Palette },
      { name: "Bootstrap", Icon: LayoutTemplate },
      { name: "Node.js", Icon: Zap },
      { name: "Express.js", Icon: Server },
      { name: "REST API", Icon: Globe },
      { name: "MongoDB", Icon: Database },
      { name: "Mongoose", Icon: Layers },
      { name: "MySQL", Icon: Database },
      { name: "PostgreSQL", Icon: Server },
      { name: "SQL", Icon: Table2 },
    ],
  },
  {
    id: "tools",
    tab: "Tools",
    title: "Tools & Platforms",
    description:
      "Everyday tooling for building, testing, collaborating, and shipping projects.",
    TabIcon: Wrench,
    skills: [
      { name: "Git", Icon: GitBranch },
      { name: "GitHub", Icon: Github },
      { name: "VS Code", Icon: Code2 },
      { name: "Postman", Icon: Send },
      { name: "npm", Icon: Package },
      { name: "Vite", Icon: Zap },
      { name: "Chrome DevTools", Icon: Chrome },
      { name: "Figma", Icon: Figma },
      { name: "Docker", Icon: Container },
      { name: "MongoDB Compass", Icon: Database },
    ],
  },
];

export function SkillCategoryCard() {
  const [activeId, setActiveId] = useState<SkillCategoryId>("foundations");
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];
  const TitleIcon = active.TabIcon;

  return (
    <section className="mx-auto w-full max-w-4xl px-1 pb-10 pt-10 sm:pb-14 sm:pt-14 md:pt-16">
      <div
        className="mb-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        role="tablist"
        aria-label="Skill categories"
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeId;
          const TabIcon = cat.TabIcon;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-cursor="hover"
              onClick={() => setActiveId(cat.id)}
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-wide transition-all duration-200 sm:px-4 sm:text-xs",
                isActive
                  ? "border-cyan/70 bg-cyan/10 text-cyan shadow-[0_0_18px_rgba(103,232,249,0.18)] light:bg-[#ECFEFF] light:border-[#0891B2] light:text-[#0891B2]"
                  : "border-white/15 bg-transparent text-muted-foreground hover:border-white/30 hover:text-foreground light:border-[#CBD5E1] light:hover:border-[#0891B2] light:hover:bg-[#ECFEFF] light:hover:text-[#0891B2]",
              ].join(" ")}
            >
              <TabIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {cat.tab}
            </button>
          );
        })}
      </div>

      <div
        key={active.id}
        role="tabpanel"
        className="card-hover-lift rounded-2xl border border-cyan/25 bg-[rgba(6,10,18,0.72)] p-5 shadow-[0_0_40px_rgba(56,189,248,0.06)] backdrop-blur-md sm:p-7 light:border-[#E2E8F0] light:bg-[rgba(255,255,255,0.8)] light:shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <TitleIcon className="h-4 w-4 shrink-0 text-cyan" aria-hidden />
              <h2 className="m-typo-subhead font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {active.title}
              </h2>
            </div>
            <p className="m-typo-body mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {active.description}
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-cyan/40 px-2.5 py-1 font-mono text-[10px] tracking-wide text-cyan sm:text-[11px] light:border-[#0891B2] light:bg-[#ECFEFF] light:text-[#0E7490]">
            {active.skills.length} Skills
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
          {active.skills.map(({ name, Icon }) => (
            <span
              key={name}
              className="m-typo-skill inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-foreground/90 transition-colors hover:border-cyan/35 hover:bg-cyan/[0.06] light:border-[#E2E8F0] light:bg-[#F1F5F9] light:text-[#0F172A] light:hover:border-[rgba(8,145,178,0.4)] light:hover:bg-[#ECFEFF]"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-cyan/80" aria-hidden />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
