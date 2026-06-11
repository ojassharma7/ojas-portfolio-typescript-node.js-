'use client';

import { motion } from 'framer-motion';
import WorkStory from '@/components/WorkStory';
import { rutgers } from '@/lib/profile';

/**
 * The Rutgers work: a plain-language explainer (problem -> approach -> impact)
 * for any reader, then the technical pipeline and measured-impact meters.
 */
export default function ImpactPipeline() {
  return (
    <div className="space-y-10">
      {/* plain-english story + validating quote */}
      <WorkStory />

      {/* technical pipeline diagram */}
      <div>
        <p className="mb-3 text-xs text-term-muted">
          <span className="prompt-symbol">$ </span>cat pipeline.yaml{' '}
          <span className="text-term-border">— how 13.6B records become policy</span>
        </p>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
          {rutgers.pipeline.map((stage, i) => (
            <div key={stage.cmd} className="flex flex-col lg:flex-1 lg:flex-row lg:items-center">
              {/* connector from previous node */}
              {i > 0 && (
                <>
                  {/* vertical (mobile) */}
                  <motion.span
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.18 }}
                    className="ml-6 h-4 w-px origin-top bg-gradient-to-b from-term-cyan/60 to-term-cyan/20 lg:hidden"
                  />
                  {/* horizontal (desktop) */}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.18 }}
                    className="hidden h-px w-4 shrink-0 origin-left bg-gradient-to-r from-term-cyan/60 to-term-cyan/20 lg:block"
                  />
                </>
              )}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.18 }}
                className="group relative flex-1 rounded-md border border-term-border bg-term-bg p-3 transition-colors hover:border-term-cyan/60"
              >
                <span className="absolute -top-2 left-3 bg-term-bg px-1 text-[10px] text-term-cyan">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-xs font-bold text-term-cyan">
                  <span className="prompt-symbol">$ </span>
                  {stage.cmd}
                </p>
                <p className="mt-1.5 text-[13px] font-bold leading-snug text-term-text">
                  {stage.title}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-term-muted">{stage.sub}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* measured impact meters */}
      <div>
        <p className="mb-3 text-xs text-term-muted">
          <span className="prompt-symbol">$ </span>./measure --impact
        </p>
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {rutgers.impacts.map((m, i) => (
            <div key={m.label}>
              <div className="mb-1.5 flex items-baseline justify-between text-xs">
                <span className="text-term-text/90">{m.label}</span>
                <span className="font-bold text-term-cyan">{m.display}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-term-border/40">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${m.pct}%` }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.21, 0.5, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-term-blue to-term-cyan"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
