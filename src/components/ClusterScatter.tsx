'use client';

import { motion } from 'framer-motion';

// Representative visualization of the PCA-reduced clustering result — 4 behavioral
// risk segments. Points are illustrative (not raw player data), generated deterministically.
const CLUSTERS = [
  { name: 'low risk', color: 'var(--t-green)', cx: 28, cy: 70, spread: 13, n: 26 },
  { name: 'moderate', color: 'var(--t-blue)', cx: 52, cy: 44, spread: 12, n: 22 },
  { name: 'elevated', color: 'var(--t-yellow)', cx: 70, cy: 66, spread: 10, n: 16 },
  { name: 'high risk', color: 'var(--t-red)', cx: 80, cy: 30, spread: 8, n: 10 },
];

// tiny seeded PRNG so the scatter is stable between renders
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ClusterScatter() {
  const rand = mulberry32(42);
  const points = CLUSTERS.flatMap((c, ci) =>
    Array.from({ length: c.n }, () => {
      // box-muller-ish gaussian via averaged uniforms
      const gx = (rand() + rand() + rand()) / 3 - 0.5;
      const gy = (rand() + rand() + rand()) / 3 - 0.5;
      return {
        x: c.cx + gx * c.spread * 2,
        y: c.cy + gy * c.spread * 2,
        color: c.color,
        ci,
      };
    })
  );

  return (
    <div>
      <p className="mb-3 text-xs text-term-muted">
        <span className="prompt-symbol">$ </span>plot clusters.pca{' '}
        <span className="text-term-border">— 1M+ gamblers, PCA-reduced to 2D</span>
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <svg viewBox="0 0 100 100" className="aspect-square w-full max-w-xs">
          {/* axes */}
          <line x1="6" y1="94" x2="94" y2="94" stroke="rgb(var(--t-border))" strokeWidth="0.4" />
          <line x1="6" y1="6" x2="6" y2="94" stroke="rgb(var(--t-border))" strokeWidth="0.4" />
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={1.6}
              fill={`rgb(${p.color})`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.85, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.012 }}
            />
          ))}
          <text x="50" y="99.5" textAnchor="middle" fontSize="3" fill="rgb(var(--t-muted))">
            PC1 →
          </text>
        </svg>
        <ul className="space-y-2 text-xs">
          {CLUSTERS.map((c) => (
            <li key={c.name} className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: `rgb(${c.color})` }}
              />
              <span className="text-term-text/85">{c.name}</span>
            </li>
          ))}
          <li className="pt-1 text-[11px] text-term-muted">silhouette score 0.79</li>
        </ul>
      </div>
    </div>
  );
}
