'use client';

import { motion, MotionConfig } from 'framer-motion';

/**
 * App Router template — re-mounts on every navigation, so each route fades in.
 * Opacity-only (no transform) to avoid creating a containing block that would
 * break `fixed` children like the boot overlay.
 * MotionConfig reducedMotion="user" makes every Framer animation on the page
 * respect the visitor's prefers-reduced-motion setting.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
