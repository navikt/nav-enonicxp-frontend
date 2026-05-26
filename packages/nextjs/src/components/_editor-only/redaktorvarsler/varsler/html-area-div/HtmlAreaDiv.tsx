import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { htmlAreaInneholderDiv } from './htmlAreaInneholderDiv';

type Props = {
    content: ContentProps;
    className?: string;
};

export const HtmlAreaDiv = ({ content, className }: Props) => {
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
        <li key="html-area-div-warning" className={className}>
            Det er brukt en <code>&lt;div&gt;</code>-tagg i seksjonen for formatert innhold, noe som
            kan føre til visningsfeil på nav.no. Under ser du hvilket innhold det gjelder.
            {warnings}
            <strong>Slik retter du feilen:</strong>
            <ul>
                <li key="rette-feilen-1">
                    Lim innholdet i en ren tekst-editor (f.eks. Notepad). Kopier teksten derfra og
                    lim den inn i Enonic. Dette fjerner skjult formatering og uønsket kode.
                </li>
                <li>
                    Hvis du kan HTML: Fjern <code>&lt;div&gt;</code>-taggen direkte i
                    kildekodefeltet i Enonic.
                </li>
            </ul>
        </li>
    ) : null;
};
