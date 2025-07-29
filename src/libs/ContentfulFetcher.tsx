import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useContentful } from '@/hooks/useContentful';
import { queryData } from './queries';
import { contentDataIds } from './CMS-references';
import type { Node } from '@contentful/rich-text-types';

interface ContentContextValue {
  id?: string;
  title: string;
  blurb?: string;
  plainDescription?: string;
  richDescription?: { json: { content: Node[] } };
}

// Creating CMS data's wrapping context
const ContentContext = createContext<ContentContextValue | undefined>(
  undefined
);

// Provider Component with Render Props support
interface ContentfulFetcherProps {
  // Describe which type of content must be fetched
  dataFor: 'Landing Page Banner' | 'Best work list' | 'Single work';
  contentId?: string;
  children: (props: ContentContextValue) => ReactNode;
}

export const ContentfulFetcher: React.FC<ContentfulFetcherProps> = ({
  dataFor,
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
    variables: { locale1: 'en-CA', locale2: 'fr', sectionId: '' },
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
        sectionId: contentDataIds['Landing page banner'],
      };
      break;

    case 'Best work list':
      paramInUse.trackingInfo = 'Best work list';
      paramInUse.query = queryData.projectById;
      paramInUse.variables = {
        ...paramInUse.variables,
        sectionId: contentDataIds['Best work list'][0],
      };
      break;

    case 'Single work':
      paramInUse.trackingInfo = 'Single work';
      paramInUse.query = queryData.projectById;
      paramInUse.variables = {
        ...paramInUse.variables,
        sectionId: contentDataIds['Best work list'][0],
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
    case 'Single work':
    case 'Landing Page Banner':
      richDescription = data?.en?.description;
      break;
  }

  // ...
  const id = data?.en?.sys?.id ?? '';
  const title = data?.en?.title ?? '';
  const blurb = data?.en?.blurb ?? '';

  if (paramInUse.trackingInfo === 'Best work list') {
    console.log('>>>>>>> data?.en?.sys?.id = ', data?.en?.sys?.id);
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

  const value: ContentContextValue = {
    id,
    title,
    blurb,
    plainDescription,
    richDescription,
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
