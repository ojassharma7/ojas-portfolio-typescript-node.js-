// Strava integration: refresh token -> access token -> fetch runs -> aggregate.
// Results are cached in Redis (Upstash/Vercel KV) so we never hit Strava rate limits.

export type StravaStats = {
  totalKmYear: number;
  totalRuns: number;
  longestKm: number;
  totalElevM: number;
  avgPace: string; // mm:ss /km
};

export type WeekBar = { label: string; km: number };
export type RecentRun = { name: string; km: number; pace: string; date: string };
export type PacePoint = { date: string; paceSec: number };

export type StravaData = {
  configured: boolean;
  updatedAt: string;
  stats: StravaStats;
  weekly: WeekBar[];
  recent: RecentRun[];
  paceTrend: PacePoint[];
};

const CACHE_KEY = 'strava:data';
const CACHE_TTL_SECONDS = 6 * 60 * 60; // refresh at most every 6h

const REDIS_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const useRedis = Boolean(REDIS_URL && REDIS_TOKEN);

/** Run an Upstash REST command via POST (handles large JSON payloads). */
async function redis(command: (string | number)[]): Promise<unknown> {
  const res = await fetch(REDIS_URL as string, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`redis ${res.status}: ${await res.text()}`);
  return (await res.json()).result;
}

// ---- formatting helpers ----
const M_PER_KM = 1000;

function paceFromSeconds(secPerKm: number): string {
  if (!isFinite(secPerKm) || secPerKm <= 0) return '—';
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Monday-based ISO-ish week key for grouping. */
function weekStart(d: Date): Date {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // Mon=0
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - day);
  return x;
}

type RawActivity = {
  name: string;
  distance: number; // meters
  moving_time: number; // seconds
  type: string;
  sport_type?: string;
  start_date_local: string;
  total_elevation_gain: number;
};

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

async function fetchRuns(token: string): Promise<RawActivity[]> {
  // two pages of 100 ≈ ~6 months of activity for most runners
  const all: RawActivity[] = [];
  for (let page = 1; page <= 2; page++) {
    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=100&page=${page}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
    );
    if (!res.ok) throw new Error(`strava activities ${res.status}: ${await res.text()}`);
    const batch: RawActivity[] = await res.json();
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all.filter((a) => a.type === 'Run' || a.sport_type === 'Run');
}

function aggregate(runs: RawActivity[]): Omit<StravaData, 'configured'> {
  const now = new Date();
  const year = now.getFullYear();
  const thisYear = runs.filter((r) => new Date(r.start_date_local).getFullYear() === year);

  // headline stats (year-to-date)
  const totalMeters = thisYear.reduce((s, r) => s + r.distance, 0);
  const totalSeconds = thisYear.reduce((s, r) => s + r.moving_time, 0);
  const stats: StravaStats = {
    totalKmYear: Math.round(totalMeters / M_PER_KM),
    totalRuns: thisYear.length,
    longestKm: Math.round(Math.max(0, ...thisYear.map((r) => r.distance)) / M_PER_KM),
    totalElevM: Math.round(thisYear.reduce((s, r) => s + (r.total_elevation_gain || 0), 0)),
    avgPace: paceFromSeconds(totalMeters ? totalSeconds / (totalMeters / M_PER_KM) : 0),
  };

  // last 10 weeks of volume
  const weeks: WeekBar[] = [];
  for (let i = 9; i >= 0; i--) {
    const start = weekStart(new Date(now.getTime() - i * 7 * 86400000));
    const end = new Date(start.getTime() + 7 * 86400000);
    const km = runs
      .filter((r) => {
        const d = new Date(r.start_date_local);
        return d >= start && d < end;
      })
      .reduce((s, r) => s + r.distance, 0) / M_PER_KM;
    weeks.push({
      label: `${start.getMonth() + 1}/${start.getDate()}`,
      km: Math.round(km * 10) / 10,
    });
  }

  // recent runs feed
  const sorted = [...runs].sort(
    (a, b) => new Date(b.start_date_local).getTime() - new Date(a.start_date_local).getTime()
  );
  const recent: RecentRun[] = sorted.slice(0, 6).map((r) => ({
    name: r.name,
    km: Math.round((r.distance / M_PER_KM) * 10) / 10,
    pace: paceFromSeconds(r.distance ? r.moving_time / (r.distance / M_PER_KM) : 0),
    date: new Date(r.start_date_local).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  // pace trend (oldest -> newest of last 15 runs)
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

  return { updatedAt: now.toISOString(), stats, weekly: weeks, recent, paceTrend };
}

/** Sample data so the dashboard is demoable before real credentials exist. */
export function mockStravaData(): StravaData {
  const weekly: WeekBar[] = [16, 21, 18, 23, 19, 24, 21, 26, 22, 20].map((km, i) => ({
    label: `${((i % 12) + 1)}/${(i * 7) % 28 + 1}`,
    km,
  }));
  return {
    configured: true,
    updatedAt: new Date().toISOString(),
    stats: { totalKmYear: 512, totalRuns: 86, longestKm: 21, totalElevM: 3140, avgPace: '5:18' },
    weekly,
    recent: [
      { name: 'Easy shakeout along the canal', km: 8.2, pace: '5:32', date: 'Jun 9' },
      { name: 'Tempo Tuesday', km: 12.1, pace: '4:48', date: 'Jun 6' },
      { name: 'Long run — Raritan loop', km: 21.0, pace: '5:25', date: 'Jun 1' },
      { name: 'Recovery jog', km: 6.0, pace: '6:02', date: 'May 30' },
      { name: 'Hill repeats', km: 9.4, pace: '5:10', date: 'May 28' },
      { name: 'Sunday miles', km: 16.3, pace: '5:21', date: 'May 26' },
    ],
    paceTrend: [330, 322, 340, 315, 308, 325, 318, 312, 305, 320, 316, 309, 314, 311, 318].map(
      (paceSec, i) => ({ date: `r${i + 1}`, paceSec })
    ),
  };
}

/** Main entry: returns cached data, or fetches+aggregates+caches, or mock/not-configured. */
export async function getStravaData(): Promise<StravaData> {
  const hasCreds =
    process.env.STRAVA_CLIENT_ID &&
    process.env.STRAVA_CLIENT_SECRET &&
    process.env.STRAVA_REFRESH_TOKEN;

  if (!hasCreds) {
    if (process.env.STRAVA_MOCK === '1') return mockStravaData();
    return {
      configured: false,
      updatedAt: new Date().toISOString(),
      stats: { totalKmYear: 0, totalRuns: 0, longestKm: 0, totalElevM: 0, avgPace: '—' },
      weekly: [],
      recent: [],
      paceTrend: [],
    };
  }

  // serve from cache when fresh
  if (useRedis) {
    try {
      const cached = await redis(['GET', CACHE_KEY]);
      if (typeof cached === 'string') return JSON.parse(cached) as StravaData;
    } catch (err) {
      console.error('strava cache read failed:', err);
    }
  }

  const token = await getAccessToken();
  const runs = await fetchRuns(token);
  const data: StravaData = { configured: true, ...aggregate(runs) };

  if (useRedis) {
    try {
      await redis(['SET', CACHE_KEY, JSON.stringify(data), 'EX', CACHE_TTL_SECONDS]);
    } catch (err) {
      console.error('strava cache write failed:', err);
    }
  }
  return data;
}
