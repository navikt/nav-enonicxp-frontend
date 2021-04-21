import React from 'react';
import { HtmlAreaProps } from '../../../../types/component-props/parts/html-area';
import { ParsedHtml } from '../../../ParsedHtml';
import './HtmlArea.less';
import { Collapsable } from '../../../_common/collapsable/Collapsable';

export const HtmlArea = ({ config }: HtmlAreaProps) => {
    if (!config?.html) {
        return <div>{'Tom innholdskomponent. Klikk for å redigere.'}</div>;
    }

    return (
        <Collapsable {...config}>
            <div className={'html-area'}>
                <ParsedHtml content={config.html} />
            </div>
        </Collapsable>
    );
};
