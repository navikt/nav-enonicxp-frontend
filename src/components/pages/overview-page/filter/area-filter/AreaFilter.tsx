import React, { useState } from 'react';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { Area } from 'types/areas';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';
import { OverviewPageFilter } from 'components/pages/overview-page/filter/OverviewPageFilter';

interface OverviewFilterProps {
    filterUpdateCallback: (filters: Area) => void;
    productList: SimplifiedProductData[];
}

export const AreaFilter = ({
    filterUpdateCallback,
    productList,
}: OverviewFilterProps) => {
    const [currentArea, setCurrentArea] = useState<Area>(Area.ALL);

    const handleFilterUpdate = (area: Area) => {
        logAmplitudeEvent(AnalyticsEvents.FILTER, {
            omrade: area,
            opprinnelse: 'områdefilter',
        });
        setCurrentArea(area);
        filterUpdateCallback(area);
    };

    const areasInProductList = Object.values(Area).filter((area) =>
        productList.some((product) =>
            product.area.some((areaItem) => areaItem === area)
        )
    );

    return (
        <OverviewPageFilter
            type={'areas'}
            selectionCallback={handleFilterUpdate}
            selected={currentArea}
            options={areasInProductList}
        />
    );
};
