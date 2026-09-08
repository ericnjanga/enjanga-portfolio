import { Fragment, type ReactNode } from 'react';
import type { Document, Block, Inline, Text } from '@contentful/rich-text-types';

type Asset = { sys: { id: string }; url: string; title: string; description: string; width: number; height: number };
type Entry = { sys: { id: string }; slug: string };
export type CaseStudyBodyProps = { data: {
  json: Document;
  links: { assets: { block: Asset[] }; entries: { hyperlink: Entry[]; inline: Entry[] } };
} };

function safeHref(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  try {
    const url = new URL(value, 'https://portfolio.invalid');
    return ['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol) ? value : undefined;
  } catch { return undefined; }
}

/** CMS adapter: produces semantic markup styled by the library's CaseStudyPage. */
export default function CaseStudyBody({ data }: CaseStudyBodyProps) {
  const assets = new Map(data.links.assets.block.map(asset => [asset.sys.id, asset]));
  const entries = new Map([...data.links.entries.hyperlink, ...data.links.entries.inline].map(entry => [entry.sys.id, entry]));
  function render(node: Block | Inline | Text, key: number): ReactNode {
    if (node.nodeType === 'text') {
      const text = node as Text;
      let value: ReactNode = text.value;
      for (const mark of text.marks) {
        if (mark.type === 'bold') value = <strong>{value}</strong>;
        if (mark.type === 'italic') value = <em>{value}</em>;
        if (mark.type === 'underline') value = <u>{value}</u>;
        if (mark.type === 'code') value = <code>{value}</code>;
        if (mark.type === 'superscript') value = <sup>{value}</sup>;
        if (mark.type === 'subscript') value = <sub>{value}</sub>;
      }
      return <Fragment key={key}>{value}</Fragment>;
    }
    const block = node as Block | Inline;
    const children = block.content.map(render);
    switch (node.nodeType) {
      case 'paragraph': return <p key={key}>{children}</p>;
      case 'heading-1':
      case 'heading-2': return <h2 key={key}>{children}</h2>;
      case 'heading-3': return <h3 key={key}>{children}</h3>;
      case 'heading-4': return <h4 key={key}>{children}</h4>;
      case 'heading-5': return <h5 key={key}>{children}</h5>;
      case 'heading-6': return <h6 key={key}>{children}</h6>;
      case 'hr': return <hr key={key} />;
      case 'blockquote': return <blockquote key={key}>{children}</blockquote>;
      case 'unordered-list': return <ul key={key}>{children}</ul>;
      case 'ordered-list': return <ol key={key}>{children}</ol>;
      case 'list-item': return <li key={key}>{children}</li>;
      case 'hyperlink': return <a key={key} href={safeHref(node.data.uri)}>{children}</a>;
      case 'entry-hyperlink':
      case 'embedded-entry-inline': {
        const entry = entries.get(node.data.target?.sys?.id);
        return entry ? <a key={key} href={`/case-studies/${encodeURIComponent(entry.slug)}`}>{children.length ? children : entry.slug}</a> : <Fragment key={key}>{children}</Fragment>;
      }
      case 'embedded-asset-block':
      case 'asset-hyperlink': {
        const asset = assets.get(node.data.target?.sys?.id);
        const url = safeHref(asset?.url);
        if (!asset || !url) return null;
        if (node.nodeType === 'asset-hyperlink') return <a key={key} href={url}>{children}</a>;
        if (/\.(mp4|webm|ogv)(?:[?#]|$)/i.test(url)) return <p key={key}><a href={url}>▶ Watch walkthrough — {asset.title || 'Video'}</a></p>;
        if (!/\.(png|jpe?g|gif|webp|avif|svg)(?:[?#]|$)/i.test(url)) return <p key={key}><a href={url}>{asset.title || 'Download attachment'}</a></p>;
        // eslint-disable-next-line @next/next/no-img-element
        return <figure key={key}><img src={url} alt={asset.description || asset.title} width={asset.width} height={asset.height} loading="lazy" /></figure>;
      }
      case 'table': return <table key={key}><tbody>{children}</tbody></table>;
      case 'table-row': return <tr key={key}>{children}</tr>;
      case 'table-cell': return <td key={key}>{children}</td>;
      case 'table-header-cell': return <th key={key}>{children}</th>;
      default: return <Fragment key={key}>{children}</Fragment>;
    }
  }
  return <>{data.json.content.map(render)}</>;
}
