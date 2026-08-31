import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (reduce) {
      onComplete();
      return;
    }

    let raf = 0;
    const tick = () => {
      setProgress((p) => {
        const next = p + (100 - p) * 0.05 + 0.4;
        return Math.min(next, 100);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, onComplete]);

  useEffect(() => {
    if (progress >= 99.2 && !exiting) {
      setExiting(true);
    }
  }, [progress, exiting]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#07080d]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan/25 blur-[120px] animate-mesh" />
            <div className="absolute bottom-1/4 right-1/4 h-[280px] w-[280px] rounded-full bg-sky-400/20 blur-[100px] animate-mesh" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center"
          >
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-cyan/80">
              Portfolio · 2026
            </p>
            <h1 className="font-display text-5xl font-semibold tracking-tight text-glow sm:text-6xl">
              <span className="gradient-text">Aruljothi K</span>
            </h1>
            <p className="mt-3 font-sans text-sm text-muted-foreground">
              Crafting cinematic digital experiences
            </p>
          </motion.div>

          <div className="relative z-10 mt-14 w-[min(280px,70vw)]">
            <div className="mb-3 flex justify-between font-mono text-[10px] tracking-widest text-muted-foreground">
              <span>LOADING</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div className="h-[3px] overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-400 via-amber-300 to-cyan transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <svg className="absolute bottom-16 h-14 w-14 text-cyan/40" viewBox="0 0 56 56" aria-hidden>
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.25"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="url(#loaderGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="150"
              animate={{ strokeDashoffset: [150, 40, 150], rotate: [0, 360] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              style={{ originX: "28px", originY: "28px" }}
            />
            <defs>
              <linearGradient id="loaderGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
