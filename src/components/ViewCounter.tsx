'use client';

import { useEffect, useState } from 'react';

/** Total page views — counted once per browser session via /api/views. */
export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const counted = sessionStorage.getItem('viewed');
    fetch('/api/views', { method: counted ? 'GET' : 'POST' })
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.views === 'number') {
          setViews(data.views);
          sessionStorage.setItem('viewed', '1');
        }
      })
      .catch(() => {});
  }, []);

  if (views === null) return null;

  return <span className="tabular-nums">{views.toLocaleString('en-US')} views</span>;
}
