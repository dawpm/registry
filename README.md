# @dawpm/registry — frontend + JSON API

The dawpm registry: a Next.js 15 app deployed to Vercel that fronts the
[yanncotineau/dawpm-registry](https://github.com/yanncotineau/dawpm-registry)
data repo. Lives at https://dawpm-registry.vercel.app.

## How it works

- The data repo compiles its yaml files to `v1/plugins.json` and publishes to
  GitHub Pages via Actions.
- This frontend reads that JSON via a hourly-revalidated `fetch`, so most
  requests hit Next.js' cache.
- When the data repo's GHA finishes, it pings a Vercel deploy hook so the
  frontend redeploys and the next request gets the new JSON.

## Endpoints

- `GET /` — search + plugin grid.
- `GET /p/<ns>/<name>` — plugin detail page.
- `GET /api/v1/plugins[?q=]` — JSON list (consumed by the CLI).
- `GET /api/v1/plugins/<ns>/<name>` — single plugin JSON (consumed by the CLI).

## Local dev

```sh
pnpm install
pnpm dev
```

Override the data source via env:

```sh
DAWPM_REGISTRY_DATA_URL=http://localhost:8080/v1/plugins.json pnpm dev
```

## Deploy

Vercel project, root = `registry/`. Set `DAWPM_REGISTRY_DATA_URL` to the
deployed Pages URL. Add the Vercel deploy-hook URL as
`VERCEL_DAWPM_REGISTRY_DEPLOY_HOOK` secret in the data repo.
