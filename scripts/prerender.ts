/**
 * Post-build prerenderer.
 *
 * The site is a client-rendered Vite SPA. Search engines and social crawlers that
 * fetch a blog URL would otherwise receive the generic index.html shell (same title
 * for every route + a canonical pointing at the homepage), which makes the posts
 * un-indexable. This script emits a real static HTML file per route with its own
 * <title>, meta description, canonical, Open Graph / Twitter tags, Article JSON-LD
 * and the actual article text baked into the HTML, so every post is crawlable and
 * indexable as its own page. It also writes sitemap.xml from the real post list.
 * Runs after `vite build`.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_POSTS } from "../src/data/allPosts";
import { getPostText, getPostLang, type BlogPost } from "../src/data/blogPosts";
import { KEYWORD_PAGES } from "../src/data/keywordPages";
import { SITE_LANG, type LangCode } from "../src/i18n";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
// Canonical origin — must match the host that actually serves 200s.
const SITE = "https://www.topiptvkaufen.de";
const BRAND = "TOP IPTV KAUFEN";

// Must match index.html exactly — these are the anchors the template is patched on.
const TPL_HTML_TAG = '<html lang="de">';
const TPL_CANONICAL = `<link rel="canonical" href="${SITE}/" />`;
const TPL_TITLE = "<title>IPTV Deutschland kaufen | Premium IPTV Anbieter</title>";

const template = readFileSync(resolve(DIST, "index.html"), "utf8");

for (const [name, anchor] of Object.entries({ TPL_HTML_TAG, TPL_CANONICAL, TPL_TITLE })) {
  if (!template.includes(anchor)) {
    throw new Error(
      `prerender: ${name} not found in dist/index.html.\n  Expected: ${anchor}\n` +
        `  Update the constant in scripts/prerender.ts to match index.html.`
    );
  }
}

const OG_LOCALE: Record<string, string> = {
  nl: "nl_NL", en: "en_US", fr: "fr_FR", fi: "fi_FI", de: "de_DE", es: "es_ES",
  it: "it_IT", sv: "sv_SE", no: "nb_NO", da: "da_DK", pl: "pl_PL", pt: "pt_PT",
  ro: "ro_RO", cs: "cs_CZ", tr: "tr_TR", ar: "ar_AR",
};

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const stripMd = (s: string): string => s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

const truncate = (s: string, n: number): string =>
  s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)).trimEnd() + "…";

/** Convert a body paragraph with [label](url) markdown links into safe HTML with real anchors. */
function paragraphToHtml(text: string): string {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out += esc(text.slice(last, m.index));
    out += `<a href="${esc(m[2])}" rel="noopener">${esc(m[1])}</a>`;
    last = m.index + m[0].length;
  }
  if (last < text.length) out += esc(text.slice(last));
  return out;
}

interface HreflangLink { lang: string; href: string }

interface PageOpts {
  lang: string;
  title: string;
  description: string;
  canonical: string;
  image?: string;
  ogType: "website" | "article";
  jsonLd: object[];
  bodyHtml: string;
  hreflang?: HreflangLink[];
}

// A compact link footer baked into every prerendered page so the keyword
// landing pages and legal page are never orphaned: each one then receives an
// internal link from all ~53 crawlable pages. Rendered inside #root so the SPA
// replaces it on hydration, but it is present in the static HTML Google reads.
const FOOTER_LINKS_HTML = `<footer><nav aria-label="Beliebte Suchanfragen">`
  + KEYWORD_PAGES.map((kp) => `<a href="/${kp.slug}">${esc(kp.keyword)}</a>`).join(" · ")
  + ` · <a href="/de">Startseite</a> · <a href="/de/blog">Blog</a> · <a href="/de/agb">AGB</a></nav></footer>`;

