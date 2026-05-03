import { getIndex } from '@/lib/data';
import { publicUrl } from '@/lib/util';
import { paginate } from '@/lib/paginate';
import { Hero } from '@/components/Hero';
import { SearchBar } from '@/components/SearchBar';
import { PluginGrid } from '@/components/PluginGrid';
import { Pagination } from '@/components/Pagination';
import type { Plugin } from '@/lib/types';

export const revalidate = 3600;

interface SearchParams { q?: string; page?: string }

function filterPlugins(plugins: Plugin[], q: string | undefined): Plugin[] {
  if (!q) return plugins;
  const n = q.trim().toLowerCase();
  if (!n) return plugins;
  return plugins.filter(
    p =>
      p.slug.toLowerCase().includes(n) ||
      p.name.toLowerCase().includes(n) ||
      p.description.toLowerCase().includes(n) ||
      p.author.toLowerCase().includes(n) ||
      p.tags.some(t => t.toLowerCase().includes(n)),
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q, page: pageParam } = await searchParams;
  const idx = await getIndex();
  const filtered = filterPlugins(idx.plugins, q);
  const { items, page, totalPages, total } = paginate(filtered, Number(pageParam) || 1);

  const hrefForPage = (p: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set('q', q);
    if (p > 1) sp.set('page', String(p));
    const qs = sp.toString();
    return qs ? `/?${qs}` : '/';
  };

  return (
    <div>
      <Hero registryUrl={publicUrl()} />
      <SearchBar initialQuery={q ?? ''} count={total} total={idx.plugins.length} />

      {total === 0 ? (
        <p className="text-[var(--color-muted)] text-sm py-16 text-center">
          no plugins match &ldquo;{q}&rdquo;
        </p>
      ) : (
        <>
          <PluginGrid plugins={items} />
          <Pagination page={page} totalPages={totalPages} hrefForPage={hrefForPage} />
        </>
      )}

      <p className="mt-10 text-xs text-[var(--color-muted)] text-center">
        Press <span className="kbd">⌘</span> <span className="kbd">K</span> for the command palette · <span className="kbd">/</span> to search
      </p>
    </div>
  );
}
