import React from 'react';
import Reception from './reception/Reception';
import { SpecialInformation } from './SpecialInfo';
import {
    formatAddress,
    buildOpeningHoursSpecification,
    normalizeReceptionAsArray,
    parsePhoneNumber,
} from './utils';
import { BEM } from 'utils/classnames';
import { Email } from './Email';
import { translator } from 'translations';
import ArtikkelDato from '../main-article/ArtikkelDato';
import Lenke from 'nav-frontend-lenker';
import { Title, BodyLong, BodyShort } from '@navikt/ds-react';
import {
    AudienceReception,
    OfficeInformationProps,
} from '../../../../types/content-props/office-information-props';
import { getInternalAbsoluteUrl } from '../../../../utils/urls';
import {
    GovernmentOfficeSchema,
    SpecialAnnouncementSchema,
} from '../../../../types/structuredData';
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
    const mainOfficeId = getInternalAbsoluteUrl(props._path);

    const createDepartmentSchema = (mottak: AudienceReception) => {
        const fullOfficeName = mottak.stedsbeskrivelse
            ? `${unit.navn}, ${mottak.stedsbeskrivelse}`
            : `${unit.navn}`;

        // Globally unique Id in format of a URL required by Google for search. Not required to
        // be a functioning URL
        const departmentId = `${getInternalAbsoluteUrl(props._path)}/${
            mottak.id
        }`;

        return {
            '@type': 'GovernmentOffice',
            '@id': departmentId,
            name: fullOfficeName,
            location: mottak.stedsbeskrivelse || '',
            image: 'https://www.nav.no/gfx/google-search-nav-logo.png',
            telephone,
            url: getInternalAbsoluteUrl(props._path),
            address: {
                '@type': 'PostalAddress',
                streetAddress: formatAddress(mottak.besoeksadresse, false),
                addressLocality: mottak.besoeksadresse.poststed || '',
                postalCode: mottak.besoeksadresse.postboksnummer || '',
                addressCountry: 'NO',
            },
            openingHoursSpecification: mottak.aapningstider.map(
                (singleDayOpeningHour) =>
                    buildOpeningHoursSpecification(singleDayOpeningHour)
            ),
        };
    };

    const jsonSchema: (GovernmentOfficeSchema | SpecialAnnouncementSchema)[] = [
        {
            '@context': 'http://schema.org',
            '@type': 'GovernmentOffice',
            '@id': mainOfficeId,
            name: unit.navn,
            image: 'https://www.nav.no/gfx/google-search-nav-logo.png',
            telephone,
            faxNumber: fax,
            address: {
                '@type': 'PostalAddress',
                streetAddress: formatAddress(contact.postadresse, true),
                addressLocality: contact.postadresse.poststed,
                postalCode: contact.postadresse.postnummer,
                addressCountry: 'NO',
            },
            url: getInternalAbsoluteUrl(props._path),
            vatID: unit.organisasjonsnummer,
            department: publikumsmottak.map(createDepartmentSchema),
        },
    ];

    // Note: This is a test for 2 NAV offices to investigate how (if at all) SpecialAnnouncement will display in
    // Google search. If we decide to implement this as a permanent feature, we should consider adding as a CMS feature
    // as well as creating a separate Structured Data builder as this component is getting quite untidy.
    if (unit.enhetNr === '0237' || unit.enhetNr === '0417') {
        const isOnlyOpenForAppointments = publikumsmottak.every((mottak) =>
            mottak.aapningstider.every((tid) => tid.stengt === 'true')
        );

        // Todo: If we choose to expand SpecialAlerts to all NAV offices, this text need to be
        // refined to cover corner cases in terms of opening hours and availability.
        const text = isOnlyOpenForAppointments
            ? `${unit.navn} har kun åpent for publikum som har timeavtale. Du finner mer informasjon på www.nav.no.`
            : `Enkelte dager kan ${unit.navn} ha åpent kun for publikum som har timeavtale. Du finner mer informasjon på www.nav.no.`;

        jsonSchema.push({
            '@context': 'https://schema.org',
            '@type': 'SpecialAnnouncement',
            name:
                'Åpningstider og bestilling av time med hensyn til smittevern',
            text,
            datePosted: '2021-03-26T08:00Z',
            expires: '2021-07-24T23:59Z',
            category: 'https://www.wikidata.org/wiki/Q81068910',
            announcementLocation: {
                '@type': 'GovernmentOffice',
                name: unit.navn,
                image: 'https://www.nav.no/gfx/google-search-nav-logo.png',
                telephone,
                url: getInternalAbsoluteUrl(props._path),
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: formatAddress(contact.postadresse, true),
                    addressLocality: contact.postadresse.poststed,
                    postalCode: contact.postadresse.postnummer,
                    addressCountry: 'NO',
                },
            },
        });
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonSchema),
                }}
            />
            <article className={bem()}>
                <header>
                    <ArtikkelDato
                        publish={props.publish}
                        createdTime={props.createdTime}
                        modifiedTime={props.modifiedTime}
                        publishLabel={getLabelMain('published')}
                        modifiedLabel={getLabelMain('lastChanged')}
                    />
                    <Title
                        level={1}
                        size="l"
                        className={bem('header')}
                    >{`${unit.navn} - kontorinformasjon`}</Title>
                </header>
                {['HMS', 'ALS', 'TILTAK'].includes(unit.type) && location && (
                    <div>
                        <Title level={2} size="m">
                            Besøksadresse
                        </Title>
                        <BodyShort>{location}</BodyShort>
                    </div>
                )}
                <Email email={contact.epost} unitType={unit.type} />
                {contact?.telefonnummer && (
                    <div>
                        <Title level={2} size="m">
                            Telefon
                        </Title>
                        <BodyShort>
                            {parsePhoneNumber(contact.telefonnummer)}
                        </BodyShort>
                        {contact.telefonnummerKommentar && (
                            <BodyShort>
                                {contact.telefonnummerKommentar}
                            </BodyShort>
                        )}
                    </div>
                )}
                <div>
                    <Title level={2} size="m">
                        Innsending av skjemaer
                    </Title>
                    <BodyLong>
                        Skal du sende søknader og skjemaer, må du bruke{' '}
                        <Lenke
                            href="https://www.nav.no/soknader/nb/person"
                            className={bem('lenke')}
                        >
                            NAVs skjemaveileder.
                        </Lenke>{' '}
                        Skjemaveilederen gir deg hjelp til å velge rett skjema
                        og rett adresse det skal sendes til.
                    </BodyLong>
                </div>
                <SpecialInformation info={contact.spesielleOpplysninger} />
                <div>
                    <Title level={2} size="m">
                        Postadresse
                    </Title>
                    <BodyShort>
                        <span>{address}</span>
                        {', '}
                        <span>{contact.postadresse.postnummer}</span>{' '}
                        <span>{contact.postadresse.poststed}</span>
                    </BodyShort>
                </div>
                {fax && (
                    <div>
                        <Title level={2} size="m">
                            Telefaks
                        </Title>
                        <BodyShort>{fax}</BodyShort>
                    </div>
                )}
                {unit.organisasjonsnummer && (
                    <div>
                        <Title level={2} size="m">
                            Organisasjonsnummer
                        </Title>
                        <BodyShort>{unit.organisasjonsnummer}</BodyShort>
                    </div>
                )}
                {unit.enhetNr && (
                    <div>
                        <Title level={2} size="m">
                            Kontornummer
                        </Title>
                        <BodyShort>{unit.enhetNr}</BodyShort>
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
