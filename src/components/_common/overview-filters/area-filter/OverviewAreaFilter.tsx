import React from 'react';
import { Area } from 'types/areas';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewFilterBase } from 'components/_common/overview-filters/filter-base/OverviewFilterBase';

type Props = {
    contentList: Array<{ area: Area[] }>;
    areaFilter: Area;
    setAreaFilter: (area: Area) => void;
};

export const OverviewAreaFilter = ({
    contentList,
    setAreaFilter,
    areaFilter,
}: Props) => {
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
        <OverviewFilterBase
            type={'areas'}
            selectionCallback={handleFilterUpdate}
            selected={areaFilter}
            options={[Area.ALL, ...areasInContentList]}
        />
    );
};
