'use client';

import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderGlobalBar,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from '@carbon/react';

import Navigation from './Navigation';
import ActionItems from './ActionItems';
import { BrandName } from '../BrandName';

import Link from 'next/link';

interface HeaderContainerType {
  isSideNavExpanded: boolean;
  onClickSideNavExpand: () => void;
}

const AppHeader = () => {
  const mockData = {
    brandName: '**** ******',
  };

  return (
    <HeaderContainer
      render={({
        isSideNavExpanded,
        onClickSideNavExpand,
      }: HeaderContainerType) => (
        <Header aria-label={mockData.brandName}>
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName prefix="" as={Link} href="/" passHref>
            <BrandName />
          </HeaderName>
          <HeaderNavigation aria-label={mockData.brandName}>
            <Navigation />
          </HeaderNavigation>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}
          >
            <SideNavItems>
              <HeaderSideNavItems>
                <Navigation />
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
          <HeaderGlobalBar>
            <ActionItems />
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
};

export default AppHeader;
