import React, { useEffect, useState } from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';
import { classNames } from 'utils/classnames';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { OverviewFiltersSummary } from 'components/_common/overview-filters/summary/OverviewFiltersSummary';
import { OverviewLinkPanel } from 'components/pages/overview-page/product-elements/OverviewLinkPanel';
import { OverviewProductDetailsPanel } from 'components/pages/overview-page/product-elements/OverviewProductDetailsPanel';
import { useOverviewFilters } from 'store/hooks/useOverviewFilters';
import { OverviewPageProps } from 'types/content-props/overview-props';

import style from './OverviewPage.module.scss';

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList, overviewType } = props.data;
    const { language } = usePageConfig();

    const [filteredList, setFilteredList] = useState(productList);

    const { getFilteredList } = useOverviewFilters();

    const isAllProductsOverview = overviewType === 'all_products';

    useEffect(() => {
        getFilteredList({
            filterableItems: productList,
            fuseOptions: {
                keys: [
                    { name: 'title', weight: 10 },
                    { name: 'ingress', weight: 1 },
                ],
            },
        }).then((result) => {
            setFilteredList(result);
        });
    }, [getFilteredList, productList]);

    return (
        <article className={style.overviewPage}>
            <ThemedPageHeader contentProps={props} showTimeStamp={false} />
            <div className={style.content}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
            <div className={style.content}>
                <div className={style.filters}>
                    <OverviewFilters
                        filterableItems={productList}
                        showAreaFilter={true}
                        showTaxonomyFilter={isAllProductsOverview}
                        showTextInputFilter={true}
                    />
                    <OverviewFiltersSummary
                        numMatches={filteredList.length}
                        numTotal={productList.length}
                        showResetChips={true}
                    />
                </div>
                <ul
                    className={classNames(
                        style.productListWrapper,
                        isAllProductsOverview && style.allProducts
                    )}
                >
                    {filteredList.map((product) => (
                        <li key={`${product.anchorId}-${language}`}>
                            {isAllProductsOverview ? (
                                <OverviewLinkPanel
                                    product={product.productLinks[0]}
                                    illustration={product.illustration}
                                />
                            ) : (
                                <OverviewProductDetailsPanel
                                    productDetails={product}
                                    pageProps={props}
                                    detailType={overviewType}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
};
