import type { ComponentType } from "react";

export function Html5Icon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4.5 2 3 4.5v15L12 22l9-2.5v-15L19.5 2H4.5zm8.2 13.5-3.2.9-.7-4.2h3.5l.4-2.5H8.8l-.2-1.2h6.5l.4-2.5H6.3L5.5 4.5h13l.5 3H9.8l-.3 1.8h6.8l-.6 3.5-4.2 1.2z" />
    </svg>
  );
}

export function Css3Icon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4.5 2 3 4.5v15L12 22l9-2.5v-15L19.5 2H4.5zm11.8 14.5-3.9 1.1-.9-5.4h-3.5l.5 3.2 2 .6-.2 1.4-3.5 1-.7-4.3H7.8l1.2-7.5h8.6l-.3 1.8H9.5l-.2 1.2h5.9l-.4 2.5-3.8 1.1z" />
    </svg>
  );
}

export function JavaScriptIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="2" opacity="0.15" />
      <path d="M8.5 17.5c.8 1 2 1.5 3.2 1.5 1.8 0 2.8-1 2.8-2.3 0-3.3-4.1-2.8-4.1-5.2 0-1.1.9-2 2.4-2 .9 0 1.7.3 2.2.8l-.9 1.4c-.4-.4-1-.6-1.6-.6-1 0-1.5.6-1.5 1.3 0 2.5 4.1 2.1 4.1 5.1 0 1.9-1.4 2.9-3.3 2.9-1.5 0-2.8-.6-3.5-1.5l1.3-1.4zM14.8 17.8c.7.9 1.8 1.4 3 1.4 1.5 0 2.4-.8 2.4-1.9 0-2.7-3.8-2.2-3.8-4.5 0-.8.7-1.3 1.7-1.3.8 0 1.4.2 1.9.6l-.8 1.3c-.3-.3-.8-.5-1.2-.5-.7 0-1.1.4-1.1.9 0 1.9 3.8 1.6 3.8 4.2 0 1.6-1.2 2.5-2.9 2.5-1.2 0-2.3-.4-3-1.2l1-1.5z" />
    </svg>
  );
}

export function ReactIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <ellipse cx="12" cy="12" rx="9" ry="3.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TypeScriptIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="2" opacity="0.18" />
      <path d="M8 8h8v2h-3v6H8V8zm6.5 6.2c.8.7 1.8 1.1 2.9 1.1V18c-1.8 0-3.4-.7-4.6-2l1.7-1.8z" />
    </svg>
  );
}

export function BootstrapIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M7 4h7.5c3.2 0 5.5 1.8 5.5 4.7 0 2-1.2 3.4-3 3.9 2.2.5 3.5 2.2 3.5 4.6 0 3.4-2.6 5.8-6.8 5.8H7V4zm4.2 7.2h2.8c1.4 0 2.2-.7 2.2-1.8 0-1.2-.9-1.8-2.4-1.8h-2.6v3.6zm0 7.4h3.2c1.6 0 2.5-.7 2.5-2 0-1.3-.9-2-2.7-2h-3v4z" />
    </svg>
  );
}

export function TailwindIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 6c-2.8 0-4.5 1.4-5.1 4.2 1-1.4 2.2-1.9 3.6-1.7 1 .2 1.7.8 2.5 1.4 1.3.9 2.7 1.9 5.8 1.9 2.8 0 4.5-1.4 5.1-4.2-1 1.4-2.2 1.9-3.6 1.7-1-.2-1.7-.8-2.5-1.4C16.5 6.9 15.1 6 12 6zm-5.1 6.8c-2.8 0-4.5 1.4-5.1 4.2 1-1.4 2.2-1.9 3.6-1.7 1 .2 1.7.8 2.5 1.4 1.3.9 2.7 1.9 5.8 1.9 2.8 0 4.5-1.4 5.1-4.2-1 1.4-2.2 1.9-3.6 1.7-1-.2-1.7-.8-2.5-1.4-1.3-.9-2.7-1.9-5.8-1.9z" />
    </svg>
  );
}

export function NodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2 4 6.5v11L12 22l8-4.5v-11L12 2zm0 2.2 5.8 3.3v8.9L12 20.8l-5.8-3.4V7.5L12 4.2z" />
      <path d="M12 8.5 9.5 10v4l2.5 1.5L14.5 14v-4L12 8.5z" opacity="0.85" />
    </svg>
  );
}

export function ExpressIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4 18.5V5.5h2.8l4.2 7.5 4.2-7.5H18v13h-2.5v-8.3l-3.8 6.8h-1.4l-3.8-6.8v8.3H4z" />
    </svg>
  );
}

