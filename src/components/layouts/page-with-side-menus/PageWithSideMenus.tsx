import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import { LeftSideMenu } from './LeftSideMenu';
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
        leftMenuToggle,
        leftMenuStickyToggle,
        leftMenuHeader,
        anchorLinks,
        rightMenuToggle,
        rightMenuStickyToggle,
    } = config;

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {leftMenuToggle && (
                <LeftSideMenu
                    pageProps={pageProps}
                    regionProps={regions.leftMenu}
                    anchorLinks={anchorLinks}
                    menuHeader={leftMenuHeader}
                    stickyToggle={leftMenuStickyToggle}
                />
            )}
            <Region pageProps={pageProps} regionProps={regions.pageContent} />
            {rightMenuToggle && (
                <Region pageProps={pageProps} regionProps={regions.rightMenu} />
            )}
        </LayoutContainer>
    );
};
