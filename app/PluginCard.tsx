import Link from 'next/link';
import type { Plugin } from '@/lib/types';

function initials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('');
}

export function PluginCard({ plugin }: { plugin: Plugin }) {
  return (
    <Link
      href={`/p/${plugin.slug}`}
      className="group block bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-accent)] transition-colors"
    >
      <div className="flex items-start gap-3">
        {plugin.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={plugin.image} alt="" className="w-12 h-12 rounded-md object-cover bg-[var(--color-elevated)] flex-shrink-0" />
        ) : (
          <div className="w-12 h-12 rounded-md bg-[var(--color-elevated)] flex items-center justify-center font-mono text-sm text-[var(--color-muted)] flex-shrink-0">
            {initials(plugin.name)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <h3 className="font-semibold truncate">{plugin.name}</h3>
          </div>
          <p className="font-mono text-xs text-[var(--color-muted)] truncate">{plugin.slug}</p>
        </div>
      </div>
      <p className="text-sm text-[var(--color-muted)] mt-3 clamp-2">{plugin.description}</p>
      {plugin.tags.length > 0 && (
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {plugin.tags.slice(0, 4).map(t => (
            <span key={t} className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-elevated)] text-[var(--color-muted)]">
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
