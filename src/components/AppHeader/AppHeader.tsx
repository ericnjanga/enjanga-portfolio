import React, { Suspense } from 'react';
import { AppHeader, BrandLogo } from 'enjanga-components-library';
import { GlobalActions, GlobalNav } from '../GlobalMenus';
import { AppUseUtility } from '@utils/UtilityContext';
import {
  SearchParamProvider,
  useIsHomeActiveFlag,
} from '@utils/context/SearchParamProvider';
import './_App-header.scss';


// Wrapping the entire component with <Suspen** /> to fulfill all requirements
export const AppHeaderWrapper = () => (
  <Suspense>
    <AppHeaderWithExtra />
  </Suspense>
);

/**
 * <AppHea*** /> component from the library with custom hooks in need of <Suspen** />:
 * - AppUseUtility
 * - useIsHomeActiveFlag
 * @returns
 */
const AppHeaderWithExtra = () => {
  const { brand } = AppUseUtility();

  // Check if current route is home route
  const isHomeRoute = useIsHomeActiveFlag();

  return (
    <AppHeader
      brandLabel={brand.name}
      brandRoute="/"
      brand={<BrandLogo value={brand.name} />}
      isHomeRoute={isHomeRoute}
      navigation={
        <SearchParamProvider>
          <GlobalNav />
        </SearchParamProvider>
      }
      globalBarItems={<GlobalActions />}
    />
  );
};
