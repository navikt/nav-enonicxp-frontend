import React from 'react';
import Head from 'next/head';
import Reception from './reception/Reception';
import { SpecialInformation } from './SpecialInfo';
import {
    formatAddress,
    buildOpeningHourAsString,
    normalizeReceptionAsArray,
    parsePhoneNumber,
} from './utils';
import { BEM } from 'utils/classnames';
import { Email } from './Email';
import { translator } from 'translations';
import ArtikkelDato from '../main-article/ArtikkelDato';
import Lenke from 'nav-frontend-lenker';
import { Innholdstittel, Element, Normaltekst } from 'nav-frontend-typografi';
import { OfficeInformationProps } from '../../../types/content-props/office-information-props';
import './OfficeInformation.less';

export const OfficeInformation = (props: OfficeInformationProps) => {
    const unit = props.data.enhet;
    const contact = props.data.kontaktinformasjon;
    const bem = BEM('office-information');
    const getLabelMain = translator('mainArticle', props.language);
    const location = formatAddress(contact.besoeksadresse, true);
    const address = formatAddress(contact.postadresse, false);
    const telephone = parsePhoneNumber(contact.telefonnummer);
    const fax = parsePhoneNumber(contact.faksnummer);

    const publikumsmottak = normalizeReceptionAsArray(contact.publikumsmottak);

    // Id in format of a URL required by Google for search.
    const mainOfficeId = `https://${props._path}`;

    const jsonSchema = {
        '@context': 'http://schema.org',
        '@type': 'GovernmentOffice',
        '@id': mainOfficeId,
        name: unit.navn,
        image: 'https://www.nav.no/gfx/social-share-fallback.png',
        telephone,
        faxNumber: fax,
        address: {
            '@type': 'PostalAddress',
            streetAddress: formatAddress(contact.postadresse, true),
            addressLocality: contact.postadresse.poststed,
            postalCode: contact.postadresse.postnummer,
        },
        url: `https://${props._path}`,
        vatID: unit.organisasjonsnummer,
        department: publikumsmottak.map((mottak) => {
            const fullOfficeName = `${unit.navn}, ${mottak.stedsbeskrivelse}`;
            // Globally unique Id in format of a URL required by Google for search. Not required to
            // be a functioning URL
            const departmentId = `https://www.nav.no/${props._path}/${mottak.id}`;

            return {
                '@type': 'GovernmentOffice',
                '@id': departmentId,
                name: fullOfficeName,
                location: mottak.stedsbeskrivelse,
                image: 'https://www.nav.no/gfx/social-share-fallback.png',
                telephone,
                url: `https://${props._path}`,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: formatAddress(mottak.besoeksadresse, false),
                    addressLocality: mottak.besoeksadresse.poststed,
                    postalCode: mottak.besoeksadresse.postboksnummer,
                },
                openingHours: mottak.aapningstider.map((singleDayOpeningHour) =>
                    buildOpeningHourAsString(singleDayOpeningHour)
                ),
            };
        }),
    };

    return (
        <>
            <Head>
                <script type="application/ld+json">
                    {JSON.stringify(jsonSchema)}
                </script>
            </Head>
            <article className={bem()}>
                <header>
                    <ArtikkelDato
                        publish={props.publish}
                        createdTime={props.createdTime}
                        modifiedTime={props.modifiedTime}
                        publishLabel={getLabelMain('published')}
                        modifiedLabel={getLabelMain('lastChanged')}
                    />
                    <Innholdstittel
                        className={bem('header')}
                    >{`${unit.navn} - kontorinformasjon`}</Innholdstittel>
                </header>
                {['HMS', 'ALS', 'TILTAK'].includes(unit.type) && location && (
                    <div
                        itemProp="location"
                        itemScope
                        itemType="http://schema.org/PostalAddress"
                    >
                        <Element tag="h2">Besøksadresse</Element>
                        <Normaltekst itemProp="streetAddress">
                            {location}
                        </Normaltekst>
                    </div>
                )}
                <Email email={contact.epost} unitType={unit.type} />
                {contact?.telefonnummer && (
                    <div
                        itemProp="contactPoint"
                        itemScope
                        itemType="http://schema.org/ContactPoint"
                    >
                        <Element tag="h2" itemProp="contactType">
                            Telefon
                        </Element>
                        <Normaltekst itemProp="telephone">
                            {parsePhoneNumber(contact.telefonnummer)}
                        </Normaltekst>
                        <Normaltekst>
                            {contact.telefonnummerKommentar}
                        </Normaltekst>
                    </div>
                )}
                <div>
                    <Element tag="h2">Innsending av skjemaer</Element>
                    <Normaltekst>
                        Skal du sende søknader og skjemaer, må du bruke{' '}
                        <Lenke
                            href="https://www.nav.no/soknader/nb/person"
                            className={bem('lenke')}
                        >
                            NAVs skjemaveileder.
                        </Lenke>{' '}
                        Skjemaveilederen gir deg hjelp til å velge rett skjema
                        og rett adresse det skal sendes til.
                    </Normaltekst>
                </div>
                <SpecialInformation info={contact.spesielleOpplysninger} />
                <div
                    itemProp="address"
                    itemType="http://schema.org/PostalAddress"
                    itemScope
                >
                    <Element tag="h2">Postadresse</Element>
                    <Normaltekst>
                        <span itemProp="postOfficeBoxNumber">{address}</span>
                        {', '}
                        <span itemProp="postalCode">
                            {contact.postadresse.postnummer}
                        </span>{' '}
                        <span itemProp="addressRegion">
                            {contact.postadresse.poststed}
                        </span>
                    </Normaltekst>
                </div>
                {fax && (
                    <div
                        itemProp="contactPoint"
                        itemScope
                        itemType="http://schema.org/ContactPoint"
                    >
                        <Element tag="h2" itemProp="contactType">
                            Telefaks
                        </Element>
                        <Normaltekst itemProp="faxNumber">{fax}</Normaltekst>
                    </div>
                )}
                {unit.organisasjonsnummer && (
                    <div>
                        <Element tag="h2">Organisasjonsnummer</Element>
                        <Normaltekst>{unit.organisasjonsnummer}</Normaltekst>
                    </div>
                )}
                {unit.enhetNr && (
                    <div>
                        <Element tag="h2">Kontornummer</Element>
                        <Normaltekst>{unit.enhetNr}</Normaltekst>
                    </div>
                )}
                <Reception
                    receptions={publikumsmottak}
                    language={props.language}
                />
            </article>
        </>
    );
};
