import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { isHtmlAreaOutsideContentSection } from './IsHtmlAreaOutsideContentSection';

export const PartUtenforInnholdsseksjon = ({ content }: { content: ContentProps }) => {
    const warnings: React.ReactElement[] = [];

    const walk = (node: any): void => {
        if (node && typeof node === 'object') {
            if (isHtmlAreaOutsideContentSection(node)) {
                const { path, config } = node;
                console.log(config);
                warnings.push(
                    <li key={path}>
                        Innhold utenfor innholdsseksjon:{' '}
                        <ul>
                            <li>{JSON.stringify(config.html.macros[0]?.name)}</li>
                            <li>{JSON.stringify(config.html.processedHtml)}</li>
                            {/*{JSON.stringify(config)}*/}
                            <li>{JSON.stringify(path)}</li>
                        </ul>
                    </li>
                );
            }

            if (Array.isArray(node)) {
                node.forEach(walk);
            } else {
                Object.values(node).forEach(walk);
            }
        }
    };

    if (content.page?.regions && 'pageContent' in content.page.regions) {
        walk(content.page.regions.pageContent);
    }

    if (warnings.length == 0) return null;

    return warnings;
};
