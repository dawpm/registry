import Link from 'next/link';
import type { Plugin } from '@/lib/types';
import { displaySlug, initials } from '@/lib/util';

export function PluginCard({ plugin }: { plugin: Plugin }) {
  return (
    <Link href={`/p/${plugin.slug}`} className="card group">
      <div className="flex items-start gap-3">
        {plugin.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={plugin.image}
            alt=""
            className="w-12 h-12 rounded-md object-cover bg-[var(--color-surface)] flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-md bg-[var(--color-surface)] border border-[var(--color-rule)] flex items-center justify-center font-mono text-[12px] text-[var(--color-muted)] flex-shrink-0 group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-cream)] group-hover:border-[var(--color-ink)] transition-colors">
            {initials(plugin.name)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-display uppercase tracking-tight text-[18px] truncate leading-none">
            {plugin.name}
          </h3>
          <p className="font-mono text-[11px] text-[var(--color-muted)] truncate mt-1">
            {displaySlug(plugin.slug)}
          </p>
        </div>
      </div>
      <p className="text-[13px] text-[var(--color-muted)] mt-3 clamp-2 leading-relaxed">
        {plugin.description}
      </p>
      {plugin.tags.length > 0 && (
        <div className="flex gap-1.5 mt-4 flex-wrap">
          {plugin.tags.slice(0, 4).map(t => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>
      )}
    </Link>
  );
}