function buildPage(o: PageOpts): string {
  const locale = OG_LOCALE[o.lang] ?? "nl_NL";
  const img = o.image ?? `${SITE}/favicon-512.png`;
  // Meta descriptions must stay <=160 chars or Google truncates them.
  const desc = truncate(o.description, 158);
  const head = [
    `<meta name="description" content="${esc(desc)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:type" content="${o.ogType}" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:title" content="${esc(o.title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${esc(o.canonical)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(o.title)}" />`,
    `<meta name="twitter:description" content="${esc(desc)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
    ...(o.hreflang ?? []).map(
      (h) => `<link rel="alternate" hreflang="${h.lang}" href="${esc(h.href)}" />`
    ),
    ...o.jsonLd.map(
      (j) =>
        `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`
    ),
  ].join("\n    ");

  // The template (index.html) ships static SEO tags for the live SPA. If left
  // in place they would DUPLICATE the per-page tags injected above — Google
  // then reads the generic template copy first. Strip them here so each
  // prerendered page carries exactly one description / OG / Twitter set.
  let tpl = template
    .replace(/[ \t]*<meta name="description"[^>]*>\s*/i, "")
    .replace(/[ \t]*<meta name="keywords"[^>]*>\s*/i, "")
    .replace(/[ \t]*<meta property="og:[^"]*"[^>]*>\s*/gi, "")
    .replace(/[ \t]*<meta name="twitter:[^"]*"[^>]*>\s*/gi, "");

  // Blog/article pages supply their own Article schema and should NOT inherit
  // the homepage Product + AggregateRating graph (Google wants the rating to
  // describe the page's primary subject, not stamp a product onto an article).
  if (o.ogType === "article") {
    tpl = tpl.replace(
      /[ \t]*<script type="application\/ld\+json">\s*\{[\s\S]*?"@graph"[\s\S]*?<\/script>\s*/i,
      ""
    );
  }

  return tpl
    .replace(TPL_HTML_TAG, `<html lang="${o.lang}">`)
    .replace(TPL_CANONICAL, `<link rel="canonical" href="${esc(o.canonical)}" />`)
    .replace(TPL_TITLE, `<title>${esc(o.title)}</title>\n    ${head}`)
    .replace('<div id="root"></div>', `<div id="root">${o.bodyHtml}\n${FOOTER_LINKS_HTML}</div>`);
}

function hreflangSet(pathSuffix: string): HreflangLink[] {
  return [
    { lang: "de", href: `${SITE}/de${pathSuffix}` },
    { lang: "en", href: `${SITE}/en${pathSuffix}` },
    { lang: "nl", href: `${SITE}/nl${pathSuffix}` },
    { lang: "x-default", href: `${SITE}/nl${pathSuffix}` },
  ];
}

function langToPrefix(lang: string): string {
  if (lang === "de" || lang === "nl" || lang === "en") return `/${lang}`;
  return "/en";
}

function postUrl(slug: string, lang?: string): string {
  const prefix = lang ? langToPrefix(lang) : "/en";
  return `${SITE}${prefix}/blog/${slug}`;
}

// A duplicate slug would silently overwrite one post's page with another's and put
// the same <loc> in the sitemap twice, which Search Console flags as a duplicate.
const seenSlugs = new Set<string>();
for (const post of ALL_POSTS) {
  if (seenSlugs.has(post.slug)) {
    throw new Error(`prerender: duplicate slug "${post.slug}" in ALL_POSTS.`);
  }
  seenSlugs.add(post.slug);
}

// ---- internal link graph --------------------------------------------------
// Without this every post is a dead end: the only links out are "/" and "/blog",
// so ~990 URLs all hang off one hub page with ~990 outbound links each worth
// almost nothing. Google discovers them and then never schedules a crawl.
// Related + prev/next links give each post real inbound links from pages in its
// own language and topic, which is what turns "Discovered" into "Crawled".
const byLang = new Map<string, BlogPost[]>();
for (const post of ALL_POSTS) {
  const lang = getPostLang(post, SITE_LANG);
  const bucket = byLang.get(lang);
  if (bucket) bucket.push(post);
  else byLang.set(lang, [post]);
}
for (const bucket of byLang.values()) {
  bucket.sort((a, b) => b.dateISO.localeCompare(a.dateISO));
}

const RELATED_COUNT = 6;

const RELATED_HEADING: Record<string, string> = {
  nl: "Meer lezen", de: "Mehr lesen", en: "Read more", fr: "À lire aussi",
  es: "Sigue leyendo", fi: "Lue lisää", sv: "Läs mer", no: "Les mer",
  da: "Læs mere", it: "Continua a leggere", pl: "Czytaj dalej",
  pt: "Leia mais", ro: "Continuă lectura", cs: "Další články",
  tr: "Devamını okuyun", ar: "اقرأ المزيد",
};

/** Same language first, same category before the rest, newest first, never itself. */
function relatedPosts(post: BlogPost, lang: string): BlogPost[] {
  const pool = byLang.get(lang) ?? [];
  const others = pool.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, RELATED_COUNT);
}

function postLinkHtml(p: BlogPost): string {
  const lang = getPostLang(p, SITE_LANG);
  const t = getPostText(p, lang);
  const prefix = langToPrefix(lang);
  return `<li><a href="${prefix}/blog/${p.slug}">${esc(t.title)}</a></li>`;
}

// ---- per-post pages -------------------------------------------------------
let count = 0;
for (const post of ALL_POSTS) {
  const lang = getPostLang(post, SITE_LANG) as LangCode;
  const t = getPostText(post, lang);
  const prefix = langToPrefix(lang);
  const canonical = postUrl(post.slug, lang);
  const description = truncate(stripMd(t.excerpt), 160);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: stripMd(t.excerpt),
    image: [post.image],
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    inLanguage: lang,
    author: { "@type": "Organization", name: BRAND, url: SITE },
    publisher: {
      "@type": "Organization",
      name: BRAND,
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/favicon-512.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: post.category,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: BRAND, item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}${prefix}/blog` },
      { "@type": "ListItem", position: 3, name: t.title, item: canonical },
    ],
  };

  const bodyHtml = [
    `<article>`,
    `<nav><a href="${prefix}">${BRAND}</a> › <a href="${prefix}/blog">Blog</a></nav>`,
    `<p>${esc(post.category)} · ${post.dateISO} · ${post.minutes} min</p>`,
    `<h1>${esc(t.title)}</h1>`,
    `<p>${esc(stripMd(t.excerpt))}</p>`,
    `<img src="${esc(post.image)}" alt="${esc(t.title)}" width="1200" height="675" />`,
    // A body paragraph starting with "## " becomes a real <h2>, so long posts can carry
    // scannable subheadings (and featured-snippet-friendly sections) instead of one flat
    // wall of <p> tags. Plain paragraphs are unaffected.
    ...t.body.map((p) =>
      p.startsWith("## ") ? `<h2>${paragraphToHtml(p.slice(3))}</h2>` : `<p>${paragraphToHtml(p)}</p>`
    ),
    `</article>`,
    ...(() => {
      const siblings = byLang.get(lang) ?? [];
      const i = siblings.findIndex((p) => p.slug === post.slug);
      const newer = i > 0 ? siblings[i - 1] : undefined;
      const older = i >= 0 && i < siblings.length - 1 ? siblings[i + 1] : undefined;
      const related = relatedPosts(post, lang);
      const out: string[] = [];
      if (related.length) {
        out.push(`<aside><h2>${esc(RELATED_HEADING[lang] ?? RELATED_HEADING.en)}</h2>`);
        out.push(`<ul>${related.map(postLinkHtml).join("")}</ul></aside>`);
      }
      if (newer || older) {
        out.push(
          `<nav>${[
            older ? `<a rel="prev" href="${prefix}/blog/${older.slug}">${esc(getPostText(older, lang).title)}</a>` : "",
            newer ? `<a rel="next" href="${prefix}/blog/${newer.slug}">${esc(getPostText(newer, lang).title)}</a>` : "",
          ]
            .filter(Boolean)
            .join(" · ")}</nav>`
        );
      }
      return out;
    })(),
  ].join("\n");

  const withBrand = `${t.title} — ${BRAND}`;
  const html = buildPage({
    lang,
    title: withBrand.length <= 60 ? withBrand : t.title,
    description,
    canonical,
    image: post.image,
    ogType: "article",
    jsonLd: [articleJsonLd, breadcrumbJsonLd],
    bodyHtml,
  });

  // Directory-style output so the URL /blog/<slug> is served as a real static
  // file WITHOUT needing cleanUrls (which breaks the SPA fallback rewrite).
  const outPath = resolve(DIST, prefix.slice(1), "blog", post.slug, "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf8");
  count++;
}

