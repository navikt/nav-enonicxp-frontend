import React from 'react';
import { PageNavigationMenu } from 'components/_common/pageNavigationMenu//PageNavigationMenu';
import { DynamicNavigation } from 'components/_common/pageNavigationMenu/DynamicNavigation';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { ContentProps } from 'types/content-props/_content-common';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';

import styles from './CombinedMenu.module.scss';

type Props = {
    anchorLinks: AnchorLink[];
    pageProps: ContentProps;
};

export const CombinedMenu = ({ anchorLinks, pageProps }: Props) => {
    const { language } = usePageContentProps();
    const getLabel = translator('internalNavigation', language);
    const menuTitle = getLabel('pageNavigationMenu');

    return (
        <>
            <PageNavigationMenu
                anchorLinks={anchorLinks}
                ariaLabel={menuTitle}
                className={styles.mobileOnly}
            />
            <DynamicNavigation
                className={styles.pageNavigationMenu}
                anchorLinks={anchorLinks}
                pageProps={pageProps}
                title={menuTitle}
            />
        </>
    );
};
