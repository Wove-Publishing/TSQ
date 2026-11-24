import type { APIRoute } from 'astro';
import books from '../../content/mobile-books.json';
import { getCollection } from 'astro:content';
export const prerender = true;
const origin = 'https://www.thescandinavianquarterly.com';
const url = (path?: string) => path ? new URL(path, origin).href : null;
export const GET: APIRoute = async () => {
  const now = Date.now();
  const work = (await getCollection('work', ({data}) => !data.draft && data.publish_date.valueOf() <= now)).sort((a,b)=>b.data.publish_date.valueOf()-a.data.publish_date.valueOf());
  const contributors = await getCollection('contributors', ({data})=>!data.draft);
  const issues = (await getCollection('issues')).sort((a,b)=>(b.data.publish_date?.valueOf() ?? 0)-(a.data.publish_date?.valueOf() ?? 0));
  return Response.json({
    version: 1,
    work: work.map(({id,data,body})=>({id,title:data.title,author:data.contributor,category:data.category,language:data.publication_language ?? data.original_language ?? null,languageDetail:data.publication_language_detail ?? data.language_detail ?? null,originalLanguage:data.original_language ?? null,date:data.publish_date.toISOString(),excerpt:data.excerpt ?? '',body:body ?? '',translation:data.english_translation ?? null,translator:data.translator ?? null,image:url(data.featured_image),imageAlt:data.featured_image_alt ?? '',issue:data.issue ?? null,url:url('/work/'+id+'/')})),
    issues: issues.map(({id,data})=>({id,slug:data.slug,title:data.title,description:data.description,cover:url(data.cover),published:data.published && (!data.publish_date || data.publish_date.valueOf()<=now),url:url('/issues/'+id+'/')})),
    authors: contributors.map(({data})=>({name:data.name,bio:data.short_bio ?? '',url:url('/contributors/'+data.slug+'/')})),
    books
  });
};
