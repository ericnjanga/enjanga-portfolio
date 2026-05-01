'use client';

import type { Organization } from '@/libs/organizations/types';
import type { ContentModel1 } from '@utils/dataProcessing/types';
import { Banner, CMSRichText } from 'enjanga-components-library';
import 'enjanga-components-library/banner.css';
import 'enjanga-components-library/cms-rich-text.css';
import { useDataDistributorData } from '@utils/context/DataDistributorContext';
import 'styles/blogs-and-articles/index.scss';

type ExperienceEntryProps = {
  org: Organization;
  projects: ContentModel1[];
};

const ExperienceEntry = ({ org, projects }: ExperienceEntryProps) => {
  const { banners } = useDataDistributorData();

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
            {org.subtitle && <h2>{org.subtitle}</h2>}
            <CMSRichText data={org.description} />

            <h2>Best work done for this organization</h2>
            <ul>
              {projects.map((project, i) => (
                <li key={project.title ?? i}>{project.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ExperienceEntry;
