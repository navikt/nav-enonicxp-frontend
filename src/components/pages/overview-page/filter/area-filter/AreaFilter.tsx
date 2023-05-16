import React from 'react';
import { Area } from 'types/areas';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewPageFilter } from 'components/pages/overview-page/filter/OverviewPageFilter';
import { useOverviewFilters } from 'components/_common/overview-filters/filter-context/useOverviewFilters';

type Props = {
    contentList: Array<{ area: Area[] }>;
};

export const AreaFilter = ({ contentList }: Props) => {
    const { setAreaFilter, filtersState } = useOverviewFilters();

    const handleFilterUpdate = (area: Area) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            omrade: area,
            opprinnelse: 'oversiktsside områder',
        });
        setAreaFilter(area);
    };

    const areasInContentList = Object.values(Area).filter((area) =>
        contentList.some((product) =>
            product.area.some((areaItem) => areaItem === area)
        )
    );

    return (
        <OverviewPageFilter
            type={'areas'}
            selectionCallback={handleFilterUpdate}
            selected={filtersState.areaFilter}
            options={[Area.ALL, ...areasInContentList]}
        />
    );
};
