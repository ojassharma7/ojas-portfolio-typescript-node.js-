// Strava integration: refresh token -> access token -> athlete stats + activities.
// Results are cached in Redis (Upstash/Vercel KV) so we never hit Strava rate limits.

export type Totals = { count: number; km: number; hours: number; elevM: number };
export type WeekBar = { label: string; km: number };
export type RecentRun = { name: string; km: number; pace: string; date: string; elevM: number };
export type PacePoint = { date: string; paceSec: number };

export type StravaData = {
  configured: boolean;
  updatedAt: string;
  totals: { all: Totals; year: Totals; recent: Totals };
  records: { longestRunKm: number; biggestClimbM: number };
  avgPace: string; // mm:ss /km (year-to-date)
  weekly: WeekBar[];
  recentRuns: RecentRun[];
  paceTrend: PacePoint[];
};

const CACHE_KEY = 'strava:data:v3';
const CACHE_TTL_SECONDS = 6 * 60 * 60; // refresh at most every 6h

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
  if (!res.ok) throw new Error(`redis ${res.status}: ${await res.text()}`);
  return (await res.json()).result;
}

// ---- helpers ----
const M_PER_KM = 1000;

function paceFromSeconds(secPerKm: number): string {
  if (!isFinite(secPerKm) || secPerKm <= 0) return '—';
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function weekStart(d: Date): Date {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // Mon=0
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - day);
  return x;
}

type RawTotal = { count: number; distance: number; moving_time: number; elevation_gain: number };
type AthleteStats = {
  all_run_totals: RawTotal;
  ytd_run_totals: RawTotal;
  recent_run_totals: RawTotal;
  biggest_run_distance: number;
  biggest_climb_elevation_gain: number;
};

type RawActivity = {
  name: string;
  distance: number;
  moving_time: number;
  type: string;
  sport_type?: string;
  start_date_local: string;
  total_elevation_gain: number;
};

function toTotals(t: RawTotal): Totals {
  return {
    count: t.count ?? 0,
    km: Math.round((t.distance ?? 0) / M_PER_KM),
    hours: Math.round(((t.moving_time ?? 0) / 3600) * 10) / 10,
    elevM: Math.round(t.elevation_gain ?? 0),
  };
}

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`strava token ${res.status}: ${await res.text()}`);
  return (await res.json()).access_token;
}

