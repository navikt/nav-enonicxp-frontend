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
    const filterableAreas = Object.values(Area).map((area) => area);
    const { language } = usePageConfig();
    const [filters, setFilters] = useState<Area[]>([]);

    const areaTranslations = translator('areas', language);

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
                Velg område
            </Heading>
            <div className={styles.tagWrapper}>
                {filterableAreas.map((area) => {
                    const isActive =
                        filters.includes(area) ||
                        (area === Area.ALL && filters.length === 0);

                    return (
                        <button
                            key={area}
                            type="button"
                            onClick={() => handleFilterUpdate(area)}
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
                    );
                })}
            </div>
        </div>
    );
};
