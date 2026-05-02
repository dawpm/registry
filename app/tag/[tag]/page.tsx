import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getIndex } from '@/lib/data';
import { paginate } from '@/lib/paginate';
import { BackLink } from '@/components/BackLink';
import { PluginGrid } from '@/components/PluginGrid';
import { Pagination } from '@/components/Pagination';

export const revalidate = 3600;

interface Params { tag: string }
interface SearchParams { page?: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return { title: `#${decoded} · dawpm`, description: `Plugins tagged ${decoded}.` };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { tag } = await params;
  const { page: pageParam } = await searchParams;
  const decoded = decodeURIComponent(tag);

  const idx = await getIndex();
  const all = idx.plugins.filter(p => p.tags.includes(decoded));
  if (all.length === 0) notFound();

  const { items, page, totalPages, total } = paginate(all, Number(pageParam) || 1);

  return (
    <div className="space-y-8">
      <BackLink>all plugins</BackLink>

      <header>
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-[var(--color-accent)]">#{decoded}</span>
        </h1>
        <p className="text-sm text-[var(--color-muted)] mt-1">
          {total} plugin{total === 1 ? '' : 's'}
        </p>
      </header>

      <PluginGrid plugins={items} />
      <Pagination basePath={`/tag/${tag}`} page={page} totalPages={totalPages} />
    </div>
  );
}
