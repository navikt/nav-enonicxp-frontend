import React from 'react';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';
import { SingleColPageProps } from '../../../types/component-props/pages/single-col-page';
import { LayoutContainer } from '../LayoutContainer';
import { ProductPageLayout, ProductPageSection } from '@navikt/ds-react';
import Region from '../Region';

// TODO: refactor types after XP 7.7 components/content-type restrictions are available
// to make checks like this unnecessary
const getTitle = (content: ContentProps) => {
    if (
        content.__typename === ContentType.OverviewPage ||
        content.__typename === ContentType.ProductPage
    ) {
        return content.data.title;
    }

    return content.displayName;
};

type Props = {
    pageProps: ContentProps;
    layoutProps?: SingleColPageProps;
};

export const SingleColPage = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {/*TODO: Lag egen grid-komponent*/}
            <ProductPageLayout title={getTitle(pageProps)}>
                <ProductPageSection whiteBackground={false} withPadding={false}>
                    <Region
                        pageProps={pageProps}
                        regionProps={regions.pageContent}
                    />
                </ProductPageSection>
            </ProductPageLayout>
        </LayoutContainer>
    );
};
