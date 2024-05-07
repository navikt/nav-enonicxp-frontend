import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { PageNavigationMenuV2 } from 'components/_common/page-navigation-menu-v2/PageNavigationMenuV2';
import { MainContentSection } from './main-content-section/MainContentSection';

import styles from './PageWithSideMenus.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: PageWithSideMenusProps;
};

export const PageWithSideMenus = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    // This is used for positioning elements specifically for desktop or mobile
    // We use both a CSS and javascript matchmedia solution, to avoid visible layout-shifts
    // on client-side hydration, and to avoid duplicating elements in the DOM on the client
    // (prevents issues such as duplicate ids)

    if (!regions || !config) {
        return null;
    }

    const {
        leftMenuToggle,
        leftMenuSticky,
        leftMenuHeader,
        showInternalNav,
        anchorLinks,
        rightMenuToggle,
        rightMenuSticky,
    } = config;

    const { pageContent, topPageContent, topLeftMenu, rightMenu, leftMenu, bottomRow } = regions;

    return (
        <LayoutContainer
            className={styles.pageWithSideMenus}
            pageProps={pageProps}
            layoutProps={layoutProps}
        >
            <MainContentSection pageProps={pageProps} regionProps={topPageContent} />
            {/* <LeftMenuSection
                                pageProps={pageProps}
                                topRegionProps={topLeftMenu}
                                mainRegionProps={leftMenu}
                                internalLinks={showInternalNav ? anchorLinks : []}
                                menuHeader={leftMenuHeader}
                                sticky={leftMenuSticky}
                            /> */}
            <PageNavigationMenuV2 anchorLinks={showInternalNav ? anchorLinks : []} />
            <MainContentSection pageProps={pageProps} regionProps={pageContent} />
            <Region pageProps={pageProps} regionProps={bottomRow} />
        </LayoutContainer>
    );
};
