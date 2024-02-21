import React from 'react';
import { AlertData } from 'types/content-props/alerts';
import { AlertBox } from '../alert-box/AlertBox';

import style from './AlertInContext.module.scss';

type Props = {
    alert: AlertData;
};

export const AlertInContext = ({ alert }: Props) => {
    if (!alert) {
        return null;
    }

    const variant = alert.data.type === 'critical' ? 'warning' : 'info';

    return (
        <AlertBox className={style.alertInContext} variant={variant}>
            {alert.data.text}
        </AlertBox>
    );
};
