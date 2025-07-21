'use client';

import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { Grid, Column } from '@carbon/react';
import { Banner } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import ContentExpertise from './expertise/ContentExpertise';
import ContentAbout from './ContentAbout';
import ContentBestWork from './ContentBestWork';
import styles from './page.module.scss';
import clsx from 'clsx';

export default function LandingPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const section = searchParams.get('section');

  const mockData = {
    banner: {
      title: 'Bridging Design & Code',
      subtitle:
        'With 15+ years of experience, I specialize in transforming complex business requirements into intuitive, high-performance web applications. I lead end-to-end UX and front-end development through agile, cross-functional collaboration—delivering results that drive business impact.',
    },
  };

  const handleScroll = () => {
    // Logic to detect which section is in view
    console.log('Which section is in view???');
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
    <div className={clsx(styles.homePage)}>
      <Banner
        title={mockData.banner.title}
        subtitle={mockData.banner.subtitle}
      />
      <Grid fullWidth>
        <Column lg={16} md={8} sm={4} className="landing-page__banner"></Column>

        <Column lg={16} md={8} sm={4} className="landing-page__r2">
          <section
            className={clsx(styles.pageSection, 'smt-box section-expertises')}
            id="scope-of-expertise"
            aria-labelledby="scope-of-expertise-heading"
            tabIndex={-1} // Make focusable by default
          >
            <h2
              id="scope-of-expertise-heading"
              className={clsx(styles['section-expertises-heading'])}
            >
              Scope of Expertise
            </h2>

            <ContentExpertise
              className={clsx(styles['section-expertises-tabs'])}
            />
          </section>
        </Column>
      </Grid>

      <Grid fullWidth>
        <Column lg={16} md={8} sm={4}>
          <section
            className={clsx(styles.pageSection, 'smt-box')}
            id="about-me"
            aria-labelledby="about-me-heading"
            tabIndex={-1} // Make focusable by default
          >
            <h2 id="about-me-heading">About me</h2>

            <ContentAbout />
          </section>
        </Column>
      </Grid>

      <Grid fullWidth>
        <Column lg={16} md={8} sm={4}>
          <section
            className={clsx(styles.pageSection, 'smt-box')}
            id="best-work"
            aria-labelledby="best-work-heading"
            tabIndex={-1} // Make focusable by default
          >
            <h2 id="best-work-heading">Best Work</h2>
            <ContentBestWork />
          </section>
        </Column>
      </Grid>
    </div>
  );
}
