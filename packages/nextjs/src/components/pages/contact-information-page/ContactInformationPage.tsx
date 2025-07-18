import React from 'react';
import { Alert } from '@navikt/ds-react';
import { ContactInformationProps } from 'types/content-props/contact-information-props';
import { TelefonAlternativ } from 'components/_common/kontakt-oss-kanal/TelefonAlternativ/TelefonAlternativ';
import { SkriveAlternativ } from 'components/_common/kontakt-oss-kanal/SkriveAlternativ/SkriveAlternativ';
import { ChatAlternativ } from 'components/_common/kontakt-oss-kanal/ChatAlternativ/ChatAlternativ';
import { classNames } from 'utils/classnames';
import style from './ContactInformationPage.module.scss';

export const ContactInformationPage = (props: ContactInformationProps) => {
    const { data } = props;
    const { contactType } = data;

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
            <div className={classNames(style.contactInformationPage, style.content)}>
                (Spesielle åpningstider kan ikke forhåndsvises som komponent på egenhånd.)
            </div>
        );
    }

    const buildPreview = () => {
        if (contactType.telephone) {
            const telephone = contactType?.telephone;
            return (
                <TelefonAlternativ
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
                <SkriveAlternativ
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
                <ChatAlternativ
                    ingress={data.ingress}
                    alertText={data.alertText}
                    title={data.title}
                />
            );
        }

        return <div>Ingen visbar kontaktkanal</div>;
    };

    return (
        <article className={style.contactInformationPage}>
            <div className={style.content}>
                <section>
                    <Alert variant="warning" className={style.editorAlert}>
                        Redaktørvarsel: Denne informasjonen kan være i bruk på tvers av
                        livssituasjonssider. Endres med varsomhet.
                    </Alert>
                </section>
                {buildPreview()}
            </div>
        </article>
    );
};
