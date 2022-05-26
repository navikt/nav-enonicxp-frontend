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

type Props = {
    product: SimplifiedProductData;
    pageProps: ContentProps;
    hidden: boolean;
};

export const OverviewPageDetailsPanel = ({
    product,
    pageProps,
    hidden,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productDetailsPage, setProductDetailsPage] = useState(null);

    const handleProductDetailsFetch = () => {
        if (isLoading || productDetailsPage) {
            return;
        }

        setIsLoading(true);

        fetchPageCacheContent(product.productDetailsPath)
            .then((contentFromCache) => {
                if (!contentFromCache) {
                    setError('Failed to fetch from cache, oh noes!');
                    return null;
                }

                if (
                    contentFromCache.__typename !== ContentType.ProductDetails
                ) {
                    setError(`Incorrect type for product details!`);
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
                hidden && style.hidden
            )}
            key={product.idOrPath}
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
                        illustration={product.illustration}
                    />
                    {product.title}
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
