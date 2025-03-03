import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons';
import { classNames } from 'utils/classnames';

import style from './FrontpageContactAlert.module.scss';

type Props = {
    alertText: string;
    yellow?: boolean;
};

export const FrontpageContactAlert = ({ alertText, yellow = false }: Props) => {
    return (
        //Inspirert av Alert fra Designsystemet, med noen modifikasjoner på ikon og styling.
        <div className={classNames(style.alert, yellow ? style.yellow : style.white)}>
            <ExclamationmarkTriangleIcon
                title="Advarsel"
                className={style.alertIcon}
                aria-hidden={true}
            />
            <BodyLong as="div">{alertText}</BodyLong>
        </div>
    );
};
