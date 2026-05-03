'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

export function SearchBar({
  initialQuery,
  count,
  total,
}: {
  initialQuery: string;
  count: number;
  total: number;
}) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // pointer follow for the focus glow
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const handler = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    el.addEventListener('pointermove', handler);
    return () => el.removeEventListener('pointermove', handler);
  }, []);

  // "/" focuses the input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submit = (value: string) => {
    const trimmed = value.trim();
    router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : '/');
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submit(q);
      }}
      className="mb-8"
    >
      <div ref={wrapRef} className="focus-glow relative rounded-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none z-20" />
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search plugins…"
          aria-label="Search plugins"
          className="relative z-10 w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl pl-11 pr-28 py-3.5 text-[15px] outline-none focus:border-[var(--color-accent)]/60 transition-colors placeholder:text-[var(--color-muted)]"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[11px] text-[var(--color-muted)] font-mono z-20">
          {q && (
            <button
              type="button"
              onClick={() => {
                setQ('');
                submit('');
              }}
              className="p-1 rounded hover:text-[var(--color-text)]"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span>{count}/{total}</span>
          <span className="kbd">/</span>
        </div>
      </div>
    </form>
  );
}
