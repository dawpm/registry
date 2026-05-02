'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Plugin } from '@/lib/types';
import { displaySlug, initials } from '@/lib/util';

export function PluginCard({ plugin }: { plugin: Plugin }) {
  const [ns] = plugin.slug.split('/');

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Link
        href={`/p/${plugin.slug}`}
        className="block h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-elevated)] transition-colors duration-150 group"
      >
        <div className="flex items-start gap-3">
          {plugin.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={plugin.image}
              alt=""
              className="w-12 h-12 rounded-lg object-cover bg-[var(--color-elevated)] flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-elevated)] to-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center font-mono text-[13px] text-[var(--color-muted)] flex-shrink-0 group-hover:text-[var(--color-accent)] transition-colors">
              {initials(plugin.name)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold truncate text-[15px]">{plugin.name}</h3>
            <p className="font-mono text-[11px] text-[var(--color-muted)] truncate mt-0.5">
              {displaySlug(plugin.slug)}
            </p>
          </div>
        </div>
        <p className="text-[13px] text-[var(--color-muted)] mt-3 clamp-2 leading-relaxed">
          {plugin.description}
        </p>
        {plugin.tags.length > 0 && (
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {plugin.tags.slice(0, 4).map(t => (
              <span
                key={t}
                className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-elevated)] text-[var(--color-muted)] border border-[var(--color-border)]/50"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
