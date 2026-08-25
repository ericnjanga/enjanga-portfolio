import type { ContentSectionData } from '@/lib/contentful/models';
import ArrowLink from './ArrowLink';
import InteractiveImage from './InteractiveImage';
import styles from './Home.module.css';

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

export default function AboutSection({ data }: { data: ContentSectionData }) {
  const paragraphs = getParagraphs(data.body.json);

  return (
    <section id="about" className={styles.about}>
      <div className={styles.portrait}>
        <InteractiveImage
          image={data.image}
          alt={data.imageAltText}
          link={data.cta}
          interactionLabel={data.cta?.label}
        />
      </div>
      <div className={styles.aboutCopy}>
        <h2>{data.title}</h2>
        <div className={styles.bodyCopy}>
          {paragraphs.map((paragraph, index) => (
            <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
          ))}
        </div>
        {data.cta && <ArrowLink link={data.cta} />}
      </div>
    </section>
  );
}
