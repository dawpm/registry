/**
 * Display helpers shared across the registry UI.
 *
 * Internally a plugin slug is "ns/name" — that's the on-disk path in the
 * data repo and the path segment in URLs. User-facing strings always show
 * "@ns/name" (npm-style) so install commands look familiar.
 */

export function displaySlug(slug: string): string {
  return slug.startsWith('@') ? slug : `@${slug}`;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MiB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GiB`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
}

/** Where this Vercel deployment can be reached, for showing in the .dawpmrc snippet. */
export function publicUrl(): string {
  return (
    process.env.NEXT_PUBLIC_REGISTRY_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    'https://dawpm-registry.yanncotineau.dev'
  ).replace(/\/+$/, '').replace(/^(?!https?:\/\/)/, 'https://');
}
