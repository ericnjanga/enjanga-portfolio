'use client';

import { useRouter } from 'next/navigation';
import {
  Banner,
  TilePost,
  VideoThumbnail,
  CTL_valid_linkTo,
} from 'enjanga-components-library';
import 'enjanga-components-library/banner.css'; // Styling for <Bann** /> component
import 'enjanga-components-library/video-thumbnail.css';
import 'enjanga-components-library/tile-post.css'; // Styling for <PostT** /> component
import type { ContextType1, ContextType4 } from '@utils/dataProcessing/types';
import { useDataDistributorData } from '@utils/context/DataDistributorContext';
import MasonryGrid from '@/components/MasonryGrid';
import 'styles/blogs-and-articles/index.scss';

type PageListingType = {
  banner: ContextType1;
  listOfEntries: ContextType4;
};

export default function PageListing({
  banner,
  listOfEntries,
}: PageListingType) {
  const router = useRouter();
  const { banners } = useDataDistributorData();

  return (
    <div className="blogPage page-section-spacing">
      <Banner
        className="page-banner section-block-bm"
        featuredText={{
          heading: {
            children: banner?.item.title,
          },
          smartText: {
            richText: banner?.item.description,
          },
        }}
        imgBgUrl={banners.imgUrl}
      />

      <section className="page-content" aria-label="Case studies">
        <MasonryGrid className="enj-container caseStudyMasonry">
          {listOfEntries?.items?.map((item) => {
            const hasVideo = Boolean(item?.introVideo?.url);
            const hasPosterImage = Boolean(item?.introVideoImage?.url);

            if (hasVideo && hasPosterImage) {
              return (
                <VideoThumbnail
                  key={item?.sys?.id}
                  title={item?.title || 'Case study'}
                  hasPosterImage={hasPosterImage}
                  hasVideo={hasVideo}
                  posterAsset={item.introVideoImage || {}}
                  videoAsset={item.introVideo || {}}
                  businessDomains={[]}
                  stackValues={[]}
                  caseStudyHref={`/case-studies/${item?.slug}`}
                  ariaLabel={`Open featured case study for ${
                    item?.title || 'Case study'
                  }`}
                />
              );
            }

            const orgTitle = item?.organization?.title;
            const orgSlug = item?.organization?.slug;
            const orgPictogramName = item?.organization?.pictogramName;
            const orgProps = { orgTitle, orgSlug, orgPictogramName } as any;
            return (
              <TilePost
                key={item?.sys?.id}
                {...orgProps}
                featuredText={{
                  heading: {
                    children: item?.title,
                    level: 3,
                  },
                  smartText: {
                    plainText: item?.blurb,
                  },
                  headingMaxLength: 50,
                  plainTextMaxLength: 120,
                }}
                linksTo={`/case-studies/${item?.slug}` as CTL_valid_linkTo}
              />
            );
          })}
        </MasonryGrid>
      </section>
    </div>
  );
}
