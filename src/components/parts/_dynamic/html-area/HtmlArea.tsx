import React from 'react';
import { HtmlAreaProps } from '../../../../types/component-props/parts/html-area';
import { ParsedHtml } from '../../../ParsedHtml';
import { Expandable } from '../../../_common/expandable/Expandable';
import { FilteredContent } from '../../../_common/filtered-content/FilteredContent';

import { useFilterState } from '../../../../store/hooks/useFilterState';
import './HtmlArea.less';

export const HtmlArea = ({ config }: HtmlAreaProps) => {
    const dummyId = '1234';
    const { contentFilters, toggleFilter } = useFilterState(dummyId);

    if (!config?.html) {
        return <div>{'Tom innholdskomponent. Klikk for å redigere.'}</div>;
    }

    return (
        <FilteredContent {...config}>
            <Expandable {...config}>
                <div className={'html-area'}>
                    {JSON.stringify(contentFilters)}
                    <ParsedHtml content={config.html} />
                </div>
            </Expandable>
        </FilteredContent>
    );
};
