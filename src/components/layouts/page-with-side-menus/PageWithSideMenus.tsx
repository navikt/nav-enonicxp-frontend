import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { PageNavigationMenu } from 'components/_common/page-navigation-menu/PageNavigationMenu';

import styles from './PageWithSideMenus.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: PageWithSideMenusProps;
};

export const PageWithSideMenus = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

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

            {leftMenuToggle && ( //TODO rename til menuToggle/pageMenuToggle elns. Må også endre i enonic
                <PageNavigationMenu
                    anchorLinks={showInternalNav ? anchorLinks : []}
                    title={leftMenuHeader}
                />
            )}

            <Region pageProps={pageProps} regionProps={pageContent} />
            <Region pageProps={pageProps} regionProps={bottomRow} />
        </LayoutContainer>
    );
};
