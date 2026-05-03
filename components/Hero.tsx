'use client';

import { motion } from 'framer-motion';
import { CopyCommand } from './CopyCommand';

export function Hero({ registryUrl }: { registryUrl: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10"
    >
      <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
        <CopyCommand command="npm i -g @dawpm/cli" label="install the CLI" />
        <CopyCommand
          command={`registry = ${registryUrl}`}
          label="add to ~/.dawpmrc"
        />
      </div>
    </motion.section>
  );
}
