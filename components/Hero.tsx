'use client';

import { motion } from 'framer-motion';
import { CopyCommand } from './CopyCommand';

export function Hero({ registryUrl }: { registryUrl: string }) {
  const isDefault =
    registryUrl === 'https://dawpm-registry.yanncotineau.dev' ||
    registryUrl === 'https://dawpm-registry.vercel.app';

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-6">
        Install DAW plugins from your terminal.
      </h1>

      <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
        <CopyCommand command="npm i -g @dawpm/cli" label="install the CLI" />
        {!isDefault && (
          <CopyCommand
            command={`registry = ${registryUrl}`}
            label="add to ~/.dawpmrc"
          />
        )}
      </div>
    </motion.section>
  );
}
