import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { TwoColsPageProps } from 'types/component-props/pages/two-cols-page';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';

type Props = {
    pageProps: ContentProps;
    layoutProps: TwoColsPageProps;
};

export const TwoColsPage = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!regions) {
        return null;
    }

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <Region pageProps={pageProps} regionProps={regions.mainCol} />
            {config.sideColToggle && <Region pageProps={pageProps} regionProps={regions.sideCol} />}
        </LayoutContainer>
    );
};
