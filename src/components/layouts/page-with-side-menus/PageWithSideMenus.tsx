import React, { useEffect, useState } from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from '../LayoutContainer';
import { MainContentSection } from './main-content-section/MainContentSection';
import { LeftMenuSection } from './left-menu-section/LeftMenuSection';
import { RightMenuSection } from './right-menu-section/RightMenuSection';
import { windowMatchMedia } from '../../../utils/match-media';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import Config from '../../../config';
import Region from '../Region';

const mobileWidthBreakpoint = Config.vars.mobileBreakpointPx;

const mqlWidthBreakpoint = windowMatchMedia(
    `(min-width: ${mobileWidthBreakpoint}px)`
);

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

    const {
        pageContent,
        topPageContent,
        topLeftMenu,
        rightMenu,
        leftMenu,
        bottomRow,
    } = regions;

    // The purpose of the topPageContent region is to separate components
    // which should be placed above the left menu in the mobile view
    // Only render this region if the left menu is enabled, or if it already
    // contains components
    const shouldRenderTopContentRegion =
        leftMenuToggle &&
        (topPageContent?.components.length > 0 ||
            pageProps.editorView === 'edit');

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <div className={'top-row'}>
                {(leftMenuToggle || shouldRenderTopContentRegion) && (
                    <div className={'left-col'}>
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
                                internalLinks={showInternalNav && anchorLinks}
                                menuHeader={leftMenuHeader}
                                sticky={leftMenuSticky}
                            />
                        )}
                    </div>
                )}
                <div className={'main-col'}>
                    {isMobile !== true && shouldRenderTopContentRegion && (
                        <>
                            <MainContentSection
                                pageProps={pageProps}
                                regionProps={topPageContent}
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
                        regionProps={pageContent}
                    />
                </div>
                {rightMenuToggle && (
                    <div className={'right-col'}>
                        <RightMenuSection
                            pageProps={pageProps}
                            regionProps={rightMenu}
                            sticky={rightMenuSticky}
                        />
                    </div>
                )}
            </div>
            <Region pageProps={pageProps} regionProps={bottomRow} />
        </LayoutContainer>
    );
};
