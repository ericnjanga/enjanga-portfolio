'use client';

import { Suspense } from 'react';
import { Grid, Column } from '@carbon/react';
import {
  Banner,
  CustomQuotes,
  CQ_quote_propsType,
} from 'enjanga-components-library';
import SectionOfTabs from '../../components/SectionOfTabs/index';
import ContentAbout from './ContentAbout';
import ContentBestWork from './ContentBestWork';
import ContentfulDataProvider from '@/libs/contentful/dataProvider';
import { BackgroundSection } from '@/components/BackgroundSection';
import { ContentModel2 } from '@utils/dataProcessing/types';
import ScrollHandler from './utils/ScrollHandler';
import './../home/_home.scss';
import './../home/styles/expertises/_panels.scss';
import './../home/styles/expertises/_tabs.scss';
import './../home/styles/_about.scss';
import './../home/styles/_quotes.scss';
import './../home/_home-theming.scss';
import type { ContextType1, ContextType2, ContextType3 } from '@utils/dataProcessing/types';

type LandingPageType = {
  banner: ContextType1;
  listExpertise: ContextType2;
  listAbout: ContextType2;
  backgroundImgUrl: string | null;
  listQuotes: ContextType3;
};

export default function LandingPage({
  banner,
  listExpertise,
  listAbout,
  backgroundImgUrl,
  listQuotes
}: LandingPageType) {
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

        <section
          className="pageSection smt-box section-expertises"
          id="scope-of-expertise"
          aria-labelledby="scope-of-expertise-heading"
          tabIndex={-1} // Make focusable by default
        >
          <SectionOfTabs
            title="Scope of Expertise"
            className="expertise-section-tabs-wrapper"
            listOfItems={listExpertise?.items as ContentModel2[]}
          />
        </section>

        <BackgroundSection
          className="pageSection aboutSection smt-box"
          id="about-me"
          ariaLabelledby="about-me-heading"
          tabIndex={-1} // Make focusable by default
          imageUrl={backgroundImgUrl}
          parallax={true}
        >
          <>
            <Grid className="sectionTitle">
              {' '}
              <Column lg={16} md={8} sm={4}>
                <h2 id="about-me-heading">About me</h2>
              </Column>
            </Grid>
            <Grid>
              {' '}
              <Column lg={16} md={8} sm={4}>
                <ContentAbout {...listAbout} />
              </Column>
            </Grid>
          </>
        </BackgroundSection>

        <Grid>
          <Column lg={16} md={8} sm={4}>
            <section
              className="pageSection smt-box"
              id="engineer-quotes"
              aria-labelledby="best-work-heading"
              tabIndex={-1} // Make focusable by default
            >
              <h2 id="engineer-quotes-heading" style={{ display: 'none' }}>
                Quotes
              </h2>

              <CustomQuotes
                className="engineer-quotes-component"
                quotes={listQuotes.items as CQ_quote_propsType[]}
              />
            </section>
          </Column>
        </Grid>

        <Grid>
          {' '}
          <Column lg={16} md={8} sm={4}>
            <section
              className="pageSection smt-box"
              id="best-work"
              aria-labelledby="best-work-heading"
              tabIndex={-1} // Make focusable by default
            >
              <h2 id="best-work-heading" className="sectionTitle">
                Best Work
              </h2>

              <ContentfulDataProvider dataFor="CaseStudy Entry Collection">
                {({ items }) => <ContentBestWork listOfItems={items} />}
              </ContentfulDataProvider>
            </section>
          </Column>
        </Grid>
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
