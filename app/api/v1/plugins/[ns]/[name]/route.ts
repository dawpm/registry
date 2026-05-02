import { NextResponse } from 'next/server';
import { getPlugin } from '@/lib/data';

export const revalidate = 3600;

interface Params { ns: string; name: string }

export async function GET(_req: Request, { params }: { params: Promise<Params> }) {
  try {
    const { ns, name } = await params;
    const slug = `${ns}/${name}`;
    const plugin = await getPlugin(slug);
    if (!plugin) {
      return NextResponse.json({ error: `not found: ${slug}` }, { status: 404 });
    }
    return NextResponse.json(plugin);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
