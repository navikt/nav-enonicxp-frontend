import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import Region from '../../Region';
import { RegionProps } from '../../../../types/component-props/layouts';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { PageNavigationMenu } from '../../../_common/page-navigation-menu/PageNavigationMenu';
import { AnchorLink } from '../../../../types/component-props/parts/page-navigation-menu';
import './LeftMenuSection.less';

const bem = BEM('left-menu');

type Props = {
    internalLinks: AnchorLink[];
    menuHeader: string;
    sticky?: boolean;
    regionProps: RegionProps;
    pageProps: ContentProps;
};

export const LeftMenuSection = ({
    internalLinks,
    menuHeader,
    sticky,
    regionProps,
    pageProps,
}: Props) => {
    return (
        <div className={classNames(bem(), sticky && bem(undefined, 'sticky'))}>
            <PageNavigationMenu
                title={menuHeader}
                anchorLinks={internalLinks}
                viewStyle={'sidebar'}
            />
            <Region pageProps={pageProps} regionProps={regionProps} />
        </div>
    );
};
