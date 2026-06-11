'use client';

import { useEffect, useState } from 'react';

/** Switches between dark and light terminal palettes; persisted in localStorage. */
export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  const toggle = () => {
    const next = !document.documentElement.classList.contains('light');
    setLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {}
  };

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'));
    // let the command palette toggle the theme too
    window.addEventListener('ojas:toggle-theme', toggle);
    return () => window.removeEventListener('ojas:toggle-theme', toggle);
  }, []);

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
