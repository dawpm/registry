'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Command } from 'cmdk';
import { Package, Tag, Folder } from 'lucide-react';
import type { Plugin, RegistryIndex } from '@/lib/types';
import { displaySlug } from '@/lib/util';

async function fetchIndex(): Promise<RegistryIndex> {
  const res = await fetch('/api/v1/plugins', { cache: 'force-cache' });
  if (!res.ok) throw new Error(`failed: ${res.status}`);
  return res.json();
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle on Cmd/Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Only fetch when first opened. Cache is shared with PluginExplorer.
  const { data, isFetching } = useQuery({
    queryKey: ['registry-index'],
    queryFn: fetchIndex,
    enabled: open,
    staleTime: 60 * 60 * 1000,
  });

  const plugins: Plugin[] = data?.plugins ?? [];
  const namespaces = Array.from(new Set(plugins.map(p => p.slug.split('/')[0]))).sort();
  const tags = Array.from(new Set(plugins.flatMap(p => p.tags))).sort();

  const go = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command Palette" shouldFilter>
      <Command.Input placeholder="Search plugins, namespaces, tags" />
      <Command.List>
        <Command.Empty>{isFetching ? 'Loading' : 'No results.'}</Command.Empty>

        {plugins.length > 0 && (
          <Command.Group heading="Plugins">
            {plugins.slice(0, 30).map(p => (
              <Command.Item
                key={p.slug}
                value={`plugin ${p.slug} ${p.name} ${p.tags.join(' ')}`}
                onSelect={() => go(`/p/${p.slug}`)}
              >
                <Package className="w-4 h-4 muted-text" />
                <span className="flex-1">{p.name}</span>
                <span className="font-mono text-[11px] muted-text">{displaySlug(p.slug)}</span>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {namespaces.length > 0 && (
          <Command.Group heading="Namespaces">
            {namespaces.map(ns => (
              <Command.Item key={ns} value={`namespace ${ns}`} onSelect={() => go(`/ns/${ns}`)}>
                <Folder className="w-4 h-4 muted-text" />
                <span>@{ns}</span>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {tags.length > 0 && (
          <Command.Group heading="Tags">
            {tags.map(t => (
              <Command.Item key={t} value={`tag ${t}`} onSelect={() => go(`/tag/${t}`)}>
                <Tag className="w-4 h-4 muted-text" />
                <span>#{t}</span>
              </Command.Item>
            ))}
          </Command.Group>
        )}
      </Command.List>
    </Command.Dialog>
  );
}
