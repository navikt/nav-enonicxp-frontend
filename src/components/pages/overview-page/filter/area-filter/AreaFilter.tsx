import React, { useState } from 'react';
import { Area } from 'types/areas';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewPageFilter } from 'components/pages/overview-page/filter/OverviewPageFilter';

type Props = {
    filterUpdateCallback: (filters: Area) => void;
    contentList: Array<{ area: Area[] }>;
};

export const AreaFilter = ({ filterUpdateCallback, contentList }: Props) => {
    const [currentArea, setCurrentArea] = useState<Area>(Area.ALL);

    const handleFilterUpdate = (area: Area) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            omrade: area,
            opprinnelse: 'oversiktsside områder',
        });
        setCurrentArea(area);
        filterUpdateCallback(area);
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
            selected={currentArea}
            options={[Area.ALL, ...areasInContentList]}
        />
    );
};
