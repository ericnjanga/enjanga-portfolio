import React, { Suspense } from 'react';
import { AppHeader, BrandLogo } from 'enjanga-components-library';
import { GlobalActions, GlobalNav } from '../GlobalMenus';
import { AppUseUtility } from '@utils/UtilityContext';
import {
  SearchParamProvider,
  useIsHomeActiveFlag,
} from '@utils/context/SearchParamProvider';
import { Theme } from "@carbon/react";
import 'enjanga-components-library/app-header.css'; // Styling for <AppHea** /> component
import './_appHeader.scss';

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
  const isHomeRoute = useIsHomeActiveFlag();

  return (
    <Theme theme="g10">
      <AppHeader
        brandLabel={brand.name}
        brandRoute="/"
        brand={<BrandLogo value={brand.name} />}
        isHomeRoute={isHomeRoute}
        navigation={
          <Suspense fallback={null}>
            <SearchParamProvider>
              <GlobalNav />
            </SearchParamProvider>
          </Suspense>
        }
        globalBarItems={<GlobalActions />}
      />
    </Theme>
  );
};
