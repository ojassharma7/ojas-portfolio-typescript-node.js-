'use client';

import { motion } from 'framer-motion';

type RunningChartProps = {
  weeks: number[];
};

/** Animated weekly-km bar chart for the running dashboard. */
export default function RunningChart({ weeks }: RunningChartProps) {
  const max = Math.max(...weeks, 1);

  return (
    <div>
      <div className="flex h-32 gap-2">
        {weeks.map((km, i) => (
          <div key={i} className="group flex flex-1 flex-col items-center justify-end gap-1.5">
            <span className="text-[10px] text-term-muted opacity-0 transition-opacity group-hover:opacity-100">
              {km} km
            </span>
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(km / max) * 100}%` }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.21, 0.5, 0.3, 1] }}
              className={`w-full rounded-t-sm ${
                i === weeks.length - 1 ? 'bg-term-cyan' : 'bg-term-cyan/35'
              } transition-colors group-hover:bg-term-cyan`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-term-muted">
        <span>{weeks.length} weeks ago</span>
        <span>this week</span>
      </div>
    </div>
  );
}
