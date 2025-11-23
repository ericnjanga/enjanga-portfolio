'use client';

import { Suspense } from 'react';
import { Banner } from 'enjanga-components-library';
import RouteAbout from '../RouteAbout/RouteAbout';
import RouteBestWork from '../RouteBestWork/RouteBestWork';
import RouteScopeOfExpertise from '../RouteScopeOfExpertise/RouteScopeOfExpertise';
import WrapperQuotes from '../WrapperQuotes/WrapperQuotes';
import ScrollHandler from '../../utils/ScrollHandler';
import type {
  ContextType1,
  ContextType2,
  ContextType3,
  ContextType4,
} from '@utils/dataProcessing/types';
import './styles/index.scss';

type RouteHomeType = {
  banner: ContextType1;
  listExpertise: ContextType2;
  listAbout: ContextType2;
  backgroundImgUrl: string | null;
  listQuotes: ContextType3;
  listBestWork: ContextType4;
};

export default function RouteHome({
  banner,
  listExpertise,
  listAbout,
  backgroundImgUrl,
  listQuotes,
  listBestWork,
}: RouteHomeType) {
  return (
    <>
      <div className="homePage">
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
          isHuge={true}
        />

        <RouteScopeOfExpertise {...listExpertise} />

        <RouteAbout {...listAbout} bgImgUrl={backgroundImgUrl} />

        <WrapperQuotes {...listQuotes} />

        <RouteBestWork {...listBestWork} />
      </div>

      {/**
       * The <ScrollHandler /> component manages scroll-related side effects:
       * it listens for the "section" query parameter (e.g., "/?section=about")
       * and automatically scrolls to that section on the home page.
       *
       * Because it uses Next.js client router hooks like useSearchParams(),
       * it must be wrapped in <Suspense> to avoid hydration warnings during
       * client-side rendering. The fallback is omitted since it renders no UI.
       */}
      <Suspense>
        <ScrollHandler />
      </Suspense>
    </>
  );
}
