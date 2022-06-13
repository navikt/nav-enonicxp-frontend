import React from 'react';
import Region from '../../Region';
import { CustomContentProps } from '../../../../types/content-props/_content-common';
import { RegionProps } from '../../../../types/component-props/layouts';

type Props = {
    pageProps: CustomContentProps;
    regionProps: RegionProps;
};

export const MainContentSection = ({ pageProps, regionProps }: Props) => {
    return <Region pageProps={pageProps} regionProps={regionProps} />;
};
