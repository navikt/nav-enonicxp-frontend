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
import style from './OverviewPage.module.scss';
import { TaxonomyFilter } from './taxonomy-filter/TaxonomyFilter';
import { Taxonomy } from 'types/taxonomies';
import { typeOf } from 'mathjs';
import { classNames } from 'utils/classnames';
import { ProductDetailType } from 'types/content-props/product-details';

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

    const handleFilterUpdate = (value: Area | Taxonomy, filterName: string) => {
        if (filterName === 'taxonomy') {
            setTaxonomyFilter(value as Taxonomy);
            return;
        }
        setAreaFilter(value as Area);
    };

    const handleSearchUpdate = (value: string) => {
        setSearchString(value);
    };

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
                    filterUpdateCallback={(value: Area) =>
                        handleFilterUpdate(value, 'area')
                    }
                />
                {showTaxonomyFilter && (
                    <TaxonomyFilter
                        filterUpdateCallback={(value: Taxonomy) =>
                            handleFilterUpdate(value, 'taxonomy')
                        }
                    />
                )}
                {showSearch && (
                    <OverviewSearch
                        searchUpdateCallback={handleSearchUpdate}
                        label="Søk"
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
