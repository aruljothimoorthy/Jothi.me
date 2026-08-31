import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0..1
  r: number;
  baseAlpha: number;
  twinkle: number;
  hue: number;
};

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let rings: { r: number; speed: number; offset: number }[] = [];
    let raf = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // density scales with viewport
      const count = Math.floor((width * height) / 4500);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        r: Math.random() * 1.4 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.85 ? 200 + Math.random() * 120 : 220, // mostly cool, occasional purple/cyan
      }));

      rings = [
        { r: Math.min(width, height) * 0.18, speed: 0.0006, offset: 0 },
        { r: Math.min(width, height) * 0.28, speed: -0.0004, offset: Math.PI / 3 },
        { r: Math.min(width, height) * 0.4, speed: 0.0003, offset: Math.PI },
        { r: Math.min(width, height) * 0.55, speed: -0.0002, offset: Math.PI / 2 },
      ];

      mouseRef.current.x = width / 2;
      mouseRef.current.y = height / 2;
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    let t = 0;
    const render = () => {
      t += 1;

      // Base deep-space gradient
      const bg = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.8);
      bg.addColorStop(0, "#0a0a1f");
      bg.addColorStop(0.5, "#06061a");
      bg.addColorStop(1, "#020210");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Nebula clouds
      const drawNebula = (x: number, y: number, r: number, color: string) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      };
      drawNebula(width * 0.2, height * 0.25, Math.max(width, height) * 0.45, "rgba(120, 60, 220, 0.18)");
      drawNebula(width * 0.85, height * 0.75, Math.max(width, height) * 0.4, "rgba(40, 180, 220, 0.16)");
      drawNebula(width * 0.7, height * 0.15, Math.max(width, height) * 0.3, "rgba(230, 120, 70, 0.08)");

      // Mouse glow
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
      glow.addColorStop(0, "rgba(120, 220, 255, 0.18)");
      glow.addColorStop(0.4, "rgba(120, 80, 220, 0.08)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Concentric rings centered on viewport, drifting with mouse parallax
      const cx = width / 2 + (mx - width / 2) * 0.06;
      const cy = height / 2 + (my - height / 2) * 0.06;

      rings.forEach((ring, i) => {
        const a = t * ring.speed + ring.offset;
        ctx.strokeStyle = `rgba(120, 220, 255, ${0.06 + i * 0.015})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.stroke();

        // Glowing particles on rings
        for (let p = 0; p < 3; p++) {
          const angle = a + (p * (Math.PI * 2)) / 3;
          const px = cx + Math.cos(angle) * ring.r;
          const py = cy + Math.sin(angle) * ring.r;
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 18);
          pg.addColorStop(0, "rgba(180, 240, 255, 0.9)");
          pg.addColorStop(1, "transparent");
          ctx.fillStyle = pg;
          ctx.fillRect(px - 18, py - 18, 36, 36);
        }
      });

      // Stars with parallax + mouse repel
      for (const s of stars) {
        s.twinkle += 0.02 + s.z * 0.02;
        const tw = (Math.sin(s.twinkle) + 1) / 2;

        // parallax offset based on mouse, deeper stars move less
        const parX = (mx - width / 2) * 0.02 * s.z;
        const parY = (my - height / 2) * 0.02 * s.z;

        // gentle repel from cursor
        const dx = s.x - mx;
        const dy = s.y - my;
        const dist = Math.hypot(dx, dy);
        let repelX = 0;
        let repelY = 0;
        if (dist < 140 && dist > 0.01) {
          const force = (1 - dist / 140) * 18;
          repelX = (dx / dist) * force;
          repelY = (dy / dist) * force;
        }

        const x = s.x + parX + repelX;
        const y = s.y + parY + repelY;
        const alpha = s.baseAlpha * (0.4 + tw * 0.6);

        // glow halo for bright stars
        if (s.r > 1) {
          const halo = ctx.createRadialGradient(x, y, 0, x, y, s.r * 6);
          halo.addColorStop(0, `hsla(${s.hue}, 90%, 80%, ${alpha * 0.35})`);
          halo.addColorStop(1, "transparent");
          ctx.fillStyle = halo;
          ctx.fillRect(x - s.r * 6, y - s.r * 6, s.r * 12, s.r * 12);
        }

        ctx.fillStyle = `hsla(${s.hue}, 100%, 92%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // slow drift
        s.x += 0.02 * s.z;
        if (s.x > width + 5) s.x = -5;
      }

      raf = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
