import React from 'react';
import { AlertData } from 'types/content-props/alerts';
import { Varselboks } from 'components/_common/varselboks/Varselboks';
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
        <Varselboks className={style.alertInContext} variant={variant}>
            {data.text}
        </Varselboks>
    );
};
