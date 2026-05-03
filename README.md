# @dawpm/registry

The Next.js frontend for a `dawpm` registry. Browse plugins in the UI, or hit `/api/v1/plugins` from the CLI.

The plugin data is fetched from a separate static JSON index (see `DAWPM_REGISTRY_DATA_URL` below), cached, and refreshed via a Vercel deploy hook whenever the data changes.

## Routes

- `/`: search and plugin grid
- `/p/<ns>/<name>`: plugin detail
- `/ns/<ns>`: every plugin from a namespace
- `/tag/<tag>`: every plugin with a tag
- `/api/v1/plugins[?q=]` and `/api/v1/plugins/<ns>/<name>`: JSON for the CLI

## Run locally

```sh
pnpm install
pnpm dev
```

Point at a different data source while developing:

```sh
DAWPM_REGISTRY_DATA_URL=http://localhost:8080/v1/plugins.json pnpm dev
```

## Deploy

Deploy to Vercel with the project root set to `registry/`. Configure these environment variables:

| Variable | Purpose |
| --- | --- |
| `DAWPM_REGISTRY_DATA_URL` | Where to fetch the compiled `plugins.json` from. |
| `NEXT_PUBLIC_REGISTRY_URL` | The public URL this instance is served at. The home page renders a `~/.dawpmrc` snippet pointing at this URL so visitors can plug their CLI into your registry. |

Add the Vercel deploy-hook URL as a secret in your data repo so it can rebuild this app on each push.

## License

MIT
