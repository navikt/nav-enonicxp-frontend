import React, { useEffect, useState } from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/pages/page-with-side-menus';
import { LeftMenuSection } from './left-menu-section/LeftMenuSection';
import { RightMenuSection } from './right-menu-section/RightMenuSection';
import { MainContentSection } from './main-content-section/MainContentSection';
import { ProductPageLayout } from '@navikt/ds-react';
import { ProductPageSection } from '@navikt/ds-react/esm/layouts';
import { LayoutContainer } from '../LayoutContainer';
import { windowMatchMedia } from '../../../utils/match-media';
import { EditorHelp } from '../../_common/editor-help/EditorHelp';
import './PageWithSideMenus.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: PageWithSideMenusProps;
};

const mobileWidthBreakpoint = 648;

const mqlWidthBreakpoint = windowMatchMedia(
    `(min-width: ${mobileWidthBreakpoint}px)`
);

export const PageWithSideMenus = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateLayout = () => {
            setIsMobile(window.innerWidth < mobileWidthBreakpoint);
        };

        updateLayout();

        mqlWidthBreakpoint.addEventListener('change', updateLayout);
        return () => {
            mqlWidthBreakpoint.removeEventListener('change', updateLayout);
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
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {/*TODO: Lag egen grid-komponent*/}
            <ProductPageLayout title={title}>
                {isMobile && regions.topPageContent && (
                    <ProductPageSection
                        whiteBackground={false}
                        withPadding={false}
                    >
                        <MainContentSection
                            pageProps={pageProps}
                            regionProps={regions.topPageContent}
                        />
                    </ProductPageSection>
                )}
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
                    {!isMobile && regions.topPageContent && (
                        <>
                            <MainContentSection
                                pageProps={pageProps}
                                regionProps={regions.topPageContent}
                            />
                            <EditorHelp
                                helpText={
                                    'Komponenter ovenfor legges over menyen på mobil'
                                }
                            />
                        </>
                    )}
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
