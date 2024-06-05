import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { SingleColPageProps } from 'types/component-props/pages/single-col-page';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { GeneralPageHeader } from 'components/_common/headers/general-page-header/GeneralPageHeader';

type Props = {
    pageProps: ContentProps;
    layoutProps: SingleColPageProps;
};

export const SingleColPage = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <GeneralPageHeader pageProps={pageProps} />
            <Region pageProps={pageProps} regionProps={regions.pageContent} />
        </LayoutContainer>
    );
};
