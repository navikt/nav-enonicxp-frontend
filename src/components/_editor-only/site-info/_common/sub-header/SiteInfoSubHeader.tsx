import React from 'react';
import { Heading } from '@navikt/ds-react';

import style from './SiteInfoSubHeader.module.scss';

type Props = {
    text: string;
};

export const SiteInfoSubHeader = ({ text }: Props) => {
    return (
        <Heading size={'medium'} level={'2'} className={style.header}>
            {text}
        </Heading>
    );
};
