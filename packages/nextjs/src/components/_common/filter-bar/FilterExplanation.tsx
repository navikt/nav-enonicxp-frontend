import { useState, useEffect, useRef, useId } from 'react';
import { InformationSquareIcon, InformationSquareFillIcon } from '@navikt/aksel-icons';
import { classNames } from 'utils/classnames';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';

import style from './FilterExplanation.module.scss';

type FilterExplanationProps = {
    selectedFilters: string[];
    availableFilters: string[];
};

export const FilterExplanation = ({
    selectedFilters,
    availableFilters,
}: FilterExplanationProps) => {
    const explanationId = useId();
    const [selectCount, setSelectCount] = useState(0);
    const [showHighlight, setShowHighlight] = useState(false);

    const { language } = usePageContentProps();

    const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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
            aria-atomic={true}
        >
            <div className={style.iconWrapper}>
                <InformationSquareFillIcon
                    className={classNames(
                        style.icon,
                        style.highlighted,
                        showHighlight ? style.iconVisible : style.iconHidden
                    )}
                    aria-hidden={true}
                />
                <InformationSquareIcon
                    className={classNames(
                        style.icon,
                        showHighlight ? style.iconHidden : style.iconVisible
                    )}
                    aria-hidden={true}
                />
            </div>
            <div className="text" id={explanationId}>
                {filterExplanation}
            </div>
        </div>
    );
};
