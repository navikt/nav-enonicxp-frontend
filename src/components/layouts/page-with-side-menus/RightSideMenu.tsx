import React from 'react';
import Region from '../Region';
import { ContentProps } from '../../../types/content-props/_content-common';
import { RegionProps } from '../../../types/component-props/layouts';
import './RightSideMenu.less';

type Props = {
    pageProps: ContentProps;
    regionProps: RegionProps;
    stickyToggle: boolean;
};

export const RightSideMenu = ({
    pageProps,
    regionProps,
    stickyToggle,
}: Props) => {
    return (
        <Region
            pageProps={pageProps}
            regionProps={regionProps}
            bemModifier={stickyToggle && 'sticky'}
        />
    );
};
