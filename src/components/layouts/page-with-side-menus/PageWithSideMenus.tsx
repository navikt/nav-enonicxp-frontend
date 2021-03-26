import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/pages/page-with-side-menus';
import { LeftMenuSection } from './left-menu-section/LeftMenuSection';
import { RightMenuSection } from './right-menu-section/RightMenuSection';
import { MainContentSection } from './main-content-section/MainContentSection';
import { ProductPageLayout } from '@navikt/ds-react';
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
        title,
        leftMenuToggle,
        leftMenuSticky,
        leftMenuHeader,
        showInternalNav,
        anchorLinks,
        rightMenuToggle,
        rightMenuSticky,
    } = config;

    return (
        <ProductPageLayout title={title}>
            {leftMenuToggle && (
                <ProductPageLayout.Section
                    left
                    sticky={leftMenuSticky}
                    whiteBackground={false}
                    withPadding={false}
                >
                    <LeftMenuSection
                        pageProps={pageProps}
                        regionProps={regions.leftMenu}
                        internalLinks={showInternalNav && anchorLinks}
                        menuHeader={leftMenuHeader}
                    />
                </ProductPageLayout.Section>
            )}
            <ProductPageLayout.Section
                whiteBackground={false}
                withPadding={false}
            >
                <MainContentSection
                    pageProps={pageProps}
                    regionProps={regions.pageContent}
                />
            </ProductPageLayout.Section>
            {rightMenuToggle && (
                <ProductPageLayout.Section right sticky={rightMenuSticky}>
                    <RightMenuSection
                        pageProps={pageProps}
                        regionProps={regions.rightMenu}
                    />
                </ProductPageLayout.Section>
            )}
        </ProductPageLayout>
    );
};
