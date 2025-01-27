import React from 'react';
import { ProductTaxonomy } from 'types/taxonomies';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { OverviewFilterBase } from 'components/_common/overview-filters/OverViewFilterBase/OverviewFilterBase';
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

const analyticsTaxonomi = {
    [ProductTaxonomy.ALL]: 'alle',
    [ProductTaxonomy.BENEFITS]: 'pengestøtte',
    [ProductTaxonomy.INSURANCE]: 'forsikring',
    [ProductTaxonomy.MEASURES]: 'tiltak',
    [ProductTaxonomy.SERVICE]: 'tjeneste',
    [ProductTaxonomy.COUNSELLING]: 'veiledning',
    [ProductTaxonomy.ASSISTIVE_TOOLS]: 'hjelpemiddel',
    [ProductTaxonomy.EMPLOYEE_BENEFITS]: 'pengestøtte til ansatt',
    [ProductTaxonomy.REFUND]: 'refusjon',
    [ProductTaxonomy.OTHER]: 'annet',
};

type Props = {
    items: OverviewFilterableItem[];
};

export const OverviewTaxonomyFilter = ({ items }: Props) => {
    const { taxonomyFilter, setTaxonomyFilter } = useOverviewFilters();
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);

    const handleFilterUpdate = (taxonomy: ProductTaxonomy) => {
        logAnalyticsEvent(AnalyticsEvents.FILTER, {
            kategori: 'type',
            filternavn: analyticsTaxonomi[taxonomy],
            opprinnelse: 'oversiktsside typer',
            komponent: 'OverviewTaxonomyFilter',
            målgruppe: context,
            innholdstype: innholdsTypeMap[contentProps.type],
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
