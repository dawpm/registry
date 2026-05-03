import { RegistryIndexSchema, type Plugin, type RegistryIndex } from './types';

const DEFAULT_DATA_URL = 'https://yanncotineau.github.io/dawpm-registry/v1/plugins.json';

function dataUrl(): string {
  return process.env.DAWPM_REGISTRY_DATA_URL ?? DEFAULT_DATA_URL;
}

export async function getIndex(): Promise<RegistryIndex> {
  const res = await fetch(dataUrl(), { next: { revalidate: 3600, tags: ['registry'] } });
  if (!res.ok) {
    throw new Error(`failed to fetch registry data: ${res.status} ${res.statusText}`);
  }
  return RegistryIndexSchema.parse(await res.json());
}

export async function getPlugin(slug: string): Promise<Plugin | null> {
  const idx = await getIndex();
  return idx.plugins.find(p => p.slug === slug) ?? null;
}

/**
 * Match a plugin against a search needle.
 *
 * We deliberately match only the human-name, slug, and tags. Description
 * matching adds too much noise: most DSK descriptions cross-reference each
 * other, so searching for one plugin name returns dozens of results.
 */
export function matchesQuery(p: Plugin, needle: string): boolean {
  if (!needle) return true;
  const n = needle.toLowerCase();
  return (
    p.name.toLowerCase().includes(n) ||
    p.slug.toLowerCase().includes(n) ||
    p.tags.some(t => t.toLowerCase().includes(n))
  );
}

export async function searchPlugins(q: string | undefined): Promise<Plugin[]> {
  const idx = await getIndex();
  const needle = q?.trim().toLowerCase() ?? '';
  if (!needle) return idx.plugins;
  return idx.plugins.filter(p => matchesQuery(p, needle));
}
