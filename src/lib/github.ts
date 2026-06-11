// Live GitHub activity: repo count, language distribution, and recent pushes.
// Cached in Redis (Upstash/Vercel KV) so we stay well under GitHub's rate limit.

const USERNAME = 'ojassharma7';
const CACHE_KEY = 'github:data:v1';
const CACHE_TTL_SECONDS = 6 * 60 * 60;

const REDIS_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const useRedis = Boolean(REDIS_URL && REDIS_TOKEN);

async function redis(command: (string | number)[]): Promise<unknown> {
  const res = await fetch(REDIS_URL as string, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  return (await res.json()).result;
}

export type Lang = { name: string; count: number; pct: number; color: string };
export type RecentRepo = { name: string; url: string; language: string | null; pushed: string };
export type GitHubData = {
  ok: boolean;
  repoCount: number;
  languages: Lang[];
  recent: RecentRepo[];
  profileUrl: string;
  updatedAt: string;
};

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  'Jupyter Notebook': '#DA5B0B',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  R: '#198CE7',
  Go: '#00ADD8',
  Rust: '#dea584',
};
const langColor = (l: string | null) => (l && LANG_COLORS[l]) || '#7dcfff';

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d <= 0) return 'today';
  if (d === 1) return '1d ago';
  if (d < 7) return `${d}d ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

type Repo = {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

export async function getGitHubData(): Promise<GitHubData> {
  const profileUrl = `https://github.com/${USERNAME}`;

  if (useRedis) {
    try {
      const cached = await redis(['GET', CACHE_KEY]);
      if (typeof cached === 'string') return JSON.parse(cached) as GitHubData;
    } catch (err) {
      console.error('github cache read failed:', err);
    }
  }

  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
    { headers, cache: 'no-store' }
  );
  if (!res.ok) throw new Error(`github ${res.status}`);
  const repos: Repo[] = (await res.json()).filter((r: Repo) => !r.fork);

  // language distribution across repos
  const counts = new Map<string, number>();
  for (const r of repos) {
    if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }
  const totalWithLang = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
  const languages: Lang[] = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      count,
      pct: Math.round((count / totalWithLang) * 100),
      color: langColor(name),
    }));

  const recent: RecentRepo[] = repos.slice(0, 4).map((r) => ({
    name: r.name.replace(/^-/, ''),
    url: r.html_url,
    language: r.language,
    pushed: relativeTime(r.pushed_at),
  }));

  const data: GitHubData = {
    ok: true,
    repoCount: repos.length,
    languages,
    recent,
    profileUrl,
    updatedAt: new Date().toISOString(),
  };

  if (useRedis) {
    try {
      await redis(['SET', CACHE_KEY, JSON.stringify(data), 'EX', CACHE_TTL_SECONDS]);
    } catch (err) {
      console.error('github cache write failed:', err);
    }
  }
  return data;
}
