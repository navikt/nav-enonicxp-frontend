import React from 'react';

import { AlertInContext } from 'components/_common/alert-in-context/AlertInContext';
import { AlertData } from 'types/content-props/alerts';

import style from './AlertInContextPage.module.scss';

export const AlertInContextPage = (props: AlertData) => {
    return (
        <div className={style.alertInContextPage}>
            <AlertInContext alert={props} />
        </div>
    );
};
