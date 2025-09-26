import React, { useEffect, useState } from 'react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { FilteredContent } from 'components/_common/filtered-content/FilteredContent';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ExpandableMixin, FiltersMixin } from 'types/component-props/_mixins';
import { classNames } from 'utils/classnames';
import defaultHtml from 'components/_common/parsedHtml/DefaultHtmlStyling.module.scss';
import { htmlAreaContainsDiv } from 'components/_editor-only/global-warnings/warnings/html-area-div/htmlAreaContainsDiv';
import { useIsEditorView } from 'store/hooks/useIsEditorView';
import { isGodkjentSide } from 'components/_editor-only/global-warnings/Redaktorvarsler';
import { usePageContentProps } from 'store/pageContext';
import { htmlAreaUtenforInnholdsseksjon } from 'components/_editor-only/global-warnings/warnings/part-utenfor-innholdsseksjon/htmlAreaUtenforInnholdsseksjon';
import style from './HtmlAreaPart.module.scss';

export type PartConfigHtmlArea = {
    html: ProcessedHtmlProps;
} & ExpandableMixin &
    FiltersMixin;

type HtmlAreaPartProps = PartComponentProps<PartType.HtmlArea> & {
    path: string;
    descriptor: string;
};

export const HtmlAreaPart = ({ config, path, descriptor }: HtmlAreaPartProps) => {
    const shouldWarn =
        htmlAreaUtenforInnholdsseksjon({ path }) || htmlAreaContainsDiv({ descriptor, config });
    const [redBorderStyling, setRedBorderStyling] = useState(false);
    const isEditorView = useIsEditorView();
    const { type } = usePageContentProps();

    useEffect(() => {
        if (shouldWarn && isEditorView && isGodkjentSide(type)) {
            setRedBorderStyling(true);
        }
    }, [shouldWarn, path, descriptor, config, isEditorView, type]);

    if (!config?.html) {
        return <EditorHelp text="Tom innholdskomponent. Klikk for å redigere." />;
    }

    return (
        <div className={classNames(style.htmlArea, redBorderStyling && style.redBorder)}>
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
