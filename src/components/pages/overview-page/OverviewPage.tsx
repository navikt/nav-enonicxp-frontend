import React, { useState } from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import { OverviewPageProps } from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';
import { Accordion, Heading } from '@navikt/ds-react';
import { LinkProps } from 'types/link-props';

import style from './OverviewPage.module.scss';
import { OverviewFilter } from 'components/_common/overviewFilter/OverviewFilter';
import { Area } from 'types/areas';
import { IllustrationStatic } from 'components/_common/illustration/IllustrationStatic';
import { MicroCard } from 'components/_common/card/MicroCard';
import { CardType } from 'types/card';

export const OverviewPage = (props: OverviewPageProps) => {
    const { language } = props;
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
            <ThemedPageHeader contentProps={props} showTimeStamp={false} />
            <div className={style.content}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
            <div className={style.content}>
                <OverviewFilter filterUpdateCallback={handleFilterUpdate} />
                <div className={style.productListWrapper}>
                    {filteredItems.map((product) => {
                        const { illustration } = product;

                        const cardLink: LinkProps = {
                            url: product._path,
                            text: product.title,
                        };

                        return (
                            <Accordion key={product._id}>
                                <Accordion.Item renderContentWhenClosed>
                                    <Accordion.Header>
                                        <IllustrationStatic
                                            className={style.illustration}
                                            illustration={product.illustration}
                                        />
                                        {product.title}
                                    </Accordion.Header>
                                    <Accordion.Content>
                                        <div className={style.detailsContainer}>
                                            [placeholder for detaljer]
                                        </div>
                                        <Heading size="small" level="3" spacing>
                                            Mer om {product.title}
                                        </Heading>
                                        <MicroCard
                                            link={cardLink}
                                            type={CardType.Product}
                                        />
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
