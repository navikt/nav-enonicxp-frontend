import React from 'react';
import { ProductTaxonomy } from 'types/taxonomies';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewFilterBase } from 'components/_common/overview-filters/filter-base/OverviewFilterBase';
import { ContentType } from 'types/content-props/_content-common';
import { useOverviewFiltersState } from 'store/hooks/useOverviewFilters';
import { setTaxonomyFilterAction } from 'store/slices/overviewFilters';

type Props = {
    contentList: Array<{ taxonomy: ProductTaxonomy[]; type?: ContentType }>;
};

export const OverviewTaxonomyFilter = ({ contentList }: Props) => {
    const { dispatch, taxonomyFilter } = useOverviewFiltersState();

    const handleFilterUpdate = (taxonomy: ProductTaxonomy) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            type: taxonomy,
            opprinnelse: 'oversiktsside typer',
        });
        dispatch(setTaxonomyFilterAction({ taxonomy }));
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
        <OverviewFilterBase
            type={'taxonomies'}
            selectionCallback={handleFilterUpdate}
            selected={taxonomyFilter}
            options={[ProductTaxonomy.ALL, ...taxonomiesInProductList]}
        />
    );
};
