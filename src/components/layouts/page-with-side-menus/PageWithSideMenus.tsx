import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/pages/page-with-side-menus';
import { LeftMenuSection } from './left-menu-section/LeftMenuSection';
import { RightMenuSection } from './right-menu-section/RightMenuSection';
import { MainContentSection } from './main-content-section/MainContentSection';
import { ProductPageLayout } from '@navikt/ds-react';
import { ProductPageSection } from '@navikt/ds-react/esm/layouts';
import { LayoutContainer } from '../LayoutContainer';
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
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {/*TODO: Lag egen grid-komponent*/}
            <ProductPageLayout title={title}>
                {leftMenuToggle && (
                    <ProductPageSection
                        left
                        whiteBackground={false}
                        withPadding={false}
                    >
                        <LeftMenuSection
                            pageProps={pageProps}
                            regionProps={regions.leftMenu}
                            internalLinks={showInternalNav && anchorLinks}
                            menuHeader={leftMenuHeader}
                            sticky={leftMenuSticky}
                        />
                    </ProductPageSection>
                )}
                <ProductPageSection whiteBackground={false} withPadding={false}>
                    <MainContentSection
                        pageProps={pageProps}
                        regionProps={regions.pageContent}
                    />
                </ProductPageSection>
                {rightMenuToggle && (
                    <ProductPageSection right sticky={rightMenuSticky}>
                        <RightMenuSection
                            pageProps={pageProps}
                            regionProps={regions.rightMenu}
                        />
                    </ProductPageSection>
                )}
            </ProductPageLayout>
        </LayoutContainer>
    );
};
