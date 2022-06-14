import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import { IndexPageProps } from '../../../types/component-props/pages/index-page';
import { IndexPageNavigation } from './navigation/IndexPageNavigation';

type Props = {
    pageProps: ContentProps;
    layoutProps?: IndexPageProps;
};

export const IndexPage = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <Region pageProps={pageProps} regionProps={regions.contentTop} />
            <IndexPageNavigation pageProps={pageProps} />
            <Region pageProps={pageProps} regionProps={regions.contentBottom} />
        </LayoutContainer>
    );
};
