'use client';

import { useState, useMemo } from 'react';
import type { Plugin } from '@/lib/types';
import { PluginCard } from './PluginCard';

export function PluginExplorer({ plugins }: { plugins: Plugin[] }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    if (!q.trim()) return plugins;
    const n = q.trim().toLowerCase();
    return plugins.filter(p =>
      p.slug.toLowerCase().includes(n) ||
      p.name.toLowerCase().includes(n) ||
      p.description.toLowerCase().includes(n) ||
      p.author.toLowerCase().includes(n) ||
      p.tags.some(t => t.toLowerCase().includes(n))
    );
  }, [plugins, q]);

  return (
    <div>
      <div className="relative mb-6">
        <input
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search plugins…"
          className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-4 py-3 text-base outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-muted)]"
          autoFocus
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--color-muted)] font-mono">
          {filtered.length}/{plugins.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-[var(--color-muted)] text-sm py-12 text-center">no plugins match &ldquo;{q}&rdquo;</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(p => <PluginCard key={p.slug} plugin={p} />)}
        </div>
      )}
    </div>
  );
}
