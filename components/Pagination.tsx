'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  page: number;
  totalPages: number;
} & (
  | { onPageChange: (p: number) => void; hrefForPage?: never }
  | { hrefForPage: (p: number) => string; onPageChange?: never }
);

export function Pagination({ page, totalPages, onPageChange, hrefForPage }: Props) {
  if (totalPages <= 1) return null;

  const numbers: (number | 'gap')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) numbers.push(i);
  } else {
    numbers.push(1);
    if (page > 3) numbers.push('gap');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      numbers.push(i);
    }
    if (page < totalPages - 2) numbers.push('gap');
    numbers.push(totalPages);
  }

  const baseBtn =
    'inline-flex items-center justify-center min-w-[2.25rem] h-9 px-3 font-mono text-[11px] font-bold uppercase tracking-wider rounded-md border border-[var(--color-rule)] transition-colors';
  const hover = 'hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] hover:border-[var(--color-ink)]';
  const active = 'bg-[var(--color-ink)] text-[var(--color-cream)] border-[var(--color-ink)]';
  const disabled = 'opacity-30 cursor-not-allowed';

  function PageItem({ n, current }: { n: number; current: boolean }) {
    const cls = `${baseBtn} ${current ? active : hover}`;
    if (hrefForPage) return <Link href={hrefForPage(n)} className={cls}>{n}</Link>;
    return <button type="button" onClick={() => onPageChange?.(n)} className={cls}>{n}</button>;
  }

  function NavBtn({ to, label, icon }: { to: number | null; label: string; icon: React.ReactNode }) {
    const cls = `${baseBtn} gap-1`;
    if (to === null) return <span className={`${cls} ${disabled}`}>{icon}{label}</span>;
    if (hrefForPage) return <Link href={hrefForPage(to)} className={`${cls} ${hover}`}>{icon}{label}</Link>;
    return (
      <button type="button" onClick={() => onPageChange?.(to)} className={`${cls} ${hover}`}>
        {icon}{label}
      </button>
    );
  }

  return (
    <nav className="mt-12 flex items-center justify-center gap-1.5">
      <NavBtn to={page > 1 ? page - 1 : null} label="Prev" icon={<ChevronLeft className="w-3.5 h-3.5" />} />
      <div className="flex items-center gap-1 mx-1">
        {numbers.map((n, i) =>
          n === 'gap'
            ? <span key={i} className="px-1 text-[var(--color-muted)] font-mono text-xs">…</span>
            : <PageItem key={i} n={n} current={n === page} />,
        )}
      </div>
      <NavBtn to={page < totalPages ? page + 1 : null} label="Next" icon={<ChevronRight className="w-3.5 h-3.5" />} />
    </nav>
  );
}
