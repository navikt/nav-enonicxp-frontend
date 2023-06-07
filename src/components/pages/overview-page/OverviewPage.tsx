import React from 'react';
import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ComponentMapper } from 'components/ComponentMapper';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { classNames } from 'utils/classnames';
import { OverviewFilters } from 'components/_common/overview-filters/OverviewFilters';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { OverviewFiltersSummary } from 'components/_common/overview-filters/summary/OverviewFiltersSummary';
import { ProductLink } from 'components/pages/overview-page/product-elements/ProductLink';
import { ProductDetailsPanel } from 'components/pages/overview-page/product-elements/ProductDetailsPanel';

import style from './OverviewPage.module.scss';

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList, overviewType } = props.data;
    const { language } = usePageConfig();

    const { matchFilters } = useOverviewFiltersState();

    const isVisible = (product: SimplifiedProductData) =>
        matchFilters({
            ...product,
            textMatchFunc: (textFilter) =>
                product.title.toLowerCase().includes(textFilter),
        });

    const numVisibleProducts = productList.filter(isVisible).length;

    const isAllProductsOverview = overviewType === 'all_products';

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
                        showTextInputFilter={isAllProductsOverview}
                    />
                    <OverviewFiltersSummary
                        numMatches={numVisibleProducts}
                        numTotal={productList.length}
                        showResetChips={isAllProductsOverview}
                    />
                </div>
                <ul
                    className={classNames(
                        style.productListWrapper,
                        isAllProductsOverview && style.allProducts
                    )}
                >
                    {productList.map((product) => {
                        const visible = isVisible(product);

                        return (
                            <li key={`${product._id}-${language}`}>
                                {isAllProductsOverview ? (
                                    <ProductLink
                                        product={product}
                                        visible={visible}
                                    />
                                ) : (
                                    <ProductDetailsPanel
                                        productDetails={product}
                                        pageProps={props}
                                        visible={visible}
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
