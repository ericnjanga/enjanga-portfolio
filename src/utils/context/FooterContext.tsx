import { createContext, useContext } from 'react';
import type { ContextType1 } from '@utils/dataProcessing/types';

type FooterData = ContextType1[];

const FooterContext = createContext<FooterData | null>(null);

export function FooterProvider({
  value,
  children,
}: {
  value: FooterData;
  children: React.ReactNode;
}) {
  return (
    <FooterContext.Provider value={value}>
      {children}
    </FooterContext.Provider>
  );
}

export function useFooterData() {
  const ctx = useContext(FooterContext);
  if (!ctx) {
    throw new Error('useFooterData must be used inside <FooterProvider>');
  }
  return ctx;
}
