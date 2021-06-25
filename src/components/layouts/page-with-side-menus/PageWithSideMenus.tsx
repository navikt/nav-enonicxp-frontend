import React, { useEffect, useState } from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from '../LayoutContainer';
import { MainContentSection } from './main-content-section/MainContentSection';
import { LeftMenuSection } from './left-menu-section/LeftMenuSection';
import { RightMenuSection } from './right-menu-section/RightMenuSection';
import { windowMatchMedia } from '../../../utils/match-media';
import { EditorHelp } from '../../_common/editor-help/EditorHelp';
import './PageWithSideMenus.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: PageWithSideMenusProps;
};

const mobileWidthBreakpoint = 768;

const mqlWidthBreakpoint = windowMatchMedia(
    `(min-width: ${mobileWidthBreakpoint}px)`
);

export const PageWithSideMenus = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    // This is used for positioning elements specifically for desktop or mobile
    // We use both a CSS and javascript matchmedia solution, to avoid "jumpy" behaviour
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

    // The purpose of the topPageContent region is to separate components
    // which should be placed above the left menu in the mobile view
    // Only render this region if the left menu is enabled, or if it already
    // contains components
    const shouldRenderTopContentRegion =
        leftMenuToggle &&
        (regions.topPageContent?.components.length > 0 ||
            pageProps.editorView === 'edit');

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <div className={'left-col'}>
                {isMobile !== false && shouldRenderTopContentRegion && (
                    <MainContentSection
                        pageProps={pageProps}
                        regionProps={regions.topPageContent}
                    />
                )}
                {leftMenuToggle && (
                    <LeftMenuSection
                        pageProps={pageProps}
                        topRegionProps={regions.topLeftMenu}
                        mainRegionProps={regions.leftMenu}
                        internalLinks={showInternalNav && anchorLinks}
                        menuHeader={leftMenuHeader}
                        sticky={leftMenuSticky}
                    />
                )}
            </div>
            <div className={'main-col'}>
                {isMobile !== true && shouldRenderTopContentRegion && (
                    <>
                        <MainContentSection
                            pageProps={pageProps}
                            regionProps={regions.topPageContent}
                        />
                        <EditorHelp
                            text={
                                'Komponenter ovenfor legges over menyen på mobil'
                            }
                        />
                    </>
                )}
                <MainContentSection
                    pageProps={pageProps}
                    regionProps={regions.pageContent}
                />
            </div>
            {rightMenuToggle && (
                <div className={'right-col'}>
                    <RightMenuSection
                        pageProps={pageProps}
                        regionProps={regions.rightMenu}
                        sticky={rightMenuSticky}
                    />
                </div>
            )}
        </LayoutContainer>
    );
};
