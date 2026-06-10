import { ReactNode } from 'react';

type WindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
  accent?: 'green' | 'blue' | 'purple' | 'red' | 'yellow' | 'cyan';
};

/** Window-chrome card: traffic-light dots + a filepath-style title bar. */
export default function Window({ title, children, className = '' }: WindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-term-border bg-term-surface shadow-[0_8px_32px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-term-border bg-term-raised px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-term-red/80" />
        <span className="h-3 w-3 rounded-full bg-term-yellow/80" />
        <span className="h-3 w-3 rounded-full bg-term-green/80" />
        <span className="ml-3 truncate text-xs text-term-muted">{title}</span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
