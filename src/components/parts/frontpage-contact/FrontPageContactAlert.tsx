import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { Warning } from '@navikt/ds-icons';

import style from './FrontPageContactAlert.module.scss';

type Props = {
    alertText: string;
    yellow?: boolean;
};

export const FrontpageContactAlert = ({ alertText, yellow = false }: Props) => {
    return (
        //Inspirert av Alert fra Designsystemet, med noen modifikasjoner på ikon og styling.
        <div
            className={`${style.alert} ${yellow ? style.yellow : style.white}`}
        >
            <Warning title="Advarsel" className={style.alertIcon} />
            <BodyLong as="div">{alertText}</BodyLong>
        </div>
    );
};
