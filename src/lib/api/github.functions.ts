import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type GitHubContribution = {
  date: string;
  count: number;
  level: number;
  color?: string;
};

export type GitHubMonthLabel = {
  label: string;
  colspan: number;
};

export type GitHubContributionsResponse = {
  total: { lastYear: number };
  /** Month headers with colspan — same as GitHub thead */
  monthLabels: GitHubMonthLabel[];
  /** 7 rows (Sun→Sat), each row = week columns left→right */
  rows: GitHubContribution[][];
  source: "github-graphql" | "github-html" | "fallback";
};

const LEVEL_FROM_GQL: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const GITHUB_GRAPHQL = `
  query UserContributions($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              color
            }
          }
        }
      }
    }
  }
`;

function weeksToRows(weeks: GitHubContribution[][]): GitHubContribution[][] {
  const rowCount = weeks[0]?.length ?? 7;
  const rows: GitHubContribution[][] = [];

  for (let d = 0; d < rowCount; d += 1) {
    rows.push(
      weeks.map((week) => week[d] ?? { date: "", count: 0, level: 0 }),
    );
  }

  return rows;
}

function chunkIntoWeeks(days: GitHubContribution[]): GitHubContribution[][] {
  const weeks: GitHubContribution[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function buildMonthLabels(weeks: GitHubContribution[][]): GitHubMonthLabel[] {
  const labels: GitHubMonthLabel[] = [];
  let lastMonth = -1;
  let spanStart = 0;

  weeks.forEach((week, col) => {
    const first = week.find((d) => d.date);
    if (!first) return;
    const month = new Date(`${first.date}T12:00:00`).getMonth();

    if (month !== lastMonth) {
      if (labels.length) {
        labels[labels.length - 1].colspan = col - spanStart;
      }
      labels.push({
        label: new Date(`${first.date}T12:00:00`).toLocaleString("en-US", { month: "short" }),
        colspan: 1,
      });
      spanStart = col;
      lastMonth = month;
    }
  });

  if (labels.length) {
    labels[labels.length - 1].colspan = weeks.length - spanStart;
  }

  return labels;
}

async function fetchFromGraphQL(
  username: string,
  token: string,
): Promise<GitHubContributionsResponse> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GITHUB_GRAPHQL,
      variables: { username },
    }),
    signal: AbortSignal.timeout(12_000),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL returned ${res.status}`);
  }

  const json = (await res.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions: number;
            weeks: {
              contributionDays: {
                date: string;
                contributionCount: number;
                contributionLevel: string;
                color: string;
              }[];
            }[];
          };
        };
      };
    };
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GitHub GraphQL error");
  }

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    throw new Error("GitHub GraphQL returned no contribution calendar");
  }

  const weeks = calendar.weeks.map((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVEL_FROM_GQL[day.contributionLevel] ?? 0,
      color: day.color,
    })),
  );

  return {
    total: { lastYear: calendar.totalContributions },
    monthLabels: buildMonthLabels(weeks),
    rows: weeksToRows(weeks),
    source: "github-graphql",
  };
}

function parseCountsFromTooltips(html: string) {
  const counts = new Map<string, number>();
  const tipRegex = /for="(contribution-day-component-[^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;

  for (const match of html.matchAll(tipRegex)) {
    const id = match[1];
    const text = match[2].trim();
    const countMatch = text.match(/^(\d+)\s+contributions?\s+on/i);
    counts.set(id, countMatch ? Number.parseInt(countMatch[1], 10) : 0);
  }

  return counts;
}

function parseDayCell(td: string, tooltipCounts: Map<string, number>): GitHubContribution {
  const date = td.match(/data-date="(\d{4}-\d{2}-\d{2})"/)?.[1] ?? "";
  const id = td.match(/id="(contribution-day-component-[^"]+)"/)?.[1];
  const level = Number.parseInt(td.match(/data-level="(\d)"/)?.[1] ?? "0", 10);
  const count = id ? (tooltipCounts.get(id) ?? 0) : 0;
  return { date, count, level };
}

function parseMonthLabelsFromHtml(html: string): GitHubMonthLabel[] {
  const theadMatch = html.match(
    /class="ContributionCalendar-grid[^"]*"[\s\S]*?<thead>([\s\S]*?)<\/thead>/,
  );
  if (!theadMatch) return [];

  const labels: GitHubMonthLabel[] = [];
  const labelRegex =
    /ContributionCalendar-label" colspan="(\d+)"[\s\S]*?aria-hidden="true"[^>]*>([^<]+)/g;

  for (const match of theadMatch[1].matchAll(labelRegex)) {
    labels.push({
      colspan: Number.parseInt(match[1], 10),
      label: match[2].trim(),
    });
  }

  return labels;
}

function parseHtmlRows(html: string, tooltipCounts: Map<string, number>): GitHubContribution[][] {
  const tableMatch = html.match(
    /class="ContributionCalendar-grid[^"]*"[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/,
  );
  if (!tableMatch) {
    throw new Error("Could not find contribution calendar table");
  }

  const rows: GitHubContribution[][] = [];
  for (const rowMatch of tableMatch[1].matchAll(/<tr[\s\S]*?>([\s\S]*?)<\/tr>/g)) {
    const cells: GitHubContribution[] = [];
    for (const tdMatch of rowMatch[1].matchAll(/<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*>/g)) {
      cells.push(parseDayCell(tdMatch[0], tooltipCounts));
    }
    if (cells.length) rows.push(cells);
  }

  if (!rows.length) {
    throw new Error("Could not parse contribution day rows");
  }

  return rows;
}

async function fetchFromGitHubHtml(username: string): Promise<GitHubContributionsResponse> {
  const res = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, {
    headers: {
      Accept: "text/html",
      "User-Agent": "portfolio-contributions/1.0",
    },
    signal: AbortSignal.timeout(12_000),
  });

  if (!res.ok) {
    throw new Error(`GitHub HTML returned ${res.status}`);
  }

  const html = await res.text();
  const totalMatch = html.match(/>\s*(\d+)\s+contributions\s+in the last year/i);
  const tooltipCounts = parseCountsFromTooltips(html);
  const rows = parseHtmlRows(html, tooltipCounts);
  const monthLabels = parseMonthLabelsFromHtml(html);

  if (!rows.length) {
    throw new Error("Could not parse GitHub contribution calendar");
  }

  const summed = rows.flat().reduce((sum, day) => sum + day.count, 0);
  const lastYear = totalMatch ? Number.parseInt(totalMatch[1], 10) : summed;

  return {
    total: { lastYear },
    monthLabels,
    rows,
    source: "github-html",
  };
}

async function fetchFromJogruber(username: string): Promise<GitHubContributionsResponse> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
    {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(12_000),
    },
  );

  if (!res.ok) {
    throw new Error(`Fallback contributions API returned ${res.status}`);
  }

  const json = (await res.json()) as {
    total: { lastYear: number };
    contributions: GitHubContribution[];
  };

  const weeks = chunkIntoWeeks(json.contributions);

  return {
    total: json.total,
    monthLabels: buildMonthLabels(weeks),
    rows: weeksToRows(weeks),
    source: "fallback",
  };
}

/** Exact GitHub calendar — GraphQL when token is set, else official HTML scrape */
export const getGitHubContributions = createServerFn({ method: "POST" })
  .validator(z.object({ username: z.string().min(1).max(39) }))
  .handler(async ({ data }) => {
    const token = process.env.GITHUB_TOKEN?.trim();

    if (token) {
      try {
        return await fetchFromGraphQL(data.username, token);
      } catch (err) {
        console.error("GitHub GraphQL contributions failed:", err);
      }
    }

    try {
      return await fetchFromGitHubHtml(data.username);
    } catch (err) {
      console.error("GitHub HTML contributions failed:", err);
      return fetchFromJogruber(data.username);
    }
  });
