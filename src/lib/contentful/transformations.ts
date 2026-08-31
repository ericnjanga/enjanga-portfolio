/**
 * Transforms generated Contentful fragment data into application models.
 */
import type {
  ContentSectionData,
  ExpertiseItemData,
  ExpertiseSectionData,
  HeroData,
  ImageData,
  LinkData,
  NavigationItemData,
  RichTextData,
} from './models';
import type {
  ContentSectionFieldsFragment,
  ExpertiseCollectionItemsFragment,
  ExpertiseSectionFieldsFragment,
  HeroFieldsFragment,
  ImageFieldsFragment,
  LinkFieldsFragment,
  NavigationItemFieldsFragment,
} from './generated/graphql';
import { aboutImageFallback, homePageFallback } from './fallbacks';

function normalizeInternalPath(slug: string): string {
  return slug === '/' ? '/' : `/${slug.replace(/^\/+/, '')}`;
}

function resolveInternalDestination(
  destination: LinkFieldsFragment['internalDestination']
): string | null {
  if (!destination?.slug) return null;

  switch (destination.__typename) {
    case 'HomePage':
    case 'CaseStudiesPage':
      return normalizeInternalPath(destination.slug);
  }

  return null;
}

/**
 * TESTING CONDITIONS:
 * -------------------
 * - External links should have tests covering true, false, and null/missing (defaulting to false).
 * - Internal links should also verify that an erroneous true value is overridden to false.
 * - The existing Contentful test only covers navigation items, not normalizeLink.
 * @param link 
 * @returns 
 */
export function normalizeLink(
  link: LinkFieldsFragment | null
): LinkData | null {
  if (!link?.label) return null;

  const href =
    link.linkType === 'internal'
      ? resolveInternalDestination(link.internalDestination)
      : link.externalUrl;

  if (!href) return null;

  return {
    label: link.label,
    href,
    openInNewTab:
      link.linkType === 'external' ? link.openInNewTab ?? false : false,
    accessibleLabel: link.accessibleLabel || undefined,
  };
}

export function normalizeImage(image: ImageFieldsFragment | null): ImageData {
  if (!image?.url || image.width == null || image.height == null) {
    return { ...aboutImageFallback };
  }

  return {
    url: image.url,
    width: image.width,
    height: image.height,
    description: image.description ?? '',
  };
}

export function resolveNavigationItemHref(
  item: NavigationItemFieldsFragment
): string {
  switch (item.destinationType) {
    case 'homeSection':
      return item.sectionId ? `/#${item.sectionId}` : '/';

    case 'external':
    case 'page':
    default:
      return item.path || '/';
  }
}

export function normalizeNavigationItem(
  item: NavigationItemFieldsFragment
): NavigationItemData | null {
  if (item.isVisible === false || !item.name) return null;

  return {
    id: item.sys.id,
    name: item.name,
    href: resolveNavigationItemHref(item),
    openInNewTab: item.openInNewTab ?? false,
  };
}

export function getRichTextData(
  richText: ContentSectionFieldsFragment['body']
): RichTextData {
  return {
    json: richText?.json ?? {
      nodeType: 'document',
      data: {},
      content: [],
    },
  };
}

export function normalizeHomePageAboutSection(
  section: ContentSectionFieldsFragment | null
): ContentSectionData | null {
  if (!section) return null;

  return {
    title: section.title ?? '',
    body: getRichTextData(section.body),
    image: normalizeImage(section.image),
    imageAltText: section.imageAltText ?? '',
    imagePosition: section.imagePosition ?? '',
    cta: normalizeLink(section.cta),
  };
}

export function normalizeExpertiseCollectionItem(
  fragment: ExpertiseCollectionItemsFragment | null
): ExpertiseItemData | null {
  if (!fragment) return null;

  return {
    title: fragment.title ?? '',
    description: fragment.description ?? '',
  };
}

export function normalizeHomePageExpertiseSectionFields(
  fragment: ExpertiseSectionFieldsFragment | null
): ExpertiseSectionData {
  if (!fragment) {
    return {
      ...homePageFallback.expertiseSection,
      expertiseItemsCollection: {
        items: [
          ...homePageFallback.expertiseSection.expertiseItemsCollection.items,
        ],
      },
    };
  }

  const items = (fragment.expertiseItemsCollection?.items ?? []).flatMap(
    (entry) => {
      const item = normalizeExpertiseCollectionItem(entry);
      return item ? [item] : [];
    }
  );

  return {
    title: fragment.title ?? homePageFallback.expertiseSection.title,
    expertiseItemsCollection: {
      items:
        items.length > 0
          ? items
          : [
              ...homePageFallback.expertiseSection.expertiseItemsCollection
                .items,
            ],
    },
    image:
      fragment.image?.url &&
      fragment.image.width != null &&
      fragment.image.height != null
        ? normalizeImage(fragment.image)
        : null,
    imageAltText: fragment.imageAltText ?? '',
    cta:
      fragment.cta?.__typename === 'Link'
        ? normalizeLink(fragment.cta)
        : homePageFallback.expertiseSection.cta,
  };
}

export function normalizeHomePageHeroFields(
  fragment: HeroFieldsFragment | null
): HeroData {
  return {
    title: fragment?.title ?? homePageFallback.hero.title,
    subtitle: fragment?.subtitle ?? homePageFallback.hero.subtitle,
  };
}
