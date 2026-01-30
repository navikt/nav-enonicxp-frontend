import React from 'react';
import { PageNavigationMenu } from 'components/_common/pageNavigationMenu/PageNavigationMenu';
import { DynamicDesktopNavigation } from 'components/_common/pageNavigationMenu/DynamicDesktopNavigation/DynamicDesktopNavigation';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { ContentProps } from 'types/content-props/_content-common';
import { translator } from 'translations';

import styles from './CombinedMenu.module.scss';

type Props = {
    anchorLinks: AnchorLink[];
    pageProps: ContentProps;
};

export const CombinedMenu = ({ anchorLinks, pageProps }: Props) => {
    const getLabel = translator('internalNavigation', pageProps.language);
    const menuTitle = getLabel('pageNavigationMenu');

    return (
        <>
            <PageNavigationMenu
                anchorLinks={anchorLinks}
                title={menuTitle}
                className={styles.mobileOnly}
            />
            <DynamicDesktopNavigation
                className={styles.pageNavigationMenu}
                anchorLinks={anchorLinks}
                pageProps={pageProps}
                title={menuTitle}
            />
        </>
    );
};
