import { NextRequest, NextResponse } from 'next/server';
import { searchPlugins, getIndex } from '@/lib/data';

export const revalidate = 3600;

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get('q') ?? undefined;
    const plugins = await searchPlugins(q);
    const idx = await getIndex();
    return NextResponse.json({
      schemaVersion: 1,
      generatedAt: idx.generatedAt,
      count: plugins.length,
      plugins,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
