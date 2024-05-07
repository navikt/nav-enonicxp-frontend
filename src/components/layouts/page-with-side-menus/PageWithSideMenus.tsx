import React, { useEffect, useState } from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import { windowMatchMedia } from 'utils/match-media';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import Config from 'config';
import Region from 'components/layouts/Region';
import { RightMenuSection } from './right-menu-section/RightMenuSection';
import { LeftMenuSection } from './left-menu-section/LeftMenuSection';
import { MainContentSection } from './main-content-section/MainContentSection';

import styles from './PageWithSideMenus.module.scss';

const mobileWidthBreakpoint = Config.vars.mobileBreakpointPx;

const mqlWidthBreakpoint = windowMatchMedia(`(min-width: ${mobileWidthBreakpoint}px)`);

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
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

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
        leftMenuToggle,
        leftMenuSticky,
        leftMenuHeader,
        showInternalNav,
        anchorLinks,
        rightMenuToggle,
        rightMenuSticky,
    } = config;

    const { pageContent, topPageContent, topLeftMenu, rightMenu, leftMenu, bottomRow } = regions;

    // The purpose of the topPageContent region is to separate components
    // which should be placed above the left menu in the mobile view
    // Only render this region if the left menu is enabled, or if it already
    // contains components
    const shouldRenderTopContentRegion =
        leftMenuToggle &&
        (topPageContent?.components.length > 0 || pageProps.editorView === 'edit');

    return (
        <LayoutContainer
            className={styles.pageWithSideMenus}
            pageProps={pageProps}
            layoutProps={layoutProps}
        >
            <div className={styles.topRow}>
                {(leftMenuToggle || shouldRenderTopContentRegion) && (
                    <div className={styles.leftCol}>
                        {isMobile !== false && shouldRenderTopContentRegion && (
                            <MainContentSection
                                pageProps={pageProps}
                                regionProps={topPageContent}
                            />
                        )}
                        {leftMenuToggle && (
                            <LeftMenuSection
                                pageProps={pageProps}
                                topRegionProps={topLeftMenu}
                                mainRegionProps={leftMenu}
                                internalLinks={showInternalNav ? anchorLinks : []}
                                menuHeader={leftMenuHeader}
                                sticky={leftMenuSticky}
                            />
                        )}
                    </div>
                )}
                <div className={styles.mainCol}>
                    {isMobile !== true && shouldRenderTopContentRegion && (
                        <>
                            <MainContentSection
                                pageProps={pageProps}
                                regionProps={topPageContent}
                            />
                            <EditorHelp text={'Komponenter ovenfor legges over menyen på mobil'} />
                        </>
                    )}
                    <MainContentSection pageProps={pageProps} regionProps={pageContent} />
                </div>
            </div>
            <Region pageProps={pageProps} regionProps={bottomRow} />
        </LayoutContainer>
    );
};
