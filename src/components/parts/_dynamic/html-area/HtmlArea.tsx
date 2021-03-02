import React from 'react';
import { HtmlAreaProps } from '../../../../types/component-props/parts/html-area';
import { ParsedHtml } from '../../../ParsedHtml';
import { Header } from '../../../_common/header/Header';
import './HtmlArea.less';

export const HtmlArea = ({ config }: HtmlAreaProps) => {
    if (!config?.html) {
        return <div>{'Tom innholdskomponent. Klikk for å redigere.'}</div>;
    }

    const { html, title } = config;

    return (
        <div className={'html-area'}>
            {title && <Header text={title} tag={'h3'} justify={'left'} />}
            <ParsedHtml content={html} />
        </div>
    );
};
