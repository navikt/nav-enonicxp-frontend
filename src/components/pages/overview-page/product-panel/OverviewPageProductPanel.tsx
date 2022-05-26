import React, { useState } from 'react';
import { Accordion, Loader } from '@navikt/ds-react';
import style from '../OverviewPage.module.scss';
import { IllustrationStatic } from '../../../_common/illustration/IllustrationStatic';
import { ComponentMapper } from '../../../ComponentMapper';
import { SimplifiedProductData } from '../../../../types/component-props/_mixins';
import { fetchJsonCache } from '../../../../utils/fetch/fetch-cache';
import { AlertBox } from '../../../_common/alert-box/AlertBox';
import { ContentProps } from '../../../../types/content-props/_content-common';

type Props = {
    product: SimplifiedProductData;
    pageProps: ContentProps;
};

export const OverviewPageProductPanel = ({ product, pageProps }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [productDetailsComponents, setProductDetailsComponents] =
        useState(null);

    const handlePanelToggle = () => {
        setIsOpen(!isOpen);

        if (isLoading || productDetailsComponents) {
            return;
        }

        setIsLoading(true);

        fetchJsonCache(product.productDetailsPath)
            .then((json) => {
                if (!json) {
                    setError('Failed to fetch, oh noes!');
                    return null;
                }

                const components = productDetailsComponents.map((item) => {
                    return item.pageProps.content.page;
                });

                setProductDetailsComponents(components);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Accordion key={product.idOrPath}>
            <Accordion.Item open={isOpen} className={style.accordionItem}>
                <Accordion.Header onClick={() => handlePanelToggle()}>
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
                    ) : productDetailsComponents ? (
                        <ComponentMapper
                            componentProps={productDetailsComponents}
                            pageProps={pageProps}
                        />
                    ) : null}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
