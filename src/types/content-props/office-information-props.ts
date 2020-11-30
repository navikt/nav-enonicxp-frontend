import { ContentProps, ContentType } from './_content-common';

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
    dag: string;
    dato: string;
    fra: string;
    til: string;
    kommentar: string;
    // this should have been a bool put I get a string..
    stengt: string;
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
    epost: string;
    postadresse: Address;
    besoeksadresse: Address;
    spesielleOpplysninger: string;
    publikumsmottak: AudienceReception;
}

export type OfficeInformationData = {
    enhet: Office;
    overordnetEnhet: string;
    kontaktinformasjon: ContactInfo;
};

export interface OfficeInformationProps extends ContentProps {
    __typename: ContentType.OfficeInformation;
    data: OfficeInformationData;
}
