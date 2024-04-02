import React from 'react';
import Region from 'components/layouts/Region';
import { ContentProps } from 'types/content-props/_content-common';
import { RegionProps } from 'types/component-props/layouts';

type Props = {
    pageProps: ContentProps;
    regionProps: RegionProps;
};

export const MainContentSection = ({ pageProps, regionProps }: Props) => {
    return <Region pageProps={pageProps} regionProps={regionProps} />;
};
