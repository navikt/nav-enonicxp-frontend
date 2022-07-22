import { useState, useEffect, useRef, useId } from 'react';
import { classNames } from '../../../utils/classnames';
import { Information, InformationFilled } from '@navikt/ds-icons';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import style from './FilterExplanation.module.scss';

interface FilterExplanationProps {
    selectedFilters: string[];
    availableFilters: string[];
}

export const FilterExplanation = ({
    selectedFilters,
    availableFilters,
}: FilterExplanationProps) => {
    const explanationId = useId();
    const [selectCount, setSelectCount] = useState(0);
    const [showHighlight, setShowHighlight] = useState(false);

    const { language } = usePageConfig();

    const highlightTimeoutRef = useRef(null);
    const relevantSelectedFilters = selectedFilters.filter((filterId) =>
        availableFilters.includes(filterId)
    );

    useEffect(() => {
        if (selectCount !== relevantSelectedFilters.length) {
            setShowHighlight(true);
            setSelectCount(relevantSelectedFilters.length);

            if (highlightTimeoutRef.current) {
                clearTimeout(highlightTimeoutRef.current);
            }

            highlightTimeoutRef.current = setTimeout(() => {
                setShowHighlight(false);
            }, 2000);
        }
    }, [relevantSelectedFilters, selectCount]);

    const getLabel = translator('filteredContent', language);

    const filterExplanation =
        relevantSelectedFilters.length === 0
            ? getLabel('noFiltersSelected')
            : getLabel('filtersSelected');

    return (
        <div
            className={classNames(
                style.filterExplanation,
                showHighlight && style.filterExplanationHighlight
            )}
            aria-live="assertive"
        >
            <div className={style.iconWrapper}>
                <InformationFilled
                    color="#006A23"
                    className={classNames(
                        style.icon,
                        showHighlight ? style.iconVisible : style.iconHidden
                    )}
                    role="img"
                    focusable="false"
                    aria-labelledby={explanationId}
                />
                <Information
                    className={classNames(
                        style.icon,
                        showHighlight ? style.iconHidden : style.iconVisible
                    )}
                    role="img"
                    focusable="false"
                    aria-labelledby={explanationId}
                />
            </div>
            <div className="text" id={explanationId}>
                {filterExplanation}
            </div>
        </div>
    );
};
