import { expect, it } from 'vitest';
import { normalizeLink, normalizeHomePageHeroFields } from '../transformations';
import type { LinkFieldsFragment } from '../generated/graphql';

const link: LinkFieldsFragment = {
  __typename: 'Link',
  sys: { id: 'cta' },
  label: 'Explore my expertise',
  linkType: 'internal',
  sectionId: 'expertise',
  externalUrl: null,
  openInNewTab: true,
  accessibleLabel: null,
  internalDestination: {
    __typename: 'HomePage',
    sys: { id: 'home' },
    slug: '/',
  },
};
it('resolves a home section and keeps internal navigation in the same tab', () => {
  expect(normalizeLink(link)).toMatchObject({
    href: '/#expertise',
    openInNewTab: false,
  });
});
it('preserves whole-page links when the section is empty', () => {
  expect(normalizeLink({ ...link, sectionId: null })?.href).toBe('/');
});
it('supports sections on other internal pages', () => {
  expect(
    normalizeLink({
      ...link,
      sectionId: 'overview',
      internalDestination: {
        __typename: 'CaseStudiesPage',
        sys: { id: 'cases' },
        slug: 'case-studies',
      },
    })?.href
  ).toBe('/case-studies#overview');
});
it.each(['', '  ', 'bad section', 'expertise?x=1'])(
  'does not append invalid section %s',
  (sectionId) => {
    expect(normalizeLink({ ...link, sectionId })?.href).toBe('/');
  }
);
it('requires a page destination for an internal section', () => {
  expect(normalizeLink({ ...link, internalDestination: null })).toBeNull();
});
it('does not alter external destinations or their new-tab setting', () => {
  expect(
    normalizeLink({
      ...link,
      linkType: 'external',
      externalUrl: 'https://example.com/#contact',
    })
  ).toMatchObject({ href: 'https://example.com/#contact', openInNewTab: true });
});
it('normalizes the configured hero CTA and preserves its omission', () => {
  const hero = {
    sys: { id: 'hero' },
    title: 'Hello',
    subtitle: 'Welcome',
    cta: link,
  };
  expect(normalizeHomePageHeroFields(hero).cta?.href).toBe('/#expertise');
  expect(normalizeHomePageHeroFields({ ...hero, cta: null }).cta).toBeNull();
});
