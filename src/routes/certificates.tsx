import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { credentials, type Credential } from "@/data/credentials";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — Aruljothi K" },
      {
        name: "description",
        content:
          "Certifications across cloud, AI, data, and software engineering.",
      },
      { property: "og:title", content: "Certificates — Aruljothi K" },
      { property: "og:description", content: "All certificates." },
    ],
  }),
  component: CertificatesPage,
});

function MobileCertificatePreview({ credential }: { credential: Credential }) {
  return (
    <a
      href={credential.file}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full leading-none"
      aria-label={`Open ${credential.title} certificate PDF`}
    >
      <img
        src={credential.preview}
        alt={`${credential.title} certificate`}
        className="block h-auto w-full"
        loading="eager"
        decoding="async"
      />
    </a>
  );
}

function CertificatePreview({ credential }: { credential: Credential }) {
  return (
    <div className="w-full overflow-hidden bg-[#ececee] p-0 md:h-full md:p-1.5">
      {/* Desktop: iframe PDF preview */}
      <iframe
        src={`${credential.file}#toolbar=0&navpanes=0&view=FitH`}
        title={`${credential.title} certificate`}
        className="hidden h-full w-full rounded-md border-0 bg-white md:block md:rounded-lg"
      />

      {/* Phone: image at natural aspect ratio — no letterbox padding */}
      <div className="w-full md:hidden">
        <MobileCertificatePreview credential={credential} />
      </div>
    </div>
  );
}

