import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    contributor: z.string(),
    category: z.enum(['poetry', 'fiction', 'essay', 'criticism', 'translation', 'art', 'photography', 'interview']),
    publish_date: z.coerce.date(),
    excerpt: z.string().optional(),
    featured_image: z.string().optional(),
    featured_image_alt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    previously_published: z.boolean().default(false),
    first_publication_title: z.string().optional(),
    first_publication_url: z.string().optional(),
    first_publication_date: z.string().optional(),
    compilation_eligible: z.boolean().default(true),
    issue: z.string().optional()
  })
});

const contributors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/contributors' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    role: z.string().optional(),
    portrait: z.string().optional(),
    location: z.string().optional(),
    short_bio: z.string().optional(),
    website: z.string().optional(),
    instagram: z.string().optional(),
    bluesky: z.string().optional(),
    x: z.string().optional(),
    facebook: z.string().optional(),
    other_social: z.string().optional(),
    books: z.array(z.object({
      title: z.string(),
      publisher: z.string().optional(),
      year: z.string().optional(),
      url: z.string().optional()
    })).default([]),
    draft: z.boolean().default(false)
  })
});

const issues = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/issues' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    season: z.string(),
    year: z.number(),
    description: z.string(),
    cover: z.string().optional(),
    published: z.boolean().default(false),
    publish_date: z.coerce.date().optional()
  })
});

export const collections = { work, contributors, issues };
