'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const BOOT_LINES = [
  '[ ok ] ojas-os v2.0 — initializing...',
  '[ ok ] starting code-rain renderer... glyphs falling',
  '[ ok ] mounting /work — 4.5 TB behavioral data',
  '[ ok ] mounting /life — football, comeback, long runs',
  '[ ok ] loading acl-recovery.ko... rebuilt & tested',
  '[ ok ] starting ask-ojas daemon on /api/chat',
  '[ ok ] all systems nominal. welcome aboard.',
];

const LINE_DELAY = 230;

/** One-time fake boot log overlay. Plays once per session; any key/click skips it. */
export default function BootIntro() {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem('booted')) {
      setVisible(false);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setLines(i);
      if (i >= BOOT_LINES.length) {
        clearInterval(interval);
        setTimeout(finish, 500);
      }
    }, LINE_DELAY);

    function finish() {
      sessionStorage.setItem('booted', '1');
      setVisible(false);
    }

    const skip = () => finish();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-term-bg px-4"
        >
          {/* warp streaks */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ x: '-10vw', opacity: 0 }}
                animate={{ x: '110vw', opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 1.6 + (i % 5) * 0.3,
                  repeat: Infinity,
                  delay: i * 0.17,
                  ease: 'easeIn',
                }}
                className="absolute h-px w-24 bg-gradient-to-r from-transparent via-term-blue to-transparent"
                style={{ top: `${(i * 53) % 100}%` }}
              />
            ))}
          </div>

          <div className="w-full max-w-lg text-sm leading-7">
            {BOOT_LINES.slice(0, lines).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              >
                <span className="text-term-green">{line.slice(0, 6)}</span>
                <span className="text-term-muted">{line.slice(6)}</span>
              </motion.p>
            ))}
            <p className="mt-3 text-xs text-term-border">press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
