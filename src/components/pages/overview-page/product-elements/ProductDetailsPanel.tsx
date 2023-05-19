import React, { useState, useEffect } from 'react';
import { Accordion, BodyShort, Loader } from '@navikt/ds-react';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { ComponentMapper } from 'components/ComponentMapper';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { fetchPageCacheContent } from 'utils/fetch/fetch-cache-content';
import { AlertBox } from 'components/_common/alert-box/AlertBox';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import { ProductDetailType } from 'types/content-props/product-details';
import { CopyLink } from 'components/_common/copyLink/copyLink';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { ProductPanelExpandable } from 'components/_common/product-panel/ProductPanelExpandable';

type Props = {
    detailType: ProductDetailType;
    pageProps: ContentProps;
    productDetails: SimplifiedProductData;
    visible: boolean;
};

export const ProductDetailsPanel = ({
    detailType,
    pageProps,
    productDetails,
    visible,
}: Props) => {
    const { productDetailsPath, anchorId, illustration, sortTitle } =
        productDetails;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productDetailsPage, setProductDetailsPage] = useState(null);

    const { language } = usePageConfig();

    const detailTypeStrings = translator('productDetailTypes', language);

    const handleProductDetailsFetch = () => {
        if (isLoading || productDetailsPage) {
            return;
        }

        setIsLoading(true);

        fetchPageCacheContent(productDetailsPath)
            .then((contentFromCache) => {
                if (
                    !contentFromCache ||
                    contentFromCache.type !== ContentType.ProductDetails
                ) {
                    setError(
                        `Teknisk feil: Kunne ikke laste ${detailTypeStrings(
                            detailType
                        )}.`
                    );
                    return null;
                }

                setError(null);
                setProductDetailsPage(contentFromCache.page);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <ProductPanelExpandable
            title={sortTitle}
            illustration={illustration}
            visible={visible}
            anchorId={anchorId}
            contentLoaderCallback={handleProductDetailsFetch}
            error={error}
            isLoading={isLoading}
            analyticsData={{
                opprinnelse: 'oversiktsside accordion',
            }}
        >
            {productDetailsPage ? (
                <ComponentMapper
                    componentProps={productDetailsPage}
                    pageProps={pageProps}
                />
            ) : null}
        </ProductPanelExpandable>
    );
};
