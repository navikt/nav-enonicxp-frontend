import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { pageContentFragmentUtenforInnholdsseksjon } from './pageContentFragmentUtenforInnholdsseksjon';

type Props = {
    content: ContentProps;
    className?: string;
};

export const FragmentUtenforInnholdsseksjon = ({ content, className }: Props) => {
    const warnings: React.ReactElement[] = [];

    // Sjekk om innholdstypen krever en innholdsseksjon. Hvis ikke, returner null.
    if (content.type == 'no.nav.navno:current-topic-page') {
        return null;
    }

    const finnFragmentUtenforInnholdsseksjon = (node: any): void => {
        if (!node || typeof node !== 'object') {
            return;
        }

        if (pageContentFragmentUtenforInnholdsseksjon(node)) {
            const { path, type } = node;

            if (type !== 'fragment') {
                return;
            }

            const innhold = () => {
                if (node.fragment.config.html?.processedHtml !== undefined) {
                    return JSON.stringify(node.fragment.config.html.processedHtml);
                } else if (node.fragment.config.content?.processedHtml !== undefined) {
                    return JSON.stringify(node.fragment.config.content.processedHtml);
                }
            };

            warnings.push(
                <ul key={`${path}-list`}>
                    <li key={`${path}-item`}>Innhold: {innhold()}</li>
                </ul>
            );
        }

        if (Array.isArray(node)) {
            node.forEach(finnFragmentUtenforInnholdsseksjon);
        } else {
            Object.values(node).forEach(finnFragmentUtenforInnholdsseksjon);
        }
    };

    const regions = content.page?.regions;
    if (regions && 'pageContent' in regions) {
        finnFragmentUtenforInnholdsseksjon(regions['pageContent']);
    }

    return warnings.length > 0 ? (
        <li key="fragment-utenfor-innholdsseksjon-warning" className={className}>
            {warnings.length === 1 ? 'Fragmentet' : 'Fragmentene'} ligger utenfor den angitte
            innholdsseksjonen, noe som kan føre til visningsfeil på nav.no. Under ser du hvilket
            innhold det gjelder.
            {warnings}
            <strong>Slik retter du feilen:</strong>
            <ul>
                <li key="fragment-rette-feilen">
                    Flytt {warnings.length === 1 ? 'fragmentet' : 'fragmentene'} innenfor de
                    markerte eller stiplede strekene i Enonic, slik at det vises korrekt i
                    innholdsseksjonen.
                </li>
            </ul>
        </li>
    ) : null;
};
