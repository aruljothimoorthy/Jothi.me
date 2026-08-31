import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const viewMoreClass =
  "btn-primary m-typo-btn relative z-30 inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan/40 bg-black/40 px-6 py-3 text-sm font-medium text-cyan shadow-[0_0_24px_rgba(94,239,255,0.12)] transition hover:bg-cyan hover:text-primary-foreground active:scale-[0.98] sm:w-auto ";

type AppPath = "/about" | "/skills" | "/projects" | "/experience" | "/contact" | "/certificates";

export function ViewMoreLink({
  to,
  label = "View More",
}: {
  to: AppPath;
  label?: string;
}) {
  return (
    <div className="relative z-30 mt-10 flex justify-center px-1 lg:mt-8">
      <Link to={to} data-cursor="hover" className={viewMoreClass} preload="intent">
        {label} <ArrowUpRight size={16} aria-hidden />
      </Link>
    </div>
  );
}
