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

import style from './ProductDetailsPanel.module.scss';

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

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productDetailsPage, setProductDetailsPage] = useState(null);

    const { language } = usePageConfig();

    const detailTypeStrings = translator('productDetailTypes', language);
    const loadingText = translator('overview', language)('loading');

    const anchorIdWithHash = `#${anchorId}`;

    useEffect(() => {
        if (window.location.hash === anchorIdWithHash) {
            handleProductDetailsFetch();
            setIsOpen(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchorIdWithHash]);

    const handleClick = () => {
        logAmplitudeEvent(
            isOpen ? AnalyticsEvents.ACC_COLLAPSE : AnalyticsEvents.ACC_EXPAND,
            {
                tittel: sortTitle,
                opprinnelse: 'oversiktsside accordion',
            }
        );
        setIsOpen(!isOpen);
        handleProductDetailsFetch();
    };

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
        <>
            <div id={anchorId} />
            <Accordion className={classNames(!visible && style.hidden)}>
                <Accordion.Item open={isOpen} className={style.accordionItem}>
                    <Accordion.Header
                        onClick={handleClick}
                        onMouseOver={
                            productDetailsPage
                                ? null
                                : handleProductDetailsFetch
                        }
                    >
                        <IllustrationStatic
                            className={style.illustration}
                            illustration={illustration}
                        />
                        {sortTitle}
                    </Accordion.Header>
                    <Accordion.Content>
                        {error && (
                            <AlertBox variant={'error'}>{error}</AlertBox>
                        )}
                        <CopyLink
                            anchor={anchorIdWithHash}
                            className={style.copyLink}
                        />
                        {isLoading ? (
                            <div className={style.detailsLoader}>
                                <Loader size={'2xlarge'} />
                                <BodyShort>{loadingText}</BodyShort>
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
        </>
    );
};
