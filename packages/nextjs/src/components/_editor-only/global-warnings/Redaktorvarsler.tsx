import React from 'react';
import { Alert } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';
import { KortUrlWarning } from './warnings/kort-url/KortUrlWarning';
import { DuplicateIds } from './warnings/duplicate-ids/DuplicateIds';
import { FormNumbersWarning } from './warnings/form-numbers/FormNumbersWarning';
import { KontaktinformasjonWarning } from './warnings/kontaktinformasjon/KontaktinformasjonWarning';
import { HtmlAreaUtenforInnholdsseksjon } from './warnings/html-area-utenfor-innholdsseksjon/HtmlAreaUtenforInnholdsseksjon';
import { HtmlAreaDiv } from './warnings/html-area-div/HtmlAreaDiv';
import { FragmentUtenforInnholdsseksjon } from './warnings/fragment-utenfor-innholdsseksjon/FragmentUtenforInnholdsseksjon';
import style from './Redaktorvarsler.module.scss';

export const isGodkjentSide = (contentType: string): boolean => {
    const godkjenteSider = [
        'no.nav.navno:situation-page',
        'no.nav.navno:guide-page',
        'no.nav.navno:themed-article-page',
        'no.nav.navno:content-page-with-sidemenus',
        'no.nav.navno:tools-page',
        'no.nav.navno:generic-page',
        'no.nav.navno:product-details',
        'no.nav.navno:current-topic-page',
    ];
    return godkjenteSider.includes(contentType);
};

const harInnholdsseksjon = (contentType: string) =>
    contentType !== 'no.nav.navno:current-topic-page';

export const Redaktorvarsler = ({ content }: { content: ContentProps }) => {
    if (!isGodkjentSide(content.type)) {
        return;
    }

    const sjekkInnholdsseksjon = harInnholdsseksjon(content.type);

    const hasErrors = (): boolean => {
        return (
            KortUrlWarning({ content }) !== null ||
            DuplicateIds({}) !== null ||
            FormNumbersWarning({ content }) !== null ||
            KontaktinformasjonWarning({ content }) !== null ||
            (sjekkInnholdsseksjon && HtmlAreaUtenforInnholdsseksjon({ content }) !== null) ||
            (sjekkInnholdsseksjon && FragmentUtenforInnholdsseksjon({ content }) !== null) ||
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
                    <ul key="redaktorvarsler-list" className={style.redaktorvarsler}>
                        <KortUrlWarning content={content} className={style.liste} />
                        <DuplicateIds className={style.liste} />
                        <FormNumbersWarning content={content} className={style.liste} />
                        <KontaktinformasjonWarning content={content} className={style.liste} />
                        {sjekkInnholdsseksjon && (
                            <HtmlAreaUtenforInnholdsseksjon
                                content={content}
                                className={style.liste}
                            />
                        )}
                        {sjekkInnholdsseksjon && (
                            <FragmentUtenforInnholdsseksjon
                                content={content}
                                className={style.liste}
                            />
                        )}
                        <HtmlAreaDiv content={content} className={style.liste} />
                    </ul>
                </Alert>
            )}
        </>
    );
};
