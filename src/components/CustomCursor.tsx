'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom cursor: a solid cyan dot with a trailing ring that eases behind it,
 * expands over interactive elements, and contracts on click.
 * Only activates for mouse pointers; touch devices keep their defaults.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('custom-cursor');

    let raf = 0;
    let x = -100;
    let y = -100;
    let ringX = -100;
    let ringY = -100;
    let scale = 1;
    let targetScale = 1;
    let pressed = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const interactive = (e.target as Element | null)?.closest?.(
        'a, button, input, textarea, select, [role="button"]'
      );
      targetScale = interactive ? 1.8 : 1;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const frame = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      scale += ((pressed ? 0.8 : targetScale) - scale) * 0.22;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(frame);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
