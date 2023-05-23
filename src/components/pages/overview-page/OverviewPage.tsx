import React from 'react';
import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { ProductItem } from './product-elements/ProductItem';
import { classNames } from 'utils/classnames';
import { ProductDetailType } from 'types/content-props/product-details';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { OverviewFiltersSummary } from 'components/_common/overview-filters/summary/OverviewFiltersSummary';

import style from './OverviewPage.module.scss';

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList, overviewType } = props.data;
    const { language } = usePageConfig();

    const { matchFilters } = useOverviewFiltersState();

    const isVisiblePredicate = (product: SimplifiedProductData) =>
        matchFilters({ ...product, text: product.title });

    const numVisibleProducts = productList.filter(isVisiblePredicate).length;

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
                        showTaxonomyFilter={overviewType === 'all_products'}
                        showTextInputFilter={overviewType === 'all_products'}
                    />
                    <OverviewFiltersSummary
                        numMatches={numVisibleProducts}
                        numTotal={productList.length}
                    />
                </div>
                <div
                    className={classNames(
                        style.productListWrapper,
                        overviewType === ProductDetailType.ALL_PRODUCTS &&
                            style.transparent
                    )}
                >
                    {productList.map((product) => (
                        <ProductItem
                            product={product}
                            pageProps={props}
                            visible={isVisiblePredicate(product)}
                            overviewType={overviewType}
                            key={`${product._id}-${language}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
