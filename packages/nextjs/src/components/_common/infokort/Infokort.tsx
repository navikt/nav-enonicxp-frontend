import React, { PropsWithChildren } from 'react';
import { InfoCard } from '@navikt/ds-react';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import style from './Infokort.module.scss';

export const Infokort = ({ children }: PropsWithChildren) => {
    return (
        <InfoCard className={style.infokort}>
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                {children}
            </InfoCard.Message>
        </InfoCard>
    );
};
