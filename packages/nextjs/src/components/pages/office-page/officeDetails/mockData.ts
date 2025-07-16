import { AudienceReception } from '@navikt/nav-office-reception-info';
import { OpeningHours } from '@navikt/nav-office-reception-info/dist/utils/types';
import { AudienceContact, OfficeDetailsData } from 'types/content-props/office-details-props';

export const mockAudienceContact: AudienceContact = {
    beskrivelse:
        'Hvis du i en nødssituasjon og trenger rask kontakt med Nav-kontoret ditt kan du ringe vakttelefon',
    telefon: '99527885',
    sortOrder: 1,
};

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
        publikumskanaler: [mockAudienceContact],
    },
};

const openingHours: OpeningHours[] = [
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
    {
        dag: 'Onsdag',
        stengt: 'true',
    },
    {
        dag: 'Torsdag',
        kunTimeavtale: 'true',
    },
    { dag: 'Fredag', fra: '12:00', til: '15:00' },
];

const specialOpeningHours: OpeningHours[] = [
    { dato: '1999-12-24', stengt: 'true' },
    { dato: '2042-12-24', stengt: 'true' },
    { dato: '2042-12-31', fra: '09:00', til: '12:00' },
];

export const mockReception1: AudienceReception = {
    officeType: 'NAV_KONTOR',
    besoeksadresse: {
        type: 'stedsadresse' as const,
        gatenavn: 'Testgate',
        husnummer: '1',
        postnummer: '1234',
        poststed: 'Herøy',
    },
    aapningstider: [...openingHours],
};

export const mockReception2: AudienceReception = {
    officeType: 'NAV_KONTOR',
    besoeksadresse: {
        type: 'stedsadresse' as const,
        gatenavn: 'Storgata',
        husnummer: '2',
        postnummer: '0155',
        poststed: 'Dønna',
    },
    aapningstider: [...openingHours, ...specialOpeningHours],
};
