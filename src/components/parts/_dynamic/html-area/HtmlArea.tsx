import React from 'react';
import { HtmlAreaProps } from '../../../../types/component-props/parts/html-area';
import { ParsedHtml } from '../../../ParsedHtml';

export const HtmlArea = ({ config }: HtmlAreaProps) => {
    if (!config?.html) {
        return <div>{'Tom innholdskomponent. Klikk for å redigere.'}</div>;
    }

    return (
        <div>
            <ParsedHtml content={config.html} />
        </div>
    );
};
