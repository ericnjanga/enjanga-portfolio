# Testing Strategy

Test each responsibility separately:

- `client.test.tsx`: render `NavbarNavigation` with fixture data. Verify the shared library navbar opens and closes its mobile menu, and that scrolling updates the active link and URL hash.
- `server.test.tsx`: mock `getSiteSettings()`, render the server `Navbar`, and verify the fixture navigation links and their destinations.

Mobile navigation is provided by `enjanga-components-library` through
`NavbarNavigation`; there is no separate local `MobileNavigation` component.
