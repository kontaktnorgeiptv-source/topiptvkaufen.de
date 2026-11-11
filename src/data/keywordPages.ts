import { KW_PILLARS } from "./kwPillars";
import { KW_2027_PAGES } from "./kw2027Pages";
import { SITE_URL as SITE, BRAND_NAME, WA_NUMBER } from "../siteConfig";
import type { LangCode } from "../i18n";
// SEO keyword landing pages. Single source of truth shared by the SPA router
// (src/App.tsx) and the post-build prerenderer (scripts/prerender.ts) so the
// client-rendered page and the crawlable static HTML can never drift apart.
//
// Each page is a home-style landing (it reuses the Pricing packages) optimized
// for one principal GERMAN keyword, served at the root path `/<slug>` to match
// the domain.com/KEYWORD pattern. A small set of English pages targets the
// "IPTV Germany" / "German IPTV" queries. The target keyword set for this site
// is: IPTV kaufen, IPTV Deutschland, IPTV Anbieter, IPTV Germany, German IPTV.
//
// PORTING: change the constants below (SITE, BRAND via siteConfig, WA) and the
// slugs/keywords/copy. Pages default to German (`lang: "de"`); set `lang: "en"`
// on an English page.

const BRAND = BRAND_NAME;
const WA = `https://wa.me/${WA_NUMBER}`;

export interface KeywordFaq {
  q: string;
  a: string;
}

export interface KeywordPage {
  /** Root-level path segment, e.g. "iptv-kaufen" → https://www.topiptvkaufen.de/iptv-kaufen */
  slug: string;
  /** Principal keyword this page targets. */
  keyword: string;
  /** <title> (kept ≤ ~60 chars where possible). */
  title: string;
  /** Meta description (≤ 160 chars). */
  description: string;
  /** On-page H1. */
  h1: string;
  /** Intro paragraphs rendered above the packages. [label](url) markdown links allowed. */
  lead: string[];
  /** FAQ block (rendered on-page and emitted as FAQPage JSON-LD). */
  faq: KeywordFaq[];
  /** Page language. Defaults to German; English pages set this to "en" so the
   *  prerenderer emits the right <html lang>, breadcrumb, CTA and canonical. */
  lang?: LangCode;
}

// Shared closing CTA paragraph, woven with internal links to the core money
// pages so every landing page passes link equity to IPTV kaufen / Deutschland /
// Anbieter.
const CORE_LINKS_DE =
  `Mehr dazu: [IPTV kaufen](${SITE}/iptv-kaufen), [IPTV Deutschland](${SITE}/iptv-deutschland) und [IPTV Anbieter](${SITE}/iptv-anbieter).`;
const GUARANTEE_DE =
  `Jedes ${BRAND} Abo enthält den vollen Sender- und VOD-Katalog, 15 Tage Geld-zurück-Garantie und 24/7 Support per [WhatsApp](${WA}).`;

