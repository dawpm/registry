import { z } from 'zod';

const SLUG_RE = /^[a-z0-9][a-z0-9-]*\/[a-z0-9][a-z0-9-]*$/;

export const PluginSchema = z.object({
  slug: z.string().regex(SLUG_RE),
  name: z.string(),
  description: z.string(),
  author: z.string(),
  license: z.string(),
  homepage: z.string().url().optional(),
  image: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
  download: z.object({
    url: z.string().url(),
    sha256: z.string(),
    size: z.number().int(),
  }),
  install: z.array(z.object({
    format: z.enum(['vst', 'vst3', 'fst']),
    include: z.array(z.string()),
    exclude: z.array(z.string()).optional(),
    strip: z.number().int().min(0).default(0),
  })),
});
export type Plugin = z.infer<typeof PluginSchema>;

export const RegistryIndexSchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.string(),
  count: z.number().int(),
  plugins: z.array(PluginSchema),
});
export type RegistryIndex = z.infer<typeof RegistryIndexSchema>;
