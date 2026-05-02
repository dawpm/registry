import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { getPlugin } from '@/lib/data';
import { displaySlug, formatBytes, initials } from '@/lib/util';
import { BackLink } from '@/components/BackLink';
import { CopyCommand } from '@/components/CopyCommand';

export const revalidate = 3600;

interface Params { ns: string; name: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { ns, name } = await params;
  const p = await getPlugin(`${ns}/${name}`);
  if (!p) return { title: 'not found · dawpm' };
  return { title: `${p.name} · dawpm`, description: p.description };
}

export default async function PluginPage({ params }: { params: Promise<Params> }) {
  const { ns, name } = await params;
  const slug = `${ns}/${name}`;
  const plugin = await getPlugin(slug);
  if (!plugin) notFound();

  return (
    <article>
      <BackLink>back</BackLink>

      <header className="flex items-start gap-5 mt-6 mb-6">
        {plugin.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={plugin.image}
            alt=""
            className="w-20 h-20 rounded-xl object-cover bg-[var(--color-elevated)]"
          />
        ) : (
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[var(--color-elevated)] to-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center font-mono text-xl text-[var(--color-muted)]">
            {initials(plugin.name)}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight">{plugin.name}</h1>
          <Link
            href={`/ns/${ns}`}
            className="inline-block font-mono text-sm text-[var(--color-muted)] mt-1 hover:text-[var(--color-accent)] transition-colors"
          >
            {displaySlug(plugin.slug)}
          </Link>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            by {plugin.author} · {plugin.license}
          </p>
        </div>
      </header>

      <p className="text-[15px] text-[var(--color-text)] mb-8 max-w-2xl leading-relaxed">
        {plugin.description}
      </p>

      <section className="mb-8 max-w-2xl">
        <CopyCommand command={`dawpm install ${displaySlug(plugin.slug)}`} label="install" />
      </section>

      <section className="mb-8 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <Detail label="formats">{plugin.install.map(i => i.format).join(', ')}</Detail>
        <Detail label="size">{formatBytes(plugin.download.size)}</Detail>
        {plugin.homepage && (
          <Detail label="homepage">
            <a
              href={plugin.homepage}
              className="inline-flex items-center gap-1 underline underline-offset-4 decoration-dotted hover:text-[var(--color-accent)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {new URL(plugin.homepage).hostname}
              <ExternalLink className="w-3 h-3" />
            </a>
          </Detail>
        )}
        <Detail label="sha256">
          <code className="font-mono text-[11px] break-all">{plugin.download.sha256}</code>
        </Detail>
      </section>

      {plugin.tags.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-2">tags</h2>
          <div className="flex gap-2 flex-wrap">
            {plugin.tags.map(t => (
              <Link
                key={t}
                href={`/tag/${t}`}
                className="text-xs px-2.5 py-1 rounded-md bg-[var(--color-elevated)] text-[var(--color-muted)] border border-[var(--color-border)]/50 hover:text-[var(--color-text)] hover:border-[var(--color-accent)]/40 transition-colors"
              >
                #{t}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1">{label}</div>
      <div>{children}</div>
    </div>
  );
}
