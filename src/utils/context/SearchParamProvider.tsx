'use client';

import React from 'react';
import { createContext, useContext } from 'react';
import { useSearchParams, usePathname } from "enjanga-core-setup/next";

type SearchParamData = {
  section: string | null;
};

const SearchParamContext = createContext<SearchParamData>({ section: null });

// Inner component that uses useSearchParams
function SearchParamProviderInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  
  const value: SearchParamData = {
    section: searchParams.get('section')
  };

  return (
    <SearchParamContext.Provider value={value}>
      {children}
    </SearchParamContext.Provider>
  );
}

// Main provider with Suspense boundary
export function SearchParamProvider({ children }: { children: React.ReactNode }) {
  return ( 
    <SearchParamProviderInner>
      {children}
    </SearchParamProviderInner> 
  );
}

export function useSearchParamData() {
  const context = useContext(SearchParamContext);
  if (context === undefined) {
    throw new Error('useSearchParamData must be used inside <SearchParamProvider>');
  }
  return context;
}

export function useIsHomeActiveFlag() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // Case 1: Path is clean and there are no sections at all
  const hasCleanPathAndNoSections = pathname === '/' && !searchParams.has('section');
  // Case 2: Path is clean and the active section is "introduct***"
  const hasCleanPathAndIntroSection = searchParams.has('section') && searchParams.get('section') === 'introduction';

  // The reoute is considered as home if either Case 1 or Case 2
  return hasCleanPathAndNoSections || hasCleanPathAndIntroSection;
}