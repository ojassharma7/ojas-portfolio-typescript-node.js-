'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type ContinueFooterProps = {
  href: string;
  cmd: string; // e.g. "cd ~/life"
  label: string; // e.g. "the other side — football, the comeback, the runs"
};

/** Bottom-of-page cue that carries the reader to the next route in the journey. */
export default function ContinueFooter({ href, cmd, label }: ContinueFooterProps) {
  return (
    <Link
      href={href}
      className="group mx-auto flex max-w-md flex-col items-center gap-3 rounded-lg border border-term-border bg-term-surface/60 px-6 py-7 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-term-cyan/60 hover:bg-term-surface"
    >
      <motion.span
        aria-hidden
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="text-xl text-term-cyan"
      >
        ⌄
      </motion.span>
      <span className="text-xs uppercase tracking-[0.3em] text-term-muted">
        scroll to continue
      </span>
      <span className="font-bold text-term-cyan">
        <span className="prompt-symbol">$ </span>
        {cmd}
        <span className="ml-1 transition-transform group-hover:translate-x-1 inline-block">→</span>
      </span>
      <span className="text-xs text-term-muted">{label}</span>
    </Link>
  );
}
