'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

type CountUpProps = {
  /** e.g. "4.5 TB", "13.6 B", "7", "1 M+" — the numeric prefix is animated. */
  value: string;
  duration?: number;
  className?: string;
};

/** Counts the numeric part of a stat up from 0 when scrolled into view. */
export default function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const decimals = match && match[1].includes('.') ? 1 : 0;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {match ? `${display.toFixed(decimals)}${suffix}` : value}
    </span>
  );
}
