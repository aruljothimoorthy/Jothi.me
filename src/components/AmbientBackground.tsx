import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

/** Stable 0–1 value from index (SSR + client match; no Math.random) */
function hash01(i: number, salt: number) {
  const n = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * Ambient page background — adapts to light/dark theme.
 */
export function AmbientBackground() {
  const reduce = useReducedMotion();
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: hash01(i, 1) * 100,
        top: hash01(i, 2) * 100,
        size: hash01(i, 3) * 1.4 + 0.5,
        duration: hash01(i, 4) * 12 + 10,
        delay: hash01(i, 5) * 7,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{ background: "var(--ambient-base)" }}
      />

      {/* Blueprint grid */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--grid-opacity)",
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Center cyan nebula */}
      <motion.div
        className="absolute left-1/2 top-[38%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--orb-a) 0%, var(--orb-b) 35%, transparent 68%)",
        }}
        animate={
          mounted && !reduce
            ? { scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }
            : undefined
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-[20%] top-[20%] h-[40vmin] w-[40vmin] rounded-full bg-cyan/10 blur-[100px] light:bg-cyan/[0.06]"
        animate={mounted && !reduce ? { x: [0, 30, 0], y: [0, 20, 0] } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] bottom-[15%] h-[35vmin] w-[35vmin] rounded-full bg-sky-400/10 blur-[110px] light:bg-sky-400/[0.05]"
        animate={mounted && !reduce ? { x: [0, -25, 0], y: [0, -18, 0] } : undefined}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, rgba(7,8,13,0.75) 100%)"
            : "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, rgba(248,250,252,0.55) 100%)",
        }}
      />

      {/* Particles only after mount — avoids SSR/client random + reduced-motion mismatches */}
      {mounted &&
        !reduce &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              backgroundColor: isDark ? "rgba(255,255,255,0.9)" : "rgba(8,145,178,0.55)",
            }}
            animate={{
              y: [0, -14, 0],
              opacity: [0.05, isDark ? 0.35 : 0.28, 0.05],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}
