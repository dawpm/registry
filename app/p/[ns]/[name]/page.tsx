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

      <header className="flex items-start gap-5 mt-6 mb-8">
        {plugin.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={plugin.image}
            alt=""
            className="w-20 h-20 rounded-md object-cover bg-[var(--color-surface)]"
          />
        ) : (
          <div className="w-20 h-20 rounded-md bg-[var(--color-surface)] border border-[var(--color-rule)] flex items-center justify-center font-mono text-xl text-[var(--color-muted)]">
            {initials(plugin.name)}
          </div>
        )}
        <div className="min-w-0">
          <div className="eyebrow mb-2">plugin</div>
          <h1 className="h-display text-[clamp(40px,8vw,72px)]">{plugin.name}</h1>
          <Link
            href={`/ns/${ns}`}
            className="inline-block font-mono text-sm text-[var(--color-muted)] mt-2 hover:text-[var(--color-ink)] transition-colors"
          >
            {displaySlug(plugin.slug)}
          </Link>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            by {plugin.author} · {plugin.license}
          </p>
        </div>
      </header>

      <p className="text-[15px] mb-8 max-w-2xl leading-relaxed">{plugin.description}</p>

      <section className="mb-10 max-w-2xl">
        <CopyCommand command={`dawpm install ${displaySlug(plugin.slug)}`} label="install" />
      </section>

      <section className="mb-10 grid sm:grid-cols-2 gap-x-8 gap-y-5 text-sm max-w-2xl">
        <Detail label="formats">{plugin.install.map(i => i.format).join(', ')}</Detail>
        <Detail label="size">{formatBytes(plugin.download.size)}</Detail>
        {plugin.homepage && (
          <Detail label="homepage">
            <a
              href={plugin.homepage}
              className="inline-flex items-center gap-1 underline underline-offset-4 decoration-dotted hover:text-[var(--color-ink)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {new URL(plugin.homepage).hostname}
              <ExternalLink className="w-3 h-3" />
            </a>
          </Detail>
        )}
        <Detail label="sha256">
          <code className="font-mono text-[11px] break-all text-[var(--color-muted)]">
            {plugin.download.sha256}
          </code>
        </Detail>
      </section>

      {plugin.tags.length > 0 && (
        <section className="mb-8">
          <div className="eyebrow mb-3">tags</div>
          <div className="flex gap-2 flex-wrap">
            {plugin.tags.map(t => (
              <Link key={t} href={`/tag/${t}`} className="tag-pill">{t}</Link>
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
      <div className="eyebrow mb-2">{label}</div>
      <div>{children}</div>
    </div>
  );
}
