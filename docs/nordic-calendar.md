# The Nordic Calendar

Public page: `/whats-on/`. It is linked in desktop/mobile navigation, on the homepage and in `/links/`.

## Editorial scope

Only **Literature**, **Arts** and **Cultural Traditions**. No standalone music, film, theatre, nightlife or generic tourism listings. Cover Sweden, Norway, Denmark, Finland, Iceland, Greenland, the Faroe Islands and Åland. Sámi events should identify their actual venue/country and their cultural context accurately. A regional programme can use `nordic-region`; do not imply every locality participates.

## Adding an event

Open Pages CMS → **Events / Nordic Calendar**. Add a unique slug including the year, name, category, country, city, venue, start/end dates, concise original summary and the official event URL. Set `last_verified` to the day the organiser's dates were checked. Keep Draft enabled while researching; turn it off to publish. A one-day event has the same start/end date.

`start_date`, `end_date` and `last_verified` accept both YAML timestamps and quoted YYYY-MM-DD strings. Invalid dates and backwards ranges are rejected. Optional text fields tolerate empty CMS values.

Use `schedule_note` for weekends-only markets, session bookings and non-daily opening schedules. A broad date range must not imply daily opening. No ticket price or opening time should be invented. Images are deliberately not required. Editorial notes in the Markdown body are not rendered publicly.

## Expiry and filters

The page is rendered on demand by the existing Cloudflare adapter (`prerender = false`, `Cache-Control: no-store`). Every request filters out drafts, cancellations and events past their final local date. Default view is the current Stockholm calendar month. Month, country and category filters use a normal GET form and work without JavaScript. Multi-month exhibitions appear in each overlapping month until their end date. `All upcoming` includes later events.

Expiry uses each country's main timezone; Greenland uses Nuuk. For unusual multi-zone itineraries or non-Nuuk Greenland dates near a day boundary, obtain the local schedule and extend the timezone model before relying on automatic midnight expiry. No database or new paid platform is required.

## Weekly maintenance

Use the separate TSQ Nordic Calendar scheduled task, not Lore Lorn's calendar. Read the current repository and this guide first. Research organisers' official sources for the current and next three months. Add curated, genuinely relevant events, correct changed dates, hide confirmed cancellations, and remove expired published event files from `src/content/events/`. Do not alter writing or contributor files. Use one atomic, lease-checked commit to main; avoid overwriting concurrent editor changes. Deletion removes active CMS files, not Git history. Do not mark a page verified merely because a search result exists; check dated organiser information and record source notes. Never fabricate a listing to fill a country or category.

## Tests

With Node 22.6+:

```sh
node --experimental-strip-types --test tests/nordic-calendar.test.mjs
npm run build
```

Check `/whats-on/`, `/whats-on/?category=literature`, a country filter, next month, and an empty selection. Check at narrow mobile widths and with JavaScript disabled. A successful build is not a substitute for checking the live route.

## Launch sources (checked 5 November 2026)

- Remedios Varo: https://louisiana.dk/en/exhibition/remedios-varo/
- Aage Gaup: https://www.modernamuseet.se/en/stockholm/exhibitions/aage-gaup/ and https://www.modernamuseet.se/en/press-material/aage-gaup/
- Nordic Literature Week: https://www.nordisklitteratur.org/se/
- Hafnarborg openings: https://hafnarfjordur.is/en/event/opening-of-two-new-exhibitions-in-the-port-city/ and https://hafnarfjordur.is/en/drawings-performance-and-the-flow-of-water-in-a-port-city/
- Bókadagar: https://www.nlh.fo/en/events/bokadagar-2026 and https://www.nlh.fo/en/home/
- Suomen Kädentaidot: https://kadentaidot.fi/fi
- Den Gamle By: https://www.dengamleby.dk/planlaeg-besog/program/jul-i-den-gamle-by/
- Årsutstillingen: https://nnkm.no/en/arsutstillingen-2026 and https://www.norskekunsthandverkere.no/
- Skansen: https://www.skansen.se/en/see-and-do/holidays-and-traditions/christmas-market/
