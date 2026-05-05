# Task 6a — Consent-Aware Analytics + PWA Support

## Agent: Full-Stack Developer
## Status: ✅ Complete

### Work Log

1. **Read project context** — Reviewed `worklog.md` (5 previous task rounds), existing `layout.tsx`, and `CookieConsent.tsx` to understand consent storage format (`localStorage` key `cookie-consent` with `{ necessary, analytics, marketing, timestamp, version }`).

2. **Created `/src/components/analytics/Analytics.tsx`** — Consent-aware analytics component:
   - `'use client'` React component (renders nothing visible)
   - Reads consent from `localStorage` key `cookie-consent`
   - Initializes `window.dataLayer` with default denied consent on first run
   - Polls localStorage every 800ms to detect consent changes (setInterval)
   - Uses `useRef` to track previous consent state and avoid unnecessary updates
   - **GA4**: When analytics consent granted → pushes `analytics_storage: 'granted'` to dataLayer, loads `gtag.js` with `anonymize_ip: true` and `SameSite=None;Secure` cookie flags. When revoked → pushes denied, removes script tag.
   - **Facebook Pixel**: When marketing consent granted → pushes `ad_storage: 'granted'` + `ad_user_data: 'granted'` + `ad_personalization: 'granted'`, loads `fbevents.js`. When revoked → pushes denied, removes script.
   - Uses `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var (fallback: `G-XXXXXXXXXX`)
   - Uses `NEXT_PUBLIC_FB_PIXEL_ID` env var (fallback: empty string — no pixel loaded)
   - Proper TypeScript typing with `ConsentData` and `GtagConsentUpdate` interfaces + `declare global` window augmentation
   - Properly cleans up interval on unmount

3. **Created `/public/manifest.json`** — PWA web app manifest:
   - `name`: "Čebelarstvo Veselič — Ekološki med iz Bele krajine"
   - `short_name`: "Veselič Med"
   - `start_url`: "/", `display`: "standalone"
   - `background_color`: `#FDF8EF`, `theme_color`: `#D4A017`
   - `orientation`: "portrait-primary"
   - Icon: `/images/hero.jpg` (512x512, any purpose)
   - Categories: food, shopping
   - Language: `sl`, LTR

4. **Updated `/src/app/layout.tsx`** — Three minimal changes:
   - **Import**: Added `import Analytics from "@/components/analytics/Analytics"`
   - **PWA meta tags in `<head>`** (after existing preconnect links):
     - `<meta name="theme-color" content="#D4A017" />`
     - `<meta name="apple-mobile-web-app-capable" content="yes" />`
     - `<meta name="apple-mobile-web-app-status-bar-style" content="default" />`
     - `<meta name="apple-mobile-web-app-title" content="Veselič Med" />`
     - `<link rel="manifest" href="/manifest.json" />`
   - **Organization schema** added at the beginning of the `@graph` array with: name, alternateName, URL, logo, foundingDate (1990), founder (Jožef Veselič), address (Čurile 4a, Metlika), contactPoint (+386-41-234-567, Slovenian/English), sameAs (Facebook + Instagram)
   - **Analytics component** placed after `<Toaster />` inside `<ThemeProvider>`: `<Analytics />`

### Verification
- `bun run lint`: **clean** (0 errors, 0 warnings)
- Dev server: `GET / 200` confirmed — app compiles and renders successfully
- No existing functionality broken — all changes are additive

### Files Created
| File | Description |
|------|-------------|
| `src/components/analytics/Analytics.tsx` | Consent-aware GA4 + Facebook Pixel loader (168 lines) |
| `public/manifest.json` | PWA web app manifest (20 lines) |

### Files Modified
| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Added Analytics import, PWA meta tags, Organization schema, `<Analytics />` component |
