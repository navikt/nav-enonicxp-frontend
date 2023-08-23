import React, { useEffect, useState } from 'react';
import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';
import { classNames } from 'utils/classnames';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { OverviewFiltersSummary } from 'components/_common/overview-filters/summary/OverviewFiltersSummary';
import { ProductLink } from 'components/pages/overview-page/product-elements/ProductLink';
import { ProductDetailsPanel } from 'components/pages/overview-page/product-elements/ProductDetailsPanel';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';

import style from './OverviewPage.module.scss';

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList, overviewType } = props.data;
    const { language } = usePageConfig();

    const [filteredList, setFilteredList] = useState(productList);

    console.log('overview render');

    const { getFilteredList } = useOverviewFiltersState();

    const isAllProductsOverview = overviewType === 'all_products';

    useEffect(() => {
        getFilteredList({
            filterableItems: productList,
            fuseOptions: {
                keys: [
                    { name: 'sortTitle', weight: 10 },
                    { name: 'keywords', weight: 2 },
                    { name: 'ingress', weight: 1 },
                    { name: 'title', weight: 1 },
                ],
            },
        }).then((result) => {
            setFilteredList(result);
        });
    }, [getFilteredList, productList]);

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
                    {filteredList.map((product) => {
                        return (
                            <li key={`${product._id}-${language}`}>
                                {isAllProductsOverview ? (
                                    <ProductLink
                                        product={product}
                                        visible={true}
                                    />
                                ) : (
                                    <ProductDetailsPanel
                                        productDetails={product}
                                        pageProps={props}
                                        visible={true}
                                        detailType={overviewType}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
