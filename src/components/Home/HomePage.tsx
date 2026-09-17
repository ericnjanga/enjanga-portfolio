import {
  HomePage as LibraryHomePage,
  Button,
  InteractiveImage,
} from 'enjanga-components-library';
import type { HomePageData } from '@/lib/contentful/models';

type RichNode = {
  nodeType?: string;
  value?: string;
  content?: RichNode[];
};

function textFromNode(node: RichNode): string {
  if (node.nodeType === 'text') return node.value ?? '';
  return (node.content ?? []).map(textFromNode).join('');
}

function getParagraphs(json: unknown): string[] {
  const document = json as RichNode | null;
  return (document?.content ?? [])
    .map(textFromNode)
    .map((text) => text.trim())
    .filter(Boolean);
}

export default function HomePage({ data }: { data: HomePageData }) {
  const expertise = data.expertiseSection;
  const about = data.aboutSection;
  return (
    <LibraryHomePage
      title={data.hero.title}
      description={data.hero.subtitle}
      heroAction={
        <Button variant="primary" icon="chevron-down" href="/#expertise">
          Expertise
        </Button>
      }
      expertise={{
        title: expertise.title,
        items: expertise.expertiseItemsCollection.items,
        action: expertise.cta && (
          <Button
            variant="primary"
            icon="chevron-right"
            href={expertise.cta.href}
            aria-label={expertise.cta.accessibleLabel || expertise.cta.label}
            target={expertise.cta.openInNewTab ? '_blank' : undefined}
          >
            {expertise.cta.label}
          </Button>
        ),
        image: expertise.image && (
          <InteractiveImage
            src={expertise.image.url}
            width={expertise.image.width}
            height={expertise.image.height}
            alt={expertise.imageAltText || expertise.image.description}
            href={expertise.cta?.href}
            target={expertise.cta?.openInNewTab ? '_blank' : undefined}
            aria-label={expertise.cta?.accessibleLabel || expertise.cta?.label}
            interactionLabel={expertise.cta?.label}
          />
        ),
      }}
      about={{
        title: about.title,
        paragraphs: getParagraphs(about.body.json),
        action: about.cta && (
          <Button
            variant="primary"
            icon="chevron-right"
            href={about.cta.href}
            aria-label={about.cta.accessibleLabel || about.cta.label}
            target={about.cta.openInNewTab ? '_blank' : undefined}
          >
            {about.cta.label}
          </Button>
        ),
        image: (
          <InteractiveImage
            variant="portrait"
            src={about.image.url}
            width={about.image.width}
            height={about.image.height}
            alt={about.imageAltText || about.image.description}
            href={about.cta?.href}
            target={about.cta?.openInNewTab ? '_blank' : undefined}
            aria-label={about.cta?.accessibleLabel || about.cta?.label}
            interactionLabel={about.cta?.label}
          />
        ),
      }}
    />
  );
}
