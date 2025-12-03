import { Grid, Column } from '@carbon/react';
import { Tile } from 'enjanga-core-setup';

type SkeletonComponentType = {
  name: string;
  minHeight?: number;
};

export const SkeletonComponent = ({
  name,
  minHeight = 100,
}: SkeletonComponentType) => (
  <Grid>
    <Column lg={16} md={8} sm={4}>
      <Tile style={{ marginBottom: '1rem', minHeight }}>
        {`Loading${name ?? <b>{` ${name}`}</b>}...`}
      </Tile>
    </Column>
  </Grid>
);

export const IntroTextSkeleton = () => (
  <div className="skeleton-text-wrapper">
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}></p>
  </div>
);
