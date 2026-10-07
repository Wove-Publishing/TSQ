# Safest way to move this into the Astro repo Cloudflare created

Your Cloudflare-created GitHub repo may contain Cloudflare-specific files that identify the deployed project. Do not delete those blindly.

## Replace these from the template repo

Copy from this package into your repo:
- `src/` (replace the demo Astro blog `src/`)
- `public/` (replace demo public assets; keep any Cloudflare-only file you know you need)
- `.pages.yml`
- `astro.config.mjs`
- `tsconfig.json`
- `package.json` (or merge its Astro dependency/scripts into the existing package.json)

## Keep from the Cloudflare-created repo if present

Keep its existing:
- `wrangler.jsonc` or `wrangler.toml`
- Cloudflare adapter settings not represented here
- `.github/` workflows created by Cloudflare

Then commit/push to the default branch. Cloudflare should run `npm run build` and deploy `dist/`.
