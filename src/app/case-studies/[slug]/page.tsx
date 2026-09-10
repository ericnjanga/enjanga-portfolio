import type { Metadata } from 'next';
import type { Document } from '@contentful/rich-text-types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCaseStudy } from '@/lib/contentful/fetching/getCaseStudies';
import CaseStudyBody from '@/components/CaseStudies/CaseStudyBody';
import { CaseStudyPage } from 'enjanga-components-library';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300; // 5 minutes, same as the Contentful cache. See https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#incremental-static-regeneration

export async function generateStaticParams() {
  return []; // Static generation, but on-demand for each case study page. See https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#on-demand-dynamic-routes
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = await getCaseStudy((await params).slug);
  return study
    ? { title: `${study.title} — Eric Njanga`, description: study.blurb }
    : { title: 'Case study not found' };
}

export default async function CaseStudy({ params }: Props) {
  const study = await getCaseStudy((await params).slug);
  if (!study) notFound();
  const body = study.description;
  const entries = (
    items: NonNullable<typeof body>['links']['entries']['hyperlink']
  ) =>
    items.flatMap((item) =>
      item?.__typename === 'BlogPost' && item.slug
        ? [{ sys: item.sys, __typename: item.__typename, slug: item.slug }]
        : []
    );

  return (
    <CaseStudyPage title={study.title ?? 'Case study'} description={study.blurb ?? undefined}>
        <Link href="/case-studies">Back to all case studies</Link>
        {body && (
          <CaseStudyBody
            data={{
              json: body.json as Document,
              links: {
                assets: {
                  block: body.links.assets.block.flatMap((asset) =>
                    asset?.url
                      ? [
                          {
                            sys: asset.sys,
                            url: asset.url,
                            title: asset.title ?? '',
                            description: asset.description ?? '',
                            width: asset.width ?? 1200,
                            height: asset.height ?? 800,
                          },
                        ]
                      : []
                  ),
                },
                entries: {
                  hyperlink: entries(body.links.entries.hyperlink),
                  inline: entries(body.links.entries.inline),
                },
              },
            }}
          />
        )}
    </CaseStudyPage>
  );
}
