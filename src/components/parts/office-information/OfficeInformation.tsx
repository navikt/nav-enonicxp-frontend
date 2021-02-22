import React from 'react';
import Head from 'next/head';
import Reception from './reception/Reception';
import { SpecialInformation } from './SpecialInfo';
import { formatAddress, parsePhoneNumber } from './utils';
import { BEM } from 'utils/bem';
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
    const fax = parsePhoneNumber(contact.faksnummer);
    const jsonSchema = {
        '@context': 'http://schema.org',
        '@type': 'GovernmentOrganization',
        'url': '',
        'name': unit.navn,
        'telephone': contact.telefonnummer,
        'address': {
            '@type': 'PostalAddress',
            'streetAddress':
                `${contact.postadresse.gatenavn} ${contact.postadresse.husnummer}${contact.postadresse.husbokstav} `,
            'addressLocality': contact.postadresse.poststed,
            'postalCode': contact.postadresse.postnummer
        },
        'department': [
            {
                '@type': 'GovernmentOrganization',
                'address': {
                    '@type': 'PostalAddress',
                    'streetAddress':
                        `${contact.postadresse.gatenavn} ${contact.postadresse.husnummer}${contact.postadresse.husbokstav}`,
                    'addressLocality': contact.postadresse.poststed,
                    'postalCode': contact.postadresse.postnummer

                }

            }
        ],
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
                        <Normaltekst>{contact.telefonnummerKommentar}</Normaltekst>
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
                        Skjemaveilederen gir deg hjelp til å velge rett skjema og
                        rett adresse det skal sendes til.
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
                    receptions={contact.publikumsmottak}
                    language={props.language}
                />
            </article>
        </>
    );
};