function CredentialCard({ credential }: { credential: Credential }) {
  return (
    <div
      data-credential-card
      className="card-hover-lift mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[rgba(12,16,26,0.88)] shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-xl md:grid md:h-[min(42vh,360px)] md:grid-cols-[1.05fr_0.95fr] md:rounded-3xl md:shadow-[0_20px_60px_rgba(0,0,0,0.4)] light:border-[#E2E8F0] light:bg-[rgba(255,255,255,0.95)] light:shadow-[0_4px_24px_rgba(15,23,42,0.06)] md:light:shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
    >
      {/* Phone: height follows certificate · Desktop: left column fills */}
      <div className="w-full shrink-0 border-b border-white/8 md:block md:h-full md:border-b-0 md:border-r md:border-white/8 light:border-[#E2E8F0]">
        <div className="relative w-full overflow-hidden md:h-full md:rounded-none md:rounded-l-3xl md:rounded-tr-none">
          <CertificatePreview credential={credential} />
        </div>
      </div>

      <div className="flex min-w-0 shrink-0 flex-col justify-center overflow-hidden p-3 md:flex-1 md:p-6">
        <div className="w-full md:max-w-[300px]">
          <div className="mb-1 flex flex-wrap gap-1 md:mb-3 md:gap-1.5">
            {credential.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[8px] tracking-wide text-muted-foreground uppercase md:px-2.5 md:text-[10px] light:border-[#E2E8F0] light:bg-[#ECFEFF] light:text-[#0E7490]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="m-typo-cert line-clamp-2 font-display text-sm font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
            {credential.title}
          </h2>

          <p className="m-typo-cert-detail mt-0.5 font-mono text-[10px] md:mt-2 md:text-sm">
            <span style={{ color: credential.color }}>{credential.issuer}</span>
            <span className="text-muted-foreground"> — {credential.date}</span>
          </p>

          <p className="m-typo-cert-detail mt-1 line-clamp-2 text-[10px] leading-snug text-muted-foreground md:mt-3 md:line-clamp-4 md:text-sm md:leading-6">
            {credential.description ?? `Issued by ${credential.issuer} on ${credential.date}.`}
          </p>

          <div className="mt-2 flex justify-center pt-0.5 md:mt-auto md:justify-center md:pt-4">
            <a
              href={credential.file}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="m-typo-btn inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-[9px] transition hover:bg-white/[0.04] md:px-4 md:py-2 md:text-xs"
              style={{
                borderColor: `${credential.color}66`,
                color: credential.color,
                boxShadow: `0 0 24px ${credential.color}18`,
              }}
            >
              <span className="md:hidden">Verify</span>
              <span className="hidden md:inline">Verify Certificate</span>
              <ExternalLink size={11} className="md:hidden" />
              <ExternalLink size={14} className="hidden md:block" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificatesPage() {
  const containerRef = useRef<HTMLElement>(null);
  const touchStartY = useRef(0);
  const touchOnCard = useRef(false);
  const lockedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const active = credentials[activeIndex];

  const goToIndex = useCallback((index: number) => {
    if (lockedRef.current) return;

    setActiveIndex((current) => {
      const clamped = Math.max(0, Math.min(index, credentials.length - 1));
      if (clamped === current) return current;

      lockedRef.current = true;
      setDirection(clamped > current ? 1 : -1);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, 650);
      return clamped;
    });
  }, []);

  /** Desktop: clamp at ends. Mobile: pass loop=true for infinite wrap. */
  const step = useCallback((delta: 1 | -1, loop = false) => {
    if (lockedRef.current) return;
 
    const len = credentials.length;
    if (len === 0) return;

    setActiveIndex((current) => {
      let next: number;
      if (loop) {
        next = (current + delta + len) % len;
      } else {
        next = Math.max(0, Math.min(current + delta, len - 1));
        if (next === current) return current;
      }

      lockedRef.current = true;
      setDirection(delta > 0 ? 1 : -1);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, 650);
      return next;
    });
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isMobileViewport = () =>
      window.matchMedia("(max-width: 767px)").matches;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (lockedRef.current) return;
      if (Math.abs(e.deltaY) < 18) return;

      // Desktop/laptop: no loop (existing behavior)
      if (e.deltaY > 0) step(1, false);
      else step(-1, false);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? 0;
      const target = e.target;
      touchOnCard.current =
        target instanceof Element && Boolean(target.closest("[data-credential-card]"));
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (lockedRef.current || touchOnCard.current) return;
      const endY = e.changedTouches[0]?.clientY ?? 0;
      const delta = touchStartY.current - endY;
      if (Math.abs(delta) < 50) return;

      // Mobile only: infinite loop
      const loop = isMobileViewport();
      if (delta > 0) step(1, loop);
      else step(-1, loop);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        step(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 28 : -28,
      scale: 0.99,
    }),
    center: { opacity: 1, y: 0, scale: 1 },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -28 : 28,
      scale: 0.99,
    }),
  };

  return (
    <main
      ref={containerRef}
      className="fixed inset-0 z-10 flex h-[100svh] flex-col overflow-hidden overscroll-none bg-transparent"
    >
      {/* Header — compact on phone so card gets more height */}
      <header className="relative z-30 shrink-0 px-4 pt-[4.75rem] pb-1 sm:px-8 sm:pt-24 sm:pb-0 lg:pt-20">
        <div className="mx-auto flex max-w-3xl items-start justify-between gap-2 md:gap-4">
          <div className="min-w-0">
            <span className="chip">ACHIEVEMENTS</span>
            <h1 className="m-typo-section mt-1 font-display text-xl font-semibold tracking-tight text-foreground sm:mt-4 sm:text-4xl md:text-5xl">
              My Certificates
            </h1>
            <p className="m-typo-desc mt-0.5 font-mono text-[9px] text-muted-foreground sm:mt-2 sm:text-sm">
              {credentials.length} certificates ·{" "}
              <span className="md:hidden">swipe outside card to switch</span>
              <span className="hidden md:inline">scroll wheel to switch</span>
            </p>
          </div>

          <p
            className="shrink-0 pt-0.5 font-mono text-xs text-muted-foreground tabular-nums sm:pt-2 sm:text-base"
            aria-live="polite"
          >
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(credentials.length).padStart(2, "0")}
          </p>
        </div>
      </header>

      {/* Vertical dot navigation */}
      <nav
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 sm:right-5 md:flex"
        aria-label="Certificate navigation"
      >
        {credentials.map((c, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={`${c.title}-${c.date}`}
              type="button"
              aria-label={`Go to certificate ${i + 1}: ${c.title}`}
              aria-current={isActive ? "step" : undefined}
              onClick={() => goToIndex(i)}
              className="group grid place-items-center p-1"
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  background: isActive ? active.color : "rgba(148,163,184,0.45)",
                  boxShadow: isActive ? `0 0 14px ${active.color}88` : undefined,
                }}
              />
            </button>
          );
        })}
      </nav>

      {/* Card stage — phone: content-sized card; desktop unchanged */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 pb-14 pt-2 sm:px-8 sm:pt-8 md:items-start md:overflow-y-auto md:pb-10 md:pt-10 lg:pt-12">
        <div className="relative mx-auto w-full max-w-3xl md:h-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeIndex}-${active.title}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <CredentialCard credential={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile progress bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center md:hidden">
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md light:border-[#E2E8F0] light:bg-white/90">
          {credentials.map((c, i) => (
            <span
              key={`${c.title}-dot`}
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 16 : 6,
                height: 6,
                background:
                  i === activeIndex ? active.color : "rgba(148,163,184,0.45)",
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
