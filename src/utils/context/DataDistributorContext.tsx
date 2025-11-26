import { createContext, useContext } from 'react';
import type { ContextType1 } from '@utils/dataProcessing/types';

type DataDistributorData = {
  footer: ContextType1[];
  banners: {
    imgUrl: string | null;
  };
};



const DataDistributorContext = createContext<DataDistributorData | null>(null);

export function DataDistributorProvider({
  value,
  children,
}: {
  value: DataDistributorData;
  children: React.ReactNode;
}) {
  return (
    <DataDistributorContext.Provider value={value}>
      {children}
    </DataDistributorContext.Provider>
  );
}

export function useDataDistributorData() {
  const ctx = useContext(DataDistributorContext);
  if (!ctx) {
    throw new Error('useDataDistributorData must be used inside <DataDistributorProvider>');
  }
  return ctx;
}
