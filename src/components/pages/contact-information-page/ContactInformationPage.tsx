import React from 'react';
import { Alert } from '@navikt/ds-react';
import { ContactInformationProps } from '../../../types/content-props/contact-information-props';
import ErrorPage404 from 'pages/404';
import { TelephoneDetails } from 'components/_common/contact-details/TelephoneDetails';

import { CallOption } from 'components/_common/contact-option/CallOption';
import { DefaultOption } from 'components/_common/contact-option/DefaultOption';

import style from './ContactInformationPage.module.scss';

export const ContactInformationPage = (props: ContactInformationProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }

    const { data } = props;
    const { contactType } = data;

    console.log(data);

    const hasContactType = !!(contactType.telephone || contactType.write);

    const hasSpecialHours = !!contactType?.telephone?.specialOpeningHours;
    const hasRegularHours = !!contactType?.telephone?.regularOpeningHours;

    if (!hasContactType) {
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

    const buildPreview = () => {
        if (contactType.telephone) {
            const telephone = contactType?.telephone;
            return (
                <CallOption
                    title={telephone.title}
                    alertText={telephone.alertText}
                    ingress={telephone.text}
                    phoneNumber={telephone.phoneNumber}
                    regularOpeningHours={telephone.regularOpeningHours}
                    specialOpeningHours={telephone.specialOpeningHours}
                />
            );
        }
        const data = contactType?.write;

        return (
            <DefaultOption
                channel="write"
                ingress={data.ingress}
                title={data.title}
                url={data.url}
            />
        );
    };

    return (
        <div className={style.contactInformationPage}>
            <div className={style.content}>
                <Alert variant="warning" className={style.editorAlert}>
                    Redaktørvarsel: Denne informasjonen kan være i bruk på tvers
                    av livssituasjonssider. Endres med varsomhet.
                </Alert>
                {buildPreview()}
            </div>
        </div>
    );
};
