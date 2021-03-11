import React, { useEffect } from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/pages/page-with-side-menus';
import { LeftMenuSection } from './left-menu-section/LeftMenuSection';
import { RightMenuSection } from './right-menu-section/RightMenuSection';
import { MainContentSection } from './main-content-section/MainContentSection';
import { ProductPageLayout } from '@navikt/ds-react';
import { LightBulb, Telephone } from '@navikt/ds-icons';
import './PageWithSideMenus.less';
import { LayoutContainer } from '../LayoutContainer';

type Props = {
    pageProps: ContentProps;
    layoutProps?: PageWithSideMenusProps;
};

export const PageWithSideMenus = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    useEffect(() => {
        const app = document.getElementById('app');
        app.classList.remove('app');
        return () => {
            app.classList.add('app');
        };
    }, []);

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
            <ProductPageLayout.Section left sticky withPadding={false}>
                {leftMenuToggle && (
                    <LeftMenuSection
                        pageProps={pageProps}
                        regionProps={regions.leftMenu}
                        internalLinks={showInternalNav && anchorLinks}
                        menuHeader={leftMenuHeader}
                        stickyToggle={leftMenuSticky}
                    />
                )}
            </ProductPageLayout.Section>
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
                <ProductPageLayout.Section right sticky>
                    <RightMenuSection
                        pageProps={pageProps}
                        regionProps={regions.rightMenu}
                        stickyToggle={rightMenuSticky}
                    />
                </ProductPageLayout.Section>
            )}
        </ProductPageLayout>
    );
};
