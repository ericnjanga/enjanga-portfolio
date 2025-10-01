'use client';

import { useEffect } from 'react';
import { useSearchParams, usePathname } from "enjanga-core-setup/next";
import { Grid, Column } from '@carbon/react';
import { Banner, CustomQuotes, CQ_quote_propsType } from 'enjanga-components-library';
import SectionOfTabs from '../../components/SectionOfTabs/index';
import ContentAbout from './ContentAbout';
import ContentBestWork from './ContentBestWork';
import './../home/_home.scss';
import './../home/_home-theming.scss';
import { ContentfulDataProvider } from '@/libs/contentful/dataProvider';
import { BackgroundSection } from '@/components/BackgroundSection';
import { contentfulContentIds } from '@/libs/contentful/contentful-queryConfig';
import { IB_propsType } from '@/libs/contentful/types'; 

export default function LandingPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const section = searchParams.get('section');

  const handleScroll = () => {
    // Logic to detect which section is in view
    // console.log('Which section is in view???');
  };

  /**
   * Listen to when the page scrolls and do something
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Only if we are on the home page, it will only scroll to the designated section
   */
  useEffect(() => {
    // Only scroll if we're on the home page already
    if (pathname === '/' && section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });

        // Set focus on keyboard/screen reader users
        element.setAttribute('tabindex', '-1'); // Make focusable
        element.focus({ preventScroll: true }); // Focus without re-scrolling

        // Update URL without page reload
        window.history.replaceState(null, '', `/?section=${section}`);
      }
    }
  }, [section, pathname]);

  return (
    <div className="homePage">
      <ContentfulDataProvider dataFor="Landing Page Banner">
        {({ title, richDescription }) => (
          <Banner
            featuredText={{
              heading: {
                children: title,
              },
              smartText: {
                richText: richDescription,
              },
            }}
            isHuge={true}
          />
        )}
      </ContentfulDataProvider>

      <ContentfulDataProvider dataFor="Scope of expertise Collection">
        {({ orderedItems }) => {
          return (
            <section
              className="pageSection smt-box section-expertises"
              id="scope-of-expertise"
              aria-labelledby="scope-of-expertise-heading"
              tabIndex={-1} // Make focusable by default
            >
              <SectionOfTabs
                title="Scope of Expertise"
                className="expertise-section-tabs"
                listOfItems={orderedItems as IB_propsType[]}
              />
            </section>
          );
        }}
      </ContentfulDataProvider>

      <BackgroundSection
        className="pageSection aboutSection smt-box"
        id="about-me"
        ariaLabelledby="about-me-heading"
        tabIndex={-1} // Make focusable by default
        parallax={true}
        imageId={contentfulContentIds.categories['Featured Image']}
      >
        <>
          <Grid className="sectionTitle">
            {' '}
            {/*  fullWidth */}
            <Column lg={16} md={8} sm={4}>
              <h2 id="about-me-heading">About me</h2>
            </Column>
          </Grid>
          <Grid>
            {' '}
            {/*  fullWidth */}
            <Column lg={16} md={8} sm={4}>
              <ContentAbout />
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
            <h2 id="engineer-quotes-heading" style={{ display: 'none'}}>
              Quotes
            </h2>


            <ContentfulDataProvider dataFor="Quotes Entry Collection">
              {({ orderedItems }) => (
                <CustomQuotes
                  className="engineer-quotes-component"
                  quotes={orderedItems as CQ_quote_propsType[]}
                />
              )}
            </ContentfulDataProvider>
          </section>
        </Column>
      </Grid>






      <Grid>
        {' '}
        {/*  fullWidth */}
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

            <ContentfulDataProvider dataFor="Case Study Collection">
              {({ orderedItems }) => (
                <ContentBestWork listOfItems={orderedItems as IB_propsType[]} />
              )}
            </ContentfulDataProvider>
          </section>
        </Column>
      </Grid>
    </div>
  );
}