export function MySqlIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 3c-4 0-7 1.5-7 4.5 0 1.2.8 2.3 2.2 3-1.4.7-2.2 1.8-2.2 3 0 3 3 4.5 7 4.5s7-1.5 7-4.5c0-1.2-.8-2.3-2.2-3 1.4-.7 2.2-1.8 2.2-3C19 4.5 16 3 12 3zm0 2c2.8 0 4.5.8 4.5 2s-1.7 2-4.5 2-4.5-.8-4.5-2S9.2 5 12 5zm0 8c2.8 0 4.5.8 4.5 2s-1.7 2-4.5 2-4.5-.8-4.5-2 1.7-2 4.5-2z" />
    </svg>
  );
}

export function SqlIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

export function PostgresIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 3C8 3 5 5.5 5 9c0 2 .9 3.8 2.4 5-1.5 1-2.4 2.5-2.4 4.2 0 3.2 3.1 5.8 7 5.8s7-2.6 7-5.8c0-1.7-.9-3.2-2.4-4.2 1.5-1.2 2.4-3 2.4-5 0-3.5-3-6-7-6zm-1.2 4.5h2.4l.6 3.6h-3.6l.6-3.6zm0 6h3.6l-.6 3.6h-2.4l-.6-3.6z" />
    </svg>
  );
}

export function JavaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8.5 18.5s-.8.9.6 1.2c1.8.4 2.8.4 4.9-.1 0 0 .5.3 1.2.5-3.7 1.6-8.6-.1-6.7-1.6zM8 16.2s-1 .9.5 1.3c2 .5 5.3.4 7.4-.2 0 0 .4.4 1 .6-4.2 1.2-9.5.1-8.9-1.7z" />
      <path d="M12 3s3.5 3.5 1.2 5.5c-.3 2.5-2.5 3.8-2.5 3.8s2.8-.7 2.5-3.2C12.5 7.5 10 6.5 12 3z" />
      <path d="M9 10.5s-2.8 2-1 3.2c2.5 1.9 7.5 1.9 7.5 1.9s-1.5 1-4 1.2c-3.5.3-6.5-.5-8.5-2.2-1.5-1.2 2-3.1 2-3.1z" />
    </svg>
  );
}

export function PythonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C9.2 2 7 3.4 7 6.2v1.3H12c1.1 0 2 .9 2 2v4.5H7.8C5 14 3 15.8 3 18.5S5 23 7.8 23H12c2.8 0 5-1.4 5-4.2v-1.3H12c-1.1 0-2-.9-2-2V10.5h6.2C21 10.5 23 8.7 23 6S20.8 2 18 2H12zm-2.2 2.8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm8.4 14.4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
  );
}

export function MongoDbIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C9.5 6.5 8 10 8 13.5c0 3.2 1.8 5.8 4 7.5 2.2-1.7 4-4.3 4-7.5C16 10 14.5 6.5 12 2zm0 17.5c-1.2-.9-2.5-2.8-2.5-5 0-2.2.8-4.5 2.5-7.5 1.7 3 2.5 5.3 2.5 7.5 0 2.2-1.3 4.1-2.5 5z" />
    </svg>
  );
}

export function JavaPlainIcon({ className = "" }: { className?: string }) {
  return <JavaIcon className={className} />;
}

export function GitIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 5h2v5.17l2.59 2.59-1.41 1.41L10 13V7z" />
    </svg>
  );
}

export function AiIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2l1.8 5.5H19l-4.5 3.3 1.7 5.2L12 14.8 7.8 16l1.7-5.2L5 7.5h5.2L12 2z" opacity="0.25" />
      <path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

export function MlIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="5" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="5" r="2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="2" fill="currentColor" stroke="none" />
      <path d="M7 11l3-4M13 7l3 4M17 13l-3 4M11 17l-3-4" />
    </svg>
  );
}

export function NextJsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.2 14.5V7.5L9.8 16.5h2.4z" />
    </svg>
  );
}

export function DockerIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4 10h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm-6 3h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3-3h2v2h-2v-2zM7 13h2v2H7v-2zm8 0h2v2h-2v-2zm3 3H6c0 2.2 1.8 4.5 4.5 4.5 2.4 0 4.4-1.6 4.9-3.8h5.1V16h-2v-2h2v-2h-2v-2h2v-2h-2V8h2V6h-2V4h-2v2h-2V4h-2v2h-2V4H9v2H7V4H5v2H3v2h2v2H3v2h2v2H3v2h2v2H3v2h14v-2z" />
    </svg>
  );
}

export function RedisIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2 4 6v12l8 4 8-4V6l-8-4zm0 2.2 5.8 3.3v8.9L12 20.8l-5.8-3.4V7.5L12 4.2z" opacity="0.35" />
      <path d="M8 10.5h8v1.5H8v-1.5zm0 3h8v1.5H8v-1.5z" />
    </svg>
  );
}

export function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.11-1.48-1.11-1.48-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.28 9.28 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

export function VercelIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="m12 3 10 18H2L12 3z" />
    </svg>
  );
}

