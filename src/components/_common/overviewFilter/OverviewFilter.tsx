import { useState } from 'react';
import { Area } from 'types/areas';
import styles from './OverviewFilter.module.scss';
import { translator } from '../../../translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { Heading, Tag } from '@navikt/ds-react';
import classNames from 'classnames';

interface OverviewFilterProps {
    filterUpdateCallback: (filters: Area[]) => void;
}

export const OverviewFilter = ({
    filterUpdateCallback,
}: OverviewFilterProps) => {
    const filterableAreas = Object.values(Area);
    const { language } = usePageConfig();
    const [filters, setFilters] = useState<Area[]>([]);

    const areaTranslations = translator('areas', language);
    const overviewTranslations = translator('overview', language);

    const handleFilterUpdate = (area: Area) => {
        if (area === Area.ALL) {
            setFilters([]);
            filterUpdateCallback([]);
            return;
        }
        const foundAtPos = filters.findIndex((filter) => filter === area);
        const updatedFilters =
            foundAtPos > -1
                ? filters.filter((filter) => filter !== area)
                : [...filters, area];
        setFilters(updatedFilters);
        filterUpdateCallback(updatedFilters);
    };

    return (
        <div className={styles.overviewFilter}>
            <Heading size="large" level="3">
                {overviewTranslations('chooseArea')}
            </Heading>
            <nav
                role="navigation"
                aria-label={overviewTranslations('ariaExplanation')}
                className={styles.tagWrapper}
            >
                <ul className={styles.filterWrapper}>
                    {filterableAreas.map((area) => {
                        const isActive =
                            filters.includes(area) ||
                            (area === Area.ALL && filters.length === 0);

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
