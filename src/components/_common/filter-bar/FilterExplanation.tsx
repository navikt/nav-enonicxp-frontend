import { useState, useEffect, useRef } from 'react';
import { BEM, classNames } from '../../../utils/classnames';
import { Information, InformationFilled } from '@navikt/ds-icons';
import { translator } from 'translations';
import { v4 as uuid } from 'uuid';

import { usePageConfig } from 'store/hooks/usePageConfig';

import './FilterExplanation.less';

const bem = BEM('filterExplanation');

interface FilterExplanationProps {
    selectedFilters: string[];
    availableFilters: string[];
}

export const FilterExplanation = ({
    selectedFilters,
    availableFilters,
}: FilterExplanationProps) => {
    const [explanationId] = useState(uuid());
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
                bem(),
                showHighlight && bem(undefined, 'highlight')
            )}
            aria-live="assertive"
        >
            <div className={bem('iconWrapper')}>
                <InformationFilled
                    color="#006A23"
                    className={classNames(
                        bem('icon'),
                        bem('icon', showHighlight ? 'visible' : 'hidden')
                    )}
                    role="img"
                    focusable="false"
                    aria-labelledby={explanationId}
                />
                <Information
                    className={classNames(
                        bem('icon'),
                        bem('icon', showHighlight ? 'hidden' : 'visible')
                    )}
                    role="img"
                    focusable="false"
                    aria-labelledby={explanationId}
                />
            </div>
            <div className={bem('text')} id={explanationId}>
                {filterExplanation}
            </div>
        </div>
    );
};
