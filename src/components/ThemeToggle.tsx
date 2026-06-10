'use client';

import { useEffect, useState } from 'react';

/** Switches between dark and light terminal palettes; persisted in localStorage. */
export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${light ? 'dark' : 'light'} mode`}
      className="px-3 py-1 text-term-muted transition-colors hover:text-term-yellow"
    >
      [{light ? '☾' : '☀'}]
    </button>
  );
}
