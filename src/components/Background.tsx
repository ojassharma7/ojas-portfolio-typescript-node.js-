'use client';

import { useEffect, useRef } from 'react';

/**
 * Site background: slow-drifting aurora blobs, a faint blueprint grid,
 * and a soft glow that follows the cursor. Theme-aware via CSS vars.
 */
export default function Background() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const frame = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      glow.style.transform = `translate(${x - 260}px, ${y - 260}px)`;
      raf = requestAnimationFrame(frame);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* aurora blobs */}
      <div
        className="aurora-blob left-[-18%] top-[-22%] h-[60vh] w-[60vw]"
        style={{
          background: 'radial-gradient(circle, rgb(var(--t-blue) / 0.17), transparent 70%)',
          animation: 'aurora-a 26s ease-in-out infinite',
        }}
      />
      <div
        className="aurora-blob right-[-15%] top-[18%] h-[55vh] w-[50vw]"
        style={{
          background: 'radial-gradient(circle, rgb(var(--t-purple) / 0.13), transparent 70%)',
          animation: 'aurora-b 32s ease-in-out infinite',
        }}
      />
      <div
        className="aurora-blob bottom-[-25%] left-[20%] h-[55vh] w-[55vw]"
        style={{
          background: 'radial-gradient(circle, rgb(var(--t-cyan) / 0.12), transparent 70%)',
          animation: 'aurora-c 38s ease-in-out infinite',
        }}
      />

      {/* faint blueprint grid, fading toward the edges */}
      <div className="bg-grid absolute inset-0" />

      {/* cursor-following glow */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgb(var(--t-cyan) / 0.09), transparent 65%)',
        }}
      />
    </div>
  );
}
