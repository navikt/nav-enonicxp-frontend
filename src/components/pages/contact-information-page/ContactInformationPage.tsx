import React from 'react';
import { Alert } from '@navikt/ds-react';
import { ContactInformationProps } from '../../../types/content-props/contact-information-props';
import ErrorPage404 from 'pages/404';
import { TelephoneDetails } from 'components/_common/contact-details/TelephoneDetails';

import style from './ContactInformationPage.module.scss';

export const ContactInformationPage = (props: ContactInformationProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }

    const { data } = props;
    const { contactType } = data;

    const hasSpecialHours = !!contactType?.telephone?.specialOpeningHours;
    const hasRegularHours = !!contactType?.telephone?.regularOpeningHours;

    if (!hasSpecialHours && !hasRegularHours) {
        return (
            <div className={style.content}>
                (Ingen kontakttype eller åpningstider er lagt inn ennå, så
                forhåndsvisning er ikke mulig!)
            </div>
        );
    }

    if (hasSpecialHours && !hasRegularHours) {
        return (
            <div className={style.contactInformationPage}>
                <div className={style.content}>
                    (Spesielle åpningstider kan ikke forhåndsvises som komponent
                    på egenhånd.)
                </div>
            </div>
        );
    }

    return (
        <div className={style.contactInformationPage}>
            <div className={style.content}>
                <Alert variant="warning" className={style.editorAlert}>
                    Redaktørvarsel: Denne informasjonen kan være i bruk på tvers
                    av livssituasjonssider. Endres med varsomhet.
                </Alert>
                <TelephoneDetails {...contactType.telephone} />
            </div>
        </div>
    );
};
