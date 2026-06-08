import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { pageContentFormatertInnholdUtenforInnholdsseksjon } from './pageContentFormatertInnholdUtenforInnholdsseksjon';
import { FormatertInnholdUtenforInnholdsseksjonVarsel } from './FormatertInnholdUtenforInnholdsseksjonVarsel';

type Props = {
    content: ContentProps;
    className?: string;
};

export const FormatertInnholdUtenforInnholdsseksjon = ({ content, className }: Props) => {
    const warnings: React.ReactElement[] = [];

    // Sjekk om innholdstypen krever en innholdsseksjon. Hvis ikke, returner null.
    if (content.type === 'no.nav.navno:current-topic-page') {
        return null;
    }

    const finnHtmlAreaUtenforInnholdsseksjon = (node: any): void => {
        if (!node || typeof node !== 'object') return;

        if (pageContentFormatertInnholdUtenforInnholdsseksjon(node)) {
            const { path, config } = node;

            if (!config.html?.processedHtml) {
                return;
            }

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
        <FormatertInnholdUtenforInnholdsseksjonVarsel className={className} warnings={warnings} />
    ) : null;
};
