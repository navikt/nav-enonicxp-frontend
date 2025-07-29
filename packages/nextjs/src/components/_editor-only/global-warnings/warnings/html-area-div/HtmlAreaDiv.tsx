import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { htmlAreaContainsDiv } from './htmlAreaContainsDiv';

type Props = {
    content: ContentProps;
};

export const HtmlAreaDiv = ({ content }: Props) => {
    const warnings: React.ReactElement[] = [];

    const walk = (node: any): void => {
        if (!node || typeof node !== 'object') return;

        if (htmlAreaContainsDiv(node)) {
            const { path, config } = node;
            warnings.push(
                <ul>
                    <li key={`${path}-${Math.random().toString(36).substr(2, 9)}`}>
                        Innhold: {JSON.stringify(config.html.processedHtml)}
                    </li>
                </ul>
            );
        }

        if (Array.isArray(node)) {
            node.forEach(walk);
        } else {
            Object.values(node).forEach(walk);
        }
    };

    const regions = content.page?.regions;
    if (regions) {
        walk(regions);
    }

    return warnings.length > 0 ? (
        <>
            <li>
                Det er en feil i Formatert innhold som må rettes for å sikre korrekt struktur ved
                publisering (se rød markering under). Det inneholder en <code>&lt;div&gt;</code>
                -tagg som ikke er tillatt. Se mer informasjon under om hvilket innhold det gjelder.
            </li>
            {warnings}
        </>
    ) : null;
};
