import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/layouts/page-with-side-menus';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
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

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {config.leftMenuToggle && (
                <Region pageProps={pageProps} regionProps={regions.leftMenu} />
            )}
            <Region pageProps={pageProps} regionProps={regions.pageContent} />
            {config.rightMenuToggle && (
                <Region pageProps={pageProps} regionProps={regions.rightMenu} />
            )}
        </LayoutContainer>
    );
};
