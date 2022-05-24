import { useState } from 'react';
import classNames from 'classnames';

import { Area } from 'types/areas';

import { translator } from '../../../translations';
import { Heading, Tag } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './OverviewFilter.module.scss';

interface OverviewFilterProps {
    filterUpdateCallback: (filters: Area) => void;
}

export const OverviewFilter = ({
    filterUpdateCallback,
}: OverviewFilterProps) => {
    const filterableAreas = Object.values(Area);
    const [areaFilter, setAreaFilter] = useState<Area>(Area.ALL);

    const { language } = usePageConfig();
    const areaTranslations = translator('areas', language);
    const overviewTranslations = translator('overview', language);

    const handleFilterUpdate = (area: Area) => {
        setAreaFilter(area);
        filterUpdateCallback(area);
    };

    return (
        <div className={styles.overviewFilter}>
            <Heading size="medium" level="3">
                {overviewTranslations('chooseArea')}
            </Heading>
            <nav
                role="navigation"
                aria-label={overviewTranslations('ariaExplanation')}
                className={styles.tagWrapper}
            >
                <ul className={styles.filterWrapper}>
                    {filterableAreas.map((area) => {
                        const isActive = areaFilter === area;

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
