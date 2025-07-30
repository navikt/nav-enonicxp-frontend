import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { htmlAreaContainsDiv } from './htmlAreaContainsDiv';
import style from './HtmlAreaDiv.module.scss';

type Props = {
    content: ContentProps;
};

export const HtmlAreaDiv = ({ content }: Props) => {
    const warnings: React.ReactElement[] = [];

    const finnDivTagsIFormatertInnhold = (node: any): void => {
        if (!node || typeof node !== 'object') return;

        if (htmlAreaContainsDiv(node)) {
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
        <li key="html-area-div-warning">
            Det er oppdaget en <code>&lt;div&gt;</code>-tagg i seksjonen Formatert innhold, noe som
            ikke er tillatt og kan føre til visningsfeil på nav.no. Under finner du mer informasjon
            om hvilket innhold det gjelder.
            <div className={style.space}>{warnings}</div>
            <div className={style.space}>
                <strong>Slik retter du feilen:</strong>
            </div>
            <ul>
                <li key="rette-feilen-1">
                    Fjern <code>&lt;div&gt;</code>-taggen fra HTML-koden.
                </li>
                <li key="rette-feilen-2">
                    Hvis innholdet er kopiert fra Word eller en nettside, lim det først inn i en ren
                    tekst-editor (f.eks. Notepad), og deretter inn i Enonic for å fjerne skjult
                    formatering.
                </li>
            </ul>
        </li>
    ) : null;
};
