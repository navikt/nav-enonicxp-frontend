import React from 'react';
import { HtmlAreaProps } from '../../../../types/component-props/parts/html-area';
import { ParsedHtml } from '../../../ParsedHtml';
import { Expandable } from '../../../_common/expandable/Expandable';
import { FilteredContent } from '../../../_common/filtered-content/FilteredContent';

import './HtmlArea.less';

export const HtmlArea = ({ config }: HtmlAreaProps) => {
    if (!config?.html) {
        return <div>{'Tom innholdskomponent. Klikk for å redigere.'}</div>;
    }

    return (
        <FilteredContent {...config}>
            <Expandable {...config}>
                <div className={'html-area'}>
                    <ParsedHtml htmlProps={config.html} />
                </div>
            </Expandable>
        </FilteredContent>
    );
};