export function FramerMotionIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4 4h16v7H12v9H4V4z" />
    </svg>
  );
}

export function FigmaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 12a4 4 0 0 0 4 4v-4H8zm0-4a4 4 0 0 0 4 4V4H8a4 4 0 0 0 0 8zm8 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-4 8a4 4 0 0 0 4-4h-4v4z" />
    </svg>
  );
}

export function NumPyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M5 5h3.5l2 8.5L12.5 5H16l-3.5 14h-2.5L7 5H5zm9.5 0H18v14h-2.5V5h-1z" />
    </svg>
  );
}

export function PandasIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6 4h12v3H6V4zm0 5h12v11H6V9zm2.5 2v7h7v-7h-7z" opacity="0.9" />
    </svg>
  );
}

export type TechIconComponent = ComponentType<{ className?: string }>;

export const TECH_ICONS: Record<string, TechIconComponent> = {
  HTML5: Html5Icon,
  CSS3: Css3Icon,
  JavaScript: JavaScriptIcon,
  "React.js": ReactIcon,
  TypeScript: TypeScriptIcon,
  Bootstrap: BootstrapIcon,
  "Tailwind CSS": TailwindIcon,
  "Node.js": NodeIcon,
  "Express.js": ExpressIcon,
  MySQL: MySqlIcon,
  SQL: SqlIcon,
  PostgreSQL: PostgresIcon,
  "Core Java": JavaIcon,
  Java: JavaPlainIcon,
  Python: PythonIcon,
  MongoDB: MongoDbIcon,
  Git: GitIcon,
  AI: AiIcon,
  ML: MlIcon,
  "Next.js": NextJsIcon,
  Docker: DockerIcon,
  Redis: RedisIcon,
  GitHub: GitHubIcon,
  Vercel: VercelIcon,
  "Framer Motion": FramerMotionIcon,
  Figma: FigmaIcon,
  NumPy: NumPyIcon,
  Pandas: PandasIcon,
};

export const TECH_COLORS: Record<string, string> = {
  HTML5: "text-orange-400",
  CSS3: "text-sky-400",
  JavaScript: "text-yellow-300",
  "React.js": "text-cyan",
  TypeScript: "text-blue-400",
  Bootstrap: "text-purple-400",
  "Tailwind CSS": "text-teal-400",
  "Node.js": "text-emerald-400",
  "Express.js": "text-slate-200",
  MySQL: "text-blue-400",
  SQL: "text-violet-300",
  PostgreSQL: "text-indigo-400",
  "Core Java": "text-amber-400",
  Java: "text-red-400",
  Python: "text-yellow-400",
  MongoDB: "text-green-400",
  Git: "text-orange-300",
  AI: "text-fuchsia-400",
  ML: "text-violet-400",
  "Next.js": "text-slate-100",
  Docker: "text-sky-300",
  Redis: "text-red-400",
  GitHub: "text-slate-100",
  Vercel: "text-slate-100",
  "Framer Motion": "text-fuchsia-400",
  Figma: "text-orange-400",
  NumPy: "text-blue-400",
  Pandas: "text-indigo-300",
};

/** Hex glow accents for 3D skill badges */
export const TECH_GLOW: Record<string, string> = {
  HTML5: "#f97316",
  CSS3: "#38bdf8",
  JavaScript: "#facc15",
  "React.js": "#22d3ee",
  TypeScript: "#60a5fa",
  Bootstrap: "#c084fc",
  "Tailwind CSS": "#2dd4bf",
  "Node.js": "#34d399",
  "Express.js": "#e2e8f0",
  MySQL: "#60a5fa",
  SQL: "#c4b5fd",
  PostgreSQL: "#818cf8",
  "Core Java": "#fbbf24",
  Java: "#ef4444",
  Python: "#eab308",
  MongoDB: "#4ade80",
  Git: "#fb923c",
  AI: "#e879f9",
  ML: "#a78bfa",
  "Next.js": "#f1f5f9",
  Docker: "#7dd3fc",
  Redis: "#f87171",
  GitHub: "#e2e8f0",
  Vercel: "#f8fafc",
  "Framer Motion": "#e879f9",
  Figma: "#fb923c",
  NumPy: "#60a5fa",
  Pandas: "#a5b4fc",
};

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Programming"
  | "AI/ML"
  | "Tools";

/** Globe orbit skill — spherical placement around the wireframe Earth */
export type GlobeOrbitSkill = {
  name: string;
  /** Shorter label shown on the badge pill */
  label?: string;
  category: SkillCategory;
  theta: number;
  phi: number;
  floatPhase: number;
};

const SURFACE_R = 2.18;

/** Minimum angular gap between badges (radians) */
const GLOBE_MIN_ANGULAR_GAP = 0.36;
/** Keep badges off the north pole — phi below this is too close to the top */
const GLOBE_PHI_MIN = 1.35;
const GLOBE_PHI_MAX = 2.08;

