# The Scandinavian Quarterly mobile app

Expo SDK 54, iOS and Android. Free reading, no accounts or analytics.

## Run locally
From the repository root, run the website's normal build/check commands. Deploy the mobile feed alongside the website before testing live content.
Then:
```sh
cd mobile
npm install
npx expo install --check
npx expo start
```
For Android internal testing: `npx eas-cli build --platform android --profile preview`.
Link the project to the existing Wove Expo organisation when prompted. Do not reuse another app's package ID.

## Editorial workflow
The public feed at /api/mobile.json is generated from Astro collections at website build time. Draft and future-dated works are excluded. Existing content metadata controls filters. Issue membership matches the issue field against the issue ID, slug or title. Forthcoming issues are labelled and do not expose an issue contents list.
Add released books to src/content/mobile-books.json using objects with id, title, author, category, description, cover and url (HTTPS physical-book purchase page). No fabricated books are included. Review store policies before enabling links for digital purchases.

Bookmarks and the last successful feed are stored locally. Text can be read offline after a successful refresh; remote images may need connectivity. Reader font and appearance controls are session-local.

## Before release
Verify the website build and deployed feed, test every category/language and translation, check issue membership against the live site, test offline and accessibility on both platforms, add approved TSQ icon/splash assets, confirm package identifiers, generate lockfile and build signed release artifacts.
