import React from 'react';
import { Area } from 'types/areas';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewFilterBase } from 'components/_common/overview-filters/filter-base/OverviewFilterBase';
import { OverviewFilterableItem, useOverviewFilters } from 'store/hooks/useOverviewFilters';

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
    items: OverviewFilterableItem[];
};

export const OverviewAreaFilter = ({ items }: Props) => {
    const { areaFilter, setAreaFilter } = useOverviewFilters();

    const handleFilterUpdate = (area: Area) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            kategori: 'område',
            filternavn: analyticsAreas[area],
            opprinnelse: 'oversiktsside områder',
            komponent: 'OverviewAreaFilter',
        });
        setAreaFilter(area);
    };

    const areasPresent = orderedAreas.filter((area) =>
        items.some((item) => item.area.some((itemArea) => itemArea === area))
    );

    return (
        <OverviewFilterBase
            type={'areas'}
            selectionCallback={handleFilterUpdate}
            selected={areaFilter}
            options={[Area.ALL, ...areasPresent]}
        />
    );
};
