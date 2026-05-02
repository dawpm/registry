import { RegistryIndexSchema, type Plugin, type RegistryIndex } from './types';

const DEFAULT_DATA_URL = 'https://yanncotineau.github.io/dawpm-registry/v1/plugins.json';

function dataUrl(): string {
  return process.env.DAWPM_REGISTRY_DATA_URL ?? DEFAULT_DATA_URL;
}

/**
 * Fetch and cache the compiled registry index. Uses Next.js' fetch cache
 * with hourly revalidation; the data repo's GHA pings our deploy hook for
 * immediate updates anyway.
 */
export async function getIndex(): Promise<RegistryIndex> {
  const res = await fetch(dataUrl(), { next: { revalidate: 3600, tags: ['registry'] } });
  if (!res.ok) {
    throw new Error(`failed to fetch registry data: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return RegistryIndexSchema.parse(json);
}

export async function getPlugin(slug: string): Promise<Plugin | null> {
  const idx = await getIndex();
  return idx.plugins.find(p => p.slug === slug) ?? null;
}

export async function searchPlugins(q: string | undefined): Promise<Plugin[]> {
  const idx = await getIndex();
  if (!q) return idx.plugins;
  const needle = q.toLowerCase();
  return idx.plugins.filter(p =>
    p.slug.toLowerCase().includes(needle) ||
    p.name.toLowerCase().includes(needle) ||
    p.description.toLowerCase().includes(needle) ||
    p.tags.some(t => t.toLowerCase().includes(needle)) ||
    p.author.toLowerCase().includes(needle)
  );
}
