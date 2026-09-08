import { CaseStudiesPage as LibraryCaseStudiesPage } from 'enjanga-components-library';
import type { CaseStudiesPageData } from '@/lib/contentful/models';

export default function CaseStudiesPage({ data }: { data: CaseStudiesPageData }) {
  return <LibraryCaseStudiesPage title={data.hero.title} caseStudies={data.caseStudies.map(study => ({
    id: study.id,
    title: study.title,
    description: study.summary,
    posterSrc: study.image?.url,
    posterAlt: study.image?.description ?? '',
    videoSrc: study.video?.url,
    videoType: study.video?.contentType,
    caseStudyHref: `/case-studies/${encodeURIComponent(study.slug)}`,
  }))} />;
}
