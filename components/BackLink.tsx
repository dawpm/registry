import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BackLink({ href = '/', children = 'back' }: { href?: string; children?: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      {children}
    </Link>
  );
}
