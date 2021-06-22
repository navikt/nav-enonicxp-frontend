import { useState, useEffect, useRef } from 'react';
import { BEM, classNames } from '../../../utils/classnames';
import { Information } from '@navikt/ds-icons';

import './FilterExplanation.less';

const bem = BEM('filterExplanation');

interface FilterExplanationProps {
    filterExplanation: string;
    selectedFilters: string[];
}

export const FilterExplanation = ({
    filterExplanation,
    selectedFilters,
}: FilterExplanationProps) => {
    const [selectCount, setSelectCount] = useState(0);
    const [showHighlight, setShowHighlight] = useState(false);

    const highlightTimeoutRef = useRef(null);

    useEffect(() => {
        if (selectCount !== selectedFilters.length) {
            setShowHighlight(true);
            setSelectCount(selectedFilters.length);

            if (highlightTimeoutRef.current) {
                clearTimeout(highlightTimeoutRef.current);
            }

            highlightTimeoutRef.current = setTimeout(() => {
                setShowHighlight(false);
            }, 2000);
        }
    }, [selectedFilters, selectCount]);

    return (
        <div
            className={classNames(
                bem(),
                showHighlight && bem(undefined, 'highlight')
            )}
        >
            <div className={bem('iconWrapper')}>
                <Information color={showHighlight ? '#ffffff' : '#0067c5'} />
            </div>
            <div className={bem('text')}>{filterExplanation}</div>
        </div>
    );
};
