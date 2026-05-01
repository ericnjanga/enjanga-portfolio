import { fetchOrganizationBySlug, fetchOrganizations } from '@/libs/organizations';
import type { DynamicPageServerSlug } from '@/libs/types';
import { getDataEntry } from '@utils/dataProcessing';
import ExperienceEntry from '../ExperienceEntry';

/*
 * Tells Next.js which dynamic [slug] routes to pre-render at build time.
 * Fetches all organizations from Contentful and maps their slug fields
 * to route params.
 * Example: an org with slug "acme" generates /experience/acme as a static page.
 */
export async function generateStaticParams() {
  const orgs = await fetchOrganizations();
  return orgs.map((org) => ({ slug: org.slug }));
}

export async function generateMetadata(props: DynamicPageServerSlug) {
  const { slug } = await props.params;
  const org = await fetchOrganizationBySlug(slug);

  return {
    title: `${org?.title} | Eric Njanga`,
    description: org?.subtitle ?? org?.title ?? '',
  };
}

export default async function Page(props: DynamicPageServerSlug) {
  const { slug } = await props.params;
  const org = await fetchOrganizationBySlug(slug);

  const projects = await Promise.all(
    (org?.projects ?? []).map((ref) =>
      getDataEntry('CaseStudy Entry', ref.sys.id).then((d) => d.item)
    )
  );

  return <ExperienceEntry org={org!} projects={projects} />;
}
