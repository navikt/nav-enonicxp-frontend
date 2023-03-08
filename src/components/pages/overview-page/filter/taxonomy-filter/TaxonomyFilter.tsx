import React, { useState } from 'react';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { ProductTaxonomy } from 'types/taxonomies';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewPageFilter } from 'components/pages/overview-page/filter/OverviewPageFilter';
import { ContentType } from 'types/content-props/_content-common';

interface TaxonomyFilterProps {
    filterUpdateCallback: (filters: ProductTaxonomy) => void;
    productList: SimplifiedProductData[];
}

export const TaxonomyFilter = ({
    filterUpdateCallback,
    productList,
}: TaxonomyFilterProps) => {
    const [currentFilter, setCurrentFilter] = useState<ProductTaxonomy>(
        ProductTaxonomy.ALL
    );

    const handleFilterUpdate = (taxonomy: ProductTaxonomy) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            type: taxonomy,
            opprinnelse: 'oversiktsside typer',
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

    const productListHasGuidePage = productList.some(
        (product) => product.type === 'no.nav.navno:guide-page'
    );

    if (productListHasGuidePage) {
        taxonomiesInProductList.push(ProductTaxonomy.FORMS);
    }

    return (
        <OverviewPageFilter
            type={'taxonomies'}
            selectionCallback={handleFilterUpdate}
            selected={currentFilter}
            options={[ProductTaxonomy.ALL, ...taxonomiesInProductList]}
        />
    );
};
