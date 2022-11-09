import React, { useState } from 'react';
import classNames from 'classnames';
import { Heading, Tag } from '@navikt/ds-react';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { Area } from 'types/areas';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './AreaFilter.module.scss';
import { AnalyticsEvents, logAmplitudeEvent } from 'utils/amplitude';

interface OverviewFilterProps {
    filterUpdateCallback: (filters: Area) => void;
    productList: SimplifiedProductData[];
}

export const AreaFilter = ({
    filterUpdateCallback,
    productList,
}: OverviewFilterProps) => {
    const [currentArea, setCurrentArea] = useState<Area>(Area.ALL);
    const { language } = usePageConfig();

    const areaTranslations = translator('areas', language);
    const overviewTranslations = translator('overview', language);

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
        <div className={styles.overviewFilter}>
            <Heading size="small" level="2">
                {overviewTranslations('chooseArea')}
            </Heading>
            <nav
                role="navigation"
                aria-label={overviewTranslations('ariaExplanation')}
            >
                <ul className={styles.filterWrapper}>
                    {[Area.ALL, ...areasInProductList].map((area) => {
                        const isActive = currentArea === area;

                        return (
                            <li key={area}>
                                <button
                                    type="button"
                                    onClick={() => handleFilterUpdate(area)}
                                    aria-current={isActive}
                                    aria-label={`${overviewTranslations(
                                        'ariaItemExplanation'
                                    )} ${areaTranslations(area)}}`}
                                    className={classNames(
                                        styles.filterButton,
                                        isActive && styles.activeButton
                                    )}
                                >
                                    <Tag
                                        variant="info"
                                        className={styles.tag}
                                        size="small"
                                    >
                                        {' '}
                                        {areaTranslations(area)}
                                    </Tag>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
