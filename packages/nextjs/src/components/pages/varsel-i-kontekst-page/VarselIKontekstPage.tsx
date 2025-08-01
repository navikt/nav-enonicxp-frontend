import React from 'react';
import { VarselIKontekst } from 'components/_common/varselIKontekst/VarselIKontekst';
import { AlertData } from 'types/content-props/alerts';
import style from './VarselIKontekstPage.module.scss';

export const VarselIKontekstPage = (props: AlertData) => {
    return (
        <section className={style.varselKontekstPage}>
            <VarselIKontekst data={props.data} />
        </section>
    );
};
