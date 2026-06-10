'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from '@/components/CountUp';
import type { StravaData } from '@/lib/strava';

function PaceTrend({ points }: { points: { date: string; paceSec: number }[] }) {
  if (points.length < 2) return null;
  const w = 320;
  const h = 70;
  const pad = 6;
  const paces = points.map((p) => p.paceSec);
  const min = Math.min(...paces);
  const max = Math.max(...paces);
  const span = max - min || 1;
  // lower pace (faster) should sit higher on the chart
  const coords = points.map((p, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = pad + ((p.paceSec - min) / span) * (h - pad * 2);
    return [x, y] as const;
  });
  const line = coords.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <motion.path
        d={line}
        fill="none"
        stroke="rgb(var(--t-cyan))"
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} fill="rgb(var(--t-cyan))" />
      ))}
    </svg>
  );
}

export default function StravaDashboard({ fallback }: { fallback: React.ReactNode }) {
  const [data, setData] = useState<StravaData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch('/api/strava')
      .then((r) => r.json())
      .then((d: StravaData) => setData(d))
      .catch(() => setFailed(true));
  }, []);

  // not configured yet (no Strava creds) or fetch failed -> show the existing static block
  if (failed || (data && !data.configured)) return <>{fallback}</>;

  if (!data) {
    return (
      <div className="py-6 text-sm text-term-muted">
        <span className="prompt-symbol"># </span>syncing with strava
        <span className="cursor-block" />
      </div>
    );
  }

  const maxKm = Math.max(...data.weekly.map((w) => w.km), 1);
  const stats = [
    { value: `${data.stats.totalKmYear}`, suffix: ' km', label: 'this year' },
    { value: `${data.stats.totalRuns}`, suffix: '', label: 'runs' },
    { value: `${data.stats.longestKm}`, suffix: ' km', label: 'longest' },
    { value: `${data.stats.totalElevM}`, suffix: ' m', label: 'elevation' },
  ];

  return (
    <div className="space-y-7">
      {/* headline stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded border border-term-border bg-term-bg px-3 py-4 text-center"
          >
            <div className="text-2xl font-bold text-term-yellow">
              <CountUp value={s.value} />
              {s.suffix}
            </div>
            <div className="mt-1 text-[11px] text-term-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* weekly mileage */}
      <div>
        <div className="mb-2 flex justify-between text-xs text-term-muted">
          <span>weekly volume — last {data.weekly.length} weeks</span>
          <span className="text-term-yellow">avg pace {data.stats.avgPace} /km</span>
        </div>
        <div className="flex h-32 items-end gap-2">
          {data.weekly.map((wk, i) => (
            <div key={i} className="group relative flex h-full flex-1 flex-col justify-end">
              <span className="absolute -top-4 left-0 right-0 text-center text-[10px] text-term-muted opacity-0 transition-opacity group-hover:opacity-100">
                {wk.km}
              </span>
              <motion.div
                initial={{ height: '0%' }}
                whileInView={{ height: `${Math.max((wk.km / maxKm) * 100, 2)}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.21, 0.5, 0.3, 1] }}
                className={`w-full rounded-t-sm ${
                  i === data.weekly.length - 1 ? 'bg-term-cyan' : 'bg-term-cyan/35'
                } transition-colors group-hover:bg-term-cyan`}
              />
            </div>
          ))}
        </div>
        <div className="mt-1 flex gap-2">
          {data.weekly.map((wk, i) => (
            <span key={i} className="flex-1 text-center text-[9px] text-term-muted">
              {wk.label}
            </span>
          ))}
        </div>
      </div>

      {/* pace trend */}
      <div>
        <div className="mb-1 text-xs text-term-muted">
          pace trend — last {data.paceTrend.length} runs{' '}
          <span className="text-term-border">(higher = faster)</span>
        </div>
        <PaceTrend points={data.paceTrend} />
      </div>

      {/* recent runs feed */}
      <div>
        <div className="mb-2 text-xs text-term-muted">recent runs</div>
        <div className="space-y-1.5 text-sm">
          {data.recent.map((run, i) => (
            <div key={i} className="flex items-baseline gap-2 border-b border-term-border/50 pb-1.5">
              <span className="prompt-symbol shrink-0 text-xs">{run.date}</span>
              <span className="min-w-0 flex-1 truncate text-term-text">{run.name}</span>
              <span className="shrink-0 text-term-cyan">{run.km} km</span>
              <span className="shrink-0 text-term-muted">{run.pace}/km</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-right text-[10px] text-term-muted">
        synced from strava · updated {new Date(data.updatedAt).toLocaleDateString('en-US')}
      </p>
    </div>
  );
}
