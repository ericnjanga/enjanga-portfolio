import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import type { Document } from '@contentful/rich-text-types';
import CaseStudiesPage from '../CaseStudiesPage';
import CaseStudyBody from '../CaseStudyBody';
import { CaseStudyPage } from 'enjanga-components-library';

test('maps Contentful summaries to published library cards', () => {
  render(<CaseStudiesPage data={{ seoTitle: '', seoDescription: '', hero: { title: 'Work', subtitle: '' }, caseStudies: [{ id: 'one', slug: 'sample', title: 'Sample project', summary: 'Project summary', image: null, video: null }] }} />);
  expect(screen.getByRole('article')).toHaveClass('enj-case-study-card');
  expect(screen.getByRole('link', { name: 'Read the full case study: Sample project' })).toHaveAttribute('href', '/case-studies/sample');
});

test('renders CMS formatting and media links inside the library detail page', () => {
  const json = { nodeType: 'document', data: {}, content: [
    { nodeType: 'paragraph', data: {}, content: [{ nodeType: 'text', value: 'Important context', marks: [{ type: 'bold' }], data: {} }] },
    { nodeType: 'embedded-asset-block', data: { target: { sys: { id: 'video' } } }, content: [] },
    { nodeType: 'hyperlink', data: { uri: 'javascript:alert(1)' }, content: [{ nodeType: 'text', value: 'Unsafe link', marks: [], data: {} }] },
  ] } as unknown as Document;
  render(<CaseStudyPage title="Project"><CaseStudyBody data={{ json, links: { assets: { block: [{ sys: { id: 'video' }, url: 'https://videos.ctfassets.net/example.mp4', title: 'Demo', description: '', width: 1200, height: 800 }] }, entries: { hyperlink: [], inline: [] } } }} /></CaseStudyPage>);
  expect(screen.getByText('Important context').tagName).toBe('STRONG');
  expect(screen.getByRole('link', { name: /Watch walkthrough/ })).toHaveAttribute('href', 'https://videos.ctfassets.net/example.mp4');
  expect(screen.getByText('Unsafe link')).not.toHaveAttribute('href');
});
