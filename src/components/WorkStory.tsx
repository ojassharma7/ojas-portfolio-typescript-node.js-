'use client';

import { motion } from 'framer-motion';
import { rutgers } from '@/lib/profile';

const ACCENTS: Record<string, { text: string; border: string; dot: string }> = {
  red: { text: 'text-term-red', border: 'hover:border-term-red/50', dot: 'bg-term-red' },
  cyan: { text: 'text-term-cyan', border: 'hover:border-term-cyan/50', dot: 'bg-term-cyan' },
  green: { text: 'text-term-green', border: 'hover:border-term-green/50', dot: 'bg-term-green' },
};

/**
 * Plain-language explainer of the Rutgers work — problem -> approach -> impact —
 * so any reader instantly gets what Ojas does, plus a validating publication quote.
 */
export default function WorkStory() {
  return (
    <div className="space-y-6">
      <p className="text-xs text-term-muted">
        <span className="prompt-symbol">$ </span>./explain --like-im-not-technical
      </p>

      <div className="grid gap-3 md:grid-cols-3">
        {rutgers.story.map((step, i) => {
          const a = ACCENTS[step.accent];
          return (
            <motion.div
              key={step.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.15 }}
              className={`relative rounded-lg border border-term-border bg-term-bg p-4 transition-colors ${a.border}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${a.text}`}>
                  {step.tag}
                </span>
                {i < rutgers.story.length - 1 && (
                  <span className="ml-auto hidden text-term-border md:inline">→</span>
                )}
              </div>
              <p className="text-[13px] leading-relaxed text-term-text/90">{step.text}</p>
            </motion.div>
          );
        })}
      </div>

      {/* validating pull-quote */}
      <motion.figure
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-lg border border-term-border bg-term-surface p-5"
      >
        <div className="mb-2 inline-flex items-center gap-1.5 rounded bg-term-cyan/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-term-cyan">
          ▲ featured · {rutgers.feature.source}
        </div>
        <blockquote className="border-l-2 border-term-cyan/60 pl-4 text-sm italic leading-relaxed text-term-text/90">
          “{rutgers.feature.quote}”
        </blockquote>
        <figcaption className="mt-2 pl-4 text-xs text-term-muted">
          — {rutgers.feature.author},{' '}
          <span className="text-term-text/70">{rutgers.feature.role}</span>
        </figcaption>
      </motion.figure>
    </div>
  );
}
