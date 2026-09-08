'use client';

import { Button } from 'enjanga-components-library';

export default function RecoveryScreen({ retry, caseStudy = false }: {
  retry: () => void;
  caseStudy?: boolean;
}) {
  return <main style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px', minHeight: '60vh' }}>
    <h1>{caseStudy ? 'This case study is temporarily unavailable' : 'This page is temporarily unavailable'}</h1>
    <p style={{ margin: '24px 0' }}>We couldn’t load the page. Please try again in a moment.</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Button onClick={retry}>Try again</Button>
      <Button href={caseStudy ? '/case-studies' : '/'} variant="secondary">
        {caseStudy ? 'Back to case studies' : 'Back to home'}
      </Button>
    </div>
  </main>;
}
