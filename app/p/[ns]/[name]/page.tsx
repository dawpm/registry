import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPlugin } from '@/lib/data';
import { CopyCommand } from '@/app/CopyCommand';

export const revalidate = 3600;

interface Params { ns: string; name: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { ns, name } = await params;
  const p = await getPlugin(`${ns}/${name}`);
  if (!p) return { title: 'not found · dawpm' };
  return { title: `${p.name} · dawpm`, description: p.description };
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MiB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GiB`;
}

export default async function PluginPage({ params }: { params: Promise<Params> }) {
  const { ns, name } = await params;
  const slug = `${ns}/${name}`;
  const plugin = await getPlugin(slug);
  if (!plugin) notFound();

  return (
    <article>
      <Link href="/" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
        ← back
      </Link>

      <header className="flex items-start gap-4 mt-6 mb-6">
        {plugin.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={plugin.image} alt="" className="w-20 h-20 rounded-lg object-cover bg-[var(--color-elevated)]" />
        ) : (
          <div className="w-20 h-20 rounded-lg bg-[var(--color-elevated)] flex items-center justify-center font-mono text-xl text-[var(--color-muted)]">
            {plugin.name.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('')}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight">{plugin.name}</h1>
          <p className="font-mono text-sm text-[var(--color-muted)] mt-1">{plugin.slug}</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">by {plugin.author} · {plugin.license}</p>
        </div>
      </header>

      <p className="text-base text-[var(--color-text)] mb-8">{plugin.description}</p>

      <section className="mb-8">
        <h2 className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">install</h2>
        <CopyCommand command={`dawpm install ${plugin.slug}`} />
      </section>

      <section className="mb-8 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
        <Detail label="formats">{plugin.install.map(i => i.format).join(', ')}</Detail>
        <Detail label="size">{formatBytes(plugin.download.size)}</Detail>
        {plugin.homepage && (
          <Detail label="homepage">
            <a href={plugin.homepage} className="underline hover:text-[var(--color-accent)]" target="_blank" rel="noopener noreferrer">
              {new URL(plugin.homepage).hostname}
            </a>
          </Detail>
        )}
        <Detail label="sha256"><code className="font-mono text-xs break-all">{plugin.download.sha256}</code></Detail>
      </section>

      {plugin.tags.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-2">tags</h2>
          <div className="flex gap-2 flex-wrap">
            {plugin.tags.map(t => (
              <span key={t} className="text-xs px-2 py-1 rounded bg-[var(--color-elevated)] text-[var(--color-muted)]">{t}</span>
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
      <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] mb-1">{label}</div>
      <div>{children}</div>
    </div>
  );
}
