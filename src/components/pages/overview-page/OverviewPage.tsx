import React, { useState } from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { OverviewPageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';
import { Accordion } from '@navikt/ds-react';

import style from './OverviewPage.module.scss';
import { OverviewFilter } from 'components/_common/overviewFilter/OverviewFilter';
import { Area } from 'types/areas';

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList } = props.data;

    const [filters, setFilters] = useState<Area[]>([]);

    const handleFilterUpdate = (filters: Area[]) => {
        setFilters(filters);
    };

    const filteredItems =
        filters.length === 0
            ? productList
            : productList.filter((product) => filters.includes(product.area));

    return (
        <div className={style.overviewPage}>
            <ThemedPageHeader contentProps={props} />
            <div className={style.content}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
            <div className={style.content}>
                <OverviewFilter filterUpdateCallback={handleFilterUpdate} />
                <div className={style.productListWrapper}>
                    {filteredItems.map((product) => (
                        <Accordion key={product._id}>
                            <Accordion.Item renderContentWhenClosed>
                                <Accordion.Header>
                                    {product.title}
                                </Accordion.Header>
                                <Accordion.Content>content</Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    );
};
