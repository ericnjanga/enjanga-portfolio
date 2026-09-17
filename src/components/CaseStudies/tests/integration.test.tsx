import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import type { Document } from '@contentful/rich-text-types';
import CaseStudiesPage from '../CaseStudiesPage';
import CaseStudyBody from '../CaseStudyBody';
import { CaseStudyPage } from 'enjanga-components-library';

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class {
    observe = vi.fn();
    disconnect = vi.fn();
  });
});

afterEach(() => vi.unstubAllGlobals());

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


test('delegates page layout and separators to the library', () => {
  const studies = ['one', 'two', 'three'].map(id => ({ id, slug: `${id} project`, title: id, summary: `${id} summary`, image: null, video: null }));
  render(<CaseStudiesPage data={{ seoTitle: '', seoDescription: '', hero: { title: 'Selected work', subtitle: '' }, caseStudies: studies }} />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Selected work');
  expect(screen.getAllByRole('article')).toHaveLength(3);
  const separators = screen.getAllByRole('separator');
  expect(separators).toHaveLength(2);
  separators.forEach(separator => expect(separator).toHaveClass('enj-case-studies-page__separator'));
  expect(screen.getByRole('link', { name: 'Read the full case study: one' })).toHaveAttribute('href', '/case-studies/one%20project');
});
