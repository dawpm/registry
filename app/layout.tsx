import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Anton } from 'next/font/google';
import Link from 'next/link';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { CommandPalette } from '@/components/CommandPalette';
import { QueryProvider } from '@/components/QueryProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });

export const metadata: Metadata = {
  title: 'dawpm: package manager for DAW plugins',
  description: 'Install VST and FL Studio plugins from the terminal.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${anton.variable}`}>
      <body>
        <QueryProvider>
          <header className="sticky top-0 z-30 bg-[var(--color-bg)] border-b border-[var(--color-rule)]">
            <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
              <Link href="/" className="font-display text-2xl tracking-tight uppercase leading-none">
                dawpm
              </Link>
              <nav className="flex items-center gap-2">
                <a
                  href="https://www.npmjs.com/package/@dawpm/cli"
                  className="btn btn-ghost h-9 px-4 text-[11px]"
                >
                  npm
                </a>
                <a
                  href="https://github.com/dawpm"
                  aria-label="GitHub"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md hover:bg-[var(--color-surface)] transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </nav>
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-6 py-12">{children}</main>

          <footer className="max-w-6xl mx-auto px-6 py-10 mt-20 text-xs text-[var(--color-muted)] border-t border-[var(--color-rule)]">
            <p>
              Add a plugin by opening a PR on{' '}
              <a
                className="underline underline-offset-4 decoration-dotted hover:text-[var(--color-ink)]"
                href="https://github.com/dawpm"
              >
                the registry data repo
              </a>
              .
            </p>
          </footer>

          <CommandPalette />
        </QueryProvider>
      </body>
    </html>
  );
}
