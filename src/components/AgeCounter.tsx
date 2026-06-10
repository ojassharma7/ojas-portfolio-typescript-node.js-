'use client';

import { useEffect, useState } from 'react';
import { identity } from '@/lib/profile';

const MS_PER_YEAR = 365.2425 * 24 * 60 * 60 * 1000;
const BORN = new Date(`${identity.born}T00:00:00`).getTime();

/** Live-ticking age, qtzx-style: "approx. 24.65807492 years old". */
export default function AgeCounter() {
  const [age, setAge] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setAge(((Date.now() - BORN) / MS_PER_YEAR).toFixed(8));
    tick();
    const interval = setInterval(tick, 50);
    return () => clearInterval(interval);
  }, []);

  // render nothing on the server so the ever-changing number can't mismatch hydration
  if (age === null) return null;

  return (
    <span className="tabular-nums">
      approx. <span className="text-term-text">{age}</span> years old
    </span>
  );
}
