import React from 'react';
import { HtmlAreaProps } from '../../../types/component-props/parts/html-area';
import { ParsedHtml } from '../../_common/parsed-html/ParsedHtml';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import { FilteredContent } from '../../_common/filtered-content/FilteredContent';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { Header } from 'components/_common/headers/Header';

import style from './HtmlArea.module.scss';

export const HtmlArea = ({ config }: HtmlAreaProps) => {
    if (!config?.html) {
        return (
            <EditorHelp text={'Tom innholdskomponent. Klikk for å redigere.'} />
        );
    }

    const getAnchor = (config: HtmlAreaProps['config']) => {
        const selected = config.anchoring?._selected;
        if (!selected) {
            return {};
        }
        const header = config.anchoring[selected].header;
        const anchorId = config.anchoring[selected].anchorId;

        return {
            header,
            anchorId,
        };
    };

    const { header, anchorId } = getAnchor(config);

    return (
        <FilteredContent {...config}>
            <ExpandableComponentWrapper {...config}>
                <div className={style.htmlArea}>
                    {header && (
                        <Header
                            level="3"
                            size="medium"
                            anchorId={anchorId}
                            justify="left"
                            hideCopyButton={true}
                        >
                            {header}
                        </Header>
                    )}
                    <ParsedHtml htmlProps={config.html} />
                </div>
            </ExpandableComponentWrapper>
        </FilteredContent>
    );
};
