import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { pageContentHtmlAreaIsOutsideSections } from './pageContentHtmlAreaIsOutsideSections';

type Props = {
    content: ContentProps;
    className?: string;
};

export const PartUtenforInnholdsseksjon = ({ content, className }: Props) => {
    const warnings: React.ReactElement[] = [];

    const finnHtmlAreaUtenforInnholdsseksjon = (node: any): void => {
        if (!node || typeof node !== 'object') return;

        if (pageContentHtmlAreaIsOutsideSections(node)) {
            const { path, config } = node;

            warnings.push(
                <ul key={`${path}-list`}>
                    <li key={`${path}-item`}>
                        Innhold: {JSON.stringify(config.html.processedHtml)}
                    </li>
                </ul>
            );
        }

        if (Array.isArray(node)) {
            node.forEach(finnHtmlAreaUtenforInnholdsseksjon);
        } else {
            Object.values(node).forEach(finnHtmlAreaUtenforInnholdsseksjon);
        }
    };

    const regions = content.page?.regions;
    if (regions && 'pageContent' in regions) {
        finnHtmlAreaUtenforInnholdsseksjon(regions['pageContent']);
    }

    return warnings.length > 0 ? (
        <>
            <li key="part-utenfor-innholdsseksjon-warning" className={className}>
                Innholdet ligger utenfor den angitte innholdsseksjonen, noe som kan føre til
                visningsfeil på nav.no. Under ser du hvilket innhold det gjelder.
                {warnings}
                <strong>Slik retter du feilen:</strong>
                <ul>
                    <li key="rette-feilen">
                        Flytt innholdet innenfor de markerte eller stiplede strekene i Enonic, slik
                        at det vises korrekt i innholdsseksjonen.
                    </li>
                </ul>
            </li>
        </>
    ) : null;
};
