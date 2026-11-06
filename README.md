# DE Website Template (IPTV Deutschland)

A blank, reusable **Germany-first** website template for launching new IPTV sites
quickly. Vite + React 19 + Tailwind 4 SPA with a prerendered multilingual blog.

All site-specific identity has been stripped and replaced with neutral
placeholders (`https://www.example.com`, `TOP IPTV KAUFEN`, `@your-handle`). The
design, page structure, components and service copy are kept intact — fill in the
placeholders to turn it into a real site.

The published default language is **German** (`SITE_LANG` in `src/i18n.ts`) and the
default market is Germany/DACH (the geo-redirect in `src/App.tsx` sends unknown
visitors to `/de`). The header language switcher still offers English and Dutch;
German is simply the default and the language every page is canonicalised in.

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

The dev server listens on <http://localhost:3000> (it falls back to the next free
port, e.g. 3001, if 3000 is taken).

## Build

```bash
npm run build
```

This runs `vite build` and then `scripts/prerender.ts`, which writes a real static
HTML file per route into `dist/` (own `<title>`, meta description, canonical,
Open Graph tags, JSON-LD and the text baked in) so every page is crawlable. It
also regenerates `dist/sitemap*.xml` and appends the `Sitemap:` lines to
`dist/robots.txt`.

> **Build anchor warning:** the prerenderer patches `dist/index.html` on three
> exact-match anchor strings — `TPL_HTML_TAG` (`<html lang="de">`), `TPL_CANONICAL`
> and `TPL_TITLE` in `scripts/prerender.ts`. These must stay byte-for-byte equal to
> the matching lines in `index.html`, or `npm run build` throws. If you change the
> homepage `<title>`, the `<html lang>` or the canonical in `index.html`, update the
> corresponding constant in `scripts/prerender.ts` too.

## SEO keyword targeting

- **German pages** (`/de`, root `/`, and the German keyword landing pages) target
  **IPTV kaufen, IPTV Deutschland, IPTV Anbieter**.
- **English pages** (`/en`) target **IPTV Germany, German IPTV**.
- The homepage title/description/H1 live in two places that must agree:
  `index.html` (the SPA shell / root `/`) and the `HOME_TITLE` / `HOME_DESC` /
  `HOME_BODY` constants in `scripts/prerender.ts` (the prerendered `/de`, `/en`,
  `/nl` pages).

## Template setup checklist

1. **`src/siteConfig.ts`** — the single source of brand info. Set `BRAND_NAME`,
   `SITE_URL`, `SITE_DOMAIN`, `WA_NUMBER` (per-site WhatsApp number — currently the
   previous site's), `INSTAGRAM_URL`, `SUPPORT_EMAIL`.
2. **Domain** — replace every `https://www.example.com` / `example.com` with your
   real domain across `src/`, `scripts/prerender.ts` (the `SITE` constant) and
   `index.html` (canonical, Open Graph, Twitter, JSON-LD).
3. **Brand name** — project-wide find & replace of the placeholder `TOP IPTV KAUFEN`
   (and the standalone `BRAND`) inside the content/blog prose, which is plain text
   and intentionally not wired to variables.
4. **`index.html`** — update `<title>`, meta description/keywords, Open Graph &
   Twitter tags, canonical URL and the JSON-LD (Organization/WebSite/Product +
   reviews). Keep `<title>`, `<html lang>` and the canonical in sync with
   `scripts/prerender.ts` (see the build-anchor warning above).
5. **Verification tokens** — add your Google Search Console and Bing Webmaster
   tokens in the commented block near the top of `index.html` (per-site values —
   the old tokens have been removed).
6. **`metadata.json`** — update `name` and `description`.
7. **Logos / favicons** — replace `public/favicon.svg` and
   `public/logo-wordmark.svg`, drop new source art in `assets/brand/`, then run
   `npm run brand` to regenerate every derived icon and the hero plate. The header
   now renders a two-colour **text** wordmark (`src/components/Header.tsx`); edit
   that to change the on-page logo.
8. **Social links** — fill in URLs in `src/socialLinks.ts` (empty = hidden, never a
   dead link). The footer config ships empty.
9. **Email notifications** — set the EmailJS IDs in `src/emailConfig.ts`.
10. **Ads tracking** — set `ADS_CONVERSION_SEND_TO` in `src/analytics.ts` (optional).
11. **Brand colors** — defined in `src/index.css` (accent is `#facc15`).
12. **Language & market** — `SITE_LANG` in `src/i18n.ts` and the geo-redirect
    fallbacks in `src/App.tsx` set the default market (currently German / DACH).
