import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { isCalendarDate, normaliseCalendarDate } from '../lib/nordic-calendar';

const calendarDate = z.preprocess(normaliseCalendarDate, z.string().refine(isCalendarDate, 'Use a real date in YYYY-MM-DD format.'));
const optionalText = z.preprocess(value => value == null ? '' : value, z.string());

export const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string().trim().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    category: z.enum(['literature', 'arts', 'cultural-traditions']),
    country: z.enum(['sweden', 'norway', 'denmark', 'finland', 'iceland', 'faroe-islands', 'greenland', 'aland', 'nordic-region']),
    city: z.string().trim().min(1),
    venue: optionalText,
    start_date: calendarDate,
    end_date: calendarDate,
    summary: z.string().trim().min(1).max(600),
    schedule_note: optionalText,
    official_url: z.string().trim().url().refine(value => /^https?:\/\//i.test(value), 'Use an official https:// or http:// event page.'),
    last_verified: calendarDate,
    draft: z.boolean().default(true),
    cancelled: z.boolean().default(false),
  }).refine(data => data.end_date >= data.start_date, {
    message: 'The end date cannot be before the start date.', path: ['end_date']
  })
});
