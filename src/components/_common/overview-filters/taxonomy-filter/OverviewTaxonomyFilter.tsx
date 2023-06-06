import React from 'react';
import { ProductTaxonomy } from 'types/taxonomies';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewFilterBase } from 'components/_common/overview-filters/filter-base/OverviewFilterBase';
import {
    OverviewFilterableItem,
    useOverviewFiltersState,
} from 'store/hooks/useOverviewFilters';
import { setTaxonomyFilterAction } from 'store/slices/overviewFilters';

const orderedTaxonomies: ProductTaxonomy[] = [
    ProductTaxonomy.BENEFITS,
    ProductTaxonomy.INSURANCE,
    ProductTaxonomy.MEASURES,
    ProductTaxonomy.SERVICE,
    ProductTaxonomy.COUNSELLING,
    ProductTaxonomy.ASSISTIVE_TOOLS,
    ProductTaxonomy.EMPLOYEE_BENEFITS,
    ProductTaxonomy.REFUND,
    ProductTaxonomy.OTHER,
];

type Props = {
    items: OverviewFilterableItem[];
};

export const OverviewTaxonomyFilter = ({ items }: Props) => {
    const { dispatch, taxonomyFilter } = useOverviewFiltersState();

    const handleFilterUpdate = (taxonomy: ProductTaxonomy) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            type: taxonomy,
            opprinnelse: 'oversiktsside typer',
        });
        dispatch(setTaxonomyFilterAction({ taxonomy }));
    };

    const taxonomiesPresent = orderedTaxonomies.filter((taxonomy) =>
        items.some((item) =>
            item.taxonomy.some((itemTaxonomy) => itemTaxonomy === taxonomy)
        )
    );

    const listHasGuidePage = items.some(
        (product) => product.type === 'no.nav.navno:guide-page'
    );

    if (listHasGuidePage) {
        taxonomiesPresent.push(ProductTaxonomy.OTHER);
    }

    return (
        <OverviewFilterBase
            type={'taxonomies'}
            selectionCallback={handleFilterUpdate}
            selected={taxonomyFilter}
            options={[ProductTaxonomy.ALL, ...taxonomiesPresent]}
        />
    );
};
