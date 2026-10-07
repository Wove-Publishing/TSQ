import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const base = 'https://www.thescandinavianquarterly.com';
  const staticPaths = ['/', '/latest/', '/issues/', '/contributors/', '/interviews/', '/about/', '/submit/', '/submission-guidelines/', '/masthead/', '/nominations/', '/donate/', '/contact/', '/writing/poetry/', '/writing/fiction/', '/writing/essays-criticism/', '/writing/translation/', '/writing/art-photography/'];
  const work = await getCollection('work', ({data}) => !data.draft);
  const contributors = await getCollection('contributors', ({data}) => !data.draft);
  const issues = await getCollection('issues');
  const urls = [
    ...staticPaths.map(path => base + path),
    ...work.map(x => `${base}/work/${x.id}/`),
    ...contributors.map(x => `${base}/contributors/${x.id}/`),
    ...issues.map(x => `${base}/issues/${x.id}/`)
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url=>`  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
