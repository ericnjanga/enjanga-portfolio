'use client';

import { Suspense } from 'react';
import { HeroVideo } from 'enjanga-components-library';
import 'enjanga-components-library/hero-video.css'; // Styling for <Bann** /> component
import ScrollHandler from '../../utils/ScrollHandler';
import dynamic from 'next/dynamic';
import type {
  ContextType1,
  ContextType2,
  ContextType3,
  ContentModel3,
} from '@utils/dataProcessing/types';
import type { OrganizationCollection } from '@/libs/organizations/types';
import './styles/index.scss';

// These sections remain code-split, but SSR stays enabled so their final
// markup and dimensions are present in the initial HTML.
const ServiceRoute = dynamic(
  () => import('@/components/RouteService/ServiceRoute')
);
const RouteAbout = dynamic(() => import('@/components/RouteAbout/RouteAbout'));
const WrapperQuotes = dynamic(
  () => import('@/components/WrapperQuotes/WrapperQuotes')
);
const RouteExperience = dynamic(
  () => import('@/components/RouteExperience/RouteExperience')
);

type RouteHomeType = {
  banner: ContextType1;
  listAbout: ContextType2;
  backgroundImgUrl: string | null;
  listQuotes: ContextType3;
  listServices: ContextType2;
  organizations: OrganizationCollection;
  featuredBlogPost: ContentModel3 | null;
};

export default function RouteHome({
  banner,
  listAbout,
  backgroundImgUrl,
  listQuotes,
  listServices,
  organizations,
  featuredBlogPost,
}: RouteHomeType) {
  const informationBlockPayload = {
    data: {
      infoBlock: {
        sys: {
          id: banner?.item?.sys?.id,
        },
        title: banner?.item?.title,
        description: banner?.item?.description,
      },
    },
  };

  const featuredObjectPayload = {
    data: {
      blogPost: featuredBlogPost,
    },
  };

  const mappedArgs =
    informationBlockPayload.data.infoBlock?.title &&
    featuredObjectPayload.data.blogPost?.title &&
    featuredObjectPayload.data.blogPost?.slug
      ? {
          informationBlock: {
            title: informationBlockPayload.data.infoBlock.title,
            description: informationBlockPayload.data.infoBlock.description,
          },
          featuredObject: {
            title: featuredObjectPayload.data.blogPost.title,
            slug: featuredObjectPayload.data.blogPost.slug,
            businessDomain: featuredObjectPayload.data.blogPost.businessDomain,
            teckStack: featuredObjectPayload.data.blogPost.techstack,
            video: featuredObjectPayload.data.blogPost.introVideo,
            videoImage: featuredObjectPayload.data.blogPost.introVideoImage,
          },
        }
      : null;

  return (
    <>
      <div className="homePage page-section-spacing">
        <div>{mappedArgs ? <HeroVideo {...mappedArgs} /> : null}</div>

        <ServiceRoute items={listServices.items} />

        <RouteAbout {...listAbout} bgImgUrl={backgroundImgUrl} />

        <WrapperQuotes {...listQuotes} />

        <RouteExperience organizations={organizations} />
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
