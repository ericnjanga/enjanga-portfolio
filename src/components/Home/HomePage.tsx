import { HomePage as LibraryHomePage } from 'enjanga-components-library';
import type { HomePageData } from '@/lib/contentful/models';
import ArrowLink from './ArrowLink';
import InteractiveImage from './InteractiveImage';
import ScrollReveal from './ScrollReveal';

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
      SectionWrapper={ScrollReveal}
      expertise={{
        title: expertise.title,
        items: expertise.expertiseItemsCollection.items,
        action: expertise.cta && <ArrowLink link={expertise.cta} />,
        image: expertise.image && (
          <InteractiveImage
            image={expertise.image}
            alt={expertise.imageAltText}
            link={expertise.cta}
            interactionLabel={expertise.cta?.label}
          />
        ),
      }}
      about={{
        title: about.title,
        paragraphs: getParagraphs(about.body.json),
        action: about.cta && <ArrowLink link={about.cta} />,
        image: (
          <InteractiveImage
            image={about.image}
            alt={about.imageAltText}
            link={about.cta}
            interactionLabel={about.cta?.label}
          />
        ),
      }}
    />
  );
}
