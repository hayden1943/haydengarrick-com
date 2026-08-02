import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Writing lives on LinkedIn — this collection is metadata only (no rendered body).
// Add a new .md file to src/content/writing/ for each published article.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    href: z.string().url(),
  }),
});

export const collections = { writing };
