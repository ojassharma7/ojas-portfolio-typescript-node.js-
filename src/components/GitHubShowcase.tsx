'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa6';
import type { GitHubData } from '@/lib/github';

export default function GitHubShowcase() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((d: GitHubData) => (d.ok ? setData(d) : setFailed(true)))
      .catch(() => setFailed(true));
  }, []);

  if (failed) return null; // silently hide if GitHub is unreachable

  if (!data) {
    return (
      <div className="rounded-lg border border-term-border bg-term-surface p-5 text-sm text-term-muted">
        <span className="prompt-symbol"># </span>fetching github activity
        <span className="cursor-block" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-term-border bg-term-surface p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-term-muted">
          <span className="prompt-symbol">$ </span>gh repo list{' '}
          <span className="text-term-cyan/80">--lang-stats</span>
        </span>
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-term-muted transition-colors hover:text-term-cyan"
        >
          <FaGithub size={15} />
          {data.repoCount} public repos ↗
        </a>
      </div>

      {/* stacked language bar */}
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-term-border/40">
        {data.languages.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ width: 0 }}
            whileInView={{ width: `${l.pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
            style={{ backgroundColor: l.color }}
            title={`${l.name} — ${l.pct}%`}
          />
        ))}
      </div>

      {/* legend */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
        {data.languages.map((l) => (
          <span key={l.name} className="flex items-center gap-1.5 text-term-text/85">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} />
            {l.name} <span className="text-term-muted">{l.pct}%</span>
          </span>
        ))}
      </div>

      {/* recent activity */}
      <div className="mt-5 border-t border-term-border/60 pt-4">
        <p className="mb-2 text-xs text-term-muted">recently pushed</p>
        <div className="space-y-1.5">
          {data.recent.map((r) => {
            const dot =
              data.languages.find((l) => l.name === r.language)?.color ?? '#5c6883';
            return (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline gap-2 text-sm"
            >
              <span
                className="h-2 w-2 shrink-0 translate-y-0.5 rounded-full"
                style={{ backgroundColor: dot }}
              />
              <span className="min-w-0 flex-1 truncate text-term-text/85 transition-colors group-hover:text-term-cyan">
                {r.name}
              </span>
              {r.language && <span className="shrink-0 text-xs text-term-muted">{r.language}</span>}
              <span className="shrink-0 text-xs text-term-muted">{r.pushed}</span>
            </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