function globeAngularDistance(
  a: { theta: number; phi: number },
  b: { theta: number; phi: number },
) {
  const dTheta = a.theta - b.theta;
  const cosD =
    Math.sin(a.phi) * Math.sin(b.phi) * Math.cos(dTheta) +
    Math.cos(a.phi) * Math.cos(b.phi);
  return Math.acos(Math.max(-1, Math.min(1, cosD)));
}

/** Evenly spread points on the sphere — avoids top cap and overlapping badges */
function distributeGlobePositions(count: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const reserved: { theta: number; phi: number }[] = [
    { theta: 1.28, phi: 1.54 }, // AI — front center
    { theta: 1.88, phi: 1.54 }, // ML — front center
  ];

  const candidates: { theta: number; phi: number }[] = [];
  for (let i = 0; i < 400; i++) {
    candidates.push({
      theta: (golden * i) % (Math.PI * 2),
      phi: GLOBE_PHI_MIN + ((i + 0.5) / 400) * (GLOBE_PHI_MAX - GLOBE_PHI_MIN),
    });
  }

  const selected = [...reserved];
  for (const candidate of candidates) {
    if (selected.length >= count) break;
    const ok = selected.every(
      (point) => globeAngularDistance(point, candidate) >= GLOBE_MIN_ANGULAR_GAP,
    );
    if (ok) selected.push(candidate);
  }

  return selected.slice(0, count);
}

const GLOBE_SKILL_DEFS: Omit<GlobeOrbitSkill, "theta" | "phi" | "floatPhase">[] = [
  { name: "AI", category: "AI/ML" },
  { name: "ML", category: "AI/ML" },
  { name: "React.js", category: "Frontend", label: "React" },
  { name: "TypeScript", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "HTML5", category: "Frontend" },
  { name: "CSS3", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend", label: "Tailwind" },
  { name: "Bootstrap", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend", label: "Express" },
  { name: "Python", category: "Programming" },
  { name: "Java", category: "Programming" },
  { name: "Core Java", category: "Programming" },
  { name: "NumPy", category: "AI/ML" },
  { name: "Pandas", category: "AI/ML" },
  { name: "MySQL", category: "Database" },
  { name: "SQL", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "Vercel", category: "Tools" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Figma", category: "Frontend" },
];

function buildGlobeOrbitSkills(): GlobeOrbitSkill[] {
  const positions = distributeGlobePositions(GLOBE_SKILL_DEFS.length);
  return GLOBE_SKILL_DEFS.map((skill, index) => ({
    ...skill,
    theta: positions[index]?.theta ?? 0,
    phi: positions[index]?.phi ?? GLOBE_PHI_MIN,
    floatPhase: (index * 0.47) % (Math.PI * 2),
  }));
}

/** All skills on the 3D globe — evenly spread, no top pole, no overlap */
export const GLOBE_ORBIT_SKILLS: GlobeOrbitSkill[] = buildGlobeOrbitSkills();

export { SURFACE_R as GLOBE_SURFACE_R };

/** Fixed positions on the globe — x/y as fraction of globe radius from center */
export type FixedSkillPosition = {
  name: string;
  category: SkillCategory;
  x: number;
  y: number;
  /** 0 = behind globe, 1 = in front */
  depth: number;
};

export const FIXED_SKILLS: FixedSkillPosition[] = [
  { name: "TypeScript", category: "Frontend", x: 0.88, y: -0.42, depth: 0.92 },
  { name: "React.js", category: "Frontend", x: 0.62, y: -0.72, depth: 0.95 },
  { name: "JavaScript", category: "Frontend", x: 0.18, y: -0.88, depth: 0.93 },
  { name: "HTML5", category: "Frontend", x: -0.42, y: -0.68, depth: 0.88 },
  { name: "CSS3", category: "Frontend", x: -0.72, y: -0.38, depth: 0.82 },
  { name: "Tailwind CSS", category: "Frontend", x: -0.92, y: 0.05, depth: 0.78 },
  { name: "Bootstrap", category: "Frontend", x: -0.78, y: 0.42, depth: 0.72 },
  { name: "PostgreSQL", category: "Database", x: -0.48, y: 0.72, depth: 0.85 },
  { name: "MySQL", category: "Database", x: -0.05, y: 0.92, depth: 0.9 },
  { name: "SQL", category: "Database", x: 0.38, y: 0.82, depth: 0.87 },
  { name: "Node.js", category: "Backend", x: 0.78, y: 0.52, depth: 0.88 },
  { name: "Express.js", category: "Backend", x: 0.92, y: 0.12, depth: 0.8 },
  { name: "Core Java", category: "Programming", x: 0.55, y: -0.08, depth: 0.75 },
];
