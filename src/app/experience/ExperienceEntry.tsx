'use client';

import React from 'react';
import type { Organization } from '@/libs/organizations/types';
import type { ContentModel1 } from '@utils/dataProcessing/types';
import { Banner, CMSRichText, TilePost, CTL_valid_linkTo } from 'enjanga-components-library';
import 'enjanga-components-library/banner.css';
import 'enjanga-components-library/cms-rich-text.css';
import 'enjanga-components-library/tile-post.css';
import { useDataDistributorData } from '@utils/context/DataDistributorContext';
import { enjGetLayout } from '@libs/layouts';
import 'styles/blogs-and-articles/index.scss';

type ExperienceEntryProps = {
  org: Organization;
  projects: ContentModel1[];
};

const ExperienceEntry = ({ org, projects }: ExperienceEntryProps) => {
  const { banners } = useDataDistributorData();
  const layoutGridStyle = React.useMemo(() => {
    return enjGetLayout({ type: 'RAM', itemMaxWidth: 350, gridGap: 1.8 });
  }, []);

  console.log('-----> ExperienceEntry rendered with org:', org);

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
      <article className="page-content">
        <div className="enj-container">
          <div style={{ maxWidth: 930 }}>
            <section>
              {org.subtitle && <h2>{org.subtitle}</h2>}
              <CMSRichText data={org.description} />
            </section>

            <h2>Best work done for this organization</h2>
            <div style={layoutGridStyle}>
              {projects?.map((project, i) => {
                return (
                  <TilePost
                    key={project?.sys?.id ?? project?.title ?? i}
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
                    linksTo={`/blog/${project?.slug}` as CTL_valid_linkTo}
                  />
                );
              })}
            </div>


            
          </div>
        </div>
      </article>
    </div>
  );
};

export default ExperienceEntry;
