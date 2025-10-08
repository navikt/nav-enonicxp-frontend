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
import { HarRedaktorfeil } from './HarRedaktorfeil';
import { ErGodkjentSide } from './ErGodkjentSide';
import style from './Redaktorvarsler.module.scss';

export const Redaktorvarsler = ({ content }: { content: ContentProps }) => {
    if (ErGodkjentSide(content.type)) {
        return (
            <>
                {HarRedaktorfeil(content) && (
                    <Alert variant="warning">
                        <strong>Redaktørvarsel:</strong>
                        <br />
                        Disse problemene må rettes før publisering:
                        <br />
                        Hvis lenkene i redaktørvarslet ikke fungerer, åpne forhåndsvisningen og
                        ekspander alle paneler. Rød markering viser hvor feilen ligger.
                        <ul key="redaktorvarsler-list" className={style.redaktorvarsler}>
                            <KortUrlVarsel content={content} className={style.liste} />
                            <DuplikateIder className={style.liste} />
                            <SkjemanummerVarsel content={content} className={style.liste} />
                            <KontaktinformasjonVarsel content={content} className={style.liste} />
                            <FormatertInnholdUtenforInnholdsseksjon
                                content={content}
                                className={style.liste}
                            />
                            <FragmentUtenforInnholdsseksjon
                                content={content}
                                className={style.liste}
                            />
                            <HtmlAreaDiv content={content} className={style.liste} />
                        </ul>
                    </Alert>
                )}
            </>
        );
    }
};
