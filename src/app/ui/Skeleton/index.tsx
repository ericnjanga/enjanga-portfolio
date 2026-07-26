type SkeletonComponentType = {
  name: string;
  theme?: 'light' | 'dark';
  minHeight?: number;
};

export const SkeletonComponent = ({
  name,
  theme = 'light',
  minHeight = 100,
}: SkeletonComponentType) => {
  const backgroundColor = theme === 'dark' ? '#191947' : '#e3ebf9';
  const color = theme === 'dark' ? '#fff' : '#262626';

  return (
    <div style={{ margin: '0 auto', maxWidth: '1584px' }}>
      <div
        style={{
          minHeight,
          padding: 16,
          marginBottom: 16,
          backgroundColor,
          color,
        }}
        role="status"
        aria-live="polite"
      >
        Loading <b>{name}</b>...
      </div>
    </div>
  );
};

export const IntroTextSkeleton = () => (
  <div className="skeleton-text-wrapper" aria-hidden="true">
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}
    ></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}
    ></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}
    ></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}
    ></p>
  </div>
);
