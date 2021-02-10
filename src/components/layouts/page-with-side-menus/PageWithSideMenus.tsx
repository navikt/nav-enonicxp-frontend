import React, { CSSProperties, useEffect, useState } from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import debounce from 'lodash.debounce';
import { Undertittel, Element } from 'nav-frontend-typografi';
import {
    PageNavigationCallbackArg,
    PageNavigationMenu,
} from '../../parts/_dynamic/page-navigation-menu/PageNavigationMenu';
import { BEM } from '../../../utils/bem';
import { LenkeBase } from '../../_common/lenke/LenkeBase';
import { NedChevron } from 'nav-frontend-chevron';
import './PageWithSideMenus.less';

const menuOffsetMinUpdateRateMs = 1000 / 30;

const bemLeftMenu = BEM('left-menu');

type cssVars = { '--sticky-top': string };

const getMenuStyle = (
    sticky: boolean,
    scrollPos: number
): CSSProperties & cssVars => ({
    ...(sticky && { '--sticky-top': `${scrollPos}px` }),
});

type Props = {
    pageProps: ContentProps;
    layoutProps?: PageWithSideMenusProps;
};

export const PageWithSideMenus = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;
    const [stickyHeaderPosition, setStickyHeaderPosition] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [
        currentMenuItem,
        setCurrentMenuItem,
    ] = useState<PageNavigationCallbackArg>();

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
        leftMenuHeader,
        anchorLinks,
        rightMenuToggle,
        rightMenuStickyToggle,
    } = config;

    const leftMenuClassName = `${bemLeftMenu()} ${
        leftMenuStickyToggle ? bemLeftMenu(undefined, 'sticky') : ''
    }`;

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {leftMenuToggle && (
                <div
                    className={leftMenuClassName}
                    style={getMenuStyle(
                        leftMenuStickyToggle,
                        stickyHeaderPosition
                    )}
                >
                    <Undertittel className={bemLeftMenu('header-desktop')}>
                        {leftMenuHeader}
                    </Undertittel>
                    <LenkeBase
                        className={`${bemLeftMenu('header-mobile')}`}
                        href={'#'}
                        onClick={(e) => {
                            e.preventDefault();
                            setMobileOpen(!mobileOpen);
                        }}
                    >
                        <Undertittel>{currentMenuItem.linkText}</Undertittel>
                        {currentMenuItem.index}
                        <Element>
                            {leftMenuHeader}
                            <NedChevron
                                className={
                                    mobileOpen ? 'chevron-open' : undefined
                                }
                            />
                        </Element>
                    </LenkeBase>
                    <div
                        className={`${bemLeftMenu('navigation')} ${
                            mobileOpen
                                ? bemLeftMenu('navigation', 'mobile-open')
                                : ''
                        }`}
                    >
                        <PageNavigationMenu
                            config={{ anchorLinks }}
                            currentLinkCallback={setCurrentMenuItem}
                        />
                        <Region
                            pageProps={pageProps}
                            regionProps={regions.leftMenu}
                        />
                    </div>
                </div>
            )}
            <Region pageProps={pageProps} regionProps={regions.pageContent} />
            {rightMenuToggle && (
                <Region
                    pageProps={pageProps}
                    regionProps={regions.rightMenu}
                    regionStyle={getMenuStyle(
                        rightMenuStickyToggle,
                        stickyHeaderPosition
                    )}
                    bemModifier={rightMenuStickyToggle ? 'sticky' : undefined}
                />
            )}
        </LayoutContainer>
    );
};
