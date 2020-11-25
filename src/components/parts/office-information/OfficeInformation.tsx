import React from 'react';
import Reception from './Reception';
import { SpecialInformation } from './SpecialInfo';
import { formatAddress } from './utils';
import { BEM } from 'utils/bem';
import { Email } from './Contact';
import { translator } from 'translations';
import ArtikkelDato from '../main-article/ArtikkelDato';
import Lenke from 'nav-frontend-lenker';
import {
    AudienceReception,
    OfficeInformationProps,
} from '../../../types/content-props/office-information-props';

const parsePhoneNumber = (phoneNumber: string, mod: number = null) => {
    const modular = mod || 2;
    if (phoneNumber) {
        return phoneNumber
            .replace(/ /g, '')
            .split('')
            .reduce((t, e, i) => t + e + (i % modular === 1 ? ' ' : ''), '');
    }
    return null;
};

export const OfficeInformation = (props: OfficeInformationProps) => {
    const unit = props.data.enhet;
    const contact = props.data.kontaktinformasjon;
    const bem = BEM('office-information');
    const getLabelMain = translator('mainArticle', props.language);

    const location = formatAddress(contact.besoeksadresse, true);
    const address = formatAddress(contact.postadresse, false);
    const fax = parsePhoneNumber(contact.faksnummer);
    const receptions: AudienceReception[] = Array.isArray(
        contact.publikumsmottak
    )
        ? contact.publikumsmottak
        : [contact.publikumsmottak];

    return (
        <article className={bem()}>
            <header>
                <ArtikkelDato
                    publish={props.publish}
                    createdTime={props.createdTime}
                    modifiedTime={props.modifiedTime}
                    publishLabel={getLabelMain('published')}
                    modifiedLabel={getLabelMain('lastChanged')}
                />
            </header>
            <h1>{unit.navn}</h1>
            {unit.type in ['HMS', 'ALS', 'TILTAK'] && location !== '' && (
                <div>
                    <h3>Besøksadresse</h3>
                    <p className="p-street-address" itemProp="streetAddress">
                        {location}
                    </p>
                </div>
            )}
            <Email email={contact.epost} unitType={unit.type} />
            {contact?.telefonnummer && (
                <div>
                    <h3 itemProp="contactType">Telefon</h3>
                    <p className="p-tel" itemProp="telephone">
                        {parsePhoneNumber(contact.telefonnummer)}
                    </p>
                    <p>{contact.telefonnummerKommentar}</p>
                </div>
            )}
            <div className="p-note">
                <h3>Innsending av skjemaer</h3>
                <p>
                    Skal du sende søknader og skjemaer, må du bruke
                    <Lenke
                        href="https://www.nav.no/soknader/nb/person"
                        className={bem('lenke')}
                    >
                        NAVs skjemaveileder.
                    </Lenke>
                    Skjemaveilederen gir deg hjelp til å velge rett skjema og
                    rett adresse det skal sendes til.
                </p>
            </div>
            <SpecialInformation info={contact.spesielleOpplysninger} />
            <div itemProp="address" itemType="http://schema.org/PostalAddress">
                <h3>Postadresse</h3>
                <p>
                    <span
                        className="p-post-office-box"
                        itemProp="postOfficeBoxNumber"
                    >
                        {address}
                    </span>
                    ,
                    <span className="p-postal-code" itemProp="postalCode">
                        {contact.postadresse.postnummer}
                    </span>
                    <span className="p-locality" itemProp="addressRegion">
                        {contact.postadresse.poststed}
                    </span>
                </p>
            </div>
            {fax !== '' && (
                <div
                    itemProp="contactPoint"
                    itemType="http://schema.org/ContactPoint"
                >
                    <h3 itemProp="contactType">Telefaks</h3>
                    <p className="p-tel-fax" itemProp="faxNumber">
                        {fax}
                    </p>
                </div>
            )}
            {unit.organisasjonsnummer && (
                <div>
                    <h3>Organisasjonsnummer</h3>
                    <p>{unit.organisasjonsnummer}</p>
                </div>
            )}
            {unit.enhetNr && (
                <div>
                    <h3>Kontornummer</h3>
                    <p>{unit.enhetNr}</p>
                </div>
            )}
            <Reception receptions={receptions} language={props.language} />
        </article>
    );
};
