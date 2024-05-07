import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { PageNavigationMenuV2 } from 'components/_common/page-navigation-menu-v2/PageNavigationMenuV2';

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

    const { leftMenuToggle, leftMenuHeader, showInternalNav, anchorLinks } = config;

    const { pageContent, topPageContent, bottomRow } = regions;

    return (
        <LayoutContainer
            className={styles.pageWithSideMenus}
            pageProps={pageProps}
            layoutProps={layoutProps}
        >
            <Region pageProps={pageProps} regionProps={topPageContent} />

            {leftMenuToggle && ( //TODO rename til menuToggle/pageMenuToggle elns
                <PageNavigationMenuV2
                    anchorLinks={showInternalNav ? anchorLinks : []}
                    menuHeader={leftMenuHeader}
                />
            )}

            <Region pageProps={pageProps} regionProps={pageContent} />
            <Region pageProps={pageProps} regionProps={bottomRow} />
        </LayoutContainer>
    );
};
