import { getIndex } from '@/lib/data';
import { publicUrl } from '@/lib/util';
import { Hero } from '@/components/Hero';
import { PluginExplorer } from '@/components/PluginExplorer';

export const revalidate = 3600;

export default async function HomePage() {
  const idx = await getIndex();
  return (
    <div>
      <Hero registryUrl={publicUrl()} />
      <PluginExplorer plugins={idx.plugins} />
    </div>
  );
}
