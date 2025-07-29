import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { htmlAreaIsInPageContentButNotInContentSection } from './htmlAreaIsInPageContentButNotInContentSection';

type Props = {
    content: ContentProps;
};

export const PartUtenforInnholdsseksjon = ({ content }: Props) => {
    const warnings: React.ReactElement[] = [];

    const walk = (node: any): void => {
        if (!node || typeof node !== 'object') return;

        if (htmlAreaIsInPageContentButNotInContentSection(node)) {
            const { path, config } = node;

            warnings.push(
                <ul>
                    <li key={path}>Innhold: {JSON.stringify(config.html.processedHtml)}</li>
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
    if (regions && 'pageContent' in regions) {
        walk(regions['pageContent']);
    }

    return warnings.length > 0 ? (
        <>
            <li>
                Innholdet ligger utenfor den angitte innholdsseksjonen og må flyttes inn for å sikre
                korrekt struktur ved publisering (se rød markering på siden). Under finner du
                detaljer om hvilket innhold dette gjelder.
            </li>
            {warnings}
        </>
    ) : null;
};
