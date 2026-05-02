# dawpm/registry

The Next.js frontend at [dawpm-registry.yanncotineau.dev](https://dawpm-registry.yanncotineau.dev). Browse plugins in the UI, or hit `/api/v1/plugins` from the CLI.

The plugin data lives in a separate repo: [yanncotineau/dawpm-registry](https://github.com/yanncotineau/dawpm-registry). That repo compiles its yaml into `v1/plugins.json` and publishes to GitHub Pages. This app fetches that JSON, caches it, and pings a Vercel deploy hook to refresh whenever the data changes.

## Endpoints

- `/` — search + plugin grid
- `/p/<ns>/<name>` — plugin detail
- `/ns/<ns>` — every plugin from a namespace
- `/tag/<tag>` — every plugin with a tag
- `/api/v1/plugins[?q=]` and `/api/v1/plugins/<ns>/<name>` — JSON for the CLI

## Run locally

```sh
pnpm install
pnpm dev
```

Point at a different data source while developing:

```sh
DAWPM_REGISTRY_DATA_URL=http://localhost:8080/v1/plugins.json pnpm dev
```

## Self-hosting

Deploy to Vercel, root = `registry/`. Set:

- `DAWPM_REGISTRY_DATA_URL` — where to fetch the compiled `plugins.json` from
- `NEXT_PUBLIC_REGISTRY_URL` — the public URL this instance is served at; the home page shows a `~/.dawpmrc` snippet so users can point their CLI at you

Add the Vercel deploy-hook URL as a secret in the data repo so it can poke this app on each push.
