import React, { useState } from 'react';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { ProductTaxonomy } from 'types/taxonomies';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewPageFilter } from 'components/pages/overview-page/filter/OverviewPageFilter';

interface TaxonomyFilerProps {
    filterUpdateCallback: (filters: ProductTaxonomy) => void;
    productList: SimplifiedProductData[];
}

export const TaxonomyFilter = ({
    filterUpdateCallback,
    productList,
}: TaxonomyFilerProps) => {
    const [currentFilter, setCurrentFilter] = useState<ProductTaxonomy>(
        ProductTaxonomy.ALL
    );

    const handleFilterUpdate = (taxonomy: ProductTaxonomy) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            type: taxonomy,
            opprinnelse: 'typefilter',
        });
        setCurrentFilter(taxonomy);
        filterUpdateCallback(taxonomy);
    };

    const taxonomiesInProductList = Object.values(ProductTaxonomy).filter(
        (ProductTaxonomy) =>
            productList.some((product) =>
                product.taxonomy.some(
                    (taxonomyItem) => taxonomyItem === ProductTaxonomy
                )
            )
    );

    return (
        <OverviewPageFilter
            type={'taxonomies'}
            selectionCallback={handleFilterUpdate}
            selected={currentFilter}
            options={taxonomiesInProductList}
        />
    );
};
