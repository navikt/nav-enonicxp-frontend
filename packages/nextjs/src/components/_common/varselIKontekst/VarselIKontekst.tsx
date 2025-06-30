import React from 'react';
import { AlertData } from 'types/content-props/alerts';
import { AlertBox } from 'components/_common/alertBox/AlertBox';

import style from './VarselIKontekst.module.scss';

type Props = {
    data: Pick<AlertData['data'], 'type' | 'text'>;
};

export const VarselIKontekst = ({ data }: Props) => {
    if (!data?.text) {
        return null;
    }

    const variant = data.type === 'critical' ? 'warning' : 'info';

    return (
        <AlertBox className={style.varselIKontekst} variant={variant}>
            {data.text}
        </AlertBox>
    );
};
