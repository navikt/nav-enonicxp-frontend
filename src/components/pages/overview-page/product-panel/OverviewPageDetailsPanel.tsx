import React, { useState } from 'react';
import { Accordion, Loader } from '@navikt/ds-react';
import { IllustrationStatic } from '../../../_common/illustration/IllustrationStatic';
import { ComponentMapper } from '../../../ComponentMapper';
import { SimplifiedProductData } from '../../../../types/component-props/_mixins';
import { fetchPageCacheContent } from '../../../../utils/fetch/fetch-cache';
import { AlertBox } from '../../../_common/alert-box/AlertBox';
import {
    ContentProps,
    ContentType,
} from '../../../../types/content-props/_content-common';

import style from './OverviewPageDetailsPanel.module.scss';
import { classNames } from '../../../../utils/classnames';
import { translator } from '../../../../translations';
import { ProductDetailType } from '../../../../types/content-props/product-details';

type Props = {
    productDetails: SimplifiedProductData;
    detailType: ProductDetailType;
    pageProps: ContentProps;
    visible: boolean;
};

export const OverviewPageDetailsPanel = ({
    productDetails,
    detailType,
    pageProps,
    visible,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productDetailsPage, setProductDetailsPage] = useState(null);

    const detailTypeStrings = translator('productDetailTypes', 'no');

    const handleProductDetailsFetch = () => {
        if (isLoading || productDetailsPage) {
            return;
        }

        setIsLoading(true);

        fetchPageCacheContent(productDetails.productDetailsPath)
            .then((contentFromCache) => {
                if (
                    !contentFromCache ||
                    contentFromCache.__typename !== ContentType.ProductDetails
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
        <Accordion
            className={classNames(
                style.detailsContainer,
                !visible && style.hidden
            )}
        >
            <Accordion.Item open={isOpen} className={style.accordionItem}>
                <Accordion.Header
                    onClick={() => {
                        setIsOpen(!isOpen);
                        handleProductDetailsFetch();
                    }}
                    onMouseOver={
                        productDetailsPage ? null : handleProductDetailsFetch
                    }
                >
                    <IllustrationStatic
                        className={style.illustration}
                        illustration={productDetails.illustration}
                    />
                    {productDetails.title}
                </Accordion.Header>
                <Accordion.Content>
                    {error && <AlertBox variant={'error'}>{error}</AlertBox>}
                    {isLoading ? (
                        <div className={style.detailsLoader}>
                            <Loader size={'2xlarge'} />
                        </div>
                    ) : productDetailsPage ? (
                        <ComponentMapper
                            componentProps={productDetailsPage}
                            pageProps={pageProps}
                        />
                    ) : null}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
