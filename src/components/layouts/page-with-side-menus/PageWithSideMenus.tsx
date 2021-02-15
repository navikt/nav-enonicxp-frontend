import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { PageWithSideMenusProps } from '../../../types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import { LeftSideMenu } from './LeftSideMenu';
import { RightSideMenu } from './RightSideMenu';
import { Layout } from '@navikt/ds-react';
import Section from '@navikt/ds-react/lib/layout/src/Section';
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
        leftMenuSticky,
        leftMenuHeader,
        showInternalNav,
        anchorLinks,
        rightMenuToggle,
        rightMenuSticky,
    } = config;

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <Layout>
                <Section left>
                    {leftMenuToggle && (
                        <LeftSideMenu
                            pageProps={pageProps}
                            regionProps={regions.leftMenu}
                            internalLinks={showInternalNav && anchorLinks}
                            menuHeader={leftMenuHeader}
                            stickyToggle={leftMenuSticky}
                        />
                    )}
                </Section>
                <Section>
                    <Region
                        pageProps={pageProps}
                        regionProps={regions.pageContent}
                    />
                </Section>
                <Section right>
                    {' '}
                    {rightMenuToggle && (
                        <RightSideMenu
                            pageProps={pageProps}
                            regionProps={regions.rightMenu}
                            stickyToggle={rightMenuSticky}
                        />
                    )}
                </Section>
            </Layout>
        </LayoutContainer>
    );
};
