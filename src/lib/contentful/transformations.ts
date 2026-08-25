/**
 *
 * (Transformation Layer)
 * These functions transform raw Contentful records into application-ready data.
 * ---------------
 * */
import type { 
  ContentfulNavigationItem, 
  ContentfulRichText, 
} from './contentful-types';
import type {
  ContentSectionData,
  ExpertiseSectionData,
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
import type {
  NavigationItemFieldsFragment,
  LinkFieldsFragment,
  ContentSectionFieldsFragment,
  ExpertiseSectionFieldsFragment,
  ExpertiseCollectionItemsFragment,
  ImageFieldsFragment,
  HomePageIntroFieldsFragment,
  CaseStudiesPageIntroFieldsFragment,
} from './generated/graphql';

export const normalizeLink = (link: LinkFieldsFragment | null): LinkData | null => {
  if (!link || !link?.label) return null;

  const href =
    link.linkType === 'internal'
      ? resolveHrefInternalDestination(link)
      : link.externalUrl;

  if (!href) return null;

  return {
    label: link.label,
    href,
    openInNewTab:
      link.linkType === 'external' ? link.openInNewTab ?? false : false,
    accessibleLabel: link.accessibleLabel || undefined,
  };
};

// Extranc image props and provide a fallback
export const getAboutSectionImgData = (
  image: ImageFieldsFragment | null
): ImageData => {
  if (!image || !image?.url || image.width == null || image.height == null) {
    return { ...aboutImageFallback };
  }

  return {
    url: image.url,
    width: image.width,
    height: image.height,
    description: image.description ?? '',
  };
};

export const normalizeNavigationItem = (
  item: NavigationItemFieldsFragment
): NavigationItemData[] => {
  if (item.isVisible === false || !item.name) {
    return [];
  }

  return [
    {
      id: item.sys.id,
      name: item.name ?? '',
      href: resolveNavigationItemHref(item),
      openInNewTab: item.openInNewTab ?? false,
    },
  ];
};

const resolveHrefInternalDestination = (
  link: LinkFieldsFragment
): string | null =>
  link.internalDestination?.__typename === 'CaseStudiesPage' ||
  link.internalDestination?.__typename === 'HomePage'
    ? link.internalDestination.slug
    : null;

export const normalizeAboutSection = (
  section: ContentSectionFieldsFragment | null
): ContentSectionData | null => {
  if (!section || isEmptyOrContainsOnlyNull(section)) return null;

  return {
    title: section.title ?? '',
    body: getRichTextData(section.body),
    image: getAboutSectionImgData(section.image),
    imageAltText: section.imageAltText ?? '',
    imagePosition: section.imagePosition ?? '',
    cta: normalizeLink(section.cta ?? null) ?? null,
  };
};




export function resolveNavigationItemHref(item: NavigationItemFieldsFragment): string {
  switch (item.destinationType) {
    case 'homeSection':
      return item.sectionId ? `/#${item.sectionId}` : '/';

    case 'external':
    case 'page':
    default:
      return item.path || '/';
  }
}




export const normalizeExpertiseCollectionItem = (fragment: ExpertiseCollectionItemsFragment | null): ExpertiseItemData | null => {
  if (!fragment) return null; 

  return {
    title: fragment.title ?? '',
    description: fragment.description ?? ''
  };
};

export const normalizeExpertiseSectionFields = (
  fragment: ExpertiseSectionFieldsFragment | null
): ExpertiseSectionData | null => {
  if (!fragment) return null;

  return {
    title: fragment.title ?? '',
    expertiseItemsCollection: {
      items: (fragment.expertiseItemsCollection?.items ?? []).flatMap(entry => {
        if (entry?.__typename !== 'ExpertiseItem') {
          return [];
        }

        const item = normalizeExpertiseCollectionItem(entry);

        return item ? [item] : [];
      }),
    }
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
