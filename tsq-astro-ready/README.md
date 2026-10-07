# The Scandinavian Quarterly — Astro + Pages CMS

This repository is the online-only TSQ site. It is designed for Astro, GitHub, Cloudflare, and Pages CMS.

## Publishing workflow

1. Go to https://app.pagescms.org and sign in with GitHub.
2. Install/authorize the Pages CMS GitHub App for this repository.
3. Open the repository in Pages CMS. The included `.pages.yml` exposes:
   - Published work
   - Contributors
   - Issues / seasonal collections
4. Create the contributor profile first.
5. Create the work entry, select that contributor, choose the genre/category, add the body and publication metadata, then save.
6. Pages CMS commits the Markdown file to GitHub.
7. Because Cloudflare is already connected to this repository, Cloudflare rebuilds and deploys the site automatically.

No manual HTML editing is required for ordinary publishing.

## Reprints vs issue compilations

For a reprint:
- Set `Previously published elsewhere` to ON.
- Fill in the original publication details.
- Set `Eligible for TSQ issue compilation` to OFF.

The site also automatically excludes any entry marked `previously_published: true` from issue compilation pages, even if the eligibility toggle is accidentally left on.

## Contributor pages

Each contributor gets a Markdown profile in `src/content/contributors/`. The generated page can show:
- full biography
- portrait
- location
- website
- social accounts
- books and links
- every TSQ work linked to that contributor

## Cloudflare build settings

If Cloudflare asks for them:
- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`

If the Cloudflare-created template repository already contains a `wrangler.jsonc`, `wrangler.toml`, or Cloudflare-specific adapter/configuration file, KEEP that file when copying this project into the repository. The TSQ source code does not need to replace Cloudflare's project-binding configuration.

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Important paths

- `src/content/work/` — poems, fiction, essays, translations, art, photography, interviews
- `src/content/contributors/` — contributor profiles
- `src/content/issues/` — seasonal online collections
- `.pages.yml` — Pages CMS editor configuration
- `public/media/` — media uploaded through Pages CMS
- `public/assets/` — TSQ brand assets, CSS, JS

## Donations

The Donate page contains the current Stripe Buy Button and the Stripe Payment Link fallback. The floating **Support TSQ →** tab is created by `public/assets/js/main.js` and is hidden on the Donate page.
