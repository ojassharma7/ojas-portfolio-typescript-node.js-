'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp from '@/components/CountUp';
import type { PacePoint, StravaData, Totals } from '@/lib/strava';

const ORANGE = '#FC4C02';

type Period = 'all' | 'year' | 'recent';

/** Interactive pace area-chart with a hover guide that reads off the nearest run. */
function PaceChart({ points }: { points: PacePoint[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const w = 320;
  const h = 84;
  const pad = 8;
  if (points.length < 2) return null;

  const paces = points.map((p) => p.paceSec);
  const min = Math.min(...paces);
  const max = Math.max(...paces);
  const span = max - min || 1;
  const coords = points.map((p, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = pad + ((p.paceSec - min) / span) * (h - pad * 2); // faster = higher
    return [x, y] as const;
  });
  const line = coords.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${line} L${coords[coords.length - 1][0].toFixed(1)},${h - pad} L${pad},${h - pad} Z`;

  const fmtPace = (sec: number) => `${Math.floor(sec / 60)}:${Math.round(sec % 60).toString().padStart(2, '0')}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full touch-none"
      preserveAspectRatio="none"
      onMouseLeave={() => setHover(null)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const frac = (e.clientX - r.left) / r.width;
        setHover(Math.max(0, Math.min(points.length - 1, Math.round(frac * (points.length - 1)))));
      }}
    >
      <defs>
        <linearGradient id="paceFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ORANGE} stopOpacity="0.35" />
          <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#paceFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={ORANGE}
        strokeWidth={1.8}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
      {hover !== null && (
        <>
          <line x1={coords[hover][0]} y1={pad} x2={coords[hover][0]} y2={h - pad} stroke={ORANGE} strokeOpacity={0.4} strokeWidth={0.7} />
          <circle cx={coords[hover][0]} cy={coords[hover][1]} r={3} fill={ORANGE} />
          <text
            x={Math.min(Math.max(coords[hover][0], 22), w - 22)}
            y={11}
            textAnchor="middle"
            fontSize="9"
            fill="rgb(var(--t-text))"
          >
            {fmtPace(points[hover].paceSec)}/km · {points[hover].date}
          </text>
        </>
      )}
    </svg>
  );
}

function StatTile({ value, suffix, label, period }: { value: number; suffix: string; label: string; period: Period }) {
  return (
    <div className="rounded-lg border border-term-border bg-term-bg px-3 py-4 text-center transition-colors hover:border-[#FC4C02]/60">
      <div className="text-2xl font-bold" style={{ color: ORANGE }}>
        {/* key forces a re-count whenever the period tab changes */}
        <CountUp key={`${period}-${label}`} value={`${value}`} />
        <span className="text-base">{suffix}</span>
      </div>
      <div className="mt-1 text-[11px] text-term-muted">{label}</div>
    </div>
  );
}

