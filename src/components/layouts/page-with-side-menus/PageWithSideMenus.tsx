import React, { CSSProperties } from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/layouts/page-with-side-menus';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import './PageWithSideMenus.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: PageWithSideMenusProps;
};

const getMenuStyle = (sticky: boolean, width: number): CSSProperties => ({
    ...(sticky && { position: 'sticky' }),
    ...(width !== undefined && { width: `${width}rem` }),
});

export const PageWithSideMenus = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!regions || !config) {
        return null;
    }

    const {
        leftMenuToggle,
        leftMenuStickyToggle,
        leftMenuWidth,
        rightMenuToggle,
        rightMenuStickyToggle,
        rightMenuWidth,
    } = config;

    const leftStyle = getMenuStyle(leftMenuStickyToggle, leftMenuWidth);
    const rightStyle = getMenuStyle(rightMenuStickyToggle, rightMenuWidth);

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {leftMenuToggle && (
                <Region
                    pageProps={pageProps}
                    regionProps={regions.leftMenu}
                    regionStyle={leftStyle}
                />
            )}
            <Region pageProps={pageProps} regionProps={regions.pageContent} />
            {rightMenuToggle && (
                <Region
                    pageProps={pageProps}
                    regionProps={regions.rightMenu}
                    regionStyle={rightStyle}
                />
            )}
        </LayoutContainer>
    );
};
