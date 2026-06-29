'use client';

import type { Node } from '@contentful/rich-text-types';
import {
  CP_nameType,
  CP_pictogramMap,
  TileValue,
} from 'enjanga-components-library';
import 'enjanga-components-library/tile-value.css';
import 'enjanga-components-library/content-modal.css';
import 'enjanga-components-library/cms-rich-text.css';
import { useContentfulForClientEntries } from '@/libs/contentful/hooks/useContentfulForClientEntries';
import './styles/index.scss';

type ServiceEntry = {
  sys?: {
    id?: string;
  };
  title?: string;
  slugLabel?: string;
  pictogramName?: string;
  description?: {
    json: {
      content: Node[];
    };
  };
  isEnabled?: boolean;
  order?: number;
};

const EMPTY_DESCRIPTION = {
  json: {
    content: [] as Node[],
  },
};

const getSafePictogramName = (value?: string): CP_nameType => {
  if (value && value in CP_pictogramMap) {
    return value as CP_nameType;
  }

  return 'Goals';
};

export default function ServiceRoute() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useContentfulForClientEntries('Service Entry Collection');

  const items = [...((Array.isArray(data) ? data : []) as ServiceEntry[])]
    .filter((entry) => entry?.isEnabled !== false)
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));

  if (isError) {
    console.error('ServiceRoute: failed to load service entries', error);
  }

  return (
    <section
      className="enj-container pageSection smt-box section-services"
      id="service"
      aria-labelledby="service-heading"
      tabIndex={-1}
    >
      <section style={{ maxWidth: '50rem', marginBottom: '2rem' }}>
        <h2 id="service-heading" className="sectionTitle">
          How I deliver Value {isLoading ? '(loading...)' : items.length}
        </h2>
        {isError ? <p>Service entries failed to load. Check console for details.</p> : null}
        <p>I engineer enterprise user interfaces that are scalable, accessible, high-performing, and built to last—from architecture and implementation to design systems, API integration, testing, and long-term maintainability.</p>
      </section>

      <div className="services-grid">
        {items.map((item, index) => {
          const fallbackTitle = `Service ${index + 1}`;
          const title = item?.title || fallbackTitle;

          return (
            <TileValue
              key={item?.sys?.id || item?.slugLabel || `service-${index}`}
              className="service-tile"
              pictogramName={getSafePictogramName(item?.pictogramName)}
              title={title}
              slug={item?.slugLabel || title.toLowerCase().replace(/\s+/g, '-')}
              description={item?.description || EMPTY_DESCRIPTION}
            />
          );
        })}
      </div>
    </section>
  );
}

