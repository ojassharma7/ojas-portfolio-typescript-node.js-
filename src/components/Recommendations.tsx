import { FaLinkedin, FaQuoteLeft } from 'react-icons/fa6';
import { recommendations } from '@/lib/profile';

/** Verified colleague recommendations — social proof for the Rutgers work. */
export default function Recommendations() {
  if (recommendations.length === 0) return null;
  return (
    <div className="space-y-4">
      {recommendations.map((r) => (
        <figure
          key={r.name}
          className="rounded-lg border border-term-border bg-term-surface p-5 sm:p-6"
        >
          <FaQuoteLeft className="mb-3 text-term-cyan/50" size={18} />
          <blockquote className="text-sm leading-relaxed text-term-text/90">
            {r.text}
          </blockquote>
          <figcaption className="mt-4 flex items-start gap-3 border-t border-term-border/60 pt-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-term-border bg-term-bg text-sm font-bold text-term-cyan">
              {r.name
                .split(' ')
                .slice(0, 2)
                .map((w) => w[0])
                .join('')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-sm font-bold text-term-text">
                {r.name}
                <FaLinkedin className="text-term-blue" size={13} title={`via ${r.source}`} />
              </p>
              <p className="text-xs text-term-muted">{r.title}</p>
              <p className="mt-0.5 text-[11px] text-term-muted">
                {r.date} · {r.relation}
              </p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
