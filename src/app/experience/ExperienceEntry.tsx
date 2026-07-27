'use client';

import type { Organization } from '@/libs/organizations/types';
import type { ContentModel3 } from '@utils/dataProcessing/types';
import {
  Banner,
  CMSRichText,
  CTL_valid_linkTo,
  TilePost,
  VideoThumbnail,
} from 'enjanga-components-library';
import 'enjanga-components-library/banner.css';
import 'enjanga-components-library/cms-rich-text.css';
import 'enjanga-components-library/tile-post.css';
import 'enjanga-components-library/video-thumbnail.css';
import { useDataDistributorData } from '@utils/context/DataDistributorContext';
import MasonryGrid from '@/components/MasonryGrid';
import 'styles/blogs-and-articles/index.scss';

type ExperienceEntryProps = {
  org: Organization;
  projects: ContentModel3[];
};

const ExperienceEntry = ({ org, projects }: ExperienceEntryProps) => {
  const { banners } = useDataDistributorData();

  const orgProps = {
    orgTitle: org.title,
    orgSlug: org.slug,
    orgPictogramName: org.pictogramName,
  } as any;

  return (
    <div className="articlePage page-section-spacing">
      <Banner
        className="page-banner section-block-bm"
        featuredText={{
          heading: { children: org.title },
          smartText: {},
          isHidden: 'smartText',
        }}
        imgBgUrl={banners.imgUrl}
      />
      <article className="page-content" aria-label={`${org.title} experience`}>
        <div className="enj-container">
          <div style={{ maxWidth: 930 }}>
            <section>
              {org.subtitle && <h2>{org.subtitle}</h2>}
              <CMSRichText data={org.description} />
            </section>
          </div>
          <section>
            <h2 style={{ marginBottom: '1.5rem' }}>Best work done for this organization</h2>
            <MasonryGrid className="caseStudyMasonry">
              {projects?.map((project) => {
                const hasVideo = Boolean(project?.introVideo?.url);
                const hasPosterImage = Boolean(project?.introVideoImage?.url);

                if (hasVideo && hasPosterImage) {
                  return (
                    <VideoThumbnail
                      key={project?.sys?.id}
                      title={project?.title || 'Case study'}
                      hasPosterImage={hasPosterImage}
                      hasVideo={hasVideo}
                      posterAsset={project.introVideoImage || {}}
                      videoAsset={project.introVideo || {}}
                      businessDomains={[]}
                      stackValues={[]}
                      caseStudyHref={`/case-studies/${project?.slug}`}
                      ariaLabel={`Open featured case study for ${
                        project?.title || 'Case study'
                      }`}
                    />
                  );
                }

                return (
                  <TilePost
                    key={project?.sys?.id}
                    {...orgProps}
                    featuredText={{
                      heading: {
                        children: project?.title,
                        level: 3,
                      },
                      smartText: {
                        plainText: project?.blurb,
                      },
                      headingMaxLength: 50,
                      plainTextMaxLength: 120,
                    }}
                    linksTo={
                      `/case-studies/${project?.slug}` as CTL_valid_linkTo
                    }
                  />
                );
              })}
            </MasonryGrid>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ExperienceEntry;
