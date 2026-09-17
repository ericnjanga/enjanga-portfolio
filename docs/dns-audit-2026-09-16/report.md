# DNS and asset delivery audit — enjanga.com

Scan date: September 16, 2026. Target: https://www.enjanga.com/.

## Main finding

The website already consolidates HTML, JavaScript, CSS, Mona Sans, and internal navigation on `www.enjanga.com`. Images use `images.ctfassets.net`. Video sources and walkthrough links use `videos.ctfassets.net`. Moving images to a cached same-origin delivery path is the highest-priority consolidation opportunity: ordinary browsing can use one asset hostname instead of two. Video consolidation is a separate decision with bandwidth and streaming implications.

“Same hostname” concerns the URL requested by the browser. Contentful can continue storing the originals while your site serves cached copies. Creating `assets.enjanga.com` would still introduce a separate DNS name. DNS records alone cannot route a `/media/` URL to another service; that needs application/CDN routing.

## Scope and limitations

- Crawled the homepage, case-study listing, and all four linked case-study articles; inspected all five linked stylesheets.
- Inventoried 15 distinct Contentful images, three intro video sources, and 15 additional linked walkthrough videos (18 videos total).
- Checked 58 HTTP targets with HEAD requests: 53 distinct assets plus three entry-URL variants, robots.txt, and sitemap.xml. All 53 inventoried assets returned HTTP 200. The robots and sitemap paths returned 404.
- Inspected browser asset inventories for the homepage/listing, article markup, and one video modal. Homepage observed 21 resources, including internal prefetches and favicon, with two external image resources. Article images are lazy-loaded and may not appear in the current browser asset inventory until near the viewport; HTML inventory includes them regardless.
- Opening the intro modal did not produce an observed video resource in this browser capture. Video dependency is confirmed by the rendered source URLs and successful HTTP headers, not a claimed successful playback trace.
- Queried local DNS, Cloudflare (1.1.1.1), Google (8.8.8.8), both Bluehost authoritative servers, and two Vercel authoritative servers.
- This is an asset-focused public DNS audit, not an enumeration of every possible subdomain or a full DNS zone export. It does not cover undiscoverable pages, every interaction, or worldwide cold-cache measurements. No source code, DNS configuration, or deployment was changed.

## Asset locations

| Hostname | Purpose | Browser impact |
|---|---|---|
| www.enjanga.com | HTML, 14 distinct script URLs in crawl, 5 CSS files, 1 font; internal navigation/prefetch | Existing first-party connection |
| images.ctfassets.net | 15 images: 2 homepage, 3 listing posters, 10 article images | One extra hostname, reused across images while caches/connections remain usable |
| videos.ctfassets.net | 3 intro MP4 sources and 15 linked walkthroughs | Interaction-dependent; intro videos declare preload="none" |
| graphql.contentful.com | CMS GraphQL API in server-only project code | Server-side dependency; absent from observed browser resources |
| www.linkedin.com, github.com, www.ontario.ca | Outbound links | Not embedded asset dependencies; no requests observed in these captures |
| assets.ctfassets.net | Checked as a possible Contentful asset endpoint | Not referenced by the six crawled pages |

No Google Fonts, IBM font CDN, external script CDN, embedded third-party player, or analytics host appeared in the inspected page/stylesheet references and captured browser inventories. Although installed package files include IBM font definitions, the live stylesheets reference only same-origin Mona Sans.

## DNS answers

| Name / record | Result | TTL / note |
|---|---|---|
| enjanga.com NS | ns1.bluehost.com, ns2.bluehost.com | 14,400 seconds observed |
| enjanga.com A | 216.150.1.1 | 14,400 seconds |
| www.enjanga.com CNAME | 0b955f022df13e7e.vercel-dns-016.com | 14,400 seconds, confirmed on both Bluehost authorities |
| Vercel target A | 64.29.17.65 and 216.198.79.65 via public resolvers | 300 seconds; direct Vercel authority queries returned 64.29.17.1 and 216.198.79.1 |
| apex / www AAAA | No final IPv6 address returned | www still returns its CNAME |
| apex / www HTTPS (type 65) | No HTTPS service record returned | Numeric TYPE65 used for verification |
| images.ctfassets.net | CNAME to d3orhvfyxudxxq.cloudfront.net | IPv4 and IPv6 returned; CDN IPs vary by resolver/location |
| videos.ctfassets.net | CloudFront-served IPv4 addresses | About 60-second fresh A TTL; no AAAA returned |
| graphql.contentful.com | CNAME to main-d.contentful.map.fastly.net | Server-side only |
| enjanga.com MX | Priority 0, mail.enjanga.com | Unrelated to page rendering |
| enjanga.com TXT | SPF and Google site verification | Full public answers in dns.json |
| enjanga.com CAA / DS | No records returned in queried answers | No immediate asset-consolidation implication |

The initial system dig version did not recognize the textual `HTTPS` type and effectively returned A answers. Disregard the `... HTTPS` entries in dns.json; dns-verify.json contains the correct numeric TYPE65 queries.

Bluehost queries requesting recursive resolution of the out-of-zone Vercel target returned an unexpected 74.220.199.6 address. Follow-up nonrecursive queries confirmed the correct authoritative CNAME on both Bluehost servers; independent public resolvers and Vercel authorities returned Vercel addresses. The Bluehost out-of-zone answer is not used here as the website's destination or evidence of a public resolution failure. Do not replace the Vercel CNAME with a sampled IP.

