import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useContentful } from '@/hooks/useContentful';
import { queryData } from './CMS-content-queries';
import { cmsContentIds } from './CMS-references';
import type { Node } from '@contentful/rich-text-types';
import { InformationBlock } from './CMS-content-types';
import { sortByOrderProp } from '@utils/helpers';

interface ContentContextValue {
  id?: string;
  title: string;
  blurb?: string;
  image?: {
    url: string;
    title: string;
    description: string;
  };
  plainDescription?: string;
  richDescription?: { json: { content: Node[] } };
  items?: InformationBlock[]; // Unordered list of items
  orderedItems?: InformationBlock[]; // Ordered list of items
}

// Creating CMS data's wrapping context
const ContentContext = createContext<ContentContextValue | undefined>(
  undefined
);

// Provider Component with Render Props support
interface ContentfulFetcherProps {
  dataFor: // Describe which type of content must be fetched
  | 'Landing Page Banner'
    | 'Single Work'
    | 'Single Blog Post'
    | 'InfoBlock by parentId'
    | 'List of Best Work'
    | 'List of Scope of expertise'
    | 'List of Blog Posts';

  contentId?: string; // ...
  children: (props: ContentContextValue) => ReactNode;
}

export const ContentfulFetcher: React.FC<ContentfulFetcherProps> = ({
  dataFor,
  contentId = '',
  children,
}) => {
  /**
   * Fetching ContentFul data in all languages, and handling errors and loading time
   * ----------------------
   */
  // Getting the currently active locale...
  const activeLang = 'en-CA'; // useContext(LanguageContext);
  let paramInUse = {
    query: '',
    variables: {
      locale1: 'en-CA',
      locale2: 'fr',
      sectionId: '',
      parentRefId: '',
    },
    queryKey: '',
    trackingInfo: '',
  };
  // ...
  let plainDescription;
  let richDescription;

  // ...
  switch (dataFor) {
    case 'Landing Page Banner':
      paramInUse.trackingInfo = 'Landing Page Banner';
      paramInUse.query = queryData.infoBlockById;
      paramInUse.variables = {
        ...paramInUse.variables,
        sectionId: cmsContentIds.categories['Landing page banner'],
      };
      break;

    case 'Single Work':
      paramInUse.trackingInfo = 'Single Work';
      paramInUse.query = queryData.projectById;
      paramInUse.variables = {
        ...paramInUse.variables,
        sectionId: contentId,
      };
      break;

    case 'Single Blog Post':
      paramInUse.trackingInfo = 'Single Blog Post';
      paramInUse.query = queryData.blogPostById;
      paramInUse.variables = {
        ...paramInUse.variables,
        sectionId: contentId,
      };
      break;

    case 'InfoBlock by parentId':
      paramInUse.trackingInfo = 'InfoBlock by parentId';
      paramInUse.query = queryData.infoBlockByParentCollection;
      paramInUse.variables = {
        ...paramInUse.variables,
        parentRefId: contentId,
      };
      break;

    case 'List of Best Work':
      paramInUse.trackingInfo = 'List of Best Work';
      paramInUse.query = queryData.projectsCollection;
      paramInUse.variables = {
        ...paramInUse.variables,
      };
      break;

    case 'List of Scope of expertise':
      paramInUse.trackingInfo = 'List of Scope of expertise';
      paramInUse.query = queryData.infoBlockByParentCollection;
      paramInUse.variables = {
        ...paramInUse.variables,
        parentRefId: cmsContentIds.categories['Scope of expertise'],
      };
      break;

    case 'List of Blog Posts':
      paramInUse.trackingInfo = 'List of Blog Posts';
      paramInUse.query = queryData.blogPostCollection;
      paramInUse.variables = {
        ...paramInUse.variables,
      };
      break;
  }

  // ...
  const { data, isLoading, error } = useContentful({
    query: paramInUse.query,
    variables: paramInUse.variables,
    // variables: { sectionId: id, locale1: "en-CA", locale2: "fr" },
    queryKey: paramInUse.queryKey,
    // queryKey: `pageSection-${id}`,
    infoTracking: paramInUse.trackingInfo,
  });

  // ...
  switch (dataFor) {
    case 'Single Work':
    case 'Landing Page Banner':
    case 'Single Blog Post':
      richDescription = data?.en?.description;
      break;
  }

  // ...
  const id = data?.en?.sys?.id ?? '';
  const title = data?.en?.title ?? '';
  const blurb = data?.en?.blurb ?? '';
  const image = data?.en?.image;
  const items = data?.en?.items;
  let orderedItems;

  // TODO: DELETE AFTER OPTIMIZATION
  // ---------------
  // if (dataFor==='Single Blog Post') {
  //   console.log(`************* data: `, data);
  // }

  // Sort the list of items by the "order" property (item.order)
  switch (paramInUse.trackingInfo) {
    case 'List of Scope of expertise':
    case 'InfoBlock by parentId':
    case 'List of Blog Posts':
    case 'List of Best Work':
      // TODO: DELETE AFTER OPTIMIZATION
      // ---------------
      // if (paramInUse.trackingInfo==='List of Best Work') {
      //   console.log('>>>[****]>>>> data?.en?.items = ', data?.en?.items);
      // }
      orderedItems = sortByOrderProp(items);
      break;
  }

  // // Display a placeholder is there is no modal context or the data fetching is not yet completed
  // if (isLoading) {
  //   return <Preloader />;
  // }
  // // Display an error messaye if there was problem fetching data
  // if (error) return <p>{t("ErrorLoadingPosts")}</p>;
  /**
   * Fetching ContentFul data in all languages, and handling errors and loading time
   * ----------------------
   */

  // TODO: DELETE AFTER OPTIMIZATION
  // ---------------
  // if (paramInUse.trackingInfo === 'Single Work') {
  //   console.log(`.....title=${title}`);
  // }

  const value: ContentContextValue = {
    id,
    title,
    blurb,
    image,
    plainDescription,
    richDescription,
    items,
    orderedItems,
  };

  return <>{children(value)}</>;
};

// Custom hook for child components if needed
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentfulFetcher');
  }
  return context;
};
