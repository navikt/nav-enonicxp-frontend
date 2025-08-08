import React from 'react';
import { AlertData } from 'types/content-props/alerts';
import { Varselboks } from 'components/_common/varselboks/Varselboks';
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
        <Varselboks className={style.varselIKontekst} variant={variant}>
            {data.text}
        </Varselboks>
    );
};
