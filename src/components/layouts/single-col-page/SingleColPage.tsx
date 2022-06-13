import React from 'react';
import { CustomContentProps } from '../../../types/content-props/_content-common';
import { SingleColPageProps } from '../../../types/component-props/pages/single-col-page';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';

type Props = {
    pageProps: CustomContentProps;
    layoutProps?: SingleColPageProps;
};

export const SingleColPage = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <Region pageProps={pageProps} regionProps={regions.pageContent} />
        </LayoutContainer>
    );
};
