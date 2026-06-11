'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { identity } from '@/lib/profile';

type Cmd = {
  id: string;
  label: string;
  hint: string;
  keywords?: string;
  run: () => void;
};

/** Cmd/Ctrl+K command palette — jump anywhere or fire an action from the keyboard. */
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQuery('');
    setActive(0);
  };

  const commands: Cmd[] = useMemo(() => {
    const go = (href: string) => () => {
      router.push(href);
      close();
    };
    const link = (href: string) => () => {
      window.open(href, '_blank', 'noopener');
      close();
    };
    return [
      { id: 'home', label: 'cd ~', hint: 'home', keywords: 'landing start', run: go('/') },
      { id: 'work', label: 'cd ~/work', hint: 'the professional side', keywords: 'experience projects rutgers', run: go('/work') },
      { id: 'life', label: 'cd ~/life', hint: 'football, the comeback, the runs', keywords: 'strava running personal', run: go('/life') },
      { id: 'resume', label: 'open resume.pdf', hint: 'download CV', keywords: 'cv', run: link(identity.resume) },
      { id: 'ask', label: 'ask-ojas', hint: 'open the chatbot', keywords: 'chat ai question', run: () => { window.dispatchEvent(new Event('ojas:open-chat')); close(); } },
      { id: 'theme', label: 'toggle theme', hint: 'dark / light', keywords: 'dark light mode', run: () => { window.dispatchEvent(new Event('ojas:toggle-theme')); close(); } },
      { id: 'email', label: 'copy email', hint: identity.email, keywords: 'contact mail', run: () => { navigator.clipboard?.writeText(identity.email); close(); } },
      { id: 'github', label: 'github ↗', hint: 'github.com/ojassharma7', keywords: 'code repos', run: link(identity.github) },
      { id: 'linkedin', label: 'linkedin ↗', hint: 'connect', keywords: 'social', run: link(identity.linkedin) },
      { id: 'x', label: 'x / twitter ↗', hint: 'follow', keywords: 'social tweet', run: link(identity.x) },
      { id: 'strava', label: 'strava ↗', hint: 'follow my runs', keywords: 'running', run: link(identity.strava) },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint} ${c.keywords ?? ''}`.toLowerCase().includes(q)
    );
  }, [query, commands]);

  // global hotkey
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const toggle = () => setOpen((v) => !v);
    window.addEventListener('keydown', onKey);
    window.addEventListener('ojas:toggle-palette', toggle);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('ojas:toggle-palette', toggle);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/50 px-4 pt-[18vh] backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ y: -8, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-lg border border-term-border bg-term-surface shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-2 border-b border-term-border px-4 py-3 text-sm">
              <span className="prompt-user">ojas</span>
              <span className="prompt-symbol">@portfolio</span>
              <span className="prompt-symbol">:~$</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onListKey}
                placeholder="type a command…"
                className="w-full bg-transparent text-term-text placeholder-term-muted/60 caret-term-cyan outline-none"
              />
              <kbd className="shrink-0 rounded border border-term-border px-1.5 text-[10px] text-term-muted">esc</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto py-1.5">
              {filtered.length === 0 && (
                <p className="px-4 py-3 text-sm text-term-muted">no matching command.</p>
              )}
              {filtered.map((c, i) => (
                <button
                  key={c.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={c.run}
                  className={`flex w-full items-baseline gap-3 px-4 py-2 text-left text-sm ${
                    i === active ? 'bg-term-raised' : ''
                  }`}
                >
                  <span className={i === active ? 'text-term-cyan' : 'text-term-text'}>
                    {c.label}
                  </span>
                  <span className="ml-auto truncate text-xs text-term-muted">{c.hint}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
