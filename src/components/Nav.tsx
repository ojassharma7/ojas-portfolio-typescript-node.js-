'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

const tabs = [
  { href: '/', label: '~' },
  { href: '/work', label: 'work' },
  { href: '/life', label: 'life' },
];

/** Fixed top bar styled as a shell prompt with the current path. */
export default function Nav() {
  const pathname = usePathname();
  const cwd = pathname === '/' ? '~' : `~${pathname}`;

  return (
    <nav className="fixed inset-x-0 top-0 z-40 border-b border-term-border bg-term-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-sm">
        <Link href="/" className="hidden sm:block">
          <span className="prompt-user">ojas</span>
          <span className="prompt-symbol">@</span>
          <span className="text-term-purple">portfolio</span>
          <span className="prompt-symbol">:</span>
          <span className="prompt-path">{cwd}</span>
          <span className="prompt-symbol">$</span>
        </Link>
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const active =
              tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-3 py-1 transition-colors ${
                  active
                    ? 'bg-term-raised text-term-cyan'
                    : 'text-term-muted hover:text-term-text'
                }`}
              >
                [{tab.label}]
              </Link>
            );
          })}
          <button
            onClick={() => window.dispatchEvent(new Event('ojas:toggle-palette'))}
            aria-label="Open command palette"
            title="Command palette"
            className="hidden items-center gap-1 px-2 py-1 text-xs text-term-muted transition-colors hover:text-term-cyan sm:inline-flex"
          >
            <kbd className="rounded border border-term-border px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>
          <span className="text-term-border">|</span>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