## Timings and redirects

These are point-in-time measurements from one machine. Resolver cache state was not controlled; they are not estimates of global cold DNS latency or guaranteed savings.

| Public-resolver A query | Cloudflare | Google |
|---|---:|---:|
| enjanga.com | 107 ms | 31 ms |
| www.enjanga.com | 94 ms | 292 ms |
| images.ctfassets.net | 10 ms | 22 ms |
| videos.ctfassets.net | 19 ms | 18 ms |

Repeated www A queries measured 3–95 ms through the local router, 54–297 ms through Cloudflare, and 8–37 ms through Google. Separate HTTP client lookups intermittently took 1.18–6.21 seconds, including the main site and image hostname; other lookups finished in roughly 1–55 ms. This discrepancy warrants follow-up on the local resolver path, OS resolution, and additional networks. It does not establish that Bluehost or the website is the cause. Browser DNS savings cannot be reliably inferred from these samples.

Observed entry paths:

- `https://www.enjanga.com/` → 200, no redirect.
- `https://enjanga.com/` → 307 → `https://www.enjanga.com/`.
- `http://www.enjanga.com/` → 308 → HTTPS www.
- `http://enjanga.com/` → 308 → HTTPS apex → 307 → HTTPS www.

Keep public links on the canonical HTTPS www URL. If www is permanently canonical, consider a permanent apex redirect and a direct HTTP-apex-to-HTTPS-www redirect where supported. Existing browser HTTPS upgrades may avoid some HTTP hops. Changing redirect status does not eliminate the first hostname lookup for a new apex visitor.

## Priority recommendations

1. **Serve images through the existing hostname.** Use the default Next.js image optimizer with a restrictive Contentful remotePatterns allowlist, or a cached same-origin `/media/images/` route. Include homepage images, listing posters, and article figures. Using an external custom image loader or unoptimized images can leave browser URLs external; validate the resulting URLs. Next.js documents default server delivery and remotePatterns: https://nextjs.org/docs/app/api-reference/components/image and https://nextjs.org/docs/14/app/building-your-application/optimizing/images.
2. **Resize and compress images while doing that work.** The listing's three posters total 2,167,593 bytes (2.17 MB decimal); the largest is 1,151,108 bytes. Their current URLs have no resize/format query parameters. Reducing bytes may offer more benefit than eliminating DNS alone. The two homepage images total 211,529 bytes. The font is 532,968 bytes, already same-origin; font optimization is separate from DNS.
3. **Keep videos deferred.** Current intro videos use preload="none" and article walkthroughs are links. To consolidate these too, use a cached same-origin media path with byte-range/206 support and appropriate streaming behavior. Preserve Content-Type, Range/Content-Range, cache semantics, and seeking. Avoid buffering large videos through an ordinary application handler solely to save a lookup. Compare bandwidth and hosting costs before choosing this implementation.
4. **If images remain external, use targeted connection hints.** A preconnect to images.ctfassets.net can start DNS/TCP/TLS early, with dns-prefetch as a lightweight option. Homepage images are already preloaded in the head, so incremental gains may be small and should be measured. These hints do not remove the external hostname. Avoid globally preconnecting the server-only CMS API or all outbound links. Reference: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/dns-prefetch.
5. **Preserve the working DNS structure pending evidence.** The 4-hour www CNAME TTL already permits caching; the Vercel address TTL is provider-controlled. A DNS-provider migration has not been justified by these measurements. Keep email-related records intact if DNS hosting is ever moved.

Current expected browser hostname set: www + images during ordinary image loading; videos when used. Target after image consolidation: www for ordinary browsing, plus videos on demand. Target after both: www only for site assets. Multiple files under one hostname do not imply separate uncached lookups for each file, and CNAME targets are resolver dependencies rather than additional browser asset origins.

## Caching observations

- Same-origin versioned scripts, CSS, and font: public, max-age=31536000, immutable.
- Contentful images: max-age=31536000.
- Contentful videos: max-age=2592000, Accept-Ranges: bytes.
- Homepage response: Vercel cache HIT, HTTP/2, Next.js prerendered response.

A consolidation layer should preserve effective caching. Moving a fast CDN asset behind an uncached proxy can make delivery slower despite fewer browser hostnames.

## Evidence files

- asset-inventory.csv: URLs, hostnames, HTTP status, HEAD size, and local lookup sample.
- crawl.json: page links, asset references, and stylesheet URL references.
- browser-assets.json: captured observed browser inventories; lazy/interaction-only assets may be absent.
- http.json: complete response headers, redirect chains, and HTTP client metrics.
- dns.json: initial queries; ignore textual HTTPS-type entries as noted above.
- dns-verify.json and authoritative.json: public-resolver and authoritative verification.
- repeated-dns.json and timing-samples.json: timing follow-ups.

## Per-page media inventory

- https://www.enjanga.com/: 2 distinct images; 0 video sources/links.
- https://www.enjanga.com/case-studies: 3 distinct images; 3 video sources/links.
- https://www.enjanga.com/case-studies/modernizing-financial-records-retrieval: 1 distinct images; 7 video sources/links.
- https://www.enjanga.com/case-studies/bank-deposit-api-integration: 3 distinct images; 4 video sources/links.
- https://www.enjanga.com/case-studies/refund-cancellation-flow: 3 distinct images; 0 video sources/links.
- https://www.enjanga.com/case-studies/bank-deposit-flow: 3 distinct images; 4 video sources/links.
