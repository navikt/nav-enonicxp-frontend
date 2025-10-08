import React from 'react';
import { Alert } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';
import { KortUrlVarsel } from './varsler/kort-url/KortUrlVarsel';
import { DuplikateIder } from './varsler/duplikate-ider/DuplikateIder';
import { SkjemanummerVarsel } from './varsler/skjemanummer/SkjemanummerVarsel';
import { KontaktinformasjonVarsel } from './varsler/kontaktinformasjon/KontaktinformasjonVarsel';
import { FormatertInnholdUtenforInnholdsseksjon } from './varsler/formatert-innhold-utenfor-innholdsseksjon/FormatertInnholdUtenforInnholdsseksjon';
import { HtmlAreaDiv } from './varsler/html-area-div/HtmlAreaDiv';
import { FragmentUtenforInnholdsseksjon } from './varsler/fragment-utenfor-innholdsseksjon/FragmentUtenforInnholdsseksjon';
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
    ];
    return godkjenteSider.includes(contentType);
};

export const Redaktorvarsler = ({ content }: { content: ContentProps }) => {
    if (!isGodkjentSide(content.type)) {
        return;
    }

    const hasErrors = (): boolean => {
        return (
            KortUrlVarsel({ content }) !== null ||
            DuplikateIder({}) !== null ||
            SkjemanummerVarsel({ content }) !== null ||
            KontaktinformasjonVarsel({ content }) !== null ||
            FormatertInnholdUtenforInnholdsseksjon({ content }) !== null ||
            FragmentUtenforInnholdsseksjon({ content }) !== null ||
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
                        <KortUrlVarsel content={content} className={style.liste} />
                        <DuplikateIder className={style.liste} />
                        <SkjemanummerVarsel content={content} className={style.liste} />
                        <KontaktinformasjonVarsel content={content} className={style.liste} />
                        <FormatertInnholdUtenforInnholdsseksjon
                            content={content}
                            className={style.liste}
                        />
                        <FragmentUtenforInnholdsseksjon content={content} className={style.liste} />
                        <HtmlAreaDiv content={content} className={style.liste} />
                    </ul>
                </Alert>
            )}
        </>
    );
};
