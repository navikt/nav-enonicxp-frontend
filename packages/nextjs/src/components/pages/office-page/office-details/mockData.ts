import { AudienceReception } from '@navikt/nav-office-reception-info';
import { OfficeDetailsData } from 'types/content-props/office-details-props';

export const mockOfficeData: OfficeDetailsData = {
    enhetNr: '1234',
    type: 'NAV_KONTOR',
    telefonnummer: '12345678',
    navn: 'NAV Oslo',
    organisasjonsnummer: '987654321',
    status: 'AKTIV',
    beliggenhet: {
        type: 'stedsadresse' as const,
        gatenavn: 'Karl Johans gate',
        husnummer: '1',
        postnummer: '0154',
        poststed: 'OSLO',
    },
    postadresse: {
        type: 'stedsadresse' as const,
        gatenavn: 'Postboks',
        husnummer: '1234',
        postnummer: '0103',
        poststed: 'OSLO',
    },
    brukerkontakt: {
        spraakdrakt: 'NB' as const,
        publikumsmottak: [],
        publikumskanaler: {
            beskrivelse: 'Kontakt oss',
            telefon: '12345678',
            epost: 'oslo@nav.no',
            sortOrder: 1,
        },
    },
};

export const mockReception1: AudienceReception = {
    officeType: 'NAV_KONTOR',
    besoeksadresse: {
        type: 'stedsadresse' as const,
        gatenavn: 'Karl Johans gate',
        husnummer: '1',
        postnummer: '0154',
        poststed: 'OSLO',
    },
    aapningstider: [
        {
            dag: 'Mandag',
            fra: '09:00',
            til: '15:00',
        },
        {
            dag: 'Tirsdag',
            fra: '09:00',
            til: '15:00',
        },
    ],
};

export const mockReception2: AudienceReception = {
    officeType: 'NAV_KONTOR',
    besoeksadresse: {
        type: 'stedsadresse' as const,
        gatenavn: 'Storgata',
        husnummer: '2',
        postnummer: '0155',
        poststed: 'OSLO',
    },
    aapningstider: [
        {
            dag: 'Mandag',
            fra: '10:00',
            til: '16:00',
        },
    ],
};
