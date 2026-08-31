import { useEffect, useState, Component, type ComponentType, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SkillCategoryCard } from "@/components/skills/SkillCategoryCard";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Aruljothi K" },
      {
        name: "description",
        content:
          "MERN Stack Developer — skills in MongoDB, Express.js, React.js, Node.js, and full-stack web technologies.",
      },
    ],
  }),
  component: SkillsPage,
});

function GlobePlaceholder() {
  return (
    <div className="flex h-[min(68vh,520px)] w-full items-center justify-center sm:h-[min(78vh,720px)]">
      <div className="h-44 w-44 animate-pulse rounded-full border border-sky-400/20 bg-sky-500/5 shadow-[0_0_50px_rgba(56,189,248,0.15)] sm:h-60 sm:w-60 light:border-[#E2E8F0] light:bg-[#ECFEFF] light:shadow-[0_4px_24px_rgba(15,23,42,0.06)]" />
    </div>
  );
}

class GlobeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error("Skills globe error:", error);
  }

  render() {
    if (this.state.failed) return <GlobePlaceholder />;
    return this.props.children;
  }
}

/** Mount the heavy 3D globe only after the page shell is on screen */
function ClientSkillsGlobe() {
  const [Globe, setGlobe] = useState<ComponentType | null>(null);

  useEffect(() => {
    let alive = true;
    import("@/components/skills/SkillsGlobe")
      .then((m) => {
        if (alive) setGlobe(() => m.SkillsGlobe);
      })
      .catch((err) => {
        console.error("Failed to load SkillsGlobe:", err);
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!Globe) return <GlobePlaceholder />;
  return (
    <GlobeBoundary>
      <Globe />
    </GlobeBoundary>
  );
}

function SkillsPage() {
  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-transparent">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(14, 40, 70, 0.45) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-4 pb-6 pt-24 sm:px-6 lg:pb-8 lg:pt-24">
        <header className="mx-auto max-w-2xl shrink-0 pb-3 text-center sm:pb-5 lg:pb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan/70">
            Capabilities
          </p>
          <h1 className="m-typo-section mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Technical <span className="gradient-text">Skills</span>
          </h1>
        </header>

        <div className="relative mt-1 flex shrink-0 items-center justify-center sm:mt-2">
          <ClientSkillsGlobe />
        </div>

        <div className="relative z-20 mt-6 sm:mt-12 md:mt-14">
          <SkillCategoryCard />
        </div>
      </div>
    </main>
  );
}
