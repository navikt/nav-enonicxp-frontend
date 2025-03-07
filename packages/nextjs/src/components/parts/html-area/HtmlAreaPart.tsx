import React from 'react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ExpandableMixin, FiltersMixin } from 'types/component-props/_mixins';
import { classNames } from 'utils/classnames';

import defaultHtml from 'components/_common/parsedHtml/DefaultHtmlStyling.module.scss';
import style from './HtmlAreaPart.module.scss';

export type PartConfigHtmlArea = {
    html: ProcessedHtmlProps;
} & ExpandableMixin &
    FiltersMixin;

export const HtmlAreaPart = ({ config }: PartComponentProps<PartType.HtmlArea>) => {
    if (!config?.html) {
        return <EditorHelp text={'Tom innholdskomponent. Klikk for å redigere.'} />;
    }

    return (
        <div className={style.htmlArea}>
            <FilteredContent {...config}>
                <ExpandableComponentWrapper {...config}>
                    <div className={classNames(defaultHtml.html, style.htmlArea, 'parsedHtml')}>
                        <ParsedHtml htmlProps={config.html} />
                    </div>
                </ExpandableComponentWrapper>
            </FilteredContent>
        </div>
    );
};
