import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from '../LayoutContainer';
import { LeftMenuSection } from './left-menu-section/LeftMenuSection';
import { RightMenuSection } from './right-menu-section/RightMenuSection';
import { Layout } from '@navikt/ds-react';
import { MainContentSection } from './main-content-section/MainContentSection';
import { PageHeader } from '../../_common/page-header/PageHeader';
import './PageWithSideMenus.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: PageWithSideMenusProps;
};

export const PageWithSideMenus = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!regions || !config) {
        return null;
    }

    const {
        pageHeader,
        leftMenuToggle,
        leftMenuSticky,
        leftMenuHeader,
        showInternalNav,
        anchorLinks,
        rightMenuToggle,
        rightMenuSticky,
    } = config;

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <PageHeader pageHeader={pageHeader} />
            <Layout>
                {leftMenuToggle && (
                    <LeftMenuSection
                        pageProps={pageProps}
                        regionProps={regions.leftMenu}
                        internalLinks={showInternalNav && anchorLinks}
                        menuHeader={leftMenuHeader}
                        stickyToggle={leftMenuSticky}
                    />
                )}
                <MainContentSection
                    pageProps={pageProps}
                    regionProps={regions.pageContent}
                />
                {rightMenuToggle && (
                    <RightMenuSection
                        pageProps={pageProps}
                        regionProps={regions.rightMenu}
                        stickyToggle={rightMenuSticky}
                    />
                )}
            </Layout>
        </LayoutContainer>
    );
};