// ---- /blog grid page (per language) ----------------------------------------
const sorted = [...ALL_POSTS].sort((a, b) => b.dateISO.localeCompare(a.dateISO));

const BLOG_TITLE: Record<string, string> = {
  de: `IPTV Blog — Anleitungen, Ratgeber & Vergleiche | ${BRAND}`,
  en: `IPTV Blog — German IPTV Guides, Comparisons & Tips`,
  nl: `IPTV Blog — Handleidingen, Vergelijkingen & Tips`,
};
const BLOG_DESC: Record<string, string> = {
  de: "IPTV Blog von TOP IPTV KAUFEN: Anleitungen zum IPTV einrichten, App-Vergleiche, Kaufberatung und Ratgeber. IPTV kaufen bei Ihrem zuverlässigen IPTV Anbieter.",
  en: "IPTV blog by TOP IPTV KAUFEN: German IPTV guides, app comparisons, setup tips and buying advice. Buy German IPTV from a reliable provider.",
  nl: "IPTV blog van TOP IPTV KAUFEN: handleidingen, app-vergelijkingen, installatietips en advies.",
};

// German is the default market, so every core page (home/blog/agb) is
// prerendered in German first, with Dutch and English as the alternate markets.
const HOME_LANGS = ["de", "nl", "en"];

