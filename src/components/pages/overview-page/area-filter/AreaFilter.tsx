import { useState } from 'react';
import classNames from 'classnames';
import { Heading, Tag } from '@navikt/ds-react';

import { Area } from 'types/areas';

import { translator } from '../../../../translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './AreaFilter.module.scss';

interface OverviewFilterProps {
    filterableAreas: Area[];
    filterUpdateCallback: (filters: Area) => void;
}

export const AreaFilter = ({
    filterUpdateCallback,
    filterableAreas,
}: OverviewFilterProps) => {
    const [currentArea, setCurrentArea] = useState<Area>(Area.ALL);
    const { language } = usePageConfig();

    const areaTranslations = translator('areas', language);
    const overviewTranslations = translator('overview', language);

    const handleFilterUpdate = (area: Area) => {
        setCurrentArea(area);
        filterUpdateCallback(area);
    };

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
                    {[Area.ALL, ...filterableAreas].map((area) => {
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
