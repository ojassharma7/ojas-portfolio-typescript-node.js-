'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Scroll-reveal wrapper: fades up once when scrolled into view. */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.5, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
