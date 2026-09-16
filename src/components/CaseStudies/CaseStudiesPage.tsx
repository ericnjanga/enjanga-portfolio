import { Fragment } from 'react';
import { CaseStudyCard, PageHero, ScrollReveal } from 'enjanga-components-library';
import type { CaseStudiesPageData } from '@/lib/contentful/models';
import styles from './CaseStudiesPage.module.css';

export default function CaseStudiesPage({ data }: { data: CaseStudiesPageData }) {
  return (
    <main className="enj-case-studies-page">
      <div className="enj-case-studies-page__container">
        <PageHero className="enj-case-studies-page__hero" title={data.hero.title} />
        <div className={`enj-case-studies-page__list ${styles.list}`}>
          {data.caseStudies.map((study, index) => (
            <Fragment key={study.id}>
              {index > 0 && <hr className={styles.separator} />}
              <ScrollReveal>
                <CaseStudyCard
                  id={study.id}
                  title={study.title}
                  description={study.summary}
                  posterSrc={study.image?.url}
                  posterAlt={study.image?.description ?? ''}
                  videoSrc={study.video?.url}
                  videoType={study.video?.contentType}
                  caseStudyHref={`/case-studies/${encodeURIComponent(study.slug)}`}
                />
              </ScrollReveal>
            </Fragment>
          ))}
          {!data.caseStudies.length && (
            <p>Case studies are coming soon. Check back for new work.</p>
          )}
        </div>
      </div>
    </main>
  );
}
