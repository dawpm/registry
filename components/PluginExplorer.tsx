'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, X } from 'lucide-react';
import { Pagination } from './Pagination';
import { PluginGrid } from './PluginGrid';
import { matchesQuery } from '@/lib/data';
import { PAGE_SIZE } from '@/lib/paginate';
import type { Plugin, RegistryIndex } from '@/lib/types';

async function fetchIndex(): Promise<RegistryIndex> {
  const res = await fetch('/api/v1/plugins', { cache: 'force-cache' });
  if (!res.ok) throw new Error(`failed: ${res.status}`);
  return res.json();
}

export function PluginExplorer({ initialData }: { initialData: RegistryIndex }) {
  const [q, setQ] = useState('');
  const [debounced, setDebounced] = useState('');
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search input so we do not re-render on every keystroke
  useEffect(() => {
    const id = setTimeout(() => setDebounced(q.trim()), 120);
    return () => clearTimeout(id);
  }, [q]);

  // Reset to page 1 whenever the query changes
  useEffect(() => { setPage(1); }, [debounced]);

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

  const { data } = useQuery({
    queryKey: ['registry-index'],
    queryFn: fetchIndex,
    initialData,
    staleTime: 60 * 60 * 1000,
  });

  const plugins: Plugin[] = data.plugins;
  const filtered = useMemo(() => {
    const needle = debounced.toLowerCase();
    return needle ? plugins.filter(p => matchesQuery(p, needle)) : plugins;
  }, [plugins, debounced]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);

  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between">
        <div className="eyebrow">browse</div>
        <div className="font-mono text-[11px] text-[var(--color-muted)] uppercase tracking-wider">
          {filtered.length}/{plugins.length}
        </div>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search plugins by name, slug, or tag"
          aria-label="Search plugins"
          className="search-input"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              className="p-1 rounded text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="kbd">/</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-[var(--color-muted)] text-sm py-16 text-center">
          no plugins match &ldquo;{debounced}&rdquo;
        </p>
      ) : (
        <>
          <PluginGrid plugins={items} />
          <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-wider text-[var(--color-muted)]">
        Press <span className="kbd">⌘</span> <span className="kbd">K</span> for the command palette
      </p>
    </section>
  );
}
