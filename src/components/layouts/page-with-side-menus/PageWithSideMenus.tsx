import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { PageNavigationMenu } from 'components/_common/page-navigation-menu/PageNavigationMenu';
import { GeneralPageHeader } from 'components/_common/headers/general-page-header/GeneralPageHeader';

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

    const { leftMenuHeader, showInternalNav, anchorLinks } = config;

    const { pageContent, topPageContent, bottomRow } = regions;

    const useGeneralPageHeader = pageProps.type === ContentType.ProductPage;

    return (
        <LayoutContainer
            className={styles.pageWithSideMenus}
            pageProps={pageProps}
            layoutProps={layoutProps}
        >
            {useGeneralPageHeader && <GeneralPageHeader pageProps={pageProps} />}
            <Region pageProps={pageProps} regionProps={topPageContent} />
            {showInternalNav && (
                <PageNavigationMenu anchorLinks={anchorLinks} title={leftMenuHeader} />
            )}
            <Region pageProps={pageProps} regionProps={pageContent} />
            <Region pageProps={pageProps} regionProps={bottomRow} />
        </LayoutContainer>
    );
};
