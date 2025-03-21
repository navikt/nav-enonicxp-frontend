import { PropsWithChildren } from 'react';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import style from './LanguageDisclaimer.module.scss';

export const LanguageDisclaimer = (props: PropsWithChildren) => {
    return (
        <div className={style.languageDisclaimer}>
            <InformationSquareIcon fontSize="1.5rem" title="Informasjon" />
            {props.children}
        </div>
    );
};
