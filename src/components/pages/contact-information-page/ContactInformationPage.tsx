import React from 'react';

import { Alert } from '@navikt/ds-react'

import { TelephoneDetails } from 'components/_common/contact-details/TelephoneDetails';
import ErrorPage404 from 'pages/404';

import { classNames, BEM } from 'utils/classnames';
import { ContentProps } from 'types/content-props/_content-common';


const bem = BEM('contactInformationPage');

export const ContactInformationPage = (props: ContentProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }

    const { data } = props;
    const { contactType } = data;

    const hasSpecialHours = !!contactType?.telephone?.specialOpeningHours;
    const hasRegularHours = !!contactType?.telephone?.regularOpeningHours;

    if (!hasSpecialHours && !hasRegularHours) {
        return <div className={classNames(bem('content'))}>
            (Ingen kontakttype eller åpningstider er lagt inn ennå, så forhåndsvisning er ikke mulig!)
        </div>;
    }

    if (hasSpecialHours && !hasRegularHours) {
        return <div className={classNames(bem())}>
            <div className={classNames(bem('content'))}>
                (Spesielle åpningstider kan ikke forhåndsvises som komponent på egenhånd.)
            </div>
        </div>
    }

    return (
        <div className={classNames(bem())}>
            <div className={classNames(bem('content'))}>
                <Alert variant="warning" className="editorAlert" >Redaktørvarsel: Denne informasjonen kan være i bruk på tvers av livssituasjonssider. Endres med varsomhet.</Alert>
                <TelephoneDetails {...contactType.telephone} />
            </div>
        </div>
    );
};
