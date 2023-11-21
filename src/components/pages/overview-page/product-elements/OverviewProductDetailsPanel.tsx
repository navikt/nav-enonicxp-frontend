import React, { useState } from 'react';
import { ComponentMapper } from 'components/ComponentMapper';
import { fetchPageCacheContent } from 'utils/fetch/fetch-cache-content';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { translator } from 'translations';
import { ProductDetailType } from 'types/content-props/product-details';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ProductPanelExpandable } from 'components/_common/product-panel/ProductPanelExpandable';
import { LayoutProps } from 'types/component-props/layouts';
import { OverviewMicroCards } from 'components/_common/card/overview-microcard/OverviewMicroCards';
import { OverviewPageProductItem } from 'types/content-props/overview-props';

import style from './ProductDetailsPanel.module.scss';

type Props = {
    detailType: ProductDetailType;
    pageProps: ContentProps;
    productDetails: OverviewPageProductItem;
};

export const OverviewProductDetailsPanel = ({
    detailType,
    pageProps,
    productDetails,
}: Props) => {
    const { productDetailsPath, anchorId, illustration, title, productLinks } =
        productDetails;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [productDetailsPage, setProductDetailsPage] =
        useState<LayoutProps | null>(null);

    const { language } = usePageConfig();

    const detailTypeStrings = translator('productDetailTypes', language);

    const handleProductDetailsFetch = () => {
        if (isLoading || productDetailsPage) {
            return;
        }

        setIsLoading(true);

        fetchPageCacheContent(productDetailsPath)
            .then((contentFromCache) => {
                if (contentFromCache?.type !== ContentType.ProductDetails) {
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
            header={title}
            illustration={illustration}
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
            <OverviewMicroCards
                productLinks={productLinks}
                className={style.microCard}
            />
        </ProductPanelExpandable>
    );
};
