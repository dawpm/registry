import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({
  basePath,
  page,
  totalPages,
}: {
  basePath: string;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);
  const prev = page > 1 ? href(page - 1) : null;
  const next = page < totalPages ? href(page + 1) : null;

  const numbers: (number | '…')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) numbers.push(i);
  } else {
    numbers.push(1);
    if (page > 3) numbers.push('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      numbers.push(i);
    }
    if (page < totalPages - 2) numbers.push('…');
    numbers.push(totalPages);
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5 text-sm">
      <PageBtn href={prev} disabled={!prev}>
        <ChevronLeft className="w-4 h-4" /> Prev
      </PageBtn>
      <div className="flex items-center gap-0.5 mx-1">
        {numbers.map((n, i) =>
          typeof n === 'number' ? (
            <Link
              key={i}
              href={href(n)}
              className={`min-w-[2rem] px-2.5 py-1.5 text-center rounded-md transition-colors ${
                n === page
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-semibold'
                  : 'text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
              }`}
            >
              {n}
            </Link>
          ) : (
            <span key={i} className="px-1 text-[var(--color-muted)]">
              {n}
            </span>
          ),
        )}
      </div>
      <PageBtn href={next} disabled={!next}>
        Next <ChevronRight className="w-4 h-4" />
      </PageBtn>
    </nav>
  );
}

function PageBtn({
  href,
  disabled,
  children,
}: {
  href: string | null;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const cls =
    'flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-[var(--color-border)] transition-colors';
  if (disabled || !href) {
    return (
      <span className={`${cls} text-[var(--color-muted)]/40 cursor-not-allowed`}>{children}</span>
    );
  }
  return (
    <Link
      href={href}
      className={`${cls} text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)]/40`}
    >
      {children}
    </Link>
  );
}
