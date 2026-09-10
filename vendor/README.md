# Shared core package

The portfolio installs `enjanga-core-setup-1.0.41.tgz` from this directory so
Vercel does not need a sibling repository. Commit the archive with the manifest
and Yarn lockfile. It contains the current local core package, including the
typography, design-token CSS, and font assets absent from registry version 1.0.41.

Use Node 22 and `yarn install --frozen-lockfile`, then `yarn build`. Yarn is the
package manager for this repository; do not generate a package-lock.json.

This archive is an interim deployment fix. Replace it with a newly published
core version containing these assets when available, and regenerate yarn.lock.
Do not substitute registry version 1.0.41: its contents differ from this archive.
