import {
    ContentDecoratorToggles,
    ContentProps,
    ContentType,
} from './_content-common';

export interface Office {
    enhetId: number;
    navn: string;
    enhetNr: string;
    antallRessurser: number;
    status: string;
    orgNivaa: string;
    type: string;
    organisasjonsnummer: string;
}

export interface EMail {
    adresse: string;
    kommentar: string;
    kunIntern: string;
}

export interface Address {
    gatenavn: string;
    husbokstav: string;
    husnummer: string;
    postboksanlegg: string;
    postboksnummer: string;
    postnummer: string;
    poststed: string;
    type: string;
}

export interface OpeningHoursProps {
    id: number;
    dag?: string;
    dato?: string;
    fra?: string;
    til?: string;
    kommentar?: string;
    // this should have been a bool put I get a string..
    stengt?: string;
    isoDate?: string;
}

export interface AudienceReception {
    id: number;
    besoeksadresse: Address;
    aapningstider: OpeningHoursProps[];
    stedsbeskrivelse: string;
}

interface ContactInfo {
    id: number;
    enhetNr: string;
    telefonnummer: string;
    telefonnummerKommentar: string;
    faksnummer: string;
    epost: EMail;
    postadresse: Address;
    besoeksadresse: Address;
    spesielleOpplysninger: string;
    publikumsmottak: AudienceReception[] | AudienceReception | undefined;
}

export type OfficeInformationData = {
    enhet: Office;
    overordnetEnhet: string;
    kontaktinformasjon: ContactInfo;
} & ContentDecoratorToggles;

export interface OfficeInformationProps extends ContentProps {
    __typename: ContentType.OfficeInformation;
    data: OfficeInformationData;
}
