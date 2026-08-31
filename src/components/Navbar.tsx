import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

type NavPage = "/about" | "/skills" | "/projects" | "/experience" | "/certificates";

type NavItem = {
  label: string;
  page: NavPage;
};

/** Order: About → Skills → Projects → Experience → Certificates */
const links: NavItem[] = [
  { label: "About", page: "/about" },
  { label: "Skills", page: "/skills" },
  { label: "Projects", page: "/projects" },
  { label: "Experience", page: "/experience" },
  { label: "Certificates", page: "/certificates" },
];

const linkBase = (active: boolean) =>
  `m-typo-nav relative rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-200 light:hover:bg-[#ECFEFF] ${
    active
      ? "text-cyan font-semibold light:bg-[rgba(8,145,178,0.08)]"
      : "text-[color:var(--nav-text)] hover:text-[color:var(--nav-text-hover)]"
  }`;

const mobileClass = (active: boolean) =>
  `m-typo-nav block rounded-lg px-4 py-2.5 text-sm font-medium transition duration-200 light:hover:bg-[#ECFEFF] ${
    active
      ? "bg-cyan/10 text-cyan light:bg-[rgba(8,145,178,0.08)]"
      : "text-[color:var(--nav-text)] hover:bg-[#ECFEFF] dark:hover:bg-white/5 hover:text-[color:var(--nav-text-hover)]"
  }`;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (item: NavItem) => pathname === item.page;

  const BrandContent = () => (
    <>
      <Home className="h-4 w-4 shrink-0 text-cyan" />
      <span className="truncate font-mono text-xs font-semibold tracking-tight text-cyan italic sm:text-sm">
        aruljothi.me
      </span>
    </>
  );

  const ThemeToggle = ({ className = "", iconOnly = false }: { className?: string; iconOnly?: boolean }) => (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor="hover"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex shrink-0 items-center justify-center gap-1.5 rounded-full border text-xs font-semibold transition duration-300 ${
        iconOnly ? "h-9 w-9 px-0" : "px-3 py-1"
      } ${className} ${
        isDark
          ? "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:text-white"
          : "border-[#CBD5E1] bg-white/80 text-[#0891B2] hover:border-[#0891B2] hover:bg-[#ECFEFF]"
      }`}
    >
      {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5 text-[#0891B2]" />}
      {!iconOnly && <span>{isDark ? "DARK" : "LIGHT"}</span>}
    </button>
  );

  return (
    <header className="pointer-events-none fixed top-3 left-1/2 z-50 w-[min(96%,1020px)] -translate-x-1/2 sm:top-4 sm:w-[min(94%,1020px)]">
      <motion.nav
        initial={{ y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex min-w-0 items-center justify-between gap-2 rounded-2xl border px-2.5 py-2 transition-all duration-300 sm:gap-3 sm:px-3.5 ${
          scrolled
            ? "border-[color:var(--nav-border)] bg-[color:var(--surface-strong)] shadow-2xl backdrop-blur-xl light:shadow-[0_4px_24px_rgba(15,23,42,0.08)]"
            : "border-[color:var(--nav-border)] bg-[color:var(--surface)] shadow-lg backdrop-blur-md"
        }`}
      >
        {/* Left Brand Badge */}
        {onHome ? (
          <a
            href="#top"
            aria-label="Aruljothi K portfolio"
            data-cursor="hover"
            className="flex min-w-0 items-center gap-1.5 rounded-xl border border-[color:var(--nav-border)] bg-black/[0.03] px-2.5 py-1.5 transition hover:border-cyan/30 hover:bg-cyan/5 light:hover:bg-[#ECFEFF] dark:bg-slate-900/60 sm:gap-2 sm:px-3"
          >
            <BrandContent />
          </a>
        ) : (
          <Link
            to="/"
            aria-label="Aruljothi K portfolio"
            data-cursor="hover"
            className="flex min-w-0 items-center gap-1.5 rounded-xl border border-[color:var(--nav-border)] bg-black/[0.03] px-2.5 py-1.5 transition hover:border-cyan/30 hover:bg-cyan/5 light:hover:bg-[#ECFEFF] dark:bg-slate-900/60 sm:gap-2 sm:px-3"
          >
            <BrandContent />
          </Link>
        )}

        {/* Navigation Links — always go to full pages */}
        <div className="hidden items-center gap-3 lg:flex xl:gap-5">
          {links.map((l) => {
            const active = isActive(l);
            return (
              <Link key={l.page} to={l.page} data-cursor="hover" className={linkBase(active)}>
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Right Utility Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
        </div>

        {/* Mobile / tablet controls */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
          <ThemeToggle iconOnly />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            data-cursor="hover"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--nav-border)] text-[color:var(--nav-text)] transition hover:bg-black/5 light:hover:bg-[#ECFEFF] dark:hover:bg-slate-800"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mt-2 max-h-[min(70vh,480px)] space-y-1 overflow-y-auto rounded-2xl border border-[color:var(--nav-border)] bg-[color:var(--surface-strong)] p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            {links.map((l) => {
              const active = isActive(l);
              return (
                <Link
                  key={l.page}
                  to={l.page}
                  onClick={() => setOpen(false)}
                  className={mobileClass(active)}
                >
                  {l.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
