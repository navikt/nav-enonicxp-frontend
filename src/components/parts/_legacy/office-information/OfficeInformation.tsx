import React from 'react';
import { Reception } from './reception/Reception';
import { SpecialInformation } from './SpecialInfo';
import { buildOpeningHoursSpecification } from './utils';
import {
    formatAddress,
    formatPhoneNumber,
} from 'components/_common/office-details/utils';
import { OfficeInfoEmail } from 'components/parts/_legacy/office-information/OfficeInfoEmail';
import { translator } from 'translations';
import ArtikkelDato from '../main-article/komponenter/ArtikkelDato';
import { Heading, BodyLong, BodyShort } from '@navikt/ds-react';
import {
    LegacyOfficeAudienceReception,
    OfficeInformationProps,
} from 'types/content-props/office-information-props';
import { getInternalAbsoluteUrl } from 'utils/urls';
import {
    GovernmentOfficeSchema,
    SpecialAnnouncementSchema,
} from 'types/structuredData';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import { forceArray } from 'utils/arrays';
import { usePageConfig } from 'store/hooks/usePageConfig';

import style from './OfficeInformation.module.scss';

export const OfficeInformation = (props: OfficeInformationProps) => {
    const { pageConfig } = usePageConfig();

    const unit = props.data.enhet;
    const contact = props.data.kontaktinformasjon;
    const getLabelMain = translator('mainArticle', props.language);
    const location = formatAddress(contact.besoeksadresse, true);
    const address = formatAddress(contact.postadresse, false);
    const telephone = formatPhoneNumber(contact.telefonnummer);
    const fax = formatPhoneNumber(contact.faksnummer);

    const publikumsmottak = forceArray(contact.publikumsmottak);

    const pageUrl = getInternalAbsoluteUrl(
        props._path,
        !!pageConfig.editorView
    );

    const createDepartmentSchema = (mottak: LegacyOfficeAudienceReception) => {
        const fullOfficeName = mottak.stedsbeskrivelse
            ? `${unit.navn}, ${mottak.stedsbeskrivelse}`
            : `${unit.navn}`;

        // Globally unique id in format of a URL required by Google for search. Not required to
        // be a functioning URL
        const departmentId = `${pageUrl}/${mottak.id}`;

        return {
            '@type': 'GovernmentOffice',
            '@id': departmentId,
            name: fullOfficeName,
            location: mottak.stedsbeskrivelse || '',
            image: 'https://www.nav.no/gfx/google-search-nav-logo.png',
            telephone,
            url: pageUrl,
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
            '@context': 'https://schema.org',
            '@type': 'GovernmentOffice',
            // Id in format of a URL required by Google for search.
            '@id': pageUrl,
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
            url: pageUrl,
            vatID: unit.organisasjonsnummer,
            department: publikumsmottak.map(createDepartmentSchema),
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonSchema),
                }}
            />
            <article className={style.officeInformation}>
                <header>
                    <ArtikkelDato
                        publish={props.publish}
                        createdTime={props.createdTime}
                        modifiedTime={props.modifiedTime}
                        publishLabel={getLabelMain('published')}
                        modifiedLabel={getLabelMain('lastChanged')}
                    />
                    <Heading
                        level="1"
                        size="large"
                    >{`${unit.navn} - kontorinformasjon`}</Heading>
                </header>
                {['HMS', 'ALS', 'TILTAK'].includes(unit.type) && location && (
                    <div>
                        <Heading level="2" size="small">
                            Besøksadresse
                        </Heading>
                        <BodyShort>{location}</BodyShort>
                    </div>
                )}
                <OfficeInfoEmail email={contact.epost} unitType={unit.type} />
                {contact?.telefonnummer && (
                    <div>
                        <Heading level="2" size="small">
                            Telefon
                        </Heading>
                        <BodyShort>
                            {formatPhoneNumber(contact.telefonnummer)}
                        </BodyShort>
                        {contact.telefonnummerKommentar && (
                            <BodyShort>
                                {contact.telefonnummerKommentar}
                            </BodyShort>
                        )}
                    </div>
                )}
                <div>
                    <Heading level="2" size="small">
                        Innsending av skjemaer
                    </Heading>
                    <BodyLong>
                        Skal du sende søknader og skjemaer, må du bruke{' '}
                        <LenkeInline href="https://www.nav.no/soknader/nb/person">
                            NAVs skjemaveileder.
                        </LenkeInline>{' '}
                        Skjemaveilederen gir deg hjelp til å velge rett skjema
                        og rett adresse det skal sendes til.
                    </BodyLong>
                </div>
                <SpecialInformation info={contact.spesielleOpplysninger} />
                <div>
                    <Heading level="2" size="small">
                        Postadresse
                    </Heading>
                    <BodyShort>
                        <span>{address}</span>
                        {', '}
                        <span>{contact.postadresse.postnummer}</span>{' '}
                        <span>{contact.postadresse.poststed}</span>
                    </BodyShort>
                </div>
                {fax && (
                    <div>
                        <Heading level="2" size="small">
                            Telefaks
                        </Heading>
                        <BodyShort>{fax}</BodyShort>
                    </div>
                )}
                {unit.organisasjonsnummer && (
                    <div>
                        <Heading level="2" size="small">
                            Organisasjonsnummer
                        </Heading>
                        <BodyShort>{unit.organisasjonsnummer}</BodyShort>
                    </div>
                )}
                {unit.enhetNr && (
                    <div>
                        <Heading level="2" size="small">
                            Kontornummer
                        </Heading>
                        <BodyShort>{unit.enhetNr}</BodyShort>
                    </div>
                )}
                {unit.type !== 'ALS' && (
                    <Reception
                        receptions={publikumsmottak}
                        language={props.language}
                    />
                )}
            </article>
        </>
    );
};
