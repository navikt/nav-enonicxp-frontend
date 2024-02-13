import React from 'react';
import { AlertInContextPageProps } from 'types/content-props/alerts';
import { AlertBox } from '../alert-box/AlertBox';

import style from './AlertInContext.module.scss';

type Props = {
    alert: AlertInContextPageProps;
};

export const AlertInContext = ({ alert }: Props) => {
    if (!alert) {
        return null;
    }

    const variant = alert.data.type === 'critical' ? 'warning' : 'info';

    return (
        <AlertBox
            className={style.alertInContext}
            variant={variant}
            key={alert._id}
        >
            {alert.data.text}
        </AlertBox>
    );
};
