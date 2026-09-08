# Case studies

The listing lives at `/case-studies`. It reads the existing `caseStudiesPage`
entry (`slug: case-studies`) for the hero title and SEO metadata. No content
model migration is required.

All published entries of the existing Case Study type (Contentful API ID:
`blogPost`) appear automatically, newest first by first publication date. The
fetcher walks every results page; the list is not limited to featured entries.
Draft entries are excluded by the Contentful Delivery API. Content refreshes
on the existing five-minute revalidation interval.

Each row uses `title`, `blurb`, `slug`, `introVideoImage`, and `introVideo`.
Images and videos are served from Contentful. An entry without media renders
as a text-only row; an image without a video does not show a play button.

Full case-study links resolve to `/case-studies/[slug]`, using `description`
and its embedded images and case-study links through the existing CMSRichText
component. Unknown or unpublished slugs return a 404. These detail pages use
the site's typography; the supplied Figma frame describes only the listing.

To add a study, create and publish a Case Study entry. Add an intro video and
poster image to enable the Watch Intro interaction. To edit the listing
heading, edit its linked Hero entry. SEO fields remain on Case Studies Page.
