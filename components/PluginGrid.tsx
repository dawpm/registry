import type { Plugin } from '@/lib/types';
import { PluginCard } from './PluginCard';

export function PluginGrid({ plugins }: { plugins: Plugin[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {plugins.map(p => (
        <PluginCard key={p.slug} plugin={p} />
      ))}
    </div>
  );
}
