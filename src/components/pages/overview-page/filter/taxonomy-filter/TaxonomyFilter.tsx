import React from 'react';
import { ProductTaxonomy, Taxonomy } from 'types/taxonomies';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewPageFilter } from 'components/pages/overview-page/filter/OverviewPageFilter';
import { ContentType } from 'types/content-props/_content-common';
import { useOverviewFilters } from 'components/_common/overview-filters/filter-context/useOverviewFilters';

type Props = {
    contentList: Array<{ taxonomy: Taxonomy[]; type?: ContentType }>;
};

export const TaxonomyFilter = ({ contentList }: Props) => {
    const { setTaxonomyFilter, filtersState } = useOverviewFilters();

    const handleFilterUpdate = (taxonomy: ProductTaxonomy) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            type: taxonomy,
            opprinnelse: 'oversiktsside typer',
        });
        setTaxonomyFilter(taxonomy);
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
            selected={filtersState.taxonomyFilter}
            options={[ProductTaxonomy.ALL, ...taxonomiesInProductList]}
        />
    );
};