export default function StravaDashboard({ fallback }: { fallback: React.ReactNode }) {
  const [data, setData] = useState<StravaData | null>(null);
  const [failed, setFailed] = useState(false);
  const [period, setPeriod] = useState<Period>('all');

  useEffect(() => {
    fetch('/api/strava')
      .then((r) => r.json())
      .then((d: StravaData) => setData(d))
      .catch(() => setFailed(true));
  }, []);

  const maxKm = useMemo(() => Math.max(...(data?.weekly.map((w) => w.km) ?? [1]), 1), [data]);
  const maxRunKm = useMemo(() => Math.max(...(data?.recentRuns.map((r) => r.km) ?? [1]), 1), [data]);

  if (failed || (data && !data.configured)) return <>{fallback}</>;
  if (!data) {
    return (
      <div className="py-6 text-sm text-term-muted">
        <span className="prompt-symbol"># </span>syncing with strava
        <span className="cursor-block" />
      </div>
    );
  }

  const year = new Date().getFullYear();
  const tabs: { key: Period; label: string }[] = [
    { key: 'all', label: 'all-time' },
    { key: 'year', label: `${year}` },
    { key: 'recent', label: 'last 4 weeks' },
  ];
  const t: Totals = data.totals[period];

  return (
    <div className="space-y-7">
      {/* period tabs */}
      <div className="inline-flex rounded-lg border border-term-border bg-term-bg p-0.5 text-xs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setPeriod(tab.key)}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              period === tab.key ? 'text-term-bg' : 'text-term-muted hover:text-term-text'
            }`}
            style={period === tab.key ? { backgroundColor: ORANGE } : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* headline stats — swap + re-animate per period */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile value={t.km} suffix=" km" label="distance" period={period} />
        <StatTile value={t.count} suffix="" label="runs" period={period} />
        <StatTile value={t.hours} suffix=" h" label="moving time" period={period} />
        <StatTile value={t.elevM} suffix=" m" label="elevation" period={period} />
      </div>

      {/* personal records strip */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded border border-term-border bg-term-bg px-3 py-1.5 text-term-muted">
          longest run <span style={{ color: ORANGE }} className="font-bold">{data.records.longestRunKm} km</span>
        </span>
        <span className="rounded border border-term-border bg-term-bg px-3 py-1.5 text-term-muted">
          biggest climb <span style={{ color: ORANGE }} className="font-bold">{data.records.biggestClimbM} m</span>
        </span>
        <span className="rounded border border-term-border bg-term-bg px-3 py-1.5 text-term-muted">
          {year} avg pace <span style={{ color: ORANGE }} className="font-bold">{data.avgPace}/km</span>
        </span>
      </div>

      {/* weekly mileage */}
      <div>
        <div className="mb-2 text-xs text-term-muted">weekly volume — last {data.weekly.length} weeks</div>
        <div className="flex h-32 items-end gap-2">
          {data.weekly.map((wk, i) => {
            const last = i === data.weekly.length - 1;
            return (
              <div key={i} className="group relative flex h-full flex-1 flex-col justify-end">
                <span className="pointer-events-none absolute -top-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-term-raised px-1.5 py-0.5 text-[10px] text-term-text opacity-0 shadow transition-opacity group-hover:opacity-100">
                  {wk.km} km
                </span>
                <motion.div
                  initial={{ height: '0%' }}
                  whileInView={{ height: `${Math.max((wk.km / maxKm) * 100, 2)}%` }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: [0.21, 0.5, 0.3, 1] }}
                  className="w-full rounded-t-sm"
                  style={{ backgroundColor: last ? ORANGE : `${ORANGE}59` }}
                />
              </div>
            );
          })}
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
          <span className="text-term-border">(hover · higher = faster)</span>
        </div>
        <PaceChart points={data.paceTrend} />
      </div>

      {/* recent runs feed */}
      <div>
        <div className="mb-2 text-xs text-term-muted">recent runs</div>
        <div className="space-y-2">
          {data.recentRuns.map((run, i) => (
            <div
              key={i}
              className="group rounded-md border border-term-border bg-term-bg px-3 py-2 transition-colors hover:border-[#FC4C02]/50"
            >
              <div className="flex items-baseline gap-2 text-sm">
                <span className="prompt-symbol shrink-0 text-xs">{run.date}</span>
                <span className="min-w-0 flex-1 truncate text-term-text">{run.name}</span>
                <span className="shrink-0 font-bold" style={{ color: ORANGE }}>{run.km} km</span>
                <span className="shrink-0 text-term-muted">{run.pace}/km</span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-term-border/40">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(run.km / maxRunKm) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: ORANGE }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* attribution */}
      <div className="flex items-center justify-between text-[10px] text-term-muted">
        <span
          className="rounded px-2 py-0.5 font-bold tracking-wide text-term-bg"
          style={{ backgroundColor: ORANGE }}
        >
          ▲ POWERED BY STRAVA
        </span>
        <span>updated {new Date(data.updatedAt).toLocaleDateString('en-US')}</span>
      </div>
    </div>
  );
}
