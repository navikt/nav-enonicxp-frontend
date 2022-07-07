import React, { useState } from 'react';
import { translator } from 'translations';
import { Area } from 'types/areas';
import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { ComponentMapper } from 'components/ComponentMapper';
import { AreaFilter } from 'components/pages/overview-page/area-filter/AreaFilter';
import { ThemedPageHeader } from 'components/_common/headers/themed-page-header/ThemedPageHeader';
import { SimplifiedProductData } from '../../../types/component-props/_mixins';
import { ProductItem } from './product-elements/ProductItem';
import { OverviewSearch } from './overview-search/OverviewSearch';
import { TaxonomyFilter } from './taxonomy-filter/TaxonomyFilter';
import { Taxonomy } from 'types/taxonomies';
import { classNames } from 'utils/classnames';
import { ProductDetailType } from 'types/content-props/product-details';

import style from './OverviewPage.module.scss';

export const OverviewPage = (props: OverviewPageProps) => {
    const { productList, overviewType } = props.data;
    const { language } = usePageConfig();

    // Misc translations
    const getTranslationString = translator('overview', language);

    const [areaFilter, setAreaFilter] = useState<Area>(Area.ALL);
    const [taxonomyFilter, setTaxonomyFilter] = useState<Taxonomy>(
        Taxonomy.ALL
    );
    const [searchString, setSearchString] = useState<string>('');

    const isVisiblePredicate = (
        product: SimplifiedProductData,
        areaFilter: Area,
        searchValue: string
    ) => {
        const isAreaMatching =
            areaFilter === Area.ALL ||
            product.area.some((area) => area === areaFilter);

        const isTaxonomyMatching =
            taxonomyFilter === Taxonomy.ALL ||
            product.taxonomy.includes(taxonomyFilter);

        const isSearchMatching = product.sortTitle
            .toLowerCase()
            .includes(searchValue.toLowerCase());

        return isAreaMatching && isSearchMatching && isTaxonomyMatching;
    };

    const hasVisibleProducts = productList.some((product) =>
        isVisiblePredicate(product, areaFilter, searchString)
    );

    const showTaxonomyFilter = overviewType === ProductDetailType.ALL_PRODUCTS;
    const showSearch = overviewType === ProductDetailType.ALL_PRODUCTS;

    const areasInProductList = Object.values(Area).filter((area) =>
        productList.some((product) =>
            product.area.some((areaItem) => areaItem === area)
        )
    );

    console.log(areasInProductList);

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
                <AreaFilter
                    filterUpdateCallback={(value: Area) => setAreaFilter(value)}
                    filterableAreas={areasInProductList}
                />
                {showTaxonomyFilter && (
                    <TaxonomyFilter
                        filterUpdateCallback={(value: Taxonomy) =>
                            setTaxonomyFilter(value)
                        }
                    />
                )}
                {showSearch && (
                    <OverviewSearch
                        searchUpdateCallback={(value: string) =>
                            setSearchString(value)
                        }
                        label={getTranslationString('search')}
                    />
                )}
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
                            visible={isVisiblePredicate(
                                product,
                                areaFilter,
                                searchString
                            )}
                            overviewType={overviewType}
                            key={product._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