const RAW_KEYWORD_PAGES: KeywordPage[] = [...KW_PILLARS, ...KW_2027_PAGES, 
  // ── Core intent ───────────────────────────────────────────────────────────
  {
    slug: "iptv-kaufen",
    keyword: "IPTV kaufen",
    title: `IPTV kaufen — Premium IPTV Abo | ${BRAND}`,
    description: `IPTV kaufen bei ${BRAND}: Premium IPTV Abo mit 69.000+ Live-Sendern & 220.000+ Filmen in bis zu 8K. Sofort aktiv, ohne Vertrag, 15 Tage Geld-zurück.`,
    h1: "IPTV kaufen — sofort starten mit einem Premium IPTV Abo",
    lead: [
      `Sie möchten [IPTV kaufen](${SITE}/iptv-kaufen)? Bei [${BRAND}](${SITE}) bekommen Sie ein Premium-IPTV-Abo mit über 69.000 Live-Sendern und 220.000+ Filmen und Serien in bis zu 8K Ultra HD — sofort nach dem Kauf aktiv, ganz ohne Vertrag.`,
      `## Warum IPTV bei ${BRAND} kaufen?`,
      `Ein guter [IPTV Anbieter](${SITE}/iptv-anbieter) zeigt seine Pakete und Preise offen und hält die Sender zuverlässig online. ${BRAND} liefert Bundesliga, UEFA Champions League, Formel 1 und internationalen Sport, eine wöchentlich aktualisierte VOD-Bibliothek und Zugangsdaten, die in IPTV Smarters Pro, TiviMate und jedem Xtream-Player funktionieren — Sie sind nie an eine App gebunden.`,
      `## IPTV Abo wählen und aktivieren`,
      `Wählen Sie unten ein Paket, zahlen Sie sicher und erhalten Sie Ihre Zugangsdaten meist innerhalb weniger Minuten. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Wie kann ich IPTV kaufen?", a: `Wählen Sie bei ${BRAND} ein Paket, zahlen Sie sicher und erhalten Sie Ihre Zugangsdaten meist innerhalb weniger Minuten per E-Mail.` },
      { q: "Brauche ich einen Vertrag?", a: `Nein. Jedes ${BRAND} Abo läuft ohne Vertrag und ohne automatische Verlängerung, mit Laufzeiten von einem Monat bis zu einem Jahr.` },
      { q: "Auf welchen Geräten läuft es?", a: "Smart TV, Android, Fire TV Stick, MAG-Box, Smartphone und Tablet — über IPTV Smarters Pro, TiviMate oder jeden Xtream-kompatiblen Player." },
      { q: "Gibt es eine Garantie?", a: `Ja. Jedes ${BRAND} Abo kommt mit 15 Tagen Geld-zurück-Garantie und 24/7 Support per WhatsApp.` },
    ],
  },
  {
    slug: "iptv-deutschland",
    keyword: "IPTV Deutschland",
    title: `IPTV Deutschland — Premium IPTV | ${BRAND}`,
    description: `IPTV Deutschland von ${BRAND}: 69.000+ Live-Sender inkl. Bundesliga & Champions League, 220.000+ Filme in bis zu 8K. IPTV kaufen für Smart TV & Fire TV.`,
    h1: "IPTV Deutschland — Premium IPTV für Smart TV, Android & Fire TV",
    lead: [
      `[IPTV Deutschland](${SITE}/iptv-deutschland) von [${BRAND}](${SITE}) ist ein Premium-IPTV-Abo für den deutschsprachigen Raum: über 69.000 Live-Sender aus Deutschland, Österreich, der Schweiz und ganz Europa, plus 220.000+ Filme und Serien on demand in bis zu 8K Ultra HD.`,
      `## Alle deutschen Sender und mehr`,
      `Sie bekommen die großen deutschen Sender, Bundesliga und UEFA Champions League, internationale Sender und eine tiefe VOD-Bibliothek, die wöchentlich wächst. Dank EPG-Programmführer und Catch-up sehen Sie Verpasstes nach, und die Kindersicherung hält alles familienfreundlich.`,
      `## IPTV in Deutschland kaufen`,
      `Wählen Sie ein Paket, zahlen Sie sicher und starten Sie meist innerhalb weniger Minuten. Für stabiles 4K empfehlen wir rund 25 Mbit/s, für HD genügen ~16 Mbit/s. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Was ist IPTV Deutschland?", a: `${BRAND} ist ein Premium-IPTV-Abo für Deutschland mit 69.000+ Live-Sendern und 220.000+ Filmen und Serien in bis zu 8K, auf Smart TV, Android, Fire TV, MAG und mehr.` },
      { q: "Funktioniert es in ganz DACH?", a: `Ja. ${BRAND} funktioniert in Deutschland, Österreich und der Schweiz auf jeder Internetverbindung — auf Deutsch, Englisch und Niederländisch.` },
      { q: "Sind deutsche Sender enthalten?", a: "Ja, die großen deutschen Free-TV- und Pay-TV-Sender sind enthalten, dazu Bundesliga, Champions League und internationale Sender." },
      { q: "Gibt es eine Garantie?", a: `Jedes ${BRAND} Abo kommt mit 15 Tagen Geld-zurück-Garantie und 24/7 Support per WhatsApp.` },
    ],
  },
  {
    slug: "iptv-anbieter",
    keyword: "IPTV Anbieter",
    title: `IPTV Anbieter — bester Premium IPTV | ${BRAND}`,
    description: `${BRAND} ist Ihr zuverlässiger IPTV Anbieter: 69.000+ Live-Sender, 220.000+ Filme in bis zu 8K, offene Preise, 24/7 Support und 15 Tage Geld-zurück.`,
    h1: "IPTV Anbieter — zuverlässig, transparent, mit echtem Support",
    lead: [
      `Auf der Suche nach einem seriösen [IPTV Anbieter](${SITE}/iptv-anbieter)? [${BRAND}](${SITE}) zeigt Pakete und Preise offen, pflegt den Katalog täglich und hält die Sender zuverlässig online — anders als die anonymen Wiederverkäufer hinter vielen Suchergebnissen.`,
      `## Woran Sie einen guten IPTV Anbieter erkennen`,
      `Ein guter Anbieter beweist Qualität, statt sie nur zu versprechen: stabile Streams auch zur Abendspitze, eine wöchentlich aktualisierte VOD-Bibliothek, freie App-Wahl (IPTV Smarters Pro, TiviMate, jeder Xtream-Player) und ein Support, der wirklich antwortet.`,
      `## Jetzt beim besten IPTV Anbieter kaufen`,
      `Wählen Sie unten ein Paket und aktivieren Sie in wenigen Minuten. ${GUARANTEE_DE} ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Warum ein Premium IPTV Anbieter?", a: `Ein Premium-Anbieter wie ${BRAND} hält die Sender stabil online, aktualisiert VOD wöchentlich und bietet echten 24/7 Support — statt billiger, instabiler Wiederverkäufer-Streams.` },
      { q: "Ist der Anbieter zuverlässig?", a: `${BRAND} zeigt Preise offen, pflegt den Katalog täglich und bietet 15 Tage Geld-zurück-Garantie, damit Sie risikofrei testen können.` },
      { q: "Bietet der Anbieter Support?", a: "Ja, 24/7 Support per WhatsApp — meist mit Antwort innerhalb weniger Minuten." },
      { q: "An welche App bin ich gebunden?", a: "An keine. Ihre Zugangsdaten funktionieren in IPTV Smarters Pro, TiviMate und jedem Xtream-kompatiblen Player." },
    ],
  },
  {
    slug: "iptv-abo",
    keyword: "IPTV Abo",
    title: `IPTV Abo — Premium ohne Vertrag | ${BRAND}`,
    description: `IPTV Abo bei ${BRAND}: 69.000+ Sender & 220.000+ Filme in bis zu 8K, ohne Vertrag. Laufzeiten von 1 Monat bis 1 Jahr, 15 Tage Geld-zurück.`,
    h1: "IPTV Abo — flexibel, ohne Vertrag, in bis zu 8K",
    lead: [
      `Ein [IPTV Abo](${SITE}/iptv-abo) von [${BRAND}](${SITE}) ersetzt Kabel plus Netflix, Disney+ und ein Sportpaket — zu einem transparenten Preis und ohne Vertrag. 69.000+ Live-Sender und 220.000+ Filme und Serien in bis zu 8K Ultra HD.`,
      `## Welche Laufzeit passt zu Ihnen?`,
      `Vom [Monatsabo](${SITE}/iptv-monatsabo) zum Ausprobieren bis zum [Jahresabo](${SITE}/iptv-jahresabo) mit dem besten Preis pro Monat — Sie wählen frei und verlängern nie automatisch. Jedes Abo enthält den vollen Sender- und VOD-Katalog.`,
      `## IPTV Abo kaufen und sofort starten`,
      `Paket wählen, sicher zahlen, Zugangsdaten meist in Minuten erhalten. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Hat das IPTV Abo einen Vertrag?", a: "Nein, es gibt keinen Vertrag und keine automatische Verlängerung. Sie wählen eine Laufzeit und entscheiden selbst, ob Sie erneuern." },
      { q: "Welche Laufzeiten gibt es?", a: "Von einem Monat bis zu zwölf Monaten — das Jahres-Abo ist pro Monat am günstigsten." },
      { q: "Was ist im Abo enthalten?", a: `Jedes ${BRAND} Abo enthält alle 69.000+ Sender, die 220.000+ VOD-Titel, 15 Tage Geld-zurück und 24/7 Support.` },
    ],
  },
  {
    slug: "bestes-iptv",
    keyword: "bestes IPTV",
    title: `Bestes IPTV 2026 — Premium Anbieter | ${BRAND}`,
    description: `Bestes IPTV 2026? ${BRAND}: 69.000+ Sender, 220.000+ Filme in bis zu 8K, stabil zur Abendspitze, 24/7 Support und 15 Tage Geld-zurück.`,
    h1: "Bestes IPTV 2026 — worauf es wirklich ankommt",
    lead: [
      `Das [beste IPTV](${SITE}/bestes-iptv) erkennen Sie nicht an Werbung, sondern an Stabilität, Katalogtiefe und Support. [${BRAND}](${SITE}) liefert alle drei — auch zur Abendspitze und bei Topspielen.`,
      `## Die Kriterien für das beste IPTV`,
      `Buffervrije Streams, 69.000+ Sender, 220.000+ VOD-Titel in bis zu 8K, freie App-Wahl und ein Support, der in Minuten antwortet. Dazu offene Preise und eine echte Geld-zurück-Garantie.`,
      `## Selbst testen statt glauben`,
      `Wählen Sie ein Paket und überzeugen Sie sich risikofrei. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Was ist das beste IPTV?", a: `Das beste IPTV ist stabil, hat einen tiefen Katalog und echten Support. ${BRAND} bietet 69.000+ Sender, 220.000+ VOD-Titel und 24/7 WhatsApp-Support.` },
      { q: "Wie teste ich das beste IPTV risikofrei?", a: "Dank 15 Tage Geld-zurück-Garantie können Sie das Abo in Ruhe prüfen und bei Nichtgefallen den vollen Betrag zurückfordern." },
      { q: "Läuft es auch zur Abendspitze stabil?", a: "Ja, dank Premium-Servern und hoher Bitrate bleiben die Streams auch bei großen Spielen stabil." },
    ],
  },
  {
    slug: "iptv-test",
    keyword: "IPTV Test",
    title: `IPTV Test — risikofrei prüfen | ${BRAND}`,
    description: `IPTV Test bei ${BRAND}: 15 Tage Geld-zurück-Garantie statt Wegwerf-Testlink. 69.000+ Sender & 220.000+ Filme in bis zu 8K risikofrei prüfen.`,
    h1: "IPTV Test — risikofrei mit 15 Tagen Geld-zurück",
    lead: [
      `Einen echten [IPTV Test](${SITE}/iptv-test) machen Sie am besten mit einer Geld-zurück-Garantie statt mit einem anonymen Wegwerf-Testlink. Bei [${BRAND}](${SITE}) prüfen Sie den vollen Dienst 15 Tage lang risikofrei.`,
      `## Warum kein kostenloser Testlink?`,
      `Kostenlose Testlinks laufen oft über instabile Server und sagen nichts über die echte Qualität. Mit der Geld-zurück-Garantie testen Sie den vollständigen Katalog in echter Qualität — und bekommen bei Nichtgefallen Ihr Geld zurück.`,
      `## So läuft Ihr Test ab`,
      `Paket wählen, Zugangsdaten in Minuten erhalten, in IPTV Smarters Pro oder TiviMate eintragen und losschauen. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Gibt es einen IPTV Test?", a: `Ja. Statt eines Wegwerf-Testlinks bietet ${BRAND} 15 Tage Geld-zurück-Garantie, sodass Sie den vollen Dienst risikofrei testen können.` },
      { q: "Was kostet der Test?", a: "Sie wählen ein reguläres Paket und bekommen bei Nichtgefallen innerhalb von 15 Tagen den vollen Betrag zurück." },
      { q: "Wie schnell kann ich testen?", a: "Die Zugangsdaten kommen meist innerhalb weniger Minuten nach der Zahlung." },
    ],
  },
  {
    slug: "iptv-kostenlos-testen",
    keyword: "IPTV kostenlos testen",
    title: `IPTV kostenlos testen? Besser: 15 Tage | ${BRAND}`,
    description: `IPTV kostenlos testen klingt gut, ist aber meist instabil. Bei ${BRAND} testen Sie den vollen Dienst mit 15 Tage Geld-zurück-Garantie risikofrei.`,
    h1: "IPTV kostenlos testen — die risikofreie Alternative",
    lead: [
      `Wer [IPTV kostenlos testen](${SITE}/iptv-kostenlos-testen) möchte, landet oft bei instabilen Gratis-Streams. Die sichere Alternative: bei [${BRAND}](${SITE}) den vollen Dienst mit 15 Tage Geld-zurück prüfen.`,
      `## Gratis vs. risikofrei`,
      `Ein Gratis-Test zeigt selten die echte Leistung. Mit der Geld-zurück-Garantie bekommen Sie vollen Zugriff auf 69.000+ Sender und 220.000+ VOD-Titel in echter Qualität — und zahlen effektiv nur, wenn es Ihnen gefällt.`,
      `## Jetzt risikofrei starten`,
      `Paket wählen, in Minuten aktiv, 15 Tage prüfen. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Kann ich IPTV wirklich kostenlos testen?", a: `Gratis-Testlinks sind meist instabil. ${BRAND} bietet stattdessen 15 Tage Geld-zurück-Garantie — der sichere Weg, risikofrei zu testen.` },
      { q: "Bekomme ich mein Geld zurück?", a: "Ja, bei Nichtgefallen innerhalb von 15 Tagen erhalten Sie den vollen Betrag zurück." },
      { q: "Wie schnell geht es los?", a: "Zugangsdaten kommen meist innerhalb weniger Minuten." },
    ],
  },
  {
    slug: "iptv-guenstig",
    keyword: "IPTV günstig",
    title: `IPTV günstig kaufen — Premium Preis | ${BRAND}`,
    description: `IPTV günstig bei ${BRAND}: 69.000+ Sender & 220.000+ Filme in bis zu 8K zum fairen Preis. Jahresabo am günstigsten pro Monat, 15 Tage Geld-zurück.`,
    h1: "IPTV günstig kaufen — fairer Preis, Premium-Qualität",
    lead: [
      `[IPTV günstig](${SITE}/iptv-guenstig) muss nicht unzuverlässig heißen. [${BRAND}](${SITE}) kombiniert einen scharfen Preis mit stabilen Premium-Servern und einem tiefen Katalog.`,
      `## Günstig und trotzdem Premium`,
      `Ein IPTV Abo ersetzt Kabel plus mehrere Streamingdienste zu einem Bruchteil des Preises. Am günstigsten pro Monat ist das [Jahresabo](${SITE}/iptv-jahresabo).`,
      `## Bestes Preis-Leistungs-Verhältnis`,
      `Wählen Sie unten eine Laufzeit. ${GUARANTEE_DE} ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Wie günstig ist IPTV?", a: `Ein ${BRAND} Abo kostet pro Monat deutlich weniger als Kabel plus einzelne Streamingdienste — am günstigsten im Jahrespaket.` },
      { q: "Ist günstig gleich schlecht?", a: "Nein. Trotz des fairen Preises laufen die Streams über Premium-Server und bleiben auch zur Abendspitze stabil." },
      { q: "Gibt es versteckte Kosten?", a: "Nein. Der Preis ist transparent, ohne Vertrag und ohne automatische Verlängerung." },
    ],
  },
  {
    slug: "iptv-ohne-vertrag",
    keyword: "IPTV ohne Vertrag",
    title: `IPTV ohne Vertrag — flexibel | ${BRAND}`,
    description: `IPTV ohne Vertrag bei ${BRAND}: keine Mindestlaufzeit, keine automatische Verlängerung. 69.000+ Sender & 220.000+ Filme in bis zu 8K, 15 Tage Geld-zurück.`,
    h1: "IPTV ohne Vertrag — keine Bindung, keine Überraschung",
    lead: [
      `[IPTV ohne Vertrag](${SITE}/iptv-ohne-vertrag) bedeutet volle Kontrolle: Bei [${BRAND}](${SITE}) wählen Sie eine Laufzeit, die nie automatisch verlängert wird.`,
      `## Keine Bindung, keine Abofalle`,
      `Sie entscheiden selbst, ob Sie nach einem Monat, drei Monaten oder einem Jahr erneuern. Kein Kleingedrucktes, keine Kündigungsfristen.`,
      `## Jetzt flexibel starten`,
      `Paket wählen und in Minuten loslegen. ${GUARANTEE_DE} ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Verlängert sich das Abo automatisch?", a: "Nein. Jedes Abo endet nach der gewählten Laufzeit automatisch, ohne dass Sie kündigen müssen." },
      { q: "Gibt es eine Mindestlaufzeit?", a: "Die kürzeste Laufzeit ist ein Monat. Danach entscheiden Sie frei, ob Sie erneuern." },
      { q: "Kann ich jederzeit wechseln?", a: "Ja, Sie können beim nächsten Kauf jederzeit eine andere Laufzeit oder Geräteanzahl wählen." },
    ],
  },
  {
    slug: "iptv-premium",
    keyword: "Premium IPTV",
    title: `Premium IPTV — 8K Sender & VOD | ${BRAND}`,
    description: `Premium IPTV von ${BRAND}: 69.000+ Live-Sender, 220.000+ Filme & Serien in bis zu 8K, stabile Server, 24/7 Support und 15 Tage Geld-zurück.`,
    h1: "Premium IPTV — Spitzenqualität auf jedem Gerät",
    lead: [
      `[Premium IPTV](${SITE}/iptv-premium) von [${BRAND}](${SITE}) heißt Spitzenbildqualität bis 8K, stabile Premium-Server und ein Katalog, der keine Wünsche offenlässt.`,
      `## Was Premium IPTV ausmacht`,
      `Hohe Bitrate, geringe Latenz, wöchentlich aktualisiertes VOD, EPG und Catch-up sowie freie App-Wahl. Premium zeigt sich genau dann, wenn es darauf ankommt — beim Topspiel am Samstagabend.`,
      `## Premium IPTV kaufen`,
      `Wählen Sie ein Paket und starten Sie in Minuten. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Was ist Premium IPTV?", a: `Premium IPTV steht für stabile Server, hohe Bildqualität bis 8K und echten Support. ${BRAND} liefert all das in einem Abo.` },
      { q: "Brauche ich schnelles Internet?", a: "Für 4K empfehlen wir rund 25 Mbit/s, für HD genügen ~16 Mbit/s." },
      { q: "Auf wie vielen Geräten?", a: "Je nach Paket auf einem oder zwei Geräten gleichzeitig." },
    ],
  },
  {
    slug: "iptv-vergleich",
    keyword: "IPTV Vergleich",
    title: `IPTV Vergleich — Anbieter prüfen | ${BRAND}`,
    description: `IPTV Vergleich: Worauf achten? ${BRAND} bietet 69.000+ Sender, 220.000+ Filme in bis zu 8K, offene Preise und 15 Tage Geld-zurück. Jetzt vergleichen.`,
    h1: "IPTV Vergleich — so finden Sie den richtigen Anbieter",
    lead: [
      `Beim [IPTV Vergleich](${SITE}/iptv-vergleich) zählen Stabilität, Katalogtiefe, Preis und Support. [${BRAND}](${SITE}) legt alle vier offen auf den Tisch.`,
      `## Vergleichskriterien, die wirklich zählen`,
      `Senderanzahl und VOD-Tiefe, Bildqualität, Stabilität zur Abendspitze, App-Freiheit, transparente Preise und echter Support. Günstige Wiederverkäufer scheitern meist an Stabilität und Support.`,
      `## Selbst vergleichen, risikofrei`,
      `Dank 15 Tage Geld-zurück können Sie ${BRAND} in Ruhe gegen andere Anbieter prüfen. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Worauf beim IPTV Vergleich achten?", a: "Auf Stabilität zur Abendspitze, Katalogtiefe, Bildqualität, App-Freiheit, transparente Preise und echten Support." },
      { q: "Wie vergleiche ich risikofrei?", a: `Mit der 15-Tage-Geld-zurück-Garantie von ${BRAND} testen Sie den vollen Dienst und entscheiden in Ruhe.` },
      { q: "Sind billige Anbieter schlechter?", a: "Oft ja — sie sparen an Serverkapazität und Support, was sich zur Abendspitze rächt." },
    ],
  },
  {
    slug: "iptv-jahresabo",
    keyword: "IPTV Jahresabo",
    title: `IPTV Jahresabo — bester Monatspreis | ${BRAND}`,
    description: `IPTV Jahresabo bei ${BRAND}: 12 Monate zum günstigsten Preis pro Monat. 69.000+ Sender & 220.000+ Filme in bis zu 8K, 15 Tage Geld-zurück.`,
    h1: "IPTV Jahresabo — ein Jahr sorglos schauen",
    lead: [
      `Das [IPTV Jahresabo](${SITE}/iptv-jahresabo) von [${BRAND}](${SITE}) ist pro Monat die günstigste Variante — ein volles Jahr Zugriff auf 69.000+ Sender und 220.000+ VOD-Titel.`,
      `## Warum ein Jahresabo?`,
      `Einmal einrichten, ein Jahr lang schauen, bester Monatspreis. Ideal, wenn Sie Ihren Anbieter bereits kennen oder sofort langfristig umsteigen möchten.`,
      `## Jahresabo kaufen`,
      `Wählen Sie die 12-Monats-Laufzeit. ${GUARANTEE_DE} Alternativ gibt es das [Monatsabo](${SITE}/iptv-monatsabo).`,
    ],
    faq: [
      { q: "Ist das Jahresabo am günstigsten?", a: "Ja, pro Monat gerechnet ist das 12-Monats-Abo die günstigste Option." },
      { q: "Verlängert es sich automatisch?", a: "Nein, es endet nach zwölf Monaten automatisch, ohne Kündigung." },
      { q: "Gibt es eine Garantie?", a: "Ja, auch das Jahresabo kommt mit 15 Tagen Geld-zurück-Garantie." },
    ],
  },
  {
    slug: "iptv-monatsabo",
    keyword: "IPTV Monatsabo",
    title: `IPTV Monatsabo — flexibel testen | ${BRAND}`,
    description: `IPTV Monatsabo bei ${BRAND}: 1 Monat ohne Bindung, 69.000+ Sender & 220.000+ Filme in bis zu 8K. Ideal zum Einstieg, 15 Tage Geld-zurück.`,
    h1: "IPTV Monatsabo — maximale Flexibilität",
    lead: [
      `Das [IPTV Monatsabo](${SITE}/iptv-monatsabo) von [${BRAND}](${SITE}) ist perfekt zum Einstieg: ein Monat voller Zugriff, ohne Bindung, ohne automatische Verlängerung.`,
      `## Für wen lohnt sich das Monatsabo?`,
      `Ideal, wenn Sie flexibel bleiben oder ${BRAND} erst kennenlernen möchten, bevor Sie auf das günstigere [Jahresabo](${SITE}/iptv-jahresabo) wechseln.`,
      `## Monatsabo kaufen`,
      `Wählen Sie die 1-Monats-Laufzeit und starten Sie in Minuten. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Was kostet das Monatsabo?", a: `Das Monatsabo ist die flexibelste Option; den genauen Preis sehen Sie bei den Paketen. Längere Laufzeiten sind pro Monat günstiger.` },
      { q: "Kann ich danach upgraden?", a: "Ja, Sie können jederzeit auf ein 3-, 6- oder 12-Monats-Abo wechseln." },
      { q: "Verlängert es sich automatisch?", a: "Nein, es endet nach einem Monat automatisch." },
    ],
  },
  // ── Zahlung & Sicherheit ────────────────────────────────────────────────
  {
    slug: "iptv-mit-paypal",
    keyword: "IPTV mit PayPal",
    title: `IPTV mit PayPal bezahlen | ${BRAND}`,
    description: `IPTV mit PayPal & weiteren sicheren Methoden bei ${BRAND}. Käuferschutz, sofortige Aktivierung, 69.000+ Sender in bis zu 8K, 15 Tage Geld-zurück.`,
    h1: "IPTV mit PayPal bezahlen — sicher und sofort",
    lead: [
      `Sie möchten [IPTV mit PayPal](${SITE}/iptv-mit-paypal) bezahlen? Bei [${BRAND}](${SITE}) zahlen Sie sicher und erhalten Ihre Zugangsdaten meist innerhalb weniger Minuten.`,
      `## Sicher bezahlen mit Käuferschutz`,
      `Wir setzen auf banksichere Verschlüsselung (SSL & AES-256). Fragen zur Zahlung beantworten wir jederzeit über [WhatsApp](${WA}).`,
      `## Jetzt kaufen`,
      `Wählen Sie ein Paket und zahlen Sie bequem. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Kann ich mit PayPal zahlen?", a: `Ja, ${BRAND} akzeptiert PayPal und weitere sichere Zahlungsmethoden. Schreiben Sie uns bei Fragen kurz auf WhatsApp.` },
      { q: "Wie schnell ist das Abo aktiv?", a: "Nach der Zahlung erhalten Sie Ihre Zugangsdaten meist innerhalb weniger Minuten." },
      { q: "Ist die Zahlung sicher?", a: "Ja, alle Transaktionen laufen über banksichere Verschlüsselung." },
    ],
  },
  {
    slug: "iptv-sicher-bezahlen",
    keyword: "IPTV sicher bezahlen",
    title: `IPTV sicher bezahlen — geschützt | ${BRAND}`,
    description: `IPTV sicher bezahlen bei ${BRAND}: SSL/AES-256-Verschlüsselung, sofortige Aktivierung und 15 Tage Geld-zurück-Garantie. 69.000+ Sender in bis zu 8K.`,
    h1: "IPTV sicher bezahlen — verschlüsselt und geschützt",
    lead: [
      `[IPTV sicher bezahlen](${SITE}/iptv-sicher-bezahlen) ist bei [${BRAND}](${SITE}) Standard: banksichere Verschlüsselung und transparente Preise ohne versteckte Kosten.`,
      `## Ihre Zahlung ist geschützt`,
      `Alle Transaktionen laufen über SSL & AES-256. Dazu kommt die 15-Tage-Geld-zurück-Garantie, die Ihr Risiko auf null senkt.`,
      `## Jetzt sicher kaufen`,
      `Wählen Sie ein Paket und zahlen Sie geschützt. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Ist die Zahlung sicher?", a: "Ja, alle Zahlungen laufen über banksichere SSL/AES-256-Verschlüsselung." },
      { q: "Was, wenn es nicht gefällt?", a: "Dank 15 Tage Geld-zurück-Garantie erhalten Sie bei Nichtgefallen den vollen Betrag zurück." },
      { q: "Gibt es versteckte Kosten?", a: "Nein, der Preis ist transparent und ohne automatische Verlängerung." },
    ],
  },
  // ── Content & Sport ───────────────────────────────────────────────────────
  {
    slug: "iptv-bundesliga",
    keyword: "IPTV Bundesliga",
    title: `IPTV Bundesliga live — alle Spiele | ${BRAND}`,
    description: `Bundesliga live per IPTV bei ${BRAND}: alle Spiele in bis zu 4K, dazu Champions League & internationaler Sport. 69.000+ Sender, 15 Tage Geld-zurück.`,
    h1: "IPTV Bundesliga — alle Spiele live in Topqualität",
    lead: [
      `Mit [IPTV Bundesliga](${SITE}/iptv-bundesliga) von [${BRAND}](${SITE}) sehen Sie jeden Spieltag live in gestochen scharfer Qualität — ohne Buffering, ohne Geoblocking.`,
      `## Bundesliga und mehr`,
      `Neben der Bundesliga bekommen Sie [Champions League](${SITE}/iptv-champions-league), DFB-Pokal, internationale Ligen und mit [Formel 1](${SITE}/iptv-formel-1) den Motorsport dazu.`,
      `## Jetzt Bundesliga streamen`,
      `Paket wählen, in Minuten aktiv, Anpfiff nicht verpassen. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Sind alle Bundesliga-Spiele dabei?", a: `${BRAND} überträgt die Bundesliga live inklusive paralleler Spiele in hoher Qualität.` },
      { q: "In welcher Qualität?", a: "Je nach Übertragung bis zu 4K Ultra HD, stabil auch zur Abendspitze." },
      { q: "Brauche ich ein VPN?", a: "Nein, die Streams laufen ohne Geoblocking und ohne VPN." },
    ],
  },
  {
    slug: "iptv-champions-league",
    keyword: "IPTV Champions League",
    title: `IPTV Champions League live | ${BRAND}`,
    description: `Champions League live per IPTV bei ${BRAND}: alle Partien in bis zu 4K, dazu Bundesliga & Europa League. 69.000+ Sender, 15 Tage Geld-zurück.`,
    h1: "IPTV Champions League — jede Partie live",
    lead: [
      `[IPTV Champions League](${SITE}/iptv-champions-league) von [${BRAND}](${SITE}) bringt Ihnen alle Königsklassen-Abende live in bis zu 4K — ganz ohne Geoblocking.`,
      `## Alle europäischen Wettbewerbe`,
      `Champions League, Europa League, dazu [Bundesliga](${SITE}/iptv-bundesliga) und internationale Topligen. Parallele Spiele? Kein Problem.`,
      `## Königsklasse streamen`,
      `Paket wählen, in Minuten aktiv. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Sind alle CL-Spiele dabei?", a: "Ja, inklusive paralleler Begegnungen, live in hoher Qualität." },
      { q: "Welche Qualität?", a: "Bis zu 4K Ultra HD, stabil auch bei Topspielen." },
      { q: "Geht das ohne VPN?", a: "Ja, die Streams laufen ohne Geoblocking und ohne VPN." },
    ],
  },
  {
    slug: "iptv-fussball",
    keyword: "IPTV Fußball",
    title: `IPTV Fußball live — alle Ligen | ${BRAND}`,
    description: `Fußball live per IPTV bei ${BRAND}: Bundesliga, Champions League, internationale Ligen in bis zu 4K. 69.000+ Sender, 24/7 Support, 15 Tage Geld-zurück.`,
    h1: "IPTV Fußball — alle Ligen und Wettbewerbe live",
    lead: [
      `[IPTV Fußball](${SITE}/iptv-fussball) von [${BRAND}](${SITE}) deckt alles ab: [Bundesliga](${SITE}/iptv-bundesliga), [Champions League](${SITE}/iptv-champions-league), DFB-Pokal, Premier League, La Liga und mehr.`,
      `## Kein Spiel verpassen`,
      `Dank 69.000+ Sendern sehen Sie auch parallele Begegnungen und internationale Ligen — live, stabil und in bis zu 4K.`,
      `## Jetzt Fußball streamen`,
      `Paket wählen und loslegen. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Welche Ligen sind dabei?", a: "Bundesliga, Champions League, Europa League, Premier League, La Liga, Serie A und viele weitere." },
      { q: "In welcher Qualität?", a: "Bis zu 4K Ultra HD, stabil auch zur Abendspitze." },
      { q: "Mehrere Spiele gleichzeitig?", a: "Mit einem 2-Geräte-Paket können Sie zwei Partien parallel verfolgen." },
    ],
  },
  {
    slug: "iptv-formel-1",
    keyword: "IPTV Formel 1",
    title: `IPTV Formel 1 live — alle Rennen | ${BRAND}`,
    description: `Formel 1 live per IPTV bei ${BRAND}: alle Rennen, Qualifyings & Trainings in bis zu 4K. Dazu Fußball & mehr. 69.000+ Sender, 15 Tage Geld-zurück.`,
    h1: "IPTV Formel 1 — jedes Rennwochenende live",
    lead: [
      `Mit [IPTV Formel 1](${SITE}/iptv-formel-1) von [${BRAND}](${SITE}) sehen Sie jedes Rennen, Qualifying und Training live in bis zu 4K.`,
      `## Motorsport in Topqualität`,
      `Zusätzlich zur Formel 1 gibt es [Fußball](${SITE}/iptv-fussball), MotoGP, [UFC & Boxen](${SITE}/iptv-ufc-boxen) und internationalen Sport.`,
      `## Jetzt die Saison streamen`,
      `Paket wählen, in Minuten aktiv. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Sind alle Rennen dabei?", a: "Ja, inklusive Qualifyings und freien Trainings, live in hoher Qualität." },
      { q: "Welche Qualität?", a: "Bis zu 4K Ultra HD." },
      { q: "Brauche ich ein VPN?", a: "Nein, die Streams laufen ohne Geoblocking." },
    ],
  },
  {
    slug: "iptv-dazn-alternative",
    keyword: "DAZN Alternative IPTV",
    title: `DAZN Alternative — IPTV Sport | ${BRAND}`,
    description: `Suchen Sie eine DAZN Alternative? ${BRAND} bietet Bundesliga, Champions League & mehr per IPTV in bis zu 4K, ohne Vertrag. 15 Tage Geld-zurück.`,
    h1: "DAZN Alternative — Sport per IPTV, ohne Vertrag",
    lead: [
      `Auf der Suche nach einer [DAZN Alternative](${SITE}/iptv-dazn-alternative)? [${BRAND}](${SITE}) bündelt [Fußball](${SITE}/iptv-fussball), [Formel 1](${SITE}/iptv-formel-1) und internationalen Sport in einem IPTV Abo — ohne lange Bindung.`,
      `## Mehr Sport, ein Preis`,
      `Statt mehrerer Sport-Abos bekommen Sie Bundesliga, Champions League, Motorsport und Kampfsport in einem einzigen Paket, dazu 220.000+ Filme und Serien.`,
      `## Jetzt umsteigen`,
      `Paket wählen und sofort loslegen. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Ist das eine echte DAZN Alternative?", a: `${BRAND} bündelt Fußball, Motorsport und Kampfsport per IPTV in einem Abo ohne Vertrag — plus einen riesigen Film- und Seriekatalog.` },
      { q: "Gibt es einen Vertrag?", a: "Nein, Sie wählen eine Laufzeit ohne automatische Verlängerung." },
      { q: "Welche Qualität?", a: "Bis zu 4K Ultra HD, stabil auch zur Abendspitze." },
    ],
  },
  {
    slug: "iptv-sky-alternative",
    keyword: "Sky Alternative IPTV",
    title: `Sky Alternative — IPTV günstiger | ${BRAND}`,
    description: `Sky Alternative gesucht? ${BRAND} bietet Sport, Filme & Serien per IPTV in bis zu 8K, ohne Vertrag und deutlich günstiger. 15 Tage Geld-zurück.`,
    h1: "Sky Alternative — alles in einem IPTV Abo",
    lead: [
      `Eine [Sky Alternative](${SITE}/iptv-sky-alternative)? [${BRAND}](${SITE}) ersetzt teure Pay-TV-Pakete: Sport, Filme und Serien in einem IPTV Abo, ohne Vertrag.`,
      `## Günstiger und flexibler`,
      `Sie bekommen [Bundesliga](${SITE}/iptv-bundesliga), [Champions League](${SITE}/iptv-champions-league), ein riesiges VOD-Angebot und 69.000+ Sender — zu einem Bruchteil der Kosten.`,
      `## Jetzt wechseln`,
      `Paket wählen, in Minuten aktiv. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Ist IPTV eine gute Sky Alternative?", a: `${BRAND} bündelt Sport, Filme und Serien per IPTV in einem Abo ohne Vertrag und ist meist deutlich günstiger als Pay-TV.` },
      { q: "Ist Sport enthalten?", a: "Ja, Bundesliga, Champions League, Motorsport und mehr." },
      { q: "Brauche ich eine Box?", a: "Nein, IPTV läuft auf Smart TV, Fire TV, Android und mehr — eine App genügt." },
    ],
  },
  {
    slug: "iptv-filme-serien",
    keyword: "IPTV Filme und Serien",
    title: `IPTV Filme & Serien — 220.000+ VOD | ${BRAND}`,
    description: `Filme & Serien per IPTV bei ${BRAND}: 220.000+ VOD-Titel in bis zu 8K, wöchentlich aktualisiert. Netflix, Disney+ & mehr in einem Abo. 15 Tage Geld-zurück.`,
    h1: "IPTV Filme & Serien — eine riesige VOD-Bibliothek",
    lead: [
      `[IPTV Filme und Serien](${SITE}/iptv-filme-serien) von [${BRAND}](${SITE}): 220.000+ Titel on demand in bis zu 8K — neueste Kinostarts, Klassiker und komplette Serienstaffeln.`,
      `## Alle Streamingdienste in einem`,
      `Inhalte von Netflix, Disney+, HBO, Prime und mehr finden Sie gebündelt in einer Bibliothek, die wöchentlich wächst.`,
      `## Jetzt loslegen`,
      `Paket wählen und sofort schauen. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Wie viele Filme und Serien?", a: "Über 220.000 VOD-Titel, wöchentlich aktualisiert." },
      { q: "In welcher Qualität?", a: "Bis zu 8K Ultra HD, je nach Titel." },
      { q: "Sind neue Releases dabei?", a: "Ja, aktuelle Kinostarts und Serienstaffeln kommen laufend hinzu." },
    ],
  },
  {
    slug: "iptv-4k",
    keyword: "IPTV 4K",
    title: `IPTV 4K — gestochen scharf | ${BRAND}`,
    description: `IPTV in 4K bei ${BRAND}: Sport, Filme & Serien in Ultra HD, stabil zur Abendspitze. 69.000+ Sender & 220.000+ VOD, 15 Tage Geld-zurück.`,
    h1: "IPTV 4K — Ultra HD auf dem großen Bildschirm",
    lead: [
      `[IPTV 4K](${SITE}/iptv-4k) von [${BRAND}](${SITE}) liefert gestochen scharfes Ultra HD für Sport, Filme und Serien — ideal für große Fernseher.`,
      `## 4K braucht stabile Server`,
      `Für flüssiges 4K empfehlen wir rund 25 Mbit/s. Dank Premium-Servern bleibt das Bild auch zur Abendspitze stabil. Noch mehr Schärfe bietet [8K IPTV](${SITE}/iptv-8k).`,
      `## Jetzt in 4K schauen`,
      `Paket wählen und loslegen. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Welche Internetgeschwindigkeit für 4K?", a: "Rund 25 Mbit/s sorgen für flüssiges 4K ohne Buffering." },
      { q: "Ist alles in 4K?", a: "Viele Sender und VOD-Titel liegen in 4K vor, abhängig von der Quelle." },
      { q: "Läuft 4K auf meinem TV?", a: "Auf jedem 4K-fähigen Smart TV, Fire TV 4K oder Android-TV-Gerät." },
    ],
  },
  {
    slug: "iptv-8k",
    keyword: "IPTV 8K",
    title: `IPTV 8K — maximale Bildqualität | ${BRAND}`,
    description: `IPTV in bis zu 8K bei ${BRAND}: maximale Schärfe für Filme, Serien & Sport. 69.000+ Sender & 220.000+ VOD, stabile Server, 15 Tage Geld-zurück.`,
    h1: "IPTV 8K — die schärfste Stufe für Ihr Heimkino",
    lead: [
      `[IPTV 8K](${SITE}/iptv-8k) von [${BRAND}](${SITE}) bietet die höchste verfügbare Bildstufe für ausgewählte Inhalte — perfekt für moderne 8K-Fernseher.`,
      `## 8K auf dem neuesten TV`,
      `Wo 8K-Quellen vorliegen, sehen Sie maximale Detailschärfe. Für den Alltag genügt meist [4K IPTV](${SITE}/iptv-4k) mit rund 25 Mbit/s.`,
      `## Jetzt in Topqualität schauen`,
      `Paket wählen und starten. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Gibt es wirklich 8K?", a: "Für ausgewählte Inhalte ja; die meisten Sender und VOD-Titel liegen in HD bis 4K vor." },
      { q: "Was brauche ich für 8K?", a: "Einen 8K-Fernseher und eine schnelle, stabile Internetverbindung." },
      { q: "Lohnt sich 8K schon?", a: "Für Enthusiasten mit 8K-TV ja; für die meisten ist 4K der Sweet Spot." },
    ],
  },
  {
    slug: "iptv-sport",
    keyword: "IPTV Sport",
    title: `IPTV Sport — alle Events live | ${BRAND}`,
    description: `Sport live per IPTV bei ${BRAND}: Fußball, Formel 1, UFC, Boxen & mehr in bis zu 4K. 69.000+ Sender, 24/7 Support, 15 Tage Geld-zurück.`,
    h1: "IPTV Sport — Fußball, Motorsport, Kampfsport live",
    lead: [
      `[IPTV Sport](${SITE}/iptv-sport) von [${BRAND}](${SITE}) bringt alle großen Events live: [Fußball](${SITE}/iptv-fussball), [Formel 1](${SITE}/iptv-formel-1), [UFC & Boxen](${SITE}/iptv-ufc-boxen) und mehr.`,
      `## Ein Abo für allen Sport`,
      `Statt mehrerer Sport-Abonnements bekommen Sie alles in einem Paket — stabil, in bis zu 4K und ohne Geoblocking.`,
      `## Jetzt Sport streamen`,
      `Paket wählen und loslegen. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Welcher Sport ist dabei?", a: "Fußball, Formel 1, MotoGP, UFC, Boxen, Tennis, US-Sport und mehr." },
      { q: "In welcher Qualität?", a: "Bis zu 4K Ultra HD, stabil auch bei Topevents." },
      { q: "Mehrere Events gleichzeitig?", a: "Mit einem 2-Geräte-Paket verfolgen Sie zwei Events parallel." },
    ],
  },
  {
    slug: "iptv-ufc-boxen",
    keyword: "IPTV UFC Boxen",
    title: `IPTV UFC & Boxen live | ${BRAND}`,
    description: `UFC, Boxen & Kampfsport live per IPTV bei ${BRAND}: alle großen Fights in bis zu 4K, ohne Zusatzkosten pro Event. 15 Tage Geld-zurück.`,
    h1: "IPTV UFC & Boxen — jeder große Fight live",
    lead: [
      `Mit [IPTV UFC & Boxen](${SITE}/iptv-ufc-boxen) von [${BRAND}](${SITE}) sehen Sie die großen Kampfabende live — ohne teure Pay-per-View-Zuschläge.`,
      `## Kampfsport ohne Zusatzkosten`,
      `UFC, Boxen und weitere Kampfsport-Events sind im Abo enthalten, dazu [Fußball](${SITE}/iptv-fussball) und [Formel 1](${SITE}/iptv-formel-1).`,
      `## Jetzt den nächsten Fight sichern`,
      `Paket wählen, in Minuten aktiv. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Sind UFC-Events inklusive?", a: "Die großen Kampfabende sind im Abo enthalten, ohne Pay-per-View-Aufpreis." },
      { q: "Welche Qualität?", a: "Bis zu 4K Ultra HD." },
      { q: "Brauche ich ein VPN?", a: "Nein, die Streams laufen ohne Geoblocking." },
    ],
  },
  {
    slug: "iptv-international",
    keyword: "IPTV internationale Sender",
    title: `IPTV internationale Sender | ${BRAND}`,
    description: `Internationale Sender per IPTV bei ${BRAND}: türkische, arabische, englische & europäische Kanäle in einem Abo. 69.000+ Sender, 15 Tage Geld-zurück.`,
    h1: "IPTV internationale Sender — die ganze Welt im Abo",
    lead: [
      `[IPTV internationale Sender](${SITE}/iptv-international) von [${BRAND}](${SITE}): 69.000+ Kanäle aus Deutschland, Europa und der ganzen Welt in einem Abo.`,
      `## Für Expats und mehrsprachige Haushalte`,
      `Türkische, arabische, englische, italienische, polnische und viele weitere Sender — ideal, wenn Sie Inhalte aus dem Heimatland und lokale Programme kombinieren möchten.`,
      `## Jetzt loslegen`,
      `Paket wählen und schauen. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Welche Länder sind dabei?", a: "Sender aus Deutschland, der Türkei, dem arabischen Raum, UK, Italien, Polen, den Niederlanden und vielen weiteren Ländern." },
      { q: "Gut für Expats?", a: "Ja, Sie kombinieren Heimatland-Sender mit deutschen Programmen in einem Abo." },
      { q: "Wie viele Sender?", a: "Über 69.000 Live-Kanäle insgesamt." },
    ],
  },
  {
    slug: "iptv-tuerkisch",
    keyword: "türkisches IPTV",
    title: `Türkisches IPTV — alle Sender | ${BRAND}`,
    description: `Türkisches IPTV bei ${BRAND}: beIN, TRT, ATV, Show TV & mehr live, dazu deutsche & internationale Sender. 69.000+ Kanäle, 15 Tage Geld-zurück.`,
    h1: "Türkisches IPTV — türkische Sender live in Deutschland",
    lead: [
      `[Türkisches IPTV](${SITE}/iptv-tuerkisch) von [${BRAND}](${SITE}) bringt Ihnen die beliebten türkischen Sender live nach Deutschland — kombiniert mit deutschen und [internationalen Sendern](${SITE}/iptv-international).`,
      `## Türkische Sender und mehr`,
      `beIN Sports, TRT, ATV, Show TV, Kanal D und viele weitere, dazu Filme und Serien on demand.`,
      `## Jetzt loslegen`,
      `Paket wählen und schauen. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Welche türkischen Sender?", a: "beIN Sports, TRT, ATV, Show TV, Kanal D, Star TV und viele weitere." },
      { q: "Auch deutsche Sender?", a: "Ja, türkische und deutsche Sender sind in einem Abo kombinierbar." },
      { q: "Welche Qualität?", a: "Bis zu 4K, abhängig vom Sender." },
    ],
  },
  {
    slug: "iptv-kinder",
    keyword: "IPTV Kindersender",
    title: `IPTV Kindersender — sicher | ${BRAND}`,
    description: `Kindersender per IPTV bei ${BRAND}: große Auswahl an Kids-Kanälen, Kindersicherung inklusive. 69.000+ Sender & 220.000+ VOD, 15 Tage Geld-zurück.`,
    h1: "IPTV Kindersender — Familienprogramm mit Kindersicherung",
    lead: [
      `[IPTV Kindersender](${SITE}/iptv-kinder) von [${BRAND}](${SITE}): eine große Auswahl an Kinderkanälen plus Kindersicherung, damit die Kleinen sicher schauen.`,
      `## Sicher für die ganze Familie`,
      `Zeichentrick, Lernprogramme und Familienfilme on demand, dazu eine Kindersicherung, die ungeeignete Inhalte ausblendet.`,
      `## Jetzt loslegen`,
      `Paket wählen und starten. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Gibt es eine Kindersicherung?", a: "Ja, Sie können Inhalte per PIN sperren und ein kindersicheres Profil nutzen." },
      { q: "Welche Kindersender?", a: "Eine große Auswahl an Zeichentrick- und Familienkanälen plus VOD für Kinder." },
      { q: "Für mehrere Geräte?", a: "Mit einem 2-Geräte-Paket schauen Kinder und Eltern parallel." },
    ],
  },
  // ── Geräte & Apps ───────────────────────────────────────────────────────
  {
    slug: "iptv-firestick",
    keyword: "IPTV Firestick",
    title: `IPTV für Firestick einrichten | ${BRAND}`,
    description: `IPTV auf dem Amazon Fire TV Stick: ${BRAND} mit IPTV Smarters Pro oder TiviMate in Minuten einrichten. 69.000+ Sender in bis zu 4K, 15 Tage Geld-zurück.`,
    h1: "IPTV für Firestick — in wenigen Minuten startklar",
    lead: [
      `[IPTV Firestick](${SITE}/iptv-firestick) mit [${BRAND}](${SITE}): Installieren Sie IPTV Smarters Pro oder [TiviMate](${SITE}/iptv-tivimate), tragen Sie Ihre Zugangsdaten ein und schauen Sie sofort los.`,
      `## Einrichtung auf dem Fire TV Stick`,
      `App aus dem Amazon Appstore laden, Xtream- oder M3U-Daten eingeben, fertig. Funktioniert auf Fire TV Stick, Stick 4K und Fire TV Cube.`,
      `## Jetzt loslegen`,
      `Paket wählen, Zugangsdaten in Minuten erhalten. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Welche App auf dem Firestick?", a: "IPTV Smarters Pro oder TiviMate, beide aus dem Amazon Appstore." },
      { q: "Läuft es auf dem Stick 4K?", a: "Ja, auf Fire TV Stick, Stick 4K und Fire TV Cube." },
      { q: "Wie schnell eingerichtet?", a: "In wenigen Minuten nach Erhalt der Zugangsdaten." },
    ],
  },
  {
    slug: "iptv-fire-tv",
    keyword: "IPTV Fire TV",
    title: `IPTV für Fire TV — Anleitung | ${BRAND}`,
    description: `IPTV auf Amazon Fire TV mit ${BRAND}: Smarters Pro oder TiviMate installieren, Zugangsdaten eingeben, loslegen. 69.000+ Sender in bis zu 4K.`,
    h1: "IPTV für Fire TV — einfache Einrichtung",
    lead: [
      `[IPTV Fire TV](${SITE}/iptv-fire-tv) mit [${BRAND}](${SITE}) läuft auf allen Fire-TV-Geräten — [Firestick](${SITE}/iptv-firestick), Cube und Smart TVs mit Fire OS.`,
      `## So richten Sie es ein`,
      `App installieren, Xtream- oder M3U-Daten eingeben, fertig. Danach stehen 69.000+ Sender und 220.000+ VOD-Titel bereit.`,
      `## Jetzt starten`,
      `Paket wählen und in Minuten loslegen. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Welche Fire-TV-Geräte?", a: "Fire TV Stick, Stick 4K, Fire TV Cube und Fire-OS-Fernseher." },
      { q: "Welche App?", a: "IPTV Smarters Pro oder TiviMate." },
      { q: "Brauche ich ein VPN?", a: "Nein, der Dienst läuft ohne VPN." },
    ],
  },
  {
    slug: "iptv-smart-tv",
    keyword: "IPTV Smart TV",
    title: `IPTV für Smart TV einrichten | ${BRAND}`,
    description: `IPTV auf dem Smart TV mit ${BRAND}: Samsung, LG, Android TV & mehr. 69.000+ Sender & 220.000+ VOD in bis zu 8K, einfache Einrichtung, 15 Tage Geld-zurück.`,
    h1: "IPTV für Smart TV — auf jedem Fernseher",
    lead: [
      `[IPTV Smart TV](${SITE}/iptv-smart-tv) mit [${BRAND}](${SITE}) läuft auf [Samsung](${SITE}/iptv-samsung), [LG](${SITE}/iptv-lg), Android TV, Google TV und mehr.`,
      `## Direkt auf dem Fernseher`,
      `Je nach Gerät nutzen Sie eine IPTV-App aus dem Store oder spielen eine M3U-Playlist ab. Kein Zusatzgerät nötig.`,
      `## Jetzt einrichten`,
      `Paket wählen, Zugangsdaten eingeben, schauen. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Welche Smart TVs werden unterstützt?", a: "Samsung (Tizen), LG (webOS), Android TV, Google TV und Fire-OS-Geräte." },
      { q: "Brauche ich ein Zusatzgerät?", a: "Nein, auf den meisten Smart TVs läuft IPTV direkt per App." },
      { q: "In welcher Qualität?", a: "Bis zu 8K, abhängig vom Fernseher und der Quelle." },
    ],
  },
  {
    slug: "iptv-samsung",
    keyword: "IPTV Samsung",
    title: `IPTV für Samsung TV einrichten | ${BRAND}`,
    description: `IPTV auf Samsung Smart TV (Tizen) mit ${BRAND}: per IPTV-App oder M3U-Playlist. 69.000+ Sender in bis zu 8K, einfache Anleitung, 15 Tage Geld-zurück.`,
    h1: "IPTV für Samsung Smart TV (Tizen)",
    lead: [
      `[IPTV Samsung](${SITE}/iptv-samsung) mit [${BRAND}](${SITE}): Auf Samsung-Fernsehern mit Tizen OS nutzen Sie eine IPTV-App oder spielen Ihre M3U-Playlist ab.`,
      `## Einrichtung auf Tizen`,
      `Installieren Sie eine kompatible IPTV-App aus dem Samsung-Store, tragen Sie Ihre Xtream- oder M3U-Daten ein und starten Sie. Alternativ geht es auch über einen [Fire TV Stick](${SITE}/iptv-firestick).`,
      `## Jetzt loslegen`,
      `Paket wählen und schauen. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Welche App auf Samsung?", a: "Eine Tizen-kompatible IPTV-App aus dem Samsung-Store, oder Sie spielen die M3U-Playlist ab." },
      { q: "Funktioniert jede Samsung-Serie?", a: "Die meisten Tizen-Modelle ab 2018; ältere Geräte nutzen einen Fire TV Stick." },
      { q: "Welche Qualität?", a: "Bis zu 8K je nach Modell und Quelle." },
    ],
  },
  {
    slug: "iptv-lg",
    keyword: "IPTV LG",
    title: `IPTV für LG TV einrichten | ${BRAND}`,
    description: `IPTV auf LG Smart TV (webOS) mit ${BRAND}: per IPTV-App oder M3U-Playlist. 69.000+ Sender in bis zu 8K, einfache Anleitung, 15 Tage Geld-zurück.`,
    h1: "IPTV für LG Smart TV (webOS)",
    lead: [
      `[IPTV LG](${SITE}/iptv-lg) mit [${BRAND}](${SITE}): Auf LG-Fernsehern mit webOS nutzen Sie eine IPTV-App oder Ihre M3U-Playlist.`,
      `## Einrichtung auf webOS`,
      `Kompatible IPTV-App aus dem LG Content Store laden, Zugangsdaten eingeben, fertig. Alternativ läuft es über einen [Fire TV Stick](${SITE}/iptv-firestick).`,
      `## Jetzt loslegen`,
      `Paket wählen und schauen. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Welche App auf LG?", a: "Eine webOS-kompatible IPTV-App aus dem LG Content Store oder die M3U-Playlist." },
      { q: "Welche LG-Modelle?", a: "Die meisten webOS-Fernseher; ältere Geräte nutzen einen Fire TV Stick." },
      { q: "Welche Qualität?", a: "Bis zu 8K je nach Modell und Quelle." },
    ],
  },
  {
    slug: "iptv-android",
    keyword: "IPTV Android",
    title: `IPTV für Android — App & Setup | ${BRAND}`,
    description: `IPTV auf Android mit ${BRAND}: Smartphone, Tablet, Android TV & Box. Smarters Pro oder TiviMate installieren, loslegen. 69.000+ Sender, 15 Tage Geld-zurück.`,
    h1: "IPTV für Android — Handy, Tablet, TV & Box",
    lead: [
      `[IPTV Android](${SITE}/iptv-android) mit [${BRAND}](${SITE}) läuft auf Smartphones, Tablets, [Android TV](${SITE}/iptv-smart-tv) und jeder [Android-Box](${SITE}/iptv-android-box).`,
      `## App installieren und loslegen`,
      `Laden Sie IPTV Smarters Pro oder [TiviMate](${SITE}/iptv-tivimate) aus dem Play Store, tragen Sie Ihre Daten ein und starten Sie.`,
      `## Jetzt loslegen`,
      `Paket wählen, Zugangsdaten in Minuten erhalten. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Welche App auf Android?", a: "IPTV Smarters Pro oder TiviMate aus dem Google Play Store." },
      { q: "Läuft es auf dem Handy?", a: "Ja, auf Android-Smartphones, Tablets, Android TV und Boxen." },
      { q: "Wie viele Geräte?", a: "Je nach Paket ein oder zwei Geräte gleichzeitig." },
    ],
  },
  {
    slug: "iptv-android-box",
    keyword: "IPTV Android Box",
    title: `IPTV für Android Box einrichten | ${BRAND}`,
    description: `IPTV auf der Android TV Box mit ${BRAND}: Smarters Pro oder TiviMate installieren, loslegen. 69.000+ Sender in bis zu 4K, 15 Tage Geld-zurück.`,
    h1: "IPTV für Android Box — flexibel und stark",
    lead: [
      `[IPTV Android Box](${SITE}/iptv-android-box) mit [${BRAND}](${SITE}): Eine Android-TV-Box macht aus jedem Fernseher einen Streaming-TV.`,
      `## Einrichtung auf der Box`,
      `IPTV Smarters Pro oder [TiviMate](${SITE}/iptv-tivimate) installieren, Xtream- oder M3U-Daten eingeben, fertig.`,
      `## Jetzt loslegen`,
      `Paket wählen und starten. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Welche Box eignet sich?", a: "Jede gängige Android-TV-Box; für TiviMate empfiehlt sich etwas mehr RAM." },
      { q: "Welche App?", a: "IPTV Smarters Pro oder TiviMate." },
      { q: "Welche Qualität?", a: "Bis zu 4K, abhängig von Box und Verbindung." },
    ],
  },
  {
    slug: "iptv-apple-tv",
    keyword: "IPTV Apple TV",
    title: `IPTV für Apple TV einrichten | ${BRAND}`,
    description: `IPTV auf Apple TV mit ${BRAND}: per IPTV-App aus dem App Store, Zugangsdaten eingeben, loslegen. 69.000+ Sender in bis zu 4K, 15 Tage Geld-zurück.`,
    h1: "IPTV für Apple TV — elegant und stabil",
    lead: [
      `[IPTV Apple TV](${SITE}/iptv-apple-tv) mit [${BRAND}](${SITE}): Auf dem Apple TV nutzen Sie eine IPTV-App aus dem App Store.`,
      `## Einrichtung auf tvOS`,
      `Kompatible App laden, Xtream- oder M3U-Daten eingeben, fertig. Danach stehen alle Sender und VOD-Titel bereit.`,
      `## Jetzt loslegen`,
      `Paket wählen und schauen. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Welche App auf Apple TV?", a: "Eine tvOS-kompatible IPTV-App (z. B. ein Smarters- oder Xtream-Player) aus dem App Store." },
      { q: "Welche Generation?", a: "Apple TV HD und Apple TV 4K werden unterstützt." },
      { q: "Welche Qualität?", a: "Bis zu 4K Ultra HD." },
    ],
  },
  {
    slug: "iptv-magbox",
    keyword: "IPTV MAG Box",
    title: `IPTV für MAG Box einrichten | ${BRAND}`,
    description: `IPTV auf der MAG-Box mit ${BRAND}: Portal/MAC eintragen und loslegen. 69.000+ Sender in bis zu 4K, stabile Server, 15 Tage Geld-zurück.`,
    h1: "IPTV für MAG Box — klassisch und zuverlässig",
    lead: [
      `[IPTV MAG Box](${SITE}/iptv-magbox) mit [${BRAND}](${SITE}): MAG-Boxen sind dedizierte IPTV-Receiver und besonders einfach einzurichten.`,
      `## Einrichtung per Portal`,
      `Geben Sie die Portal-URL ein und teilen Sie uns Ihre MAC-Adresse mit — wir aktivieren Ihr Gerät. Alternativ nutzen Sie einen [Fire TV Stick](${SITE}/iptv-firestick) oder eine [Android-Box](${SITE}/iptv-android-box).`,
      `## Jetzt loslegen`,
      `Paket wählen und starten. ${GUARANTEE_DE}`,
    ],
    faq: [
      { q: "Wie richte ich die MAG-Box ein?", a: "Portal-URL eingeben und die MAC-Adresse an uns senden; wir aktivieren das Gerät." },
      { q: "Welche MAG-Modelle?", a: "Die gängigen MAG-Receiver werden unterstützt." },
      { q: "Welche Qualität?", a: "Bis zu 4K, abhängig vom Modell." },
    ],
  },
  {
    slug: "iptv-smarters-pro",
    keyword: "IPTV Smarters Pro",
    title: `IPTV Smarters Pro einrichten | ${BRAND}`,
    description: `IPTV Smarters Pro mit ${BRAND}: Xtream-Codes oder M3U eingeben und loslegen. Läuft auf Android, Fire TV, iOS & Smart TV. 69.000+ Sender, 15 Tage Geld-zurück.`,
    h1: "IPTV Smarters Pro — beliebte App, einfach eingerichtet",
    lead: [
      `[IPTV Smarters Pro](${SITE}/iptv-smarters-pro) ist eine der beliebtesten IPTV-Apps und funktioniert perfekt mit [${BRAND}](${SITE}).`,
      `## Einrichtung mit Xtream-Codes`,
      `App installieren, Benutzername, Passwort und Server (Xtream-Codes) oder eine M3U-URL eingeben — fertig. Läuft auf Android, Fire TV, iOS und vielen Smart TVs.`,
      `## Jetzt loslegen`,
      `Paket wählen, Zugangsdaten erhalten, eintragen. Alternativ nutzen Sie [TiviMate](${SITE}/iptv-tivimate).`,
    ],
    faq: [
      { q: "Wie richte ich Smarters Pro ein?", a: "Mit den Xtream-Codes (Benutzername, Passwort, Server) oder einer M3U-URL, die Sie nach dem Kauf erhalten." },
      { q: "Auf welchen Geräten läuft es?", a: "Android, Fire TV, iOS und viele Smart TVs." },
      { q: "Ist die App kostenlos?", a: "Die App selbst ist kostenlos; Sie benötigen ein IPTV-Abo wie das von uns." },
    ],
  },
  {
    slug: "iptv-tivimate",
    keyword: "TiviMate IPTV",
    title: `TiviMate einrichten — IPTV Player | ${BRAND}`,
    description: `TiviMate mit ${BRAND}: Xtream oder M3U eingeben, EPG laden, loslegen. Der Premium-Player für Android TV & Fire TV. 69.000+ Sender, 15 Tage Geld-zurück.`,
    h1: "TiviMate — der Premium-IPTV-Player einrichten",
    lead: [
      `[TiviMate](${SITE}/iptv-tivimate) gilt als einer der besten IPTV-Player für Android TV und Fire TV — und harmoniert bestens mit [${BRAND}](${SITE}).`,
      `## Einrichtung in TiviMate`,
      `Playlist per Xtream-Codes oder M3U hinzufügen, EPG laden, Favoriten anlegen. Die Oberfläche ist schnell, elegant und ideal für große Bildschirme.`,
      `## Jetzt loslegen`,
      `Paket wählen und Daten eintragen. Alternativ nutzen Sie [IPTV Smarters Pro](${SITE}/iptv-smarters-pro).`,
    ],
    faq: [
      { q: "Wie richte ich TiviMate ein?", a: "Playlist per Xtream-Codes oder M3U-URL hinzufügen und den EPG laden." },
      { q: "Auf welchen Geräten?", a: "Android TV, Fire TV und Android-Boxen." },
      { q: "Brauche ich TiviMate Premium?", a: "Die Gratisversion genügt; Premium bietet Komfortfunktionen wie mehrere Playlists." },
    ],
  },
  {
    slug: "iptv-kodi",
    keyword: "IPTV Kodi",
    title: `IPTV in Kodi einrichten | ${BRAND}`,
    description: `IPTV in Kodi mit ${BRAND}: PVR IPTV Simple Client mit M3U & EPG einrichten. Läuft auf fast jedem Gerät. 69.000+ Sender, 15 Tage Geld-zurück.`,
    h1: "IPTV in Kodi — über den PVR Simple Client",
    lead: [
      `[IPTV Kodi](${SITE}/iptv-kodi) mit [${BRAND}](${SITE}): Über den „PVR IPTV Simple Client" binden Sie Ihre M3U-Playlist und den EPG direkt in Kodi ein.`,
      `## Einrichtung in Kodi`,
      `PVR IPTV Simple Client aktivieren, M3U-URL und EPG-URL eintragen, fertig. Kodi läuft auf Windows, Android, Fire TV und vielen weiteren Geräten.`,
      `## Jetzt loslegen`,
      `Paket wählen und Playlist einbinden. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Wie binde ich IPTV in Kodi ein?", a: "Über den PVR IPTV Simple Client mit Ihrer M3U-URL und der EPG-URL." },
      { q: "Auf welchen Geräten läuft Kodi?", a: "Windows, Android, Fire TV, Linux und mehr." },
      { q: "Brauche ich Zusatz-Addons?", a: "Nein, der mitgelieferte PVR Simple Client genügt." },
    ],
  },
  {
    slug: "iptv-windows",
    keyword: "IPTV für Windows PC",
    title: `IPTV für Windows PC einrichten | ${BRAND}`,
    description: `IPTV auf dem Windows-PC mit ${BRAND}: per Smarters-App, VLC oder Kodi. M3U oder Xtream eingeben, loslegen. 69.000+ Sender, 15 Tage Geld-zurück.`,
    h1: "IPTV für Windows PC — am Rechner schauen",
    lead: [
      `[IPTV für Windows](${SITE}/iptv-windows) mit [${BRAND}](${SITE}): Am PC nutzen Sie eine Smarters-App, VLC oder [Kodi](${SITE}/iptv-kodi).`,
      `## Einrichtung auf dem PC`,
      `Mit VLC öffnen Sie die M3U-Datei direkt; mit einer Smarters-App oder Kodi tragen Sie Xtream-Codes bzw. die M3U-URL ein.`,
      `## Jetzt loslegen`,
      `Paket wählen und starten. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Welche App für Windows?", a: "Eine Smarters-App, VLC Media Player oder Kodi." },
      { q: "Geht es mit VLC?", a: "Ja, VLC spielt M3U-Playlists direkt ab." },
      { q: "Welche Qualität?", a: "Bis zu 4K, abhängig vom PC und der Verbindung." },
    ],
  },
  // ── Regional ────────────────────────────────────────────────────────────
  {
    slug: "iptv-oesterreich",
    keyword: "IPTV Österreich",
    title: `IPTV Österreich — Premium Abo | ${BRAND}`,
    description: `IPTV Österreich von ${BRAND}: ORF, deutsche & internationale Sender, Bundesliga & Champions League in bis zu 8K. 69.000+ Kanäle, 15 Tage Geld-zurück.`,
    h1: "IPTV Österreich — Premium IPTV für die ganze Alpenrepublik",
    lead: [
      `[IPTV Österreich](${SITE}/iptv-oesterreich) von [${BRAND}](${SITE}): österreichische, deutsche und internationale Sender in einem Abo — inklusive Sport und einer riesigen VOD-Bibliothek.`,
      `## Für Österreich optimiert`,
      `ORF, deutsche Sender, [Champions League](${SITE}/iptv-champions-league) und [Bundesliga](${SITE}/iptv-bundesliga) — stabil in ganz Österreich.`,
      `## Jetzt loslegen`,
      `Paket wählen und starten. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Funktioniert es in Österreich?", a: `Ja, ${BRAND} läuft in ganz Österreich auf jeder Internetverbindung.` },
      { q: "Sind ORF-Sender dabei?", a: "Österreichische sowie deutsche und internationale Sender sind enthalten." },
      { q: "Welche Qualität?", a: "Bis zu 8K je nach Quelle." },
    ],
  },
  {
    slug: "iptv-schweiz",
    keyword: "IPTV Schweiz",
    title: `IPTV Schweiz — Premium Abo | ${BRAND}`,
    description: `IPTV Schweiz von ${BRAND}: SRF, deutsche & internationale Sender, Sport in bis zu 8K. 69.000+ Kanäle, 24/7 Support, 15 Tage Geld-zurück.`,
    h1: "IPTV Schweiz — Premium IPTV für die ganze Schweiz",
    lead: [
      `[IPTV Schweiz](${SITE}/iptv-schweiz) von [${BRAND}](${SITE}): Schweizer, deutsche und internationale Sender in einem Abo, dazu Sport und 220.000+ VOD-Titel.`,
      `## Für die Schweiz optimiert`,
      `SRF, deutsche Sender, [Fußball](${SITE}/iptv-fussball) und [Formel 1](${SITE}/iptv-formel-1) — stabil in der ganzen Schweiz.`,
      `## Jetzt loslegen`,
      `Paket wählen und starten. ${CORE_LINKS_DE}`,
    ],
    faq: [
      { q: "Funktioniert es in der Schweiz?", a: `Ja, ${BRAND} läuft in der ganzen Schweiz auf jeder Internetverbindung.` },
      { q: "Sind SRF-Sender dabei?", a: "Schweizer sowie deutsche und internationale Sender sind enthalten." },
      { q: "Welche Qualität?", a: "Bis zu 8K je nach Quelle." },
    ],
  },
  // ── English target pages ──────────────────────────────────────────────────
  {
    slug: "iptv-germany",
    keyword: "IPTV Germany",
    lang: "en",
    title: `IPTV Germany — Premium German IPTV | ${BRAND}`,
    description: `IPTV Germany by ${BRAND}: 69,000+ live channels incl. Bundesliga & Champions League, 220,000+ movies in up to 8K. Buy German IPTV for Smart TV & Fire TV.`,
    h1: "IPTV Germany — Premium German IPTV for Smart TV & Fire TV",
    lead: [
      `[IPTV Germany](${SITE}/iptv-germany) from [${BRAND}](${SITE}) is a premium IPTV subscription for Germany and the DACH region: 69,000+ live channels and 220,000+ movies and series on demand in up to 8K Ultra HD.`,
      `## The best German IPTV channels`,
      `Get the major German channels, Bundesliga and UEFA Champions League, international channels and a deep VOD library updated weekly. Your login works in IPTV Smarters Pro, TiviMate and any Xtream player.`,
      `## Buy German IPTV today`,
      `Pick a plan, pay securely and start within minutes. Not sure yet? Try it risk-free with the 15-day money-back guarantee. See also [German IPTV](${SITE}/german-iptv).`,
    ],
    faq: [
      { q: "What is IPTV Germany?", a: `${BRAND} is a premium IPTV service for Germany with 69,000+ live channels and 220,000+ movies and series in up to 8K, on Smart TV, Android, Fire TV, MAG and more.` },
      { q: "Does it include German channels?", a: "Yes — the major German free-to-air and pay-TV channels, plus Bundesliga, Champions League and international channels." },
      { q: "Which apps work?", a: "Your login works in IPTV Smarters Pro, TiviMate and any Xtream-compatible player, so you are never locked to one app." },
      { q: "Is there a guarantee?", a: `Yes. Every ${BRAND} plan comes with a 15-day money-back guarantee and 24/7 WhatsApp support.` },
    ],
  },
  {
    slug: "german-iptv",
    keyword: "German IPTV",
    lang: "en",
    title: `German IPTV — Premium IPTV Germany | ${BRAND}`,
    description: `German IPTV from ${BRAND}: 69,000+ live channels, 220,000+ movies & series in up to 8K. Reliable premium IPTV Germany provider, no contract, 15-day guarantee.`,
    h1: "German IPTV — a reliable premium provider, no contract",
    lead: [
      `Looking for reliable [German IPTV](${SITE}/german-iptv)? [${BRAND}](${SITE}) is a premium [IPTV Germany](${SITE}/iptv-germany) provider with open pricing, a daily-maintained line-up and 24/7 support — not an anonymous reseller.`,
      `## Why choose this German IPTV provider`,
      `A good provider proves quality instead of advertising it: buffer-free streams even at peak evening hours, a weekly-updated VOD library, free app choice and support that actually replies.`,
      `## Get started with German IPTV`,
      `Choose a plan below and activate in minutes. Every ${BRAND} plan includes the full catalog, a 15-day money-back guarantee and 24/7 WhatsApp support via [WhatsApp](${WA}).`,
    ],
    faq: [
      { q: "What is German IPTV?", a: `German IPTV streams German and international TV over the internet. ${BRAND} offers 69,000+ live channels and 220,000+ VOD titles in up to 8K.` },
      { q: "Is this provider reliable?", a: `${BRAND} shows prices openly, maintains the catalog daily and offers a 15-day money-back guarantee so you can test risk-free.` },
      { q: "Which devices are supported?", a: "Smart TV, Android, Fire TV Stick, MAG box, phone and tablet, via IPTV Smarters Pro, TiviMate or any Xtream-compatible player." },
      { q: "Do you offer support?", a: "Yes, 24/7 support over WhatsApp, usually replying within minutes." },
    ],
  },
];

// Default every page to German unless it declares its own language, then dedupe
// by slug (first occurrence wins) so the prerenderer never double-writes a dir
// or lists the same <loc> in the sitemap twice.
export const KEYWORD_PAGES: KeywordPage[] = RAW_KEYWORD_PAGES
  .map((p) => ({ ...p, lang: p.lang ?? ("de" as LangCode) }))
  .filter((p, i, a) => a.findIndex((x) => x.slug === p.slug) === i);

export function getKeywordPage(slug: string): KeywordPage | undefined {
  return KEYWORD_PAGES.find((p) => p.slug === slug);
}
