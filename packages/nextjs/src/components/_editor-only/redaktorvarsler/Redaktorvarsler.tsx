import React from 'react';
import { Alert } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';
import { KortUrlVarsel } from './varsler/kort-url/KortUrlVarsel';
import { DuplikateIder } from './varsler/duplikate-ider/DuplikateIder';
import { useDuplikateIder } from './varsler/duplikate-ider/useDuplikateIder';
import { SkjemanummerVarsel } from './varsler/skjemanummer/SkjemanummerVarsel';
import { KontaktinformasjonVarsel } from './varsler/kontaktinformasjon/KontaktinformasjonVarsel';
import { FormatertInnholdUtenforInnholdsseksjon } from './varsler/formatert-innhold-utenfor-innholdsseksjon/FormatertInnholdUtenforInnholdsseksjon';
import { HtmlAreaInnholderDiv } from './varsler/html-area-div/HtmlAreaInnholderDiv';
import { FragmentUtenforInnholdsseksjon } from './varsler/fragment-utenfor-innholdsseksjon/FragmentUtenforInnholdsseksjon';
import { harRedaktorfeil } from './harRedaktorFeil';
import { erGodkjentSide } from './erGodkjentSide';
import style from './Redaktorvarsler.module.scss';

export const Redaktorvarsler = ({ content }: { content: ContentProps }) => {
    const { unikeDuplikatIder } = useDuplikateIder();

    if (erGodkjentSide(content.type)) {
        const harFeil = harRedaktorfeil(content) || unikeDuplikatIder.length > 0;

        return (
            <>
                {harFeil && (
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
                            <FragmentUtenforInnholdsseksjon
                                content={content}
                                className={style.liste}
                            />
                            <HtmlAreaInnholderDiv content={content} className={style.liste} />
                        </ul>
                    </Alert>
                )}
            </>
        );
    }
};
