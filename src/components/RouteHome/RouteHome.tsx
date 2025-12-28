'use client';

import { Suspense } from 'react';
import { Banner } from 'enjanga-components-library';
import 'enjanga-components-library/banner.css'; // Styling for <Bann** /> component
import { SkeletonComponent } from '@/app/ui/Skeleton';
import ScrollHandler from '../../utils/ScrollHandler';
import {
  ScopeOfProvider,
  ScopeOfExpDataType,
} from '@utils/context/ScopeOfExpContext';
import type {
  ContextType1,
  ContextType2,
  ContextType3,
  ContextType4,
} from '@utils/dataProcessing/types';
import { useDataDistributorData } from '@utils/context/DataDistributorContext';
import dynamic from 'next/dynamic';
import './styles/index.scss';

type RouteHomeType = {
  banner: ContextType1;
  listExpertiseTabs: ContextType2;
  listExpertisePanels: ScopeOfExpDataType;
  listAbout: ContextType2;
  backgroundImgUrl: string | null;
  listQuotes: ContextType3;
  listBestWork: ContextType4;
};

/**
 * Deferring (Dynamic imports) the following component (and their CSS):
 * - RouteScopeOfExpertise
 * - RouteAbout
 * - WrapperQuotes
 * - RouteBestWork
 */
const RouteScopeOfExpertise = dynamic(
  () => import('@/components/RouteScopeOfExpertise/RouteScopeOfExpertise'),
  {
    ssr: false, // Ony render on the client
    loading: () => (
      <SkeletonComponent name="information about Eric Njanga's scope of expertise." minHeight={300} />
    ),
  }
);

const RouteAbout = dynamic(() => import('@/components/RouteAbout/RouteAbout'), {
  ssr: false, // Ony render on the client
  loading: () => <SkeletonComponent name="information about Eric Njanga's vision and career objectives." minHeight={300} />,
});

const WrapperQuotes = dynamic(
  () => import('@/components/WrapperQuotes/WrapperQuotes'),
  {
    ssr: false, // Ony render on the client
    loading: () => <SkeletonComponent name="insights on Eric Njanga's philosophy." />,
  }
);

const RouteBestWork = dynamic(
  () => import('@/components/RouteBestWork/RouteBestWork'),
  {
    ssr: false, // Ony render on the client
    loading: () => <SkeletonComponent name="Eric Njanga's best Work." minHeight={300} />,
  }
);

export default function RouteHome({
  banner,
  listExpertiseTabs,
  listExpertisePanels,
  listAbout,
  backgroundImgUrl,
  listQuotes,
  listBestWork,
}: RouteHomeType) {
  const { banners } = useDataDistributorData();

  return (
    <>
      <div className="homePage page-section-spacing">
        <div>
          <Banner
            id="introduction"
            featuredText={{
              heading: {
                children: banner?.item?.title,
              },
              smartText: {
                richText: banner?.item?.description,
              },
            }}
            imgBgUrl={banners.imgUrl}
            isHuge={true}
          />

          <ScopeOfProvider value={listExpertisePanels}>
            <RouteScopeOfExpertise {...listExpertiseTabs} />
          </ScopeOfProvider>
        </div>

        <RouteAbout {...listAbout} bgImgUrl={backgroundImgUrl} />

        <WrapperQuotes {...listQuotes} />

        <RouteBestWork {...listBestWork} />
      </div>

      {/**
       * The <ScrollHandler /> component manages scroll-related side effects:
       * it listens for the "section" query parameter (e.g., "/?section=about")
       * and automatically scrolls to that section on the home page.
       *
       * Because it uses Next.js client router hooks like useSearchPar***(),
       * it must be wrapped in <Suspense> to avoid hydration warnings during
       * client-side rendering. The fallback is omitted since it renders no UI.
       */}
      <Suspense>
        <ScrollHandler />
      </Suspense>
    </>
  );
}
