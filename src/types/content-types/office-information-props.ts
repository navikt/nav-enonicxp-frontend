import { ContentType, GlobalSchema } from './_schema';

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

export interface OpeningHours {
    id: number;
    dag: string;
    dato: string;
    fra: string;
    til: string;
    kommentar: string;
    stengt: boolean;
}

export interface AudienceReception {
    id: number;
    besoeksadresse: Address;
    aapningstider: OpeningHours[];
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
export interface OfficeInformationProps extends GlobalSchema {
    __typename: ContentType.OfficeInformation;
    data: {
        enhet: Office;
        overordnetEnhet: string;
        kontaktinformasjon: ContactInfo;
    };
}
