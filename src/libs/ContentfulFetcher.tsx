import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useContentful } from '@/hooks/useContentful';
import { queryData } from './queries';

interface ContentContextValue {
  id?: string;
  title: string;
  blurb?: string;
  description: string;
}

// Creating CMS data's wrapping context
const ContentContext = createContext<ContentContextValue | undefined>(
  undefined
);

// Provider Component with Render Props support
interface ContentfulFetcherProps {
  dataFor: 'Landing Page Banner' | 'Best work'; // Describe which type of content must be fetched
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
  switch (dataFor) {
    case 'Landing Page Banner':
      paramInUse.trackingInfo = 'Landing Page Banner';
      paramInUse.query = queryData.infoBlockById;
      paramInUse.variables = {
        ...paramInUse.variables,
        sectionId: '4llAs4gW4mc1fikxbW6u4V',
      };
      break;

    case 'Best work':
      paramInUse.trackingInfo = 'Best work';
      paramInUse.query = queryData.projectById;
      paramInUse.variables = {
        ...paramInUse.variables,
        sectionId: '5y2JSha3mykWdGkUf6XcQp',
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
  const id = data?.en?.sys?.id ?? '';
  const title = data?.en?.title ?? '';
  const blurb = data?.en?.blurb ?? '';
  const description =
    data?.en?.description?.json?.content[0]?.content[0]?.value ?? '';

  if (paramInUse.trackingInfo === 'Best work') {
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

  const value: ContentContextValue = { id, title, blurb, description };

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
