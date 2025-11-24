'use client';

import { createContext, useContext } from 'react';
import type { ContextType2 } from '@utils/dataProcessing/types';

export type ScopeOfExpDataType = {
  parentId: string | undefined;
  data: ContextType2;
}[];

const ScopeOfExp = createContext<ScopeOfExpDataType | null>(null);

export function ScopeOfProvider({
  value,
  children,
}: {
  value: ScopeOfExpDataType;
  children: React.ReactNode;
}) {
  return <ScopeOfExp.Provider value={value}>{children}</ScopeOfExp.Provider>;
}

export function useScopeOfExpData() {
  const ctx = useContext(ScopeOfExp);
  if (!ctx) {
    throw new Error('useScopeOfExpData must be used inside <ScopeOfProvider>');
  }
  return ctx;
}
