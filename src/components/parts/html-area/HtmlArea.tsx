import React from 'react';
import { HtmlAreaProps } from '../../../types/component-props/parts/html-area';
import { ParsedHtml } from '../../_common/parsed-html/ParsedHtml';
import { ExpandableComponent } from '../../_common/expandable/ExpandableComponent';
import { FilteredContent } from '../../_common/filtered-content/FilteredContent';
import { EditorHelp } from '../../_common/editor-utils/editor-help/EditorHelp';

export const HtmlArea = ({ config }: HtmlAreaProps) => {
    if (!config?.html) {
        return (
            <EditorHelp text={'Tom innholdskomponent. Klikk for å redigere.'} />
        );
    }

    return (
        <FilteredContent {...config}>
            <ExpandableComponent {...config}>
                <div className={'html-area'}>
                    <ParsedHtml htmlProps={config.html} />
                </div>
            </ExpandableComponent>
        </FilteredContent>
    );
};
