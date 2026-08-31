import { Suspense, useRef, useState, useEffect, useMemo, type CSSProperties, type ComponentType } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import {
  SiNextdotjs,
  SiPostgresql,
  SiJupyter,
  SiRedis,
  SiDocker,
  SiGithub,
  SiPandas,
  SiScikitlearn,
  SiHuggingface,
  SiTypescript,
  SiGit,
  SiPlotly,
  SiLangchain,
  SiPython,
  SiReact,
  SiMongodb,
  SiFastapi,
  SiVercel,
  SiNumpy,
  SiGraphql,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

const GLOBE_R = 2;
const GLOBE_SURFACE_R = 2.45;

/** Not in react-icons/si — do not use SiPowerbi / SiAmazon (they crash the page) */
function PowerBiIcon({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden>
      <rect x="3" y="14" width="4" height="7" rx="1" />
      <rect x="10" y="9" width="4" height="12" rx="1" />
      <rect x="17" y="4" width="4" height="17" rx="1" />
    </svg>
  );
}

function asIcon(icon: unknown): ComponentType<{ className?: string; style?: CSSProperties; size?: number }> | null {
  if (typeof icon === "function") return icon as IconType;
  if (icon && typeof icon === "object" && "default" in icon) {
    const d = (icon as { default: unknown }).default;
    if (typeof d === "function") return d as IconType;
  }
  return null;
}

const ICON_MAP: Record<string, unknown> = {
  "Next.js": SiNextdotjs,
  PostgreSQL: SiPostgresql,
  Jupyter: SiJupyter,
  Redis: SiRedis,
  Docker: SiDocker,
  GitHub: SiGithub,
  Pandas: SiPandas,
  ScikitLearn: SiScikitlearn,
  HuggingFace: SiHuggingface,
  TypeScript: SiTypescript,
  Git: SiGit,
  Plotly: SiPlotly,
  LangChain: SiLangchain,
  Python: SiPython,
  PowerBI: PowerBiIcon,
  React: SiReact,
  MongoDB: SiMongodb,
  FastAPI: SiFastapi,
  Vercel: SiVercel,
  NumPy: SiNumpy,
  GraphQL: SiGraphql,
  Tailwind: SiTailwindcss,
  NodeJS: SiNodedotjs,
  AWS: FaAws,
};

const SKILL_STYLE_MAP: Record<string, { color: string; glow: string }> = {
  "Next.js": { color: "#ffffff", glow: "#ffffff" },
  PostgreSQL: { color: "#336791", glow: "#4183b4" },
  Jupyter: { color: "#f37626", glow: "#f37626" },
  Redis: { color: "#dc382d", glow: "#ff4d4d" },
  Docker: { color: "#2496ed", glow: "#38bdf8" },
  GitHub: { color: "#f0f6fc", glow: "#ffffff" },
  Pandas: { color: "#a855f7", glow: "#a855f7" },
  ScikitLearn: { color: "#f7931e", glow: "#f97316" },
  HuggingFace: { color: "#ffd21e", glow: "#eab308" },
  TypeScript: { color: "#3178c6", glow: "#3b82f6" },
  Git: { color: "#f05032", glow: "#ef4444" },
  Plotly: { color: "#818cf8", glow: "#818cf8" },
  LangChain: { color: "#2dd4bf", glow: "#14b8a6" },
  Python: { color: "#3776ab", glow: "#38bdf8" },
  PowerBI: { color: "#f2c811", glow: "#eab308" },
  React: { color: "#61dafb", glow: "#22d3ee" },
  MongoDB: { color: "#47a248", glow: "#22c55e" },
  FastAPI: { color: "#059669", glow: "#10b981" },
  Vercel: { color: "#ffffff", glow: "#a1a1aa" },
  NumPy: { color: "#4d77cf", glow: "#6366f1" },
  GraphQL: { color: "#e10098", glow: "#f472b6" },
  Tailwind: { color: "#38bdf8", glow: "#0ea5e9" },
  NodeJS: { color: "#68a063", glow: "#22c55e" },
  AWS: { color: "#ff9900", glow: "#f59e0b" },
};

const SKILL_LIST = [
  { name: "Next.js", label: "Next.js" },
  { name: "PostgreSQL", label: "PostgreSQL" },
  { name: "Jupyter", label: "Jupyter" },
  { name: "Redis", label: "Redis" },
  { name: "Docker", label: "Docker" },
  { name: "GitHub", label: "GitHub" },
  { name: "Pandas", label: "Pandas" },
  { name: "ScikitLearn", label: "scikit-learn" },
  { name: "HuggingFace", label: "Hugging Face" },
  { name: "TypeScript", label: "TypeScript" },
  { name: "Git", label: "Git" },
  { name: "Plotly", label: "Plotly" },
  { name: "LangChain", label: "LangChain" },
  { name: "Python", label: "Python" },
  { name: "PowerBI", label: "Power BI" },
  { name: "React", label: "React" },
  { name: "MongoDB", label: "MongoDB" },
  { name: "FastAPI", label: "FastAPI" },
  { name: "Vercel", label: "Vercel" },
  { name: "NumPy", label: "NumPy" },
  { name: "GraphQL", label: "GraphQL" },
  { name: "Tailwind", label: "Tailwind CSS" },
  { name: "NodeJS", label: "Node.js" },
  { name: "AWS", label: "AWS" },
];

const GLOBE_ORBIT_SKILLS = SKILL_LIST.map((skill, index, list) => {
  const shiftedIdx = (index * 7) % list.length;
  const phi = Math.acos(1 - (2 * (shiftedIdx + 0.5)) / list.length);
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const theta = 2 * Math.PI * shiftedIdx * goldenRatio;
  return {
    ...skill,
    theta,
    phi,
    floatPhase: index * 0.45,
  };
});

function sphericalToCartesian(theta: number, phi: number, radius: number) {
  const sinPhi = Math.sin(phi);
  return new THREE.Vector3(
    radius * sinPhi * Math.cos(theta),
    radius * Math.cos(phi),
    radius * sinPhi * Math.sin(theta),
  );
}

/** Rich Earth wireframe — lat / lon grid (optimized segment counts, same look) */
function buildSimpleGrid(radius: number) {
  const lines: THREE.Line[] = [];

  const latSteps = [
    -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80,
  ];
  const lonSteps = Array.from({ length: 24 }, (_, i) => i * 15);
  const ringSegs = 72;
  const meridianSegs = 64;

  const makeLine = (pts: THREE.Vector3[], opacity: number, dashed = false) => {
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = dashed
      ? new THREE.LineDashedMaterial({
          color: "#38bdf8",
          transparent: true,
          opacity,
          dashSize: 0.05,
          gapSize: 0.04,
          depthWrite: false,
          depthTest: true,
        })
      : new THREE.LineBasicMaterial({
          color: "#0284c7",
          transparent: true,
          opacity,
          depthWrite: false,
          depthTest: true,
        });
    const line = new THREE.Line(geo, mat);
    if (dashed) line.computeLineDistances();
    return line;
  };

  latSteps.forEach((latDeg) => {
    const lat = (latDeg * Math.PI) / 180;
    const y = radius * Math.sin(lat);
    const ringR = radius * Math.cos(lat);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= ringSegs; i++) {
      const a = (i / ringSegs) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * ringR, y, Math.sin(a) * ringR));
    }
    const isEquator = Math.abs(latDeg) === 0;
    const isMajor = Math.abs(latDeg) % 30 === 0;
    lines.push(makeLine(pts, isEquator ? 0.7 : isMajor ? 0.35 : 0.18, isEquator));
  });

  lonSteps.forEach((lonDeg) => {
    const lon = (lonDeg * Math.PI) / 180;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= meridianSegs; i++) {
      const lat = -Math.PI / 2 + (i / meridianSegs) * Math.PI;
      pts.push(
        new THREE.Vector3(
          radius * Math.cos(lat) * Math.cos(lon),
          radius * Math.sin(lat),
          radius * Math.cos(lat) * Math.sin(lon),
        ),
      );
    }
    const isPrimeMeridian = lonDeg === 0 || lonDeg === 180;
    lines.push(makeLine(pts, isPrimeMeridian ? 0.45 : 0.22));
  });

  const rim: THREE.Vector3[] = [];
  for (let i = 0; i <= ringSegs; i++) {
    const a = (i / ringSegs) * Math.PI * 2;
    rim.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
  }
  lines.push(makeLine(rim, 0.5));

  return lines;
}

