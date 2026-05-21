import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    description: z.string(),
    link: z.string().url().optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  events: events,
};
