import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { pageContentFragmentUtenforInnholdsseksjon } from './pageContentFragmentUtenforInnholdsseksjon';

type Props = {
    content: ContentProps;
    className?: string;
};

export const FragmentUtenforInnholdsseksjon = ({ content, className }: Props) => {
    const warnings: React.ReactElement[] = [];

    const finnFragmentUtenforInnholdsseksjon = (node: any): void => {
        if (!node || typeof node !== 'object') {
            return;
        }

        if (pageContentFragmentUtenforInnholdsseksjon(node)) {
            const { path, type } = node;

            if (type !== 'fragment') {
                return;
            }

            warnings.push(
                <ul key={`${path}-list`}>
                    <li key={`${path}-item`}>
                        Innhold: {node.fragment.config.html?.processedHtml}
                    </li>
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
            Fragmentet ligger utenfor den angitte innholdsseksjonen, noe som kan føre til
            visningsfeil på nav.no. Under ser du hvilket innhold det gjelder.
            {warnings}
            <strong>Slik retter du feilen:</strong>
            <ul>
                <li key="fragment-rette-feilen">
                    Flytt fragmentet innenfor de markerte eller stiplede strekene i Enonic, slik at
                    det vises korrekt i innholdsseksjonen.
                </li>
            </ul>
        </li>
    ) : null;
};