function SimpleGlobeGrid({ radius = GLOBE_R }: { radius?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const lines = buildSimpleGrid(radius);
    lines.forEach((line) => group.add(line));

    return () => {
      lines.forEach((line) => {
        group.remove(line);
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    };
  }, [radius]);

  return <group ref={groupRef} />;
}

function WireframeEarth() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[GLOBE_R, 32, 24]} />
        <meshBasicMaterial color="#030712" transparent opacity={0.65} depthWrite={false} />
      </mesh>

      <SimpleGlobeGrid radius={GLOBE_R} />

      <pointLight position={[0, 0, 0]} intensity={1.2} distance={5} color="#38bdf8" />
      <pointLight position={[3, 2, 4]} intensity={0.6} distance={12} color="#0284c7" />
    </group>
  );
}

function FloatingBadge({
  skill,
  isMobile,
}: {
  skill: (typeof GLOBE_ORBIT_SKILLS)[number];
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const badgeDomRef = useRef<HTMLDivElement>(null);
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const frameSkip = useRef(0);
  const lastScale = useRef(-1);
  const lastOpacity = useRef(-1);

  const base = useMemo(
    () => sphericalToCartesian(skill.theta, skill.phi, GLOBE_SURFACE_R),
    [skill.theta, skill.phi],
  );

  const Icon = asIcon(ICON_MAP[skill.name]);
  const styleConfig = SKILL_STYLE_MAP[skill.name] ?? { color: "#38bdf8", glow: "#38bdf8" };
  const label = skill.label ?? skill.name;

  useFrame((state) => {
    if (!groupRef.current) return;
    // Use R3F clock (THREE.Clock under the hood — three pinned < r183 to avoid deprecation spam)
    const t = state.clock.getElapsedTime();
    const bob = Math.sin(t * 0.8 + skill.floatPhase) * 0.012;
    groupRef.current.position.set(base.x, base.y + bob, base.z);

    // Update badge DOM every other frame to cut style thrashing
    frameSkip.current += 1;
    if (frameSkip.current % 2 !== 0 || !badgeDomRef.current) return;

    groupRef.current.getWorldPosition(worldPos);
    const dist = worldPos.distanceTo(state.camera.position);
    const scale = Math.round(THREE.MathUtils.clamp(1.8 - dist / 5.2, 0.6, 1.5) * 100) / 100;
    const opacity = Math.round(THREE.MathUtils.clamp(1.6 - dist / 5.8, 0.3, 1.0) * 100) / 100;

    if (scale !== lastScale.current) {
      lastScale.current = scale;
      badgeDomRef.current.style.transform = `scale(${scale})`;
    }
    if (opacity !== lastOpacity.current) {
      lastOpacity.current = opacity;
      badgeDomRef.current.style.opacity = String(opacity);
    }
  });

  return (
    <group ref={groupRef} position={base}>
      <Html center transform={false} zIndexRange={[100, 0]} style={{ pointerEvents: "none", userSelect: "none" }}>
        <div
          ref={badgeDomRef}
          className="flex items-center gap-1.5 whitespace-nowrap rounded-full"
          style={{
            height: 38,
            padding: "0 12px",
            background: "rgba(5, 10, 20, 0.94)",
            border: `1px solid ${styleConfig.glow}77`,
            boxShadow: `0 0 12px ${styleConfig.glow}40, inset 0 0 0 1px rgba(255,255,255,0.1)`,
            willChange: "transform, opacity",
          }}
        >
          <span
            className="relative z-10 flex shrink-0 items-center justify-center overflow-visible"
            style={{ width: 28, height: 28, color: styleConfig.color }}
          >
            {Icon ? <Icon style={{ width: "100%", height: "100%", display: "block" }} /> : null}
          </span>
          <span
            style={{
              fontSize: isMobile ? 14 : 12,
              fontWeight: 600,
              letterSpacing: "0.01em",
              lineHeight: 1,
              color: styleConfig.color,
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        </div>
      </Html>
    </group>
  );
}

function Scene({ autoRotate, isMobile }: { autoRotate: boolean; isMobile: boolean }) {
  return (
    <>
      <Stars
        radius={60}
        depth={40}
        count={isMobile ? 350 : 700}
        factor={2}
        saturation={0}
        fade
        speed={autoRotate ? 0.2 : 0}
      />

      <ambientLight intensity={0.6} />
      <WireframeEarth />

      {GLOBE_ORBIT_SKILLS.map((skill) => (
        <FloatingBadge key={skill.name} skill={skill} isMobile={isMobile} />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={!isMobile}
        enableDamping
        dampingFactor={0.05}
        autoRotate={autoRotate}
        autoRotateSpeed={0.35}
        minDistance={isMobile ? 7.6 : 6.4}
        maxDistance={isMobile ? 7.6 : 6.4}
        minPolarAngle={0.05}
        maxPolarAngle={Math.PI - 0.05}
        rotateSpeed={0.5}
      />
    </>
  );
}

function GlobeFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-44 w-44 animate-pulse rounded-full border border-sky-400/20 bg-sky-500/5 shadow-[0_0_50px_rgba(56,189,248,0.15)] sm:h-60 sm:w-60" />
    </div>
  );
}

export function SkillsGlobe() {
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setReady(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqMobile = window.matchMedia("(max-width: 767px)");
    setReduceMotion(mq.matches);
    setIsMobile(mqMobile.matches);

    const onMotion = () => setReduceMotion(mq.matches);
    const onMobile = () => setIsMobile(mqMobile.matches);
    mq.addEventListener("change", onMotion);
    mqMobile.addEventListener("change", onMobile);
    return () => {
      mq.removeEventListener("change", onMotion);
      mqMobile.removeEventListener("change", onMobile);
    };
  }, []);

  if (!ready) {
    return (
      <div className="relative h-[min(68vh,520px)] w-full sm:h-[min(78vh,720px)]">
        <GlobeFallback />
      </div>
    );
  }

  return (
    <div
      className={`relative h-[min(68vh,520px)] w-full touch-pan-y sm:h-[min(78vh,720px)] sm:touch-none lg:h-[min(82vh,780px)] ${
        isMobile ? "pointer-events-none" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(2,132,199,0.08) 50%, transparent 75%)",
        }}
        aria-hidden
      />

      <Suspense fallback={<GlobeFallback />}>
        <Canvas
          dpr={[1, isMobile ? 1.25 : 1.5]}
          camera={{
            position: isMobile ? [0, 0.2, 7.6] : [0, 0.25, 6.4],
            fov: isMobile ? 46 : 42,
            near: 0.01,
            far: 100,
          }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ width: "100%", height: "100%", background: "rgba(0,0,0,0)" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
          }}
        >
          <Scene autoRotate={!reduceMotion} isMobile={isMobile} />
        </Canvas>
      </Suspense>

      <p className="pointer-events-none absolute bottom-2 left-1/2 z-10 hidden -translate-x-1/2 px-3 text-center font-mono text-[10px] tracking-wider text-sky-400/50 sm:block sm:bottom-3">
        Drag to rotate
      </p>
    </div>
  );
}
