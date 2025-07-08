import React from 'react';
import { Area } from 'types/areas';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { OversiktFilterBase } from 'components/_common/oversikt-filters/OversiktFilterBase/OversiktFilterBase';
import { OversiktFilterableItem, useOversiktFilters } from 'store/hooks/useOversiktFilters';

const orderedAreas: Area[] = [
    Area.WORK,
    Area.HEALTH,
    Area.FAMILY,
    Area.PENSION,
    Area.SOCIAL_COUNSELLING,
    Area.ACCESSIBILITY,
    Area.INCLUSION,
    Area.RECRUITMENT,
    Area.DOWNSIZING,
    Area.OTHER,
];

const analyticsAreas = {
    [Area.ALL]: 'alle',
    [Area.WORK]: 'arbeid',
    [Area.HEALTH]: 'helse og sykdom',
    [Area.FAMILY]: 'familie og barn',
    [Area.PENSION]: 'pensjon',
    [Area.SOCIAL_COUNSELLING]: 'sosiale tjenester',
    [Area.ACCESSIBILITY]: 'hjelpemidler og tilrettelegging',
    [Area.INCLUSION]: 'inkludering og tilrettelegging',
    [Area.RECRUITMENT]: 'rekruttering',
    [Area.DOWNSIZING]: 'permittering og nedbemanning',
    [Area.OTHER]: 'på tvers',
};

type Props = {
    items: OversiktFilterableItem[];
};

export const OversiktOmradeFilter = ({ items }: Props) => {
    const { areaFilter, setAreaFilter } = useOversiktFilters();
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);
    const handleFilterUpdate = (area: Area) => {
        logAnalyticsEvent(AnalyticsEvents.FILTER, {
            kategori: 'område',
            filternavn: analyticsAreas[area],
            opprinnelse: 'oversiktsside områder',
            komponent: 'OverviewAreaFilter', // Todo: Wait for feedback on keeping this for consistency in analytics.
            målgruppe: context,
            innholdstype: innholdsTypeMap[contentProps.type],
        });
        setAreaFilter(area);
    };

    const areasPresent = orderedAreas.filter((area) =>
        items.some((item) => item.area.some((itemArea) => itemArea === area))
    );

    return (
        <OversiktFilterBase
            type={'areas'}
            selectionCallback={handleFilterUpdate}
            selected={areaFilter}
            options={[Area.ALL, ...areasPresent]}
        />
    );
};
