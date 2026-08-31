import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TECH_COLORS,
  TECH_ICONS,
  FIXED_SKILLS,
  type FixedSkillPosition,
} from "@/components/skills/SkillTechIcons";

function useGlobeSize() {
  const [size, setSize] = useState(520);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setSize(Math.min(w * 0.92, 320));
      else if (w < 1024) setSize(Math.min(w * 0.72, 480));
      else setSize(Math.min(w * 0.52, 620));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

function StarField() {
  const stars = useRef(
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: (i * 43) % 100,
      y: (i * 71) % 100,
      s: i % 7 === 0 ? 1.5 : 1,
      o: 0.06 + (i % 4) * 0.03,
    })),
  ).current;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            opacity: s.o,
          }}
        />
      ))}
    </div>
  );
}

/** Clean static wireframe globe — fewer spaced lines (not dense/messy) */
function WireframeGlobe({ size }: { size: number }) {
  const r = 100;
  // Sparse latitudes & longitudes — clean, readable wireframe
  const lats = [-55, -25, 0, 25, 55];
  const lons = [0, 30, 60, 90, 120, 150];

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size, zIndex: 20 }}
    >
      <div
        className="absolute inset-[20%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(103,232,249,0.22) 0%, rgba(103,232,249,0.06) 50%, transparent 72%)",
          boxShadow: "0 0 70px rgba(103,232,249,0.12)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 200"
        aria-hidden
        style={{ filter: "drop-shadow(0 0 3px rgba(103,232,249,0.35))" }}
      >
        {lats.map((lat) => {
          const ry = Math.max(Math.abs(Math.cos((lat * Math.PI) / 180)) * r, 3);
          return (
            <ellipse
              key={`lat-${lat}`}
              cx="100"
              cy="100"
              rx={r}
              ry={ry}
              fill="none"
              stroke="rgba(103,232,249,0.42)"
              strokeWidth="0.7"
              transform={`translate(0 ${lat * 0.48})`}
            />
          );
        })}

        {lons.map((lon) => (
          <ellipse
            key={`lon-${lon}`}
            cx="100"
            cy="100"
            rx={r}
            ry={24}
            fill="none"
            stroke="rgba(103,232,249,0.32)"
            strokeWidth="0.6"
            transform={`rotate(${lon} 100 100)`}
          />
        ))}

        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="rgba(103,232,249,0.5)"
          strokeWidth="0.85"
        />
      </svg>
    </div>
  );
}

function SkillBadge({
  skill,
  globeRadius,
}: {
  skill: FixedSkillPosition;
  globeRadius: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = TECH_ICONS[skill.name];
  const color = TECH_COLORS[skill.name] ?? "text-cyan";

  const x = skill.x * globeRadius;
  const y = skill.y * globeRadius;
  const scale = 0.88 + skill.depth * 0.14;
  const opacity = 0.55 + skill.depth * 0.45;
  const zIndex = skill.depth >= 0.75 ? 30 + Math.round(skill.depth * 10) : 8 + Math.round(skill.depth * 8);

  return (
    <button
      type="button"
      data-cursor="hover"
      className="absolute left-1/2 top-1/2 outline-none transition-transform duration-300"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${hovered ? scale * 1.1 : scale})`,
        opacity: hovered ? 1 : opacity,
        zIndex,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 backdrop-blur-sm transition-all duration-300 sm:px-3.5 sm:py-2 ${
          hovered
            ? "border-cyan/50 bg-[#0c1220]/95 shadow-[0_0_24px_rgba(103,232,249,0.4)]"
            : "border-white/10 bg-[#0a0e18]/75 shadow-[0_0_10px_rgba(103,232,249,0.08)]"
        }`}
      >
        {Icon && (
          <Icon
            className={`h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px] ${color} ${
              hovered ? "brightness-110" : ""
            }`}
          />
        )}
        <span className={`text-[11px] font-medium sm:text-xs ${hovered ? "text-white" : "text-white/80"}`}>
          {skill.name}
        </span>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 font-mono text-[9px] tracking-wider text-cyan/80 uppercase"
          >
            {skill.category}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function SkillsUniverse() {
  const globeSize = useGlobeSize();
  const globeRadius = globeSize / 2;

  return (
    <div className="relative">
      <header className="relative z-10 mb-4 text-center md:mb-6">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white/95 sm:text-5xl md:text-6xl lg:text-7xl">
          Technical Skills
        </h1>
       
      </header>

      <div className="relative mx-auto w-full max-w-6xl">
        <StarField />

        <div
          className="relative mx-auto"
          style={{
            width: "100%",
            height: globeSize + 80,
            minHeight: 360,
          }}
        >
          <WireframeGlobe size={globeSize} />

          {FIXED_SKILLS.map((skill) => (
            <SkillBadge key={skill.name} skill={skill} globeRadius={globeRadius} />
          ))}
        </div>
      </div>
    </div>
  );
}
