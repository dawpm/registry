import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function BackLink({ href = '/', children = 'back' }: { href?: string; children?: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      {children}
    </Link>
  );
}
