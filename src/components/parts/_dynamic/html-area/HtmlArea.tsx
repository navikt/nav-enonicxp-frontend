import React from 'react';
import { HtmlAreaProps } from '../../../../types/component-props/parts/html-area';
import { ParsedHtml } from '../../../ParsedHtml';
import './HtmlArea.less';

export const HtmlArea = ({ config }: HtmlAreaProps) => {
    if (!config?.html) {
        return <div>{'Tom innholdskomponent. Klikk for å redigere.'}</div>;
    }

    const { collapsable, collapsableDefault } = config;
    console.log('Collapsable props:', collapsable, collapsableDefault);

    return (
        <div className={'html-area'}>
            <ParsedHtml content={config.html} />
        </div>
    );
};
