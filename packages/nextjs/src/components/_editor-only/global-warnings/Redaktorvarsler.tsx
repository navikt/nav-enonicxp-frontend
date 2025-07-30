import React from 'react';
import { Alert } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';
import { KortUrlWarning } from './warnings/kort-url/KortUrlWarning';
import { DuplicateIds } from './warnings/duplicate-ids/DuplicateIds';
import { FormNumbersWarning } from './warnings/form-numbers/FormNumbersWarning';
import { KontaktinformasjonWarning } from './warnings/kontaktinformasjon/KontaktinformasjonWarning';
import { PartUtenforInnholdsseksjon } from './warnings/part-utenfor-innholdsseksjon/PartUtenforInnholdsseksjon';
import { HtmlAreaDiv } from './warnings/html-area-div/HtmlAreaDiv';

export const isGodkjentSide = (contentType: string): boolean => {
    const godkjenteSider = [
        'no.nav.navno:situation-page',
        'no.nav.navno:guide-page',
        'no.nav.navno:themed-article-page',
        'no.nav.navno:content-page-with-sidemenus',
        'no.nav.navno:tools-page',
        'no.nav.navno:generic-page',
    ];
    return godkjenteSider.includes(contentType);
};

export const Redaktorvarsler = ({ content }: { content: ContentProps }) => {
    if (!isGodkjentSide(content.type)) {
        return;
    }

    const hasErrors = (): boolean => {
        return (
            KortUrlWarning({ content }) !== null ||
            DuplicateIds() !== null ||
            FormNumbersWarning({ content }) !== null ||
            KontaktinformasjonWarning({ content }) !== null ||
            PartUtenforInnholdsseksjon({ content }) !== null ||
            HtmlAreaDiv({ content }) !== null
        );
    };

    return (
        <>
            {hasErrors() && (
                <Alert variant="warning">
                    <strong>Redaktørvarsel:</strong>
                    <br />
                    Disse problemene må rettes før publisering:
                    <ul key="redaktorvarsler-list">
                        <KortUrlWarning content={content} />
                        <DuplicateIds />
                        <FormNumbersWarning content={content} />
                        <KontaktinformasjonWarning content={content} />
                        <PartUtenforInnholdsseksjon content={content} />
                        <HtmlAreaDiv content={content} />
                    </ul>
                </Alert>
            )}
        </>
    );
};
