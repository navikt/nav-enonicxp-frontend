import React from 'react';
import { CustomContentProps } from '../../../types/content-props/_content-common';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import { BisectedPageProps } from '../../../types/component-props/pages/bisected-page';
import { BisectedPageCenterNavigation } from './center-navigation/BisectedPageCenterNavigation';

type Props = {
    pageProps: CustomContentProps;
    layoutProps?: BisectedPageProps;
};

export const BisectedPage = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <Region pageProps={pageProps} regionProps={regions.contentTop} />
            <BisectedPageCenterNavigation pageProps={pageProps} />
            <Region pageProps={pageProps} regionProps={regions.contentBottom} />
        </LayoutContainer>
    );
};
