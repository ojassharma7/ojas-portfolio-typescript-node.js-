'use client';

import { useEffect, useState } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  showCursor?: boolean;
  onDone?: () => void;
};

/** Types text one character at a time with a blinking block cursor. */
export default function Typewriter({
  text,
  speed = 70,
  startDelay = 300,
  className = '',
  showCursor = true,
  onDone,
}: TypewriterProps) {
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    setCount(0);
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  useEffect(() => {
    if (done) onDone?.();
  }, [done, onDone]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      {showCursor && <span className="cursor-block" aria-hidden />}
    </span>
  );
}
