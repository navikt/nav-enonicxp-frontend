import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { pageContentHtmlAreaIsOutsideSections } from './pageContentHtmlAreaIsOutsideSections';

type Props = {
    content: ContentProps;
};

export const PartUtenforInnholdsseksjon = ({ content }: Props) => {
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
            <li key="part-utenfor-innholdsseksjon-warning">
                Innholdet ligger utenfor den angitte innholdsseksjonen og må flyttes inn for å sikre
                korrekt struktur ved publisering (se rød markering på siden). Under finner du
                detaljer om hvilket innhold dette gjelder.
            </li>
            {warnings}
        </>
    ) : null;
};
