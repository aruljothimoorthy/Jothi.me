import { useRef, useState, type ComponentType, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ease } from "@/components/motion";

export type SkillDefinition = {
  name: string;
  usage: string;
  Icon: ComponentType<{ className?: string; size?: number }>;
};

const homepageFloatConfig: Record<
  string,
  { delay: number; duration: number; rotate: number; y: number }
> = {};

const defaultFloat = { delay: 0, duration: 4, rotate: 0, y: 10 };

export function SkillParticles({ count = 18 }: { count?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${8 + ((i * 17) % 84)}%`,
    top: `${6 + ((i * 23) % 88)}%`,
    size: i % 3 === 0 ? 3 : 2,
    duration: 5 + (i % 4),
    delay: (i % 6) * 0.4,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan/30"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0.15, 0.55, 0.15],
            y: [0, -14, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export function FloatingSkillCard({
  skill,
  size = "md",
  featured = false,
  className = "",
}: {
  skill: SkillDefinition;
  size?: "sm" | "md" | "lg";
  featured?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 220, damping: 22 });
  const springY = useSpring(tiltY, { stiffness: 220, damping: 22 });

  const float = homepageFloatConfig[skill.name] ?? defaultFloat;
  const { Icon } = skill;

  const sizeClasses = {
    sm: "h-[72px] w-[72px] rounded-2xl [&_svg]:size-4",
    md: "h-[84px] w-[84px] rounded-2xl [&_svg]:size-[18px]",
    lg: "h-[96px] w-[96px] rounded-3xl [&_svg]:size-5",
  }[size];

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(relX * (featured ? 14 : 10));
    tiltX.set(-relY * (featured ? 14 : 10));
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.65, ease }}
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, -float.y, 0],
                rotate: [float.rotate, -float.rotate * 0.5, float.rotate],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                y: {
                  duration: float.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: float.delay,
                },
                rotate: {
                  duration: float.duration * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: float.delay,
                },
              }
        }
      >
        <div className="card-hover-lift">
        <motion.div
          data-cursor="hover"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            tiltX.set(0);
            tiltY.set(0);
          }}
          onMouseMove={onMove}
          style={{
            rotateX: reduce ? 0 : springX,
            rotateY: reduce ? 0 : springY,
            transformStyle: "preserve-3d",
          }}
          whileHover={reduce ? undefined : { scale: 1.08 }}
          className={`group relative flex flex-col items-center justify-center border bg-[#0a0e1f]/75 backdrop-blur-md transition-colors light:border-[#E2E8F0] light:bg-white light:shadow-[0_4px_24px_rgba(15,23,42,0.06)] ${sizeClasses} ${
            featured
              ? "border-cyan/35 shadow-[0_0_32px_rgba(103,232,249,0.12)] light:shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
              : "border-white/10"
          }`}
        >
          <Icon
            className={`text-muted-foreground transition-colors group-hover:text-cyan ${
              featured ? "group-hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.6)]" : ""
            }`}
          />
          <span className="mt-1.5 max-w-[90%] truncate text-center font-mono text-[8px] tracking-wide text-muted-foreground group-hover:text-cyan/90 sm:text-[9px]">
            {skill.name}
          </span>

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none absolute -bottom-2 left-1/2 z-30 hidden w-44 -translate-x-1/2 translate-y-full rounded-xl border border-cyan/25 bg-[#0a0e1f]/95 px-3 py-2 text-center shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md light:border-[#E2E8F0] light:bg-white light:shadow-[0_8px_32px_rgba(15,23,42,0.08)] sm:block"
              >
                <p className="text-[10px] leading-snug text-muted-foreground">{skill.usage}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CategoryCluster({
  title,
  skills,
  glow,
  border,
  delay = 0,
  compact = false,
}: {
  title: string;
  skills: SkillDefinition[];
  glow: string;
  border: string;
  delay?: number;
  compact?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease }}
      className={`card-hover-lift relative overflow-hidden rounded-3xl border ${border} bg-gradient-to-br ${glow} p-4 sm:p-5`}
    >
      <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-cyan uppercase">{title}</p>
      <div
        className={`flex flex-wrap gap-3 ${compact ? "justify-center" : "justify-center sm:justify-start"}`}
      >
        {skills.map((skill, i) => (
          <FloatingSkillCard
            key={skill.name}
            skill={skill}
            size={compact ? "sm" : "md"}
            className={reduce ? "" : `[animation-delay:${i * 0.05}s]`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function MerConnections({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.line
        x1="200"
        y1="80"
        x2="80"
        y2="200"
        stroke="rgba(103,232,249,0.15)"
        strokeWidth="1"
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      />
      <motion.line
        x1="200"
        y1="80"
        x2="320"
        y2="200"
        stroke="rgba(103,232,249,0.15)"
        strokeWidth="1"
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.1, ease }}
      />
      <motion.line
        x1="80"
        y1="200"
        x2="200"
        y2="320"
        stroke="rgba(167,139,250,0.18)"
        strokeWidth="1"
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease }}
      />
      <motion.line
        x1="320"
        y1="200"
        x2="200"
        y2="320"
        stroke="rgba(167,139,250,0.18)"
        strokeWidth="1"
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease }}
      />
    </svg>
  );
}

export function DetailSkillCard({
  skill,
  index,
  featured = false,
}: {
  skill: SkillDefinition;
  index: number;
  featured?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  const [hovered, setHovered] = useState(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 200, damping: 20 });
  const springY = useSpring(tiltY, { stiffness: 200, damping: 20 });
  const { Icon } = skill;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(relX * 12);
    tiltX.set(-relY * 12);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 32, filter: "blur(6px)" }
      }
      transition={{ duration: 0.7, delay: index * 0.06, ease }}
      className="h-full"
    >
      <div
        className={`card-hover-lift group relative h-full overflow-hidden rounded-2xl border p-5 ${
          featured
            ? "border-cyan/30 bg-gradient-to-br from-cyan/10 via-transparent to-purple/10"
            : "border-white/10 glass"
        }`}
      >
      <motion.div
        data-cursor="hover"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          tiltX.set(0);
          tiltY.set(0);
        }}
        onMouseMove={onMove}
        style={{
          rotateX: reduce ? 0 : springX,
          rotateY: reduce ? 0 : springY,
          transformStyle: "preserve-3d",
        }}
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={
          reduce
            ? undefined
            : {
                y: {
                  duration: 4 + (index % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.15,
                },
              }
        }
        className="relative flex h-full flex-col"
      >
        <div
          className={`mb-4 grid h-11 w-11 place-items-center rounded-xl border transition ${
            featured
              ? "border-cyan/30 bg-cyan/10 text-cyan group-hover:shadow-[0_0_20px_rgba(103,232,249,0.35)]"
              : "border-white/10 bg-white/[0.03] text-muted-foreground group-hover:border-cyan/40 group-hover:text-cyan"
          }`}
        >
          <motion.div animate={hovered && !reduce ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}>
            <Icon size={20} />
          </motion.div>
        </div>
        <h3 className="font-display text-lg font-semibold">{skill.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{skill.usage}</p>
      </motion.div>
      </div>
    </motion.div>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <span className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/5 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
        {label}
      </span>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
