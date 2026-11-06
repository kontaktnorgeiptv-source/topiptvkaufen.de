/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NETWORK & RESOURCE LINKS  (TODO-4 — internal/external links)
 *
 *  NETWORK_SITES lists every sibling IPTV site in the Netherlands network. The
 *  <SiteLinks> footer renders them as cross-links and automatically filters out
 *  the current site (matched by domain against SITE_URL), so this one list can
 *  be shared verbatim across every site.
 *
 *  AUTHORITY_LINKS are external reference pages (rendered rel="nofollow").
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface NetworkSite {
  /** Visible anchor text. */
  name: string;
  /** Full https:// URL, no trailing slash. */
  url: string;
}

export const NETWORK_SITES: NetworkSite[] = [
  // TODO: add your own site network here once sites go live, e.g.
  // { name: "My Other Site", url: "https://www.example.com" },
];

export interface AuthorityLink {
  name: string;
  url: string;
}

export const AUTHORITY_LINKS: AuthorityLink[] = [
  { name: "Wat is IPTV? — Wikipedia", url: "https://nl.wikipedia.org/wiki/Internet_Protocol_Television" },
  { name: "Streaming — Wikipedia", url: "https://nl.wikipedia.org/wiki/Streaming" },
  { name: "Smart-tv — Wikipedia", url: "https://nl.wikipedia.org/wiki/Smart-tv" },
  { name: "Kodi mediaspeler — Wikipedia", url: "https://nl.wikipedia.org/wiki/Kodi" },
];
