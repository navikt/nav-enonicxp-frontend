import React, { useState } from 'react';
import { Accordion, Loader } from '@navikt/ds-react';
import style from '../OverviewPage.module.scss';
import { IllustrationStatic } from '../../../_common/illustration/IllustrationStatic';
import { ComponentMapper } from '../../../ComponentMapper';
import { SimplifiedProductData } from '../../../../types/component-props/_mixins';
import { fetchPageCacheContent } from '../../../../utils/fetch/fetch-cache';
import { AlertBox } from '../../../_common/alert-box/AlertBox';
import {
    ContentProps,
    ContentType,
} from '../../../../types/content-props/_content-common';

type Props = {
    product: SimplifiedProductData;
    pageProps: ContentProps;
};

export const OverviewPageProductPanel = ({ product, pageProps }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
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

                setProductDetailsPage(contentFromCache.page);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Accordion key={product.idOrPath}>
            <Accordion.Item open={isOpen} className={style.accordionItem}>
                <Accordion.Header
                    onClick={() => {
                        setIsOpen(!isOpen);
                        handleProductDetailsFetch();
                    }}
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
                        <Loader size={'2xlarge'} />
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
