import React, { useState } from 'react';
import { BodyLong } from '@navikt/ds-react';
import { ComponentMapper } from 'components/ComponentMapper';
import { fetchPageCacheContent } from 'utils/fetch/fetch-cache-content';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { translator } from 'translations';
import { ProductDetailType } from 'types/content-props/product-details';
import { usePageContentProps } from 'store/pageContext';
import { ProductPanelExpandable } from 'components/_common/productPanelExpandable/ProductPanelExpandable';
import { LayoutComponentProps } from 'types/component-props/layouts';
import { OversiktMerOmLenke } from 'components/_common/card/overview-microcard/OversiktMerOmLenke';
import { OverviewPageProductItem } from 'types/content-props/overview-props';

import style from './OverviewProductDetailsPanel.module.scss';

type Props = {
    detailType: ProductDetailType;
    pageProps: ContentProps;
    productDetails: OverviewPageProductItem;
};

export const OverviewProductDetailsPanel = ({ detailType, pageProps, productDetails }: Props) => {
    const { productDetailsPath, anchorId, illustration, title, productLinks, ingress } =
        productDetails;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [productDetailsPage, setProductDetailsPage] = useState<LayoutComponentProps | null>(null);

    const { language } = usePageContentProps();

    const detailTypeStrings = translator('productDetailTypes', language);

    const isSimpleOverview = detailType === ProductDetailType.ALL_PRODUCTS;

    const handleProductDetailsFetch = () => {
        if (isLoading || productDetailsPage || !productDetailsPath) {
            return;
        }

        setIsLoading(true);

        fetchPageCacheContent(productDetailsPath)
            .then((contentFromCache) => {
                if (contentFromCache?.type !== ContentType.ProductDetails) {
                    setError(`Teknisk feil: Kunne ikke laste ${detailTypeStrings(detailType)}.`);
                    return null;
                }

                setError(null);
                setProductDetailsPage(contentFromCache.page);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const renderPanelContent = () => {
        if (isSimpleOverview) {
            return <BodyLong>{ingress}</BodyLong>;
        }

        if (productDetailsPage) {
            return <ComponentMapper componentProps={productDetailsPage} pageProps={pageProps} />;
        }

        return null;
    };

    return (
        <ProductPanelExpandable
            header={title}
            illustration={illustration}
            anchorId={anchorId}
            contentLoaderCallback={isSimpleOverview ? undefined : handleProductDetailsFetch}
            error={error}
            isLoading={isLoading}
            withCopyLink={!isSimpleOverview}
            analyticsData={{
                opprinnelse: 'oversiktsside accordion',
            }}
        >
            {renderPanelContent()}
            <OversiktMerOmLenke productLinks={productLinks} className={style.microCard} />
        </ProductPanelExpandable>
    );
};
