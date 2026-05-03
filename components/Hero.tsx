import { CopyCommand } from './CopyCommand';

export function Hero({ registryUrl, count }: { registryUrl: string; count: number }) {
  return (
    <section className="mb-14">
      <div className="eyebrow mb-4">package manager</div>
      <h1 className="h-display text-[clamp(56px,11vw,128px)] mb-4">
        DAW plugins<br />from your terminal
      </h1>
      <p className="max-w-xl text-[15px] text-[var(--color-muted)] leading-relaxed mb-8">
        Browse and install {count} VST and FL Studio plugins with a single command.
        Reproducible, scriptable, no clicking through installers.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
        <CopyCommand command="npm i -g @dawpm/cli" label="install the CLI" />
        <CopyCommand command={`registry = ${registryUrl}`} label="add to ~/.dawpmrc" />
      </div>
    </section>
  );
}
