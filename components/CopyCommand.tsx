'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyCommand({ command, label }: { command: string; label?: string }) {
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
    <div className="group">
      {label && (
        <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1.5 px-1">
          {label}
        </div>
      )}
      <button
        type="button"
        onClick={onCopy}
        className="font-mono text-[13px] bg-[var(--color-surface)] hover:bg-[var(--color-elevated)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 rounded-lg px-3.5 py-2.5 w-full text-left flex items-center justify-between gap-3 transition-all duration-150"
      >
        <span className="truncate">
          <span className="text-[var(--color-muted)] select-none">$ </span>
          {command}
        </span>
        <span
          className={`flex items-center justify-center w-6 h-6 rounded-md transition-colors ${
            copied
              ? 'text-[var(--color-accent)]'
              : 'text-[var(--color-muted)] group-hover:text-[var(--color-text)]'
          }`}
          aria-label={copied ? 'copied' : 'copy'}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </span>
      </button>
    </div>
  );
}
