import React from 'react';
import { Alert } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';
import { KortUrlVarsel } from './varsler/kort-url/KortUrlVarsel';
import { DuplikateIder } from './varsler/duplikate-ider/DuplikateIder';
import { SkjemanummerVarsel } from './varsler/skjemanummer/SkjemanummerVarsel';
import { KontaktinformasjonVarsel } from './varsler/kontaktinformasjon/KontaktinformasjonVarsel';
import { FormatertInnholdUtenforInnholdsseksjonVarsel } from './varsler/formatert-innhold-utenfor-innholdsseksjon/FormatertInnholdUtenforInnholdsseksjonVarsel';
import { HtmlAreaInnholderDivVarsel } from './varsler/html-area-div/HtmlAreaInnholderDivVarsel';
import { FragmentUtenforInnholdsseksjonVarsel } from './varsler/fragment-utenfor-innholdsseksjon/FragmentUtenforInnholdsseksjonVarsel';
import { harRedaktorfeil } from './harRedaktorFeil';
import { erGodkjentSide } from './erGodkjentSide';
import style from './Redaktorvarsler.module.scss';

export const Redaktorvarsler = ({ content }: { content: ContentProps }) => {
    if (erGodkjentSide(content.type)) {
        return (
            <>
                {harRedaktorfeil(content) && (
                    <Alert variant="warning">
                        <strong>Redaktørvarsel:</strong>
                        <br />
                        Disse problemene må rettes før publisering:
                        <ul key="redaktorvarsler-list" className={style.redaktorvarsler}>
                            <KortUrlVarsel content={content} className={style.liste} />
                            <DuplikateIder className={style.liste} />
                            <SkjemanummerVarsel content={content} className={style.liste} />
                            <KontaktinformasjonVarsel content={content} className={style.liste} />
                            <FormatertInnholdUtenforInnholdsseksjonVarsel
                                content={content}
                                className={style.liste}
                            />
                            <FragmentUtenforInnholdsseksjonVarsel
                                content={content}
                                className={style.liste}
                            />
                            <HtmlAreaInnholderDivVarsel content={content} className={style.liste} />
                        </ul>
                    </Alert>
                )}
            </>
        );
    }
};
