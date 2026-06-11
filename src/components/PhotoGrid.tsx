'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

type Photo = { src: string; caption: string };

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);

  // close on Escape, lock scroll while a photo is open
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, photos.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setOpen(i)}
            className="group relative aspect-square overflow-hidden rounded border border-term-border bg-term-surface"
            aria-label={`Open photo: ${photo.caption}`}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-term-bg/90 to-transparent px-3 pb-2 pt-6 text-left text-xs text-term-text opacity-0 transition-opacity group-hover:opacity-100">
              <span className="prompt-symbol"># </span>
              {photo.caption}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-term-bg/90 p-4 backdrop-blur-sm"
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-4 top-4 px-3 py-1 text-sm text-term-muted transition-colors hover:text-term-text"
            >
              [esc] close
            </button>
            <motion.figure
              key={photos[open].src}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[88vh] max-w-3xl flex-col items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[open].src}
                alt={photos[open].caption}
                className="max-h-[80vh] w-auto rounded border border-term-border object-contain"
              />
              <figcaption className="mt-3 text-sm text-term-muted">
                <span className="prompt-symbol"># </span>
                {photos[open].caption}
                <span className="ml-2 text-term-border">
                  {open + 1}/{photos.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
