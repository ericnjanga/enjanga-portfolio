# Internal CTA links to sections

In Contentful's **Link** entry, select **internal**, choose the destination page,
and optionally enter a **Section ID** without `#`. Leave the field blank for a
whole-page link. The ID must match an existing section in the application.

For the home hero:

- Label: **Explore my expertise**
- Internal destination: **Home**
- Section ID: **expertise**
- Result: `/#expertise`

Home also supports `about` and `home`. Adding an ID to Contentful does not create
a section on the page. External links ignore the section field.

The Hero CTA references a Link entry. Publish the Link and the Hero after editing.
The application reads the CTA label, destination and accessible label from
Contentful. An omitted CTA is not rendered. Delivery responses may be cached for
up to five minutes; application code must be deployed separately from CMS content.

The optional `sectionId` Symbol field on the `link` content type is validated with
`^[A-Za-z][A-Za-z0-9_-]*$`. This addition preserves existing whole-page links.
