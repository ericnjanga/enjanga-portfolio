import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContentContextValue {
  title: string;
  blurb?: string;
  description: string;
}

// Create the context
const ContentContext = createContext<ContentContextValue | undefined>(
  undefined
);

// Provider Component with Render Props support
interface ContentfulFetcherProps {
  children: (props: ContentContextValue) => ReactNode;
}

export const ContentfulFetcher: React.FC<ContentfulFetcherProps> = ({
  children,
}) => {
  const [title] = useState('Hello from Context');
  const [blurb] = useState('Marzipan cake I love shortbread lollipop.');
  const [description] = useState(
    'Soufflé marshmallow I love cheesecake bonbon. Toffee macaroon croissant macaroon sweet roll. Jelly brownie ice cream wafer sugar plum macaroon. Marzipan cake I love shortbread lollipop.'
  );

  const value: ContentContextValue = { title, blurb, description };

  return <>{children(value)}</>;
};

// Custom hook for child components if needed
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentfulFetcher');
  }
  return context;
};
