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
import { isHtmlAreaOutsideContentSection } from 'components/_editor-only/global-warnings/warnings/part-utenfor-innholdsseksjon/IsHtmlAreaOutsideContentSection';
import style from './HtmlAreaPart.module.scss';

export type PartConfigHtmlArea = {
    html: ProcessedHtmlProps;
} & ExpandableMixin &
    FiltersMixin;

type HtmlAreaPartProps = PartComponentProps<PartType.HtmlArea> & {
    path: string;
    descriptor: string;
    type: string;
};

export const HtmlAreaPart = ({ config, path, descriptor }: HtmlAreaPartProps) => {
    const shouldWarn = isHtmlAreaOutsideContentSection({ path, descriptor });
    const [redBorderStyling, setRedBorderStyling] = useState(false);

    useEffect(() => {
        if (shouldWarn) {
            setRedBorderStyling(true);
        }
    }, [shouldWarn, path, descriptor, config]);

    if (!config?.html) {
        return <EditorHelp text={'Tom innholdskomponent. Klikk for å redigere.'} />;
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
