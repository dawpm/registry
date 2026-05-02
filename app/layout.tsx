import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import { Package } from 'lucide-react';
import { GithubIcon } from '@/components/icons/GithubIcon';
import { CommandPalette } from '@/components/CommandPalette';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  title: 'dawpm — package manager for DAW plugins',
  description: 'Install VST and FL Studio plugins from the terminal.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <header className="sticky top-0 z-30 border-b border-[var(--color-border)]/60 bg-[color-mix(in_oklch,var(--color-bg)_70%,transparent)] backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-mono font-semibold tracking-tight text-[15px] group-hover:text-[var(--color-accent)] transition-colors">
                dawpm
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-[var(--color-muted)]">
              <a
                href="https://www.npmjs.com/package/@dawpm/cli"
                aria-label="npm"
                className="p-2 rounded-md hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] transition-colors"
              >
                <Package className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/dawpm"
                aria-label="GitHub"
                className="p-2 rounded-md hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-12">{children}</main>

        <footer className="max-w-5xl mx-auto px-6 py-10 text-xs text-[var(--color-muted)] border-t border-[var(--color-border)]/60 mt-20">
          <p>
            Add a plugin by opening a PR on{' '}
            <a
              className="underline underline-offset-4 decoration-dotted hover:text-[var(--color-text)]"
              href="https://github.com/yanncotineau/dawpm-registry"
            >
              yanncotineau/dawpm-registry
            </a>
            .
          </p>
        </footer>

        <CommandPalette />
      </body>
    </html>
  );
}
