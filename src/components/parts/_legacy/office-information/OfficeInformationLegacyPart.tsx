import React from 'react';
import { BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import {
    officeDetailsFormatAddress,
    officeDetailsFormatPhoneNumber,
} from 'components/pages/office-page/office-details/utils';
import { OfficeInfoEmail } from 'components/parts/_legacy/office-information/OfficeInfoEmail';
import ArtikkelDato from 'components/parts/_legacy/main-article/komponenter/ArtikkelDato';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { forceArray } from 'utils/arrays';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { SpecialInformation } from './SpecialInfo';
import { Reception } from './reception/Reception';

import style from './OfficeInformation.module.scss';

export const OfficeInformationLegacyPart = (props: ContentProps) => {
    if (props.type !== ContentType.OfficeInformation) {
        return null;
    }

    const unit = props.data.enhet;
    const contact = props.data.kontaktinformasjon;
    const location = officeDetailsFormatAddress(contact.besoeksadresse, true);
    const address = officeDetailsFormatAddress(contact.postadresse, false);
    const fax = officeDetailsFormatPhoneNumber(contact.faksnummer);

    const publikumsmottak = forceArray(contact.publikumsmottak);

    return (
        <article className={style.officeInformation}>
            <header>
                <ArtikkelDato contentProps={props} />
                <Heading level="1" size="large">{`${unit.navn} - kontorinformasjon`}</Heading>
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
                    <BodyShort>{officeDetailsFormatPhoneNumber(contact.telefonnummer)}</BodyShort>
                    {contact.telefonnummerKommentar && (
                        <BodyShort>{contact.telefonnummerKommentar}</BodyShort>
                    )}
                </div>
            )}
            <div>
                <Heading level="2" size="small">
                    Innsending av skjemaer
                </Heading>
                {unit.type === 'ALS' ? (
                    <BodyLong>
                        Du kan skrive til oss hvis du ønsker hjelp til å rekruttere, inkludere
                        arbeidstakere og forebygge sykefravær, se{' '}
                        <LenkeInline href="https://kontaktskjema.arbeidsgiver.nav.no/s/">
                            kontaktskjema for arbeidsgivere
                        </LenkeInline>
                        . Skal du sende søknader eller skjemaer, må du bruke{' '}
                        <LenkeInline href="https://www.nav.no/arbeidsgiver/soknader">
                            skjemaoversikten for arbeidsgivere
                        </LenkeInline>
                        .
                    </BodyLong>
                ) : (
                    <BodyLong>
                        Skal du sende søknader og skjemaer, må du bruke{' '}
                        <LenkeInline href="https://www.nav.no/soknader/nb/person">
                            Navs skjemaveileder.
                        </LenkeInline>{' '}
                        Skjemaveilederen gir deg hjelp til å velge rett skjema og rett adresse det
                        skal sendes til.
                    </BodyLong>
                )}
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
            {publikumsmottak.length > 0 && (
                <Reception receptions={publikumsmottak} language={props.language} />
            )}
        </article>
    );
};
