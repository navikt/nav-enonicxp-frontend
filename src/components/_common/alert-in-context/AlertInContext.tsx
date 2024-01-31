import React from 'react';
import { Alert } from '@navikt/ds-react';
import style from './AlertInContext.module.scss';

type Props = {
    alerts: any[];
};

export const AlertInContext = ({ alerts }: Props) => {
    if (!alerts || alerts.length === 0) {
        return null;
    }

    return (
        <div className={style.alertInContext}>
            {alerts.map((alert, index) => {
                const variant =
                    alert.data.type === 'critical' ? 'warning' : 'info';
                return (
                    <Alert variant={variant} key={index}>
                        {alert.data.text}
                    </Alert>
                );
            })}
        </div>
    );
};
