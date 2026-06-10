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
          <span className="text-term-border">|</span>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
