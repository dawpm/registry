'use client';

import { useState } from 'react';

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="font-mono text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-4 py-3 w-full text-left flex items-center justify-between gap-4 hover:border-[var(--color-accent)] transition-colors"
    >
      <span>
        <span className="text-[var(--color-muted)]">$ </span>{command}
      </span>
      <span className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
        {copied ? 'copied' : 'copy'}
      </span>
    </button>
  );
}
