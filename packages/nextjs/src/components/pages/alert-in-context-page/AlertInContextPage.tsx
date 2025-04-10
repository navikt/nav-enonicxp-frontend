import React from 'react';

import { AlertInContext } from 'components/_common/alertInContext/AlertInContext';
import { AlertData } from 'types/content-props/alerts';

import style from './AlertInContextPage.module.scss';

export const AlertInContextPage = (props: AlertData) => {
    return (
        <section className={style.alertInContextPage}>
            <AlertInContext data={props.data} />
        </section>
    );
};
