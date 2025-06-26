import { PropsWithChildren } from 'react';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { classNames } from 'utils/classnames';
import style from './LanguageDisclaimer.module.scss';

interface Props extends PropsWithChildren {
  className?: string;
}


export const LanguageDisclaimer = ({ className, children }: Props) => {
    return (
        <div className={classNames(style.languageDisclaimer, className)}>
            <InformationSquareIcon fontSize="1.5rem" title="Informasjon" />
            {children}
        </div>
    );
};
