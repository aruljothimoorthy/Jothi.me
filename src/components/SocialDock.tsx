import { useCallback, useRef, useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type SocialItem = {
  Icon: LucideIcon;
  href: string;
  label: string;
  external: boolean;
};

const particles = [
  { x: "18%", y: "22%", delay: "0s", duration: "1.6s" },
  { x: "78%", y: "28%", delay: "0.15s", duration: "1.8s" },
  { x: "22%", y: "72%", delay: "0.28s", duration: "1.5s" },
  { x: "72%", y: "70%", delay: "0.08s", duration: "1.9s" },
  { x: "50%", y: "14%", delay: "0.22s", duration: "1.7s" },
];

export function SocialDock({ items }: { items: readonly SocialItem[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const leaveTimer = useRef<number | null>(null);

  const clearLeave = () => {
    if (leaveTimer.current) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const activate = useCallback((label: string) => {
    clearLeave();
    setActive(label);
  }, []);

  const deactivate = useCallback((delay = 0) => {
    clearLeave();
    if (delay) {
      leaveTimer.current = window.setTimeout(() => setActive(null), delay);
      return;
    }
    setActive(null);
  }, []);

  const onEnter = (label: string) => (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    if (e.pointerType === "touch") return;
    activate(label);
  };

  const onLeave = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    if (e.pointerType === "touch") return;
    deactivate();
  };

  const onDown = (label: string) => (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    if (e.pointerType !== "touch") return;
    activate(label);
  };

  const onUp = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    if (e.pointerType !== "touch") return;
    deactivate(420);
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.85 } },
      }}
      className="social-dock relative z-20 mx-auto mt-5 flex w-fit max-w-full items-center justify-center gap-1.5 rounded-[1.15rem] p-1.5 sm:gap-2 sm:rounded-2xl sm:p-2"
    >
      {items.map(({ Icon, href, label, external }) => {
        const isActive = !reduce && active === label;
        return (
          <motion.a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={label}
            data-cursor="hover"
            onPointerEnter={onEnter(label)}
            onPointerLeave={onLeave}
            onPointerDown={onDown(label)}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            variants={
              reduce
                ? undefined
                : {
                    hidden: { opacity: 0, y: 14, scale: 0.92 },
                    show: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    },
                  }
            }
            className={`social-orb-btn group relative grid h-11 w-11 shrink-0 place-items-center rounded-[0.8rem] sm:h-12 sm:w-12 sm:rounded-[0.9rem] ${
              isActive ? "is-active" : ""
            }`}
          >
            <span className="social-orb" aria-hidden>
              <span className="social-orb-core" />
              <span className="social-orb-ring" />
              {particles.map((p, i) => (
                <span
                  key={i}
                  className="social-orb-particle"
                  style={{
                    left: p.x,
                    top: p.y,
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                  }}
                />
              ))}
            </span>
            <Icon size={18} className="social-orb-icon relative z-10" />
            <span className="social-tip" aria-hidden>
              {label}
            </span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
