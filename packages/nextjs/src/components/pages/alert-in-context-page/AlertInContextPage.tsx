import React from 'react';

import { VarselIKontekst } from 'components/_common/varselIKontekst/VarselIKontekst';
import { AlertData } from 'types/content-props/alerts';

import style from './AlertInContextPage.module.scss';

export const AlertInContextPage = (props: AlertData) => {
    return (
        <section className={style.alertInContextPage}>
            <VarselIKontekst data={props.data} />
        </section>
    );
};
