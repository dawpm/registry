'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { PluginCard } from './PluginCard';

export function PluginExplorer({ plugins }: { plugins: Plugin[] }) {
  const [q, setQ] = useState('');
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

  // "/" to focus
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

  const filtered = useMemo(() => {
    if (!q.trim()) return plugins;
    const n = q.trim().toLowerCase();
    return plugins.filter(
      p =>
        p.slug.toLowerCase().includes(n) ||
        p.name.toLowerCase().includes(n) ||
        p.description.toLowerCase().includes(n) ||
        p.author.toLowerCase().includes(n) ||
        p.tags.some(t => t.toLowerCase().includes(n)),
    );
  }, [plugins, q]);

  return (
    <div>
      <div
        ref={wrapRef}
        className="focus-glow relative mb-8 rounded-xl"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search plugins…"
          className="relative z-10 w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl pl-11 pr-24 py-3.5 text-[15px] outline-none focus:border-[var(--color-accent)]/60 transition-colors placeholder:text-[var(--color-muted)]"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[11px] text-[var(--color-muted)] font-mono z-10">
          <span>{filtered.length}/{plugins.length}</span>
          <span className="kbd">/</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[var(--color-muted)] text-sm py-16 text-center"
          >
            no plugins match &ldquo;{q}&rdquo;
          </motion.p>
        ) : (
          <motion.div
            key="grid"
            layout
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                    delay: Math.min(i * 0.02, 0.1),
                  }}
                >
                  <PluginCard plugin={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-10 text-xs text-[var(--color-muted)] text-center">
        Press <span className="kbd">⌘</span> <span className="kbd">K</span> for the command palette · <span className="kbd">/</span> to search
      </p>
    </div>
  );
}
