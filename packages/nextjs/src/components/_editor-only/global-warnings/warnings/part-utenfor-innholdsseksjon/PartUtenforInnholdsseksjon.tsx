import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { isHtmlAreaInPageContentButNotInContentSection } from './isHtmlAreaInPageContentButNotInContentSection';

export const PartUtenforInnholdsseksjon = ({ content }: { content: ContentProps }) => {
    const warnings: React.ReactElement[] = [];

    const walk = (node: any): void => {
        if (!node || typeof node !== 'object') return;

        if (isHtmlAreaInPageContentButNotInContentSection(node)) {
            const { path, config } = node;
            const navn = config.html.macros[0]?.name;

            warnings.push(
                <li key={path}>
                    Innhold utenfor innholdsseksjon:{' '}
                    <ul>
                        <li>Navn: {navn ? JSON.stringify(navn) : 'Mangler navn'}</li>
                        <li>Path: {JSON.stringify(path)}</li>
                    </ul>
                </li>
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

    return warnings.length > 0 ? <>{warnings}</> : null;
};
