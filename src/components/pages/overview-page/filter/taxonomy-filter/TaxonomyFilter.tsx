import React, { useState } from 'react';
import { ProductTaxonomy, Taxonomy } from 'types/taxonomies';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewPageFilter } from 'components/pages/overview-page/filter/OverviewPageFilter';
import { ContentType } from 'types/content-props/_content-common';

type Props = {
    filterUpdateCallback: (filters: ProductTaxonomy) => void;
    contentList: Array<{ taxonomy: Taxonomy[]; type?: ContentType }>;
};

export const TaxonomyFilter = ({
    filterUpdateCallback,
    contentList,
}: Props) => {
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
            contentList.some((product) =>
                product.taxonomy.some(
                    (taxonomyItem) => taxonomyItem === ProductTaxonomy
                )
            )
    );

    const productListHasGuidePage = contentList.some(
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
