import React from 'react';
import { classNames } from 'utils/classnames';
import Region from 'components/layouts/Region';
import { RegionProps } from 'types/component-props/layouts';
import { ContentProps } from 'types/content-props/_content-common';
import { PageNavigationMenu } from 'components/_common/page-navigation-menu/PageNavigationMenu';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import styles from './LeftMenuSection.module.scss';

type Props = {
    internalLinks: AnchorLink[];
    menuHeader: string;
    sticky?: boolean;
    topRegionProps: RegionProps;
    mainRegionProps: RegionProps;
    pageProps: ContentProps;
};

export const LeftMenuSection = ({
    internalLinks,
    menuHeader,
    sticky,
    topRegionProps,
    mainRegionProps,
    pageProps,
}: Props) => {
    return (
        <div className={classNames(styles.leftMenu, sticky && styles.sticky)}>
            <PageNavigationMenu
                title={menuHeader}
                anchorLinks={internalLinks}
                viewStyle={'sidebar'}
            />
            <Region pageProps={pageProps} regionProps={topRegionProps} />
            <EditorHelp text={'Komponenter ovenfor legges inn rett under innholdsmenyen'} />
            <Region pageProps={pageProps} regionProps={mainRegionProps} />
        </div>
    );
};
