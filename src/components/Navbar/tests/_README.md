# Testing Strategy

Test each responsibility separately:

- client.test.tsx: render MobileNavigation with fixture data, click “Open main menu,” verify the dialog appears, click a link or close button, and verify it disappears.
- server.test.tsx: verify the desktop links and fallback links render. This component has no state or event behavior.