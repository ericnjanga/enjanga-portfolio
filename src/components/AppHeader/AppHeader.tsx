import React, { Suspense, useEffect } from 'react';
import { AppHeader, BrandLogo } from 'enjanga-components-library';
import { GlobalActions, GlobalNav } from '../GlobalMenus';
import { AppUseUtility } from '@utils/UtilityContext';
import {
  SearchParamProvider,
  useIsHomeActiveFlag,
} from '@utils/context/SearchParamProvider';
import { useLogoClick } from '@utils/navigation';
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
  const { handleLogoClick } = useLogoClick();

  useEffect(() => {
    // Add click listener to logo/brand element
    const brandElement = document.querySelector<HTMLElement>('.cds--header__name');

    if (!brandElement) {
      return undefined;
    }

    brandElement.addEventListener('click', handleLogoClick);

    return () => {
      brandElement.removeEventListener('click', handleLogoClick);
    };
  }, [handleLogoClick]);

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
