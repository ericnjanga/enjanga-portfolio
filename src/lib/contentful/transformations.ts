/**
 *
 * (Transformation Layer)
 * These functions transform raw Contentful records into application-ready data.
 * ---------------
 * */
import type {
  ContentfulLink,
  ContentfulNavigationItem,
  ContentfulExpertiseItem,
  ContentfulContentSection,
  ContentfulImage,
  ContentfulRichText,
} from './contentful-types';
import type {
  ContentSectionData,
  ExpertiseItemData,
  LinkData,
  NavigationItemData,
  ImageData,
  RichTextData,
} from './models';
import { 
  containsNothingOfValue,
  isEmptyOrContainsOnlyNull,
} from '../utils/predicates';
import { aboutImageFallback, aboutCtaFallback } from './fallbacks';
 

export function resolveHref(item: ContentfulNavigationItem): string {
  switch (item.destinationType) {
    case 'homeSection':
      return item.sectionId ? `/#${item.sectionId}` : '/';

    case 'external':
    case 'page':
    default:
      return item.path || '/';
  }
}


export const normalizeNavItems = (
  items: Array<ContentfulNavigationItem | null> | null | undefined
): NavigationItemData[] => {
  if (!items || containsNothingOfValue(items)) return [];

  return items
    .filter(
      (item): item is ContentfulNavigationItem =>
        item?.__typename === 'NavigationItem' &&
        item?.isVisible !== false &&
        Boolean(item.name)
    )
    .map(
      (item): NavigationItemData => ({
        id: item.sys.id,
        name: item.name ?? '',
        href: resolveHref(item),
        openInNewTab: item.openInNewTab ?? false,
      })
    );
};

export const normalizeFooterLinks = (
  links: Array<ContentfulLink | null> | null | undefined
): LinkData[] => {
  if (!links || containsNothingOfValue(links)) return [];

  return links
    .filter(
      (link): link is ContentfulLink =>
        link?.__typename === 'Link' && Boolean(link?.label && link.externalUrl)
    )
    .map((link) => ({
      label: link.label ?? '',
      href: link.externalUrl ?? '',
      openInNewTab: link.openInNewTab ?? false,
      accessibleLabel: link.accessibleLabel || undefined,
    }));
};

export const normalizeExpertiseItems = (
  items: Array<ContentfulExpertiseItem | null> | null | undefined
): Array<ExpertiseItemData> => {
  if (!items || containsNothingOfValue(items)) return [];

  return items
    .filter(
      (item): item is ContentfulExpertiseItem =>
        item?.__typename === 'ExpertiseItem' &&
        Boolean(item?.title && item.description)
    )
    .map((item) => ({
      title: item.title ?? '',
      description: item.description ?? '',
    }));
};

// Extranc image props and provide a fallback
export const getAboutSectionImgData = (
  image: ContentfulImage | null
): ImageData => {
  if (!image?.url || image.width == null || image.height == null) {
    return { ...aboutImageFallback };
  }

  return {
    url: image.url,
    width: image.width,
    height: image.height,
    description: image.description ?? '',
  };
};

export function getRichTextData(
  richText: ContentfulRichText | null
): RichTextData {
  return {
    json: richText?.json ?? {
      nodeType: 'document',
      data: {},
      content: [],
    },
  };
}

// Extranc image props and provide a fallback
export const getAboutSectionCtaData = (
  cta: ContentfulLink | null
): LinkData => {
  if (!cta || isEmptyOrContainsOnlyNull(cta)) return { ...aboutCtaFallback };

  return {
    label: cta.label ?? '',
    href: cta.externalUrl ?? '',
    openInNewTab: cta.openInNewTab ?? false,
    accessibleLabel: cta.accessibleLabel || undefined,
  };
};

export const normalizeAboutSection = (
  section: ContentfulContentSection | null | undefined
): ContentSectionData | null => {
  if (!section || isEmptyOrContainsOnlyNull(section)) return null;

  return {
    title: section.title ?? '',
    body: getRichTextData(section.body),
    image: getAboutSectionImgData(section.image),
    imageAltText: section.imageAltText ?? '',
    imagePosition: section.imagePosition ?? '',
    cta: getAboutSectionCtaData(section.cta),
  };
};
