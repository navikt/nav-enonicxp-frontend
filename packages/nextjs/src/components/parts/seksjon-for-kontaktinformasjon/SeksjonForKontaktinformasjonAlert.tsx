import React from 'react';
import { Alert } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';

import style from './SeksjonForKontaktinformasjonAlert.module.scss';

type Props = {
    alertText: string;
    yellow?: boolean;
};

export const SeksjonForKontaktinformasjonAlert = ({ alertText, yellow = false }: Props) => {
    return (
        //Inspirert av Alert fra Designsystemet, med noen modifikasjoner på ikon og styling.
        <section className={classNames(style.alert, yellow ? style.yellow : style.white)}>
            <Alert variant="warning" inline>
                {alertText}
            </Alert>
        </section>
    );
};
