import { getIndex } from '@/lib/data';
import { PluginExplorer } from './PluginExplorer';

export const revalidate = 3600;

export default async function HomePage() {
  const idx = await getIndex();
  return (
    <div>
      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Install DAW plugins from your terminal.
        </h1>
        <p className="text-[var(--color-muted)] max-w-2xl mb-6">
          dawpm is a package manager for FL Studio. Declare plugins in <code className="font-mono text-[var(--color-text)]">dawpm.yaml</code>,
          run <code className="font-mono text-[var(--color-text)]">dawpm install</code>, and they land in the right folder with the right files.
        </p>
        <pre className="font-mono text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-4 py-3 inline-block">
          <span className="text-[var(--color-muted)]">$</span> npm i -g @dawpm/cli
        </pre>
      </section>

      <PluginExplorer plugins={idx.plugins} />
    </div>
  );
}
