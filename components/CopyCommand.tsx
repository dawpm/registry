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
    <div>
      {label && <div className="eyebrow mb-2">{label}</div>}
      <button type="button" onClick={onCopy} className="code-chip">
        <span className="truncate">
          <span className="opacity-60 select-none">$ </span>
          {command}
        </span>
        <span className="flex items-center justify-center w-5 h-5 shrink-0" aria-label={copied ? 'copied' : 'copy'}>
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </span>
      </button>
    </div>
  );
}
