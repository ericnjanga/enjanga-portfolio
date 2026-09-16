# Local shared packages

The portfolio installs the core and component library archives in this directory
so it can preview shared changes without a registry release or sibling repositories.
Commit both archives with the manifest and Yarn lockfile.

- `enjanga-core-setup-1.0.41-expertise-spacing.tgz`: typography, theme assets,
  the 10px h3 bottom margin, and responsive Home and case studies spacing tokens.
- `enjanga-components-library-1.0.124-expertise-spacing.tgz`: shared components,
  expertise item dividers, single-column biography, responsive page spacing, case study separators, and
  centered cover posters.

Use Node 22 and `yarn install --frozen-lockfile`, then `yarn build`. Yarn is the
package manager for this repository; do not generate a package-lock.json.

These archives are an interim deployment solution. Replace them with newly
published versions containing these changes when available and regenerate yarn.lock.
The registry versions with the same version numbers have different contents.
