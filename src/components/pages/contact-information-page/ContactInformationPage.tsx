import React from 'react';
import { Alert } from '@navikt/ds-react';
import { ContactInformationProps } from 'types/content-props/contact-information-props';
import { CallOption } from 'components/_common/contact-option/CallOption/CallOption';
import { WriteOption } from 'components/_common/contact-option/WriteOption/WriteOption';
import { ChatOption } from 'components/_common/contact-option/ChatOption/ChatOption';

import style from './ContactInformationPage.module.scss';

export const ContactInformationPage = (props: ContactInformationProps) => {
    const { data } = props;
    const { contactType } = data;

    console.log(props.data.contactType.telephone);

    const hasContactType = !!(contactType.telephone || contactType.write || contactType.chat);

    const hasSpecialHours = !!contactType?.telephone?.specialOpeningHours;
    const hasRegularHours = !!contactType?.telephone?.regularOpeningHours;

    if (!hasContactType) {
        return (
            <div className={style.content}>
                (Ingen kontakttype eller åpningstider er lagt inn ennå, så forhåndsvisning er ikke
                mulig!)
            </div>
        );
    }

    if (hasSpecialHours && !hasRegularHours) {
        return (
            <div className={style.contactInformationPage}>
                <div className={style.content}>
                    (Spesielle åpningstider kan ikke forhåndsvises som komponent på egenhånd.)
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
                    text={telephone.text}
                    hideMoreLink={telephone.hideMoreLink}
                    phoneNumber={telephone.phoneNumber}
                    regularOpeningHours={telephone.regularOpeningHours}
                    specialOpeningHours={telephone.specialOpeningHours}
                />
            );
        }

        if (contactType.write) {
            const data = contactType?.write;
            return (
                <WriteOption
                    ingress={data.ingress}
                    alertText={data.alertText}
                    title={data.title}
                    url={data.url}
                />
            );
        }
        if (contactType.chat) {
            const data = contactType?.chat;
            return (
                <ChatOption ingress={data.ingress} alertText={data.alertText} title={data.title} />
            );
        }

        return <div>Ingen visbar kontaktkanal</div>;
    };

    return (
        <div className={style.contactInformationPage}>
            <div className={style.content}>
                <Alert variant="warning" className={style.editorAlert}>
                    Redaktørvarsel: Denne informasjonen kan være i bruk på tvers av
                    livssituasjonssider. Endres med varsomhet.
                </Alert>
                {buildPreview()}
            </div>
        </div>
    );
};
