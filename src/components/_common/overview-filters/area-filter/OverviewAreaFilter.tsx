import React from 'react';
import { Area } from 'types/areas';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewFilterBase } from 'components/_common/overview-filters/filter-base/OverviewFilterBase';
import {
    OverviewFilterableItem,
    useOverviewFilters,
} from 'store/hooks/useOverviewFilters';
import { setAreaFilterAction } from 'store/slices/overviewFilters';
import { sortLikeArray } from 'utils/arrays';

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

type Props = {
    items: OverviewFilterableItem[];
};

export const OverviewAreaFilter = ({ items }: Props) => {
    const { dispatch, areaFilter } = useOverviewFilters();

    const handleFilterUpdate = (area: Area) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            omrade: area,
            opprinnelse: 'oversiktsside områder',
        });
        dispatch(setAreaFilterAction({ area }));
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
