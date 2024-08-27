import React from 'react';
import { ProductTaxonomy } from 'types/taxonomies';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewFilterBase } from 'components/_common/overview-filters/filter-base/OverviewFilterBase';
import { OverviewFilterableItem, useOverviewFilters } from 'store/hooks/useOverviewFilters';

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
    const { taxonomyFilter, setTaxonomyFilter } = useOverviewFilters();

    const handleFilterUpdate = (taxonomy: ProductTaxonomy) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            kategori: 'type',
            filternavn: taxonomy,
            opprinnelse: 'oversiktsside typer',
            komponent: OverviewTaxonomyFilter.name,
        });
        setTaxonomyFilter(taxonomy);
    };

    const taxonomiesPresent = orderedTaxonomies.filter((taxonomy) =>
        items.some((item) => item.taxonomy.some((itemTaxonomy) => itemTaxonomy === taxonomy))
    );

    const listHasGuidePage = items.some((product) => product.type === 'no.nav.navno:guide-page');

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
