import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 450, damping: 28, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 450, damping: 28, mass: 0.35 });
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onDown = (e: MouseEvent) => {
      setClicking(true);
      const id = Date.now();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
    };
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);

    const overInteractive = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, input, textarea, [data-cursor='hover']");
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", overInteractive);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", overInteractive);
    };
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden>
      <motion.div
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
        style={{ left: springX, top: springY, opacity: visible ? 1 : 0 }}
        animate={{ scale: clicking ? 0.6 : hovering ? 0.5 : 1 }}
      />
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/50"
        style={{ left: ringX, top: ringY, opacity: visible ? 1 : 0 }}
        animate={{
          width: hovering ? 52 : 32,
          height: hovering ? 52 : 32,
          borderColor: hovering ? "rgba(167,139,250,0.7)" : "rgba(103,232,249,0.45)",
          backgroundColor: hovering ? "rgba(167,139,250,0.08)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full border border-cyan/60"
          style={{
            left: r.x,
            top: r.y,
            width: 12,
            height: 12,
            transform: "translate(-50%, -50%)",
            animation: "cursor-ripple 0.65s ease-out forwards",
          }}
        />
      ))}
      <style>{`
        @keyframes cursor-ripple {
          from { width: 12px; height: 12px; opacity: 0.7; }
          to { width: 80px; height: 80px; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
