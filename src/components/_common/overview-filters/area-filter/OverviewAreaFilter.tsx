import React from 'react';
import { Area } from 'types/areas';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewFilterBase } from 'components/_common/overview-filters/filter-base/OverviewFilterBase';
import {
    OverviewFilterableItem,
    useOverviewFiltersState,
} from 'store/hooks/useOverviewFilters';
import { setAreaFilterAction } from 'store/slices/overviewFilters';

type Props = {
    items: OverviewFilterableItem[];
};

export const OverviewAreaFilter = ({ items }: Props) => {
    const { dispatch, areaFilter } = useOverviewFiltersState();

    const handleFilterUpdate = (area: Area) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            omrade: area,
            opprinnelse: 'oversiktsside områder',
        });
        dispatch(setAreaFilterAction({ area }));
    };

    const areasPresent = Object.values(Area).filter((area) =>
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
