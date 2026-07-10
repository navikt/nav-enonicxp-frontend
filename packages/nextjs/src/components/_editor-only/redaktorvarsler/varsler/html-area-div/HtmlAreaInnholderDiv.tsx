import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { htmlAreaInneholderDiv } from './htmlAreaInneholderDiv';
import { HtmlAreaInneholderDivVarsel } from './HtmlAreaInneholderDivVarsel';

type Props = {
    content: ContentProps;
    className?: string;
};

export const HtmlAreaInnholderDiv = ({ content, className }: Props) => {
    const warnings: React.ReactElement[] = [];

    const finnDivTagsIFormatertInnhold = (node: any): void => {
        if (!node || typeof node !== 'object') return;

        if (htmlAreaInneholderDiv(node)) {
            const { path, config } = node;

            warnings.push(
                <ul key={`${path}-list`}>
                    <li key={`${path}-${config.html.name}`}>
                        Innhold: {JSON.stringify(config.html.processedHtml)}
                    </li>
                </ul>
            );
        }

        if (Array.isArray(node)) {
            node.forEach(finnDivTagsIFormatertInnhold);
        } else {
            Object.values(node).forEach(finnDivTagsIFormatertInnhold);
        }
    };

    const regions = content.page?.regions;
    if (regions) {
        finnDivTagsIFormatertInnhold(regions);
    }

    return warnings.length > 0 ? (
        <HtmlAreaInneholderDivVarsel className={className} warnings={warnings} />
    ) : null;
};
