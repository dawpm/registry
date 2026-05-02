import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getIndex } from '@/lib/data';
import { paginate } from '@/lib/paginate';
import { BackLink } from '@/components/BackLink';
import { PluginGrid } from '@/components/PluginGrid';
import { Pagination } from '@/components/Pagination';

export const revalidate = 3600;

interface Params { ns: string }
interface SearchParams { page?: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { ns } = await params;
  return { title: `@${ns} · dawpm`, description: `Plugins in the @${ns} namespace.` };
}

export default async function NamespacePage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { ns } = await params;
  const { page: pageParam } = await searchParams;

  const idx = await getIndex();
  const all = idx.plugins.filter(p => p.slug.startsWith(`${ns}/`));
  if (all.length === 0) notFound();

  const { items, page, totalPages, total } = paginate(all, Number(pageParam) || 1);

  return (
    <div className="space-y-8">
      <BackLink>all plugins</BackLink>

      <header>
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="font-mono text-[var(--color-accent)]">@{ns}</span>
        </h1>
        <p className="text-sm text-[var(--color-muted)] mt-1">
          {total} plugin{total === 1 ? '' : 's'}
        </p>
      </header>

      <PluginGrid plugins={items} />
      <Pagination basePath={`/ns/${ns}`} page={page} totalPages={totalPages} />
    </div>
  );
}
