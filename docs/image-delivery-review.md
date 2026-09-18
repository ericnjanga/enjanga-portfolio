# Image delivery implementation

The library owns image layout and interactions. Its new ImageProvider/LibraryImage
integration accepts a framework-neutral renderer, falling back to native img.
InteractiveImage covers the expertise image, portrait, and case-study cards.

The portfolio owns PortfolioImage (Next.js Image), the client-side
LibraryImageProvider, Contentful fetching, and the optimizer allowlist. Article
figures also use PortfolioImage. Responsive sizes reflect each layout. Cards with
no intrinsic dimensions use Next's fill mode within their existing media frame.

CaseStudyCard.videoPosterSrc keeps the native video poster separate from the
responsive card image. The portfolio's getVideoPosterSrc uses Next getImageProps
to produce a same-origin optimizer URL. Video files stay on Contentful with their
existing deferred behavior.

The optimizer accepts HTTPS images from the configured CONTENTFUL_SPACE_ID
(defaulting to the current public space), with no upstream query string. The
existing raster images need no CMS changes. If future CMS content adds transformed
URLs, another host, SVGs, or animated GIFs, review that policy explicitly: Next
bypasses optimization for some formats. No generic proxy or SVG serving permission
was added.

## Library dependency

The portfolio uses the published `enjanga-components-library@1.0.131` release,
which includes the ImageProvider integration. The dependency and yarn.lock point
to the npm registry; the earlier local review tarball is no longer required.

## Validation

Library: 125 tests, including native fallback, renderer attribute forwarding, and
separate video poster coverage. Portfolio: 45 tests, including actual Next image
URL generation, responsive dimensions, frame fill, and poster URL generation.
Both projects pass TypeScript checks. Production builds are checked against live
Contentful data, followed by local HTTP and browser verification.

No DNS changes are required. Hosting performs and caches image transformations,
so image optimization usage applies after deployment.

Final local verification: all six routes rendered 15 same-origin images and three
same-origin video posters. All 18 sampled optimizer responses returned HTTP 200
and image/webp. Requests for an unrelated host and another Contentful space both
returned HTTP 400. See image-delivery-verification.json for URLs and byte counts.
The final production build passed without warnings. Browser inspection confirmed
loaded homepage/card images and preserved card frame dimensions.

The verification results above describe the earlier local checks, not measured
production performance improvements. Production delivery should be verified after deployment.
