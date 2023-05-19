import React from 'react';
import { translator } from 'translations';
import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { ProductItem } from './product-elements/ProductItem';
import { classNames } from 'utils/classnames';
import { ProductDetailType } from 'types/content-props/product-details';
import { useOverviewFiltersState } from 'components/_common/overview-filters/useOverviewFiltersState';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';

import style from './OverviewPage.module.scss';

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList, overviewType } = props.data;
    const { language } = usePageConfig();

    const { matchFilters, dispatch, state } = useOverviewFiltersState();

    const getTranslationString = translator('overview', language);

    const isVisiblePredicate = (product: SimplifiedProductData) =>
        matchFilters({ ...product, text: product.title });

    const hasVisibleProducts = productList.some((product) =>
        isVisiblePredicate(product)
    );

    const showTaxonomyFilter = overviewType === ProductDetailType.ALL_PRODUCTS;
    const showSearch = overviewType === ProductDetailType.ALL_PRODUCTS;

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
                <OverviewFilters
                    contentList={productList}
                    dispatch={dispatch}
                    state={state}
                    showAreaFilter={true}
                    showTaxonomyFilter={overviewType === 'all_products'}
                    showTextInputFilter={overviewType === 'all_products'}
                />
                <div
                    className={classNames(
                        style.productListWrapper,
                        overviewType === ProductDetailType.ALL_PRODUCTS &&
                            style.transparent
                    )}
                >
                    {!hasVisibleProducts && (
                        <div>{getTranslationString('noProducts')}</div>
                    )}
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
