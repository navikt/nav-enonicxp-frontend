import React from 'react';
import Region from '../../Region';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { RegionProps } from '../../../../types/component-props/layouts';
import './MainContentSection.less';

type Props = {
    pageProps: ContentProps;
    regionProps: RegionProps;
};

export const MainContentSection = ({ pageProps, regionProps }: Props) => {
    if (regionProps.components?.length === 0) {
        return null;
    }
    return <Region pageProps={pageProps} regionProps={regionProps} />;
};
