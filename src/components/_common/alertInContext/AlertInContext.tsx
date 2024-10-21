import React from 'react';
import { AlertData } from 'types/content-props/alerts';
import { AlertBox } from 'components/_common/alertBox/AlertBox';

import style from './AlertInContext.module.scss';

type Props = {
    data: Pick<AlertData['data'], 'type' | 'text'>;
};

export const AlertInContext = ({ data }: Props) => {
    if (!data?.text) {
        return null;
    }

    const variant = data.type === 'critical' ? 'warning' : 'info';

    return (
        <AlertBox className={style.alertInContext} variant={variant}>
            {data.text}
        </AlertBox>
    );
};
