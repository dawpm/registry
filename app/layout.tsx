import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  title: 'dawpm — package manager for DAW plugins',
  description: 'Discover, install, and manage VST and FL Studio plugins from a single CLI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <header className="border-b border-[var(--color-border)] sticky top-0 z-10 backdrop-blur bg-[color-mix(in_oklch,var(--color-bg)_85%,transparent)]">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-mono font-bold text-base">dawpm</span>
              <span className="text-[var(--color-muted)] text-sm hidden sm:inline">— package manager for DAW plugins</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm text-[var(--color-muted)]">
              <a href="https://www.npmjs.com/package/@dawpm/cli" className="hover:text-[var(--color-text)] transition-colors">npm</a>
              <a href="https://github.com/dawpm" className="hover:text-[var(--color-text)] transition-colors">GitHub</a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
        <footer className="max-w-5xl mx-auto px-6 py-10 text-xs text-[var(--color-muted)] border-t border-[var(--color-border)] mt-20">
          <p>dawpm is open source. Add a plugin by opening a PR on <a className="underline hover:text-[var(--color-text)]" href="https://github.com/yanncotineau/dawpm-registry">yanncotineau/dawpm-registry</a>.</p>
        </footer>
      </body>
    </html>
  );
}