for (const blogLang of HOME_LANGS) {
  const prefix = langToPrefix(blogLang);
  const gridItems = sorted
    .map((post: BlogPost) => {
      const pLang = getPostLang(post, SITE_LANG);
      const t = getPostText(post, pLang);
      const pPrefix = langToPrefix(pLang);
      return [
        `<article>`,
        `<h2><a href="${pPrefix}/blog/${post.slug}">${esc(t.title)}</a></h2>`,
        `<p>${esc(stripMd(t.excerpt))}</p>`,
        `<p>${esc(post.category)} · ${post.dateISO}</p>`,
        `</article>`,
      ].join("\n");
    })
    .join("\n");

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${BRAND} Blog`,
    url: `${SITE}${prefix}/blog`,
    inLanguage: blogLang,
    blogPost: sorted.slice(0, 50).map((post) => {
      const pLang = getPostLang(post, SITE_LANG);
      const t = getPostText(post, pLang);
      return {
        "@type": "BlogPosting",
        headline: t.title,
        url: postUrl(post.slug, pLang),
        datePublished: post.dateISO,
      };
    }),
  };

  const blogHtml = buildPage({
    lang: blogLang,
    title: BLOG_TITLE[blogLang] ?? BLOG_TITLE.en,
    description: BLOG_DESC[blogLang] ?? BLOG_DESC.en,
    canonical: `${SITE}${prefix}/blog`,
    ogType: "website",
    jsonLd: [blogJsonLd],
    hreflang: hreflangSet("/blog"),
    bodyHtml: `<h1>IPTV Blog — Anleitungen & Ratgeber von ${BRAND}</h1>\n${gridItems}`,
  });
  mkdirSync(resolve(DIST, prefix.slice(1), "blog"), { recursive: true });
  writeFileSync(resolve(DIST, prefix.slice(1), "blog", "index.html"), blogHtml, "utf8");
}

// ---- /agb (per language) ---------------------------------------------------
const TERMS_TITLE: Record<string, string> = {
  de: `AGB & Kundenschutz | TOP IPTV KAUFEN`,
  en: `Terms & Customer Protection | TOP IPTV KAUFEN`,
  nl: `Voorwaarden & Klantbescherming | TOP IPTV KAUFEN`,
};
const TERMS_DESC: Record<string, string> = {
  de: "TOP IPTV KAUFEN: 15 Tage Rückerstattungsgarantie, 24/7 Support, wöchentliche Wartung und vierteljährliche Film-Updates. Vollständige AGB und Kundenschutz von TOP IPTV KAUFEN.",
  en: "TOP IPTV KAUFEN: 15-day money-back guarantee, 24/7 support, weekly maintenance and quarterly movie updates. Full terms and customer protection of TOP IPTV KAUFEN.",
  nl: "TOP IPTV KAUFEN: 15 dagen geld-terug-garantie, 24/7 ondersteuning, wekelijks onderhoud en driemaandelijkse filmupdates. Volledige voorwaarden en klantbescherming van TOP IPTV KAUFEN.",
};
const TERMS_LABEL: Record<string, string> = { de: "AGB", en: "Terms", nl: "Voorwaarden" };
const TERMS_H1: Record<string, string> = {
  de: "AGB &amp; Kundenschutz",
  en: "Terms &amp; Customer Protection",
  nl: "Voorwaarden &amp; Klantbescherming",
};
const TERMS_CTA: Record<string, string> = {
  de: `<a href="/de">Alle Pakete von ${BRAND} ansehen</a> · <a href="/de/blog">Zum Blog</a>`,
  en: `<a href="/en">View all ${BRAND} plans</a> · <a href="/en/blog">Visit the blog</a>`,
  nl: `<a href="/nl">Bekijk alle ${BRAND} pakketten</a> · <a href="/nl/blog">Naar de blog</a>`,
};

for (const tLang of HOME_LANGS) {
  const prefix = langToPrefix(tLang);
  const tTitle = TERMS_TITLE[tLang] ?? TERMS_TITLE.en;
  const tDesc = TERMS_DESC[tLang] ?? TERMS_DESC.en;
  const tLabel = TERMS_LABEL[tLang] ?? TERMS_LABEL.en;

  const termsHtml = buildPage({
    lang: tLang,
    title: tTitle,
    description: tDesc,
    canonical: `${SITE}${prefix}/agb`,
    ogType: "website",
    hreflang: hreflangSet("/agb"),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: tTitle,
        url: `${SITE}${prefix}/agb`,
        inLanguage: tLang,
        description: tDesc,
        isPartOf: { "@type": "WebSite", name: BRAND, url: SITE },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: BRAND, item: `${SITE}${prefix}` },
          { "@type": "ListItem", position: 2, name: tLabel, item: `${SITE}${prefix}/agb` },
        ],
      },
    ],
    bodyHtml: [
      `<nav><a href="${prefix}">${BRAND}</a> › <a href="${prefix}/agb">${tLabel}</a></nav>`,
      `<h1>${TERMS_H1[tLang] ?? TERMS_H1.en}</h1>`,
      `<p>${esc(tDesc)}</p>`,
      `<p>${TERMS_CTA[tLang] ?? TERMS_CTA.en}</p>`,
    ].join("\n"),
  });
  mkdirSync(resolve(DIST, prefix.slice(1), "agb"), { recursive: true });
  writeFileSync(resolve(DIST, prefix.slice(1), "agb", "index.html"), termsHtml, "utf8");
}

// ---- homepage (per language) -----------------------------------------------
const HOME_TITLE: Record<string, string> = {
  de: "IPTV Deutschland kaufen | Premium IPTV Anbieter",
  en: "IPTV Germany | Buy German IPTV — Premium IPTV Provider",
  nl: "TOP IPTV KAUFEN | Premium IPTV Abonnement & 4K Zenders",
};
const HOME_DESC: Record<string, string> = {
  de: "IPTV Deutschland kaufen bei Ihrem Premium IPTV Anbieter: 69.000+ Live-Sender, 220.000+ Filme & Serien in bis zu 8K. IPTV Abo für Smart TV, Android & Fire TV — ohne Vertrag.",
  en: "IPTV Germany made simple: buy German IPTV from a premium IPTV provider. 69,000+ live channels, 220,000+ movies & series in up to 8K. Works on Smart TV, Android & Fire TV.",
  nl: "TOP IPTV KAUFEN op www.topiptvkaufen.de: premium IPTV-abonnement. 69.000+ live zenders, 220.000+ films & series in tot 8K. IPTV kopen voor Smart TV, Android & Fire TV.",
};
const HOME_BODY: Record<string, string[]> = {
  de: [
    `<h1>IPTV Deutschland kaufen — Premium IPTV Abo bei Ihrem IPTV Anbieter</h1>`,
    `<p>TOP IPTV KAUFEN ist Ihr Premium IPTV Anbieter für Deutschland: Wer IPTV kaufen möchte, bekommt hier über 69.000 Live-Sender und 220.000 Filme und Serien als Video-on-Demand — in bis zu 8K Ultra HD. Ein IPTV Abo ersetzt Kabel plus Netflix, Disney+ und ein Sportpaket, zu einem transparenten Preis und ohne Vertrag. Kompatibel mit Smart TV, Android, Fire TV, MAG-Boxen und weiteren Geräten.</p>`,
    `<h2>Warum IPTV Deutschland bei TOP IPTV KAUFEN kaufen?</h2>`,
    `<ul>`,
    `<li>69.000+ Live-Sender aus Deutschland und ganz Europa, inklusive Bundesliga und UEFA Champions League</li>`,
    `<li>220.000+ Filme und Serien als VOD, wöchentlich aktualisiert</li>`,
    `<li>Bis zu 8K Ultra HD Bildqualität</li>`,
    `<li>15 Tage Rückerstattungsgarantie und 24/7 Support</li>`,
    `<li>Läuft auf Smart TV, Android, Fire TV Stick und weiteren Geräten</li>`,
    `</ul>`,
    `<p>IPTV kaufen und sofort starten — oder zuerst alle Ratgeber im <a href="/de/blog">Blog</a> lesen.</p>`,
  ],
  en: [
    `<h1>IPTV Germany — Buy German IPTV from a Premium IPTV Provider</h1>`,
    `<p>TOP IPTV KAUFEN is a premium IPTV provider for Germany and Europe. Looking for German IPTV? Get over 69,000 live channels and 220,000 movies and series as video-on-demand — in up to 8K Ultra HD. Compatible with Smart TV, Android, Fire TV, MAG boxes and more, with no contract and the best value for premium streaming.</p>`,
    `<h2>Why buy German IPTV from TOP IPTV KAUFEN?</h2>`,
    `<ul>`,
    `<li>69,000+ live channels from Europe and worldwide, including Premier League and UEFA Champions League</li>`,
    `<li>220,000+ movies and series as VOD, updated weekly</li>`,
    `<li>Up to 8K Ultra HD picture quality</li>`,
    `<li>15-day money-back guarantee and 24/7 support</li>`,
    `<li>Works on Smart TV, Android, Fire TV Stick and more</li>`,
    `</ul>`,
    `<p><a href="/en/blog">Browse all guides on the blog</a></p>`,
  ],
  nl: [
    `<h1>TOP IPTV KAUFEN — Premium IPTV Abonnement voor Nederland</h1>`,
    `<p>TOP IPTV KAUFEN is een premium IPTV-abonnement voor Nederland en België met meer dan 69.000 live zenders en 220.000 films en series als video-on-demand — in maximaal 4K en 8K Ultra HD. Eén abonnement vervangt uw kabelpakket plus Netflix, Disney+, Videoland en een sportabonnement, tegen één transparante prijs en zonder contract. Compatibel met Smart TV, Fire TV Stick, Android-box, MAG-box, telefoon en tablet.</p>`,
    `<h2>Wat zit er in uw IPTV abonnement?</h2>`,
    `<p>U krijgt alle Nederlandse zenders (NPO 1/2/3, RTL, SBS6, Net5, Veronica), sport via Ziggo Sport en ESPN met de volledige Eredivisie, Champions League en Formule 1, plus internationale zenders en een diepe VOD-bibliotheek van 220.000+ films en series die wekelijks wordt bijgewerkt. Dankzij de EPG-programmagids en catch-up kijkt u gemiste uitzendingen terug, en met het kinderslot houdt u het veilig voor de kinderen.</p>`,
    `<h2>Waarom kiezen voor TOP IPTV KAUFEN?</h2>`,
    `<ul>`,
    `<li>69.000+ live zenders uit Nederland, België en heel Europa, dagelijks onderhouden</li>`,
    `<li>220.000+ films en series als VOD in tot 4K/8K, wekelijks bijgewerkt</li>`,
    `<li>Buffervrije streams, ook tijdens de avondpiek en topwedstrijden</li>`,
    `<li>Vrije app-keuze: IPTV Smarters Pro, TiviMate en elke Xtream- of M3U-speler</li>`,
    `<li>15 dagen geld-terug-garantie en 24/7 ondersteuning via WhatsApp</li>`,
    `<li>Werkt op Smart TV, Fire TV Stick, Android-box, MAG-box, telefoon en tablet</li>`,
    `</ul>`,
    `<h2>Direct aan de slag</h2>`,
    `<p>Kies een pakket, reken veilig af en ontvang uw login meestal binnen enkele minuten. Voer die in in IPTV Smarters Pro of TiviMate en begin direct met kijken. Voor stabiele 4K adviseren we ongeveer 25 Mbit/s; voor HD volstaat ~16 Mbit/s. Twijfelt u? Test risicoloos dankzij de 15 dagen geld-terug-garantie.</p>`,
    `<p>Populaire keuzes: <a href="/iptv-kopen">IPTV kopen</a>, <a href="/iptv-nederland">IPTV Nederland</a>, <a href="/iptv-abonnement">IPTV abonnement</a>, <a href="/beste-iptv">beste IPTV</a> en <a href="/4k-iptv">4K IPTV</a>. Bekijk ook alle handleidingen op de <a href="/nl/blog">blog</a>.</p>`,
  ],
};
const AREA_SERVED: Record<string, string> = { de: "Germany", en: "Europe", nl: "Netherlands" };

for (const hLang of HOME_LANGS) {
  const prefix = langToPrefix(hLang);
  const hTitle = HOME_TITLE[hLang] ?? HOME_TITLE.en;
  const hDesc = HOME_DESC[hLang] ?? HOME_DESC.en;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    url: SITE,
    logo: `${SITE}/favicon-512.png`,
    areaServed: { "@type": "Country", name: AREA_SERVED[hLang] ?? "Europe" },
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND,
    url: SITE,
    inLanguage: hLang,
    description: hDesc,
  };

  const homeHtml = buildPage({
    lang: hLang,
    title: hTitle,
    description: hDesc,
    // The default-language home duplicates the root "/" page, so point its
    // canonical at "/" to consolidate ranking signals onto one URL.
    canonical: hLang === SITE_LANG ? `${SITE}/` : `${SITE}${prefix}`,
    ogType: "website",
    jsonLd: [orgJsonLd, websiteJsonLd],
    hreflang: hreflangSet(""),
    bodyHtml: [`<nav><a href="${prefix}">${BRAND}</a></nav>`, ...(HOME_BODY[hLang] ?? HOME_BODY.en)].join("\n"),
  });
  mkdirSync(resolve(DIST, prefix.slice(1)), { recursive: true });
  writeFileSync(resolve(DIST, prefix.slice(1), "index.html"), homeHtml, "utf8");
}

// ---- SEO keyword landing pages (/<slug>) -----------------------------------
// Root-level landing pages that reuse the Pricing packages in the SPA. Each page
// declares its own language (German target-keyword pages → "de", English →
// "en", legacy sample pages → "nl"). Emitted as real crawlable HTML with
// WebPage + BreadcrumbList + FAQPage JSON-LD, and added to sitemap-pages.xml.
const KW_ALL_PLANS: Record<string, string> = {
  de: `<a href="/de">Alle ${BRAND} Pakete ansehen</a> · <a href="/de/blog">Zum Blog</a>`,
  en: `<a href="/en">View all ${BRAND} plans</a> · <a href="/en/blog">Visit the blog</a>`,
  nl: `<a href="/nl">Bekijk alle ${BRAND} pakketten</a> · <a href="/nl/blog">Naar de blog</a>`,
};
const keywordPageLocs: string[] = [];
for (const kp of KEYWORD_PAGES) {
  const kpLang = kp.lang ?? "nl";
  const kpPrefix = langToPrefix(kpLang);
  const canonical = `${SITE}/${kp.slug}`;
  const leadHtml = kp.lead
    .map((p) => (p.startsWith("## ") ? `<h2>${paragraphToHtml(p.slice(3))}</h2>` : `<p>${paragraphToHtml(p)}</p>`))
    .join("\n");
  const faqHtml = [
    `<section><h2>FAQ</h2>`,
    ...kp.faq.map((f) => `<h3>${esc(f.q)}</h3>\n<p>${esc(f.a)}</p>`),
    `</section>`,
  ].join("\n");
  const keywordHtml = buildPage({
    lang: kpLang,
    title: kp.title,
    description: kp.description,
    canonical,
    ogType: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: kp.title,
        url: canonical,
        inLanguage: kpLang,
        description: kp.description,
        isPartOf: { "@type": "WebSite", name: BRAND, url: SITE },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: BRAND, item: SITE },
          { "@type": "ListItem", position: 2, name: kp.keyword, item: canonical },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: kp.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
    bodyHtml: [
      `<nav><a href="${kpPrefix}">${BRAND}</a> › ${esc(kp.keyword)}</nav>`,
      `<h1>${esc(kp.h1)}</h1>`,
      leadHtml,
      faqHtml,
      `<p>${KW_ALL_PLANS[kpLang] ?? KW_ALL_PLANS.nl}</p>`,
    ].join("\n"),
  });
  mkdirSync(resolve(DIST, kp.slug), { recursive: true });
  writeFileSync(resolve(DIST, kp.slug, "index.html"), keywordHtml, "utf8");
  keywordPageLocs.push(canonical);
}

// Root index.html — the SPA shell served at "/". Dutch is the default site
// language (SITE_LANG), so the root is rendered in Dutch: a visitor landing on
// "/" sees the Dutch homepage, and the SPA boots in Dutch to match.
const rootOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND,
  url: SITE,
  logo: `${SITE}/favicon-512.png`,
};
const rootWebsiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND,
  url: SITE,
  inLanguage: SITE_LANG,
  description: HOME_DESC[SITE_LANG] ?? HOME_DESC.nl,
};
const rootHtml = buildPage({
  lang: SITE_LANG,
  title: HOME_TITLE[SITE_LANG] ?? HOME_TITLE.nl,
  description: HOME_DESC[SITE_LANG] ?? HOME_DESC.nl,
  canonical: `${SITE}/`,
  ogType: "website",
  jsonLd: [rootOrgJsonLd, rootWebsiteJsonLd],
  hreflang: hreflangSet(""),
  bodyHtml: [`<nav><a href="/">${BRAND}</a></nav>`, ...(HOME_BODY[SITE_LANG] ?? HOME_BODY.nl)].join("\n"),
});
writeFileSync(resolve(DIST, "index.html"), rootHtml, "utf8");

// ---- sitemap.xml ----------------------------------------------------------
// Generated from the real post list so it can never drift out of sync with the
// pages that were actually emitted above.
//
// Deliberately only <loc> + <lastmod>:
//   * Google ignores <changefreq> and <priority> outright, so they were pure
//     payload — ~2 extra lines on every one of ~950 URLs.
//   * <lastmod> is derived from real post dates instead of `new Date()`. A
//     lastmod that jumps to "today" on every deploy, for every URL, is exactly
//     the pattern Google treats as unreliable and then stops trusting — which
//     costs recrawl priority on the posts that genuinely did change.
const today = new Date().toISOString().slice(0, 10);
const newestPostDate = sorted[0]?.dateISO ?? today;

// Static pages (home, blog index, AGB and the keyword landing pages) have no
// per-item date. Give them ONE stable lastmod — bump it by hand when you
// materially change those pages' copy. Deliberately not `today` (that would
// mark every page "updated" on each deploy, which Google learns to distrust)
// and deliberately not the newest post date (adding a blog post must not
// falsely flag every landing page as changed).
const PAGES_LASTMOD = "2026-10-29";

// A <url> entry. `alternates` emits <xhtml:link rel="alternate" hreflang=…>
// pairs — the in-sitemap hreflang signal Google recommends for multilingual
// pages. Only the core pages (home/blog/agb) are true 1:1 translations, so
// only they carry alternates; each blog post exists in a single language.
// `imageLoc` emits a Google <image:image> entry so the post's hero image is
// eligible for Google Images.
type Alt = { hreflang: string; href: string };
const urlEntry = (loc: string, lastmod: string, alternates: Alt[] = [], imageLoc?: string) =>
  [
    "  <url>",
    `    <loc>${esc(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    ...alternates.map(
      (a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`
    ),
    ...(imageLoc ? [`    <image:image><image:loc>${esc(imageLoc)}</image:loc></image:image>`] : []),
    "  </url>",
  ].join("\n");

// Cosmetic: browsers render a bare sitemap with "This XML file does not appear
// to have any style information associated with it", which looks like an error.
// Crawlers ignore the stylesheet.
const XSL = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';

// `withXhtml` adds the xhtml namespace (core-pages sitemap, for hreflang
// alternates); `withImage` adds the Google image namespace (blog sitemaps, for
// <image:image> entries). Each sitemap declares only the namespaces it uses.
const urlset = (entries: string[], withXhtml = false, withImage = false): string => {
  const ns = ['xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'];
  if (withXhtml) ns.push('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
  if (withImage) ns.push('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
  return (
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      XSL,
      `<urlset ${ns.join(" ")}>`,
      ...entries,
      "</urlset>",
    ].join("\n") + "\n"
  );
};

// One sitemap per language plus one for the static pages. Search Console
// reports coverage per sitemap, so a split makes it visible which group Google
// actually indexes — and the German pages, the ones this domain is about, lead.
const sitemapFiles: string[] = [];

// Each core page (home, blog, agb) exists in all three languages. Emit one
// <url> per language, every one carrying the full hreflang alternate set plus
// x-default → the site default (German). This is the strongest multilingual
// signal a sitemap can give and keeps the three versions from competing.
const pageGroup = (suffix: string, lastmod: string): string[] => {
  const alternates: Alt[] = [
    ...HOME_LANGS.map((l) => ({ hreflang: l, href: `${SITE}${langToPrefix(l)}${suffix}` })),
    { hreflang: "x-default", href: `${SITE}${langToPrefix(SITE_LANG)}${suffix}` },
  ];
  return HOME_LANGS.map((l) =>
    urlEntry(`${SITE}${langToPrefix(l)}${suffix}`, lastmod, alternates)
  );
};

const corePageEntries: string[] = [
  // Bare root is the x-default language redirector, not an hreflang cluster member.
  urlEntry(`${SITE}/`, PAGES_LASTMOD),
  ...pageGroup("", PAGES_LASTMOD),
  // The blog index lists the posts, so its freshness tracks the newest post.
  ...pageGroup("/blog", newestPostDate),
  ...pageGroup("/agb", PAGES_LASTMOD),
  // Root-level keyword landing pages (German, plus two English): single-language,
  // so plain loc+lastmod entries with no hreflang cluster.
  ...keywordPageLocs.map((loc) => urlEntry(loc, PAGES_LASTMOD)),
];
const corePages = urlset(corePageEntries, true);
writeFileSync(resolve(DIST, "sitemap-pages.xml"), corePages, "utf8");
sitemapFiles.push("sitemap-pages.xml");

// German first: it is the language of the domain and should be crawled first.
const langOrder = [
  SITE_LANG,
  ...[...byLang.keys()].filter((l) => l !== SITE_LANG).sort(),
];
for (const lang of langOrder) {
  const posts = byLang.get(lang);
  if (!posts?.length) continue;
  const file = `sitemap-blog-${lang}.xml`;
  writeFileSync(
    resolve(DIST, file),
    urlset(
      posts.map((p) => urlEntry(postUrl(p.slug, lang), p.dateISO, [], p.image)),
      false,
      true
    ),
    "utf8"
  );
  sitemapFiles.push(file);
}

const sitemapIndex = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  XSL,
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapFiles.map(
    (f) => `  <sitemap>\n    <loc>${SITE}/${f}</loc>\n    <lastmod>${newestPostDate}</lastmod>\n  </sitemap>`
  ),
  "</sitemapindex>",
].join("\n");
writeFileSync(resolve(DIST, "sitemap.xml"), sitemapIndex + "\n", "utf8");

// ---- robots.txt -----------------------------------------------------------
// The crawl rules ship in public/robots.txt; the Sitemap: lines are written
// here so they can never disagree with what was actually emitted. The index is
// listed first, then every child — a crawler that does not expand a sitemap
// index still reaches each language group directly.
const robotsPath = resolve(DIST, "robots.txt");
const robotsRules = readFileSync(robotsPath, "utf8").trimEnd();
writeFileSync(
  robotsPath,
  [
    robotsRules,
    "",
    `Sitemap: ${SITE}/sitemap.xml`,
    ...sitemapFiles.map((f) => `Sitemap: ${SITE}/${f}`),
    "",
  ].join("\n"),
  "utf8"
);

const langPageCount = HOME_LANGS.length * 3; // 3 pages (home, blog, agb) × 3 langs
console.log(
  `Prerendered ${count} post pages + ${langPageCount} lang pages (home/blog/agb × ${HOME_LANGS.length} langs) + root index, ` +
    `wrote a sitemap index over ${sitemapFiles.length} sitemaps (${sorted.length + 1 + langPageCount} URLs), ` +
    `and declared all ${sitemapFiles.length + 1} of them in robots.txt.`
);
