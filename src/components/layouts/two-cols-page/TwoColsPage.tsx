import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { TwoColsPageProps } from 'types/component-props/pages/two-cols-page';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';

type Props = {
    pageProps: ContentProps;
    layoutProps?: TwoColsPageProps;
};

export const TwoColsPage = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <Region pageProps={pageProps} regionProps={regions.mainCol} />
            <Region pageProps={pageProps} regionProps={regions.sideCol} />
        </LayoutContainer>
    );
};
