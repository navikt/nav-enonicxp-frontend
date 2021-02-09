import React, { CSSProperties, useEffect, useState } from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/layouts/page-with-side-menus';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import debounce from 'lodash.debounce';
import './PageWithSideMenus.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: PageWithSideMenusProps;
};

const menuTopOffset = 16;
const menuOffsetMinUpdateRateMs = 1000 / 60;

const getMenuStyle = (
    sticky: boolean,
    width: number,
    scrollPos: number
): CSSProperties => ({
    ...(sticky && { top: scrollPos + menuTopOffset }),
    ...(width !== undefined && { width: `${width}rem` }),
});

export const PageWithSideMenus = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;
    const [stickyHeaderPosition, setStickyHeaderPosition] = useState(0);

    useEffect(() => {
        if (!config?.leftMenuStickyToggle && !config?.rightMenuStickyToggle) {
            return;
        }

        const stickyHeaderOffsetHandler = debounce(
            () => {
                const decoratorHeader = document.getElementById(
                    'hovedmeny'
                ) as HTMLElement;
                const boundingRect = decoratorHeader.getBoundingClientRect();
                setStickyHeaderPosition(
                    Math.max(boundingRect.top + boundingRect.height, 0)
                );
            },
            menuOffsetMinUpdateRateMs / 2,
            { maxWait: menuOffsetMinUpdateRateMs }
        );

        window.addEventListener('scroll', stickyHeaderOffsetHandler);
        return () =>
            window.removeEventListener('scroll', stickyHeaderOffsetHandler);
    }, [config]);

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

    const leftStyle = getMenuStyle(
        leftMenuStickyToggle,
        leftMenuWidth,
        stickyHeaderPosition
    );
    const rightStyle = getMenuStyle(
        rightMenuStickyToggle,
        rightMenuWidth,
        stickyHeaderPosition
    );

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {leftMenuToggle && (
                <Region
                    pageProps={pageProps}
                    regionProps={regions.leftMenu}
                    regionStyle={leftStyle}
                    bemModifier={leftMenuStickyToggle ? 'sticky' : undefined}
                />
            )}
            <Region pageProps={pageProps} regionProps={regions.pageContent} />
            {rightMenuToggle && (
                <Region
                    pageProps={pageProps}
                    regionProps={regions.rightMenu}
                    regionStyle={rightStyle}
                    bemModifier={rightMenuStickyToggle ? 'sticky' : undefined}
                />
            )}
        </LayoutContainer>
    );
};
