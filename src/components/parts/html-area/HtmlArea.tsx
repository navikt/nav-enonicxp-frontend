import React from 'react';
import { ParsedHtml } from '../../_common/parsed-html/ParsedHtml';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import { FilteredContent } from '../../_common/filtered-content/FilteredContent';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { PartComponent, PartType } from '../../../types/component-props/parts';

import style from './HtmlArea.module.scss';

export const HtmlArea: PartComponent<PartType.HtmlArea> = ({ config }) => {
    if (!config?.html) {
        return (
            <EditorHelp text={'Tom innholdskomponent. Klikk for å redigere.'} />
        );
    }
    return (
        <FilteredContent {...config}>
            <ExpandableComponentWrapper {...config}>
                <div className={style.htmlArea}>
                    <ParsedHtml htmlProps={config.html} />
                </div>
            </ExpandableComponentWrapper>
        </FilteredContent>
    );
};