async function api<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`https://www.strava.com/api/v3${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`strava ${path} ${res.status}: ${await res.text()}`);
  return res.json();
}

async function fetchRuns(token: string): Promise<RawActivity[]> {
  const all: RawActivity[] = [];
  for (let page = 1; page <= 2; page++) {
    const batch = await api<RawActivity[]>(`/athlete/activities?per_page=100&page=${page}`, token);
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all.filter((a) => a.type === 'Run' || a.sport_type === 'Run');
}

function aggregateActivities(runs: RawActivity[]) {
  const now = new Date();

  // last 10 weeks of volume
  const weekly: WeekBar[] = [];
  for (let i = 9; i >= 0; i--) {
    const start = weekStart(new Date(now.getTime() - i * 7 * 86400000));
    const end = new Date(start.getTime() + 7 * 86400000);
    const km =
      runs
        .filter((r) => {
          const d = new Date(r.start_date_local);
          return d >= start && d < end;
        })
        .reduce((s, r) => s + r.distance, 0) / M_PER_KM;
    weekly.push({
      label: `${start.getMonth() + 1}/${start.getDate()}`,
      km: Math.round(km * 10) / 10,
    });
  }

  const sorted = [...runs].sort(
    (a, b) => new Date(b.start_date_local).getTime() - new Date(a.start_date_local).getTime()
  );

  const recentRuns: RecentRun[] = sorted.slice(0, 6).map((r) => ({
    name: r.name,
    km: Math.round((r.distance / M_PER_KM) * 10) / 10,
    pace: paceFromSeconds(r.distance ? r.moving_time / (r.distance / M_PER_KM) : 0),
    elevM: Math.round(r.total_elevation_gain || 0),
    date: new Date(r.start_date_local).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  const paceTrend: PacePoint[] = sorted
    .slice(0, 15)
    .reverse()
    .map((r) => ({
      date: new Date(r.start_date_local).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      paceSec: r.distance ? Math.round(r.moving_time / (r.distance / M_PER_KM)) : 0,
    }));

  // computed from activities — Strava's biggest_* stat fields are often null
  const records = {
    longestRunKm: Math.round(Math.max(0, ...runs.map((r) => r.distance)) / M_PER_KM),
    biggestClimbM: Math.round(Math.max(0, ...runs.map((r) => r.total_elevation_gain || 0))),
  };

  return { weekly, recentRuns, paceTrend, records };
}

/** Sample data so the dashboard is demoable before real credentials exist. */
export function mockStravaData(): StravaData {
  return {
    configured: true,
    updatedAt: new Date().toISOString(),
    totals: {
      all: { count: 540, km: 4120, hours: 372, elevM: 28400 },
      year: { count: 86, km: 512, hours: 46, elevM: 3140 },
      recent: { count: 14, km: 92, hours: 8.2, elevM: 540 },
    },
    records: { longestRunKm: 21, biggestClimbM: 410 },
    avgPace: '5:18',
    weekly: [16, 21, 18, 23, 19, 24, 21, 26, 22, 20].map((km, i) => ({
      label: `${(i % 12) + 1}/${((i * 7) % 28) + 1}`,
      km,
    })),
    recentRuns: [
      { name: 'Easy shakeout along the canal', km: 8.2, pace: '5:32', elevM: 24, date: 'Jun 9' },
      { name: 'Tempo Tuesday', km: 12.1, pace: '4:48', elevM: 60, date: 'Jun 6' },
      { name: 'Long run — Raritan loop', km: 21.0, pace: '5:25', elevM: 180, date: 'Jun 1' },
      { name: 'Recovery jog', km: 6.0, pace: '6:02', elevM: 12, date: 'May 30' },
      { name: 'Hill repeats', km: 9.4, pace: '5:10', elevM: 220, date: 'May 28' },
      { name: 'Sunday miles', km: 16.3, pace: '5:21', elevM: 95, date: 'May 26' },
    ],
    paceTrend: [330, 322, 340, 315, 308, 325, 318, 312, 305, 320, 316, 309, 314, 311, 318].map(
      (paceSec, i) => ({ date: `r${i + 1}`, paceSec })
    ),
  };
}

function notConfigured(): StravaData {
  return {
    configured: false,
    updatedAt: new Date().toISOString(),
    totals: {
      all: { count: 0, km: 0, hours: 0, elevM: 0 },
      year: { count: 0, km: 0, hours: 0, elevM: 0 },
      recent: { count: 0, km: 0, hours: 0, elevM: 0 },
    },
    records: { longestRunKm: 0, biggestClimbM: 0 },
    avgPace: '—',
    weekly: [],
    recentRuns: [],
    paceTrend: [],
  };
}

/** Main entry: cached -> fetch+aggregate+cache -> mock/not-configured. */
export async function getStravaData(): Promise<StravaData> {
  const hasCreds =
    process.env.STRAVA_CLIENT_ID &&
    process.env.STRAVA_CLIENT_SECRET &&
    process.env.STRAVA_REFRESH_TOKEN;

  if (!hasCreds) {
    return process.env.STRAVA_MOCK === '1' ? mockStravaData() : notConfigured();
  }

  if (useRedis) {
    try {
      const cached = await redis(['GET', CACHE_KEY]);
      if (typeof cached === 'string') return JSON.parse(cached) as StravaData;
    } catch (err) {
      console.error('strava cache read failed:', err);
    }
  }

  const token = await getAccessToken();
  const me = await api<{ id: number }>('/athlete', token);
  const [stats, runs] = await Promise.all([
    api<AthleteStats>(`/athletes/${me.id}/stats`, token),
    fetchRuns(token),
  ]);

  const ytd = stats.ytd_run_totals;
  const data: StravaData = {
    configured: true,
    updatedAt: new Date().toISOString(),
    totals: {
      all: toTotals(stats.all_run_totals),
      year: toTotals(stats.ytd_run_totals),
      recent: toTotals(stats.recent_run_totals),
    },
    avgPace: paceFromSeconds(ytd.distance ? ytd.moving_time / (ytd.distance / M_PER_KM) : 0),
    ...aggregateActivities(runs),
  };

  if (useRedis) {
    try {
      await redis(['SET', CACHE_KEY, JSON.stringify(data), 'EX', CACHE_TTL_SECONDS]);
    } catch (err) {
      console.error('strava cache write failed:', err);
    }
  }
  return data;
}
