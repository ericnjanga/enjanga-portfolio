'use client';

import { createContext, useContext } from 'react';
import type { ContextType2 } from '@utils/dataProcessing/types';

export type ExpertiseDataType = {
  parentId: string | undefined;
  data: ContextType2;
}[];

const Expertise = createContext<ExpertiseDataType | null>(null);

export function ExpertiseProvider({
  value,
  children,
}: {
  value: ExpertiseDataType;
  children: React.ReactNode;
}) {
  return <Expertise.Provider value={value}>{children}</Expertise.Provider>;
}

export function useExpertiseData() {
  const ctx = useContext(Expertise);
  if (!ctx) {
    throw new Error('useExpertiseData must be used inside <ExpertiseProvider>');
  }
  return ctx;
}
