import { useEffect, useState } from "react";
import {
  getGitHubContributions,
  type GitHubContributionsResponse,
} from "@/lib/api/github.functions";

type Contribution = GitHubContributionsResponse["rows"][number][number];

/** GitHub dark-theme contribution colors (levels 0–4) */
const GITHUB_LEVELS = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
] as const;

const DAY_ROW_LABELS: Record<number, string> = {
  1: "Mon",
  3: "Wed",
  5: "Fri",
};

function cellColor(day: Contribution) {
  if (day.color) return day.color;
  const level = Math.min(4, Math.max(0, day.level));
  return GITHUB_LEVELS[level];
}

export function GitHubContributions({ username }: { username: string }) {
  const [data, setData] = useState<GitHubContributionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;

    getGitHubContributions({ data: { username } })
      .then((json) => {
        if (alive) setData(json);
      })
      .catch(() => {
        if (alive) setError(true);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="flex min-h-[120px] items-center justify-center rounded-xl border border-white/8 bg-[#05060f]/80 p-6 light:border-[#E2E8F0] light:bg-white">
        <div className="h-24 w-full max-w-md animate-pulse rounded-lg bg-white/5" />
      </div>
    );
  }

  if (error || !data?.rows?.length) {
    return (
      <div className="rounded-xl border border-white/8 bg-[#05060f]/80 p-6 text-center light:border-[#E2E8F0] light:bg-white">
        <p className="text-sm text-muted-foreground">Could not load contribution graph.</p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-cyan hover:underline"
        >
          View profile on GitHub →
        </a>
      </div>
    );
  }

  const { rows, monthLabels, total } = data;

  return (
    <div className="card-hover-lift overflow-x-auto rounded-xl border border-white/8 bg-[#05060f]/80 p-3 sm:p-4 light:border-[#E2E8F0] light:bg-white">
      {/* Same table structure as github.com/users/{user}/contributions */}
      <table
        className="border-separate"
        style={{ borderSpacing: "3px" }}
        role="grid"
        aria-label="GitHub contribution graph"
      >
        <thead>
          <tr>
            <td style={{ width: 28, padding: 0, border: "none" }} aria-hidden />
            {monthLabels.map((m, idx) => (
              <td
                key={`${m.label}-${idx}`}
                colSpan={m.colspan}
                className="relative p-0 align-bottom font-mono text-[10px] leading-none text-muted-foreground sm:text-[11px]"
                style={{ height: 15, border: "none" }}
              >
                {m.label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td
                className="p-0 align-middle font-mono text-[9px] leading-none text-muted-foreground/70"
                style={{ width: 28, border: "none" }}
              >
                {DAY_ROW_LABELS[rowIndex] ?? ""}
              </td>
              {row.map((day, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}-${day.date || "empty"}`}
                  role="gridcell"
                  title={
                    day.date
                      ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                      : undefined
                  }
                  className="p-0"
                  style={{
                    width: 11,
                    height: 11,
                    minWidth: 11,
                    minHeight: 11,
                    border: "none",
                    borderRadius: 2,
                    backgroundColor: cellColor(day),
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[10px] text-muted-foreground sm:text-[11px]">
          {total.lastYear} contributions in the last year
        </p>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground sm:text-[11px]">
          <span>Less</span>
          {GITHUB_LEVELS.map((color) => (
            <span
              key={color}
              className="inline-block rounded-[2px]"
              style={{ width: 11, height: 11, backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
