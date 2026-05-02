'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Package, Tag, Folder, Search } from 'lucide-react';
import type { Plugin } from '@/lib/types';
import { displaySlug } from '@/lib/util';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  // Ctrl/Cmd+K toggle
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

  // Lazy-load plugin index on first open
  useEffect(() => {
    if (!open || loaded) return;
    fetch('/api/v1/plugins')
      .then(r => r.json())
      .then(d => {
        setPlugins(d.plugins ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [open, loaded]);

  const namespaces = Array.from(new Set(plugins.map(p => p.slug.split('/')[0]))).sort();
  const tags = Array.from(new Set(plugins.flatMap(p => p.tags))).sort();

  const go = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command Palette"
      shouldFilter
    >
      <Command.Input placeholder="Search plugins, namespaces, tags…" />
      <Command.List>
        <Command.Empty>{loaded ? 'No results.' : 'Loading…'}</Command.Empty>

        {plugins.length > 0 && (
          <Command.Group heading="Plugins">
            {plugins.slice(0, 30).map(p => (
              <Command.Item
                key={p.slug}
                value={`plugin ${p.slug} ${p.name} ${p.description}`}
                onSelect={() => go(`/p/${p.slug}`)}
              >
                <Package className="w-4 h-4 text-[var(--color-muted)]" />
                <span className="flex-1">{p.name}</span>
                <span className="font-mono text-[11px] text-[var(--color-muted)]">
                  {displaySlug(p.slug)}
                </span>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {namespaces.length > 0 && (
          <Command.Group heading="Namespaces">
            {namespaces.map(ns => (
              <Command.Item
                key={ns}
                value={`namespace ${ns}`}
                onSelect={() => go(`/ns/${ns}`)}
              >
                <Folder className="w-4 h-4 text-[var(--color-muted)]" />
                <span>@{ns}</span>
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {tags.length > 0 && (
          <Command.Group heading="Tags">
            {tags.map(t => (
              <Command.Item
                key={t}
                value={`tag ${t}`}
                onSelect={() => go(`/tag/${t}`)}
              >
                <Tag className="w-4 h-4 text-[var(--color-muted)]" />
                <span>#{t}</span>
              </Command.Item>
            ))}
          </Command.Group>
        )}
      </Command.List>
    </Command.Dialog>
  );
}
