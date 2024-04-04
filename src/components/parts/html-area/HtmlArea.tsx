import React from 'react';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartComponent, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ExpandableMixin, FiltersMixin } from 'types/component-props/_mixins';

import style from './HtmlArea.module.scss';

export type PartConfigHtmlArea = {
    html: ProcessedHtmlProps;
} & ExpandableMixin &
    FiltersMixin;

export const HtmlArea: PartComponent<PartType.HtmlArea> = ({ config }) => {
    if (!config?.html) {
        return <EditorHelp text={'Tom innholdskomponent. Klikk for å redigere.'} />;
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
