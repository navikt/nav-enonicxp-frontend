import { ContentType, ContentCommonProps } from './_content-common';

type Office = {
    enhetId: number;
    navn: string;
    enhetNr: string;
    antallRessurser: number;
    status: string;
    orgNivaa: string;
    type: string;
    organisasjonsnummer: string;
};

export type LegacyOfficeEMail = {
    adresse: string;
    kommentar: string;
    kunIntern: string;
};

export type LegacyOfficeAddress = {
    gatenavn: string;
    husbokstav?: string;
    husnummer: string;
    postboksanlegg?: string;
    postboksnummer?: string;
    postnummer: string;
    poststed: string;
    type: string;
};

export type LegacyOfficeOpeningHoursProps = {
    id: number;
    dag?: 'Mandag' | 'Tirsdag' | 'Onsdag' | 'Torsdag' | 'Fredag';
    dato?: string;
    fra?: string;
    til?: string;
    kommentar?: string;
    stengt?: string;
    isoDate?: string;
};

export type LegacyOfficeAudienceReception = {
    id: number;
    besoeksadresse: LegacyOfficeAddress;
    aapningstider: LegacyOfficeOpeningHoursProps[];
    stedsbeskrivelse?: string;
};

type ContactInfo = {
    id: number;
    enhetNr: string;
    telefonnummer: string;
    telefonnummerKommentar?: string;
    faksnummer?: string;
    epost?: LegacyOfficeEMail;
    postadresse: LegacyOfficeAddress;
    besoeksadresse: LegacyOfficeAddress;
    spesielleOpplysninger: string;
    publikumsmottak: LegacyOfficeAudienceReception[] | LegacyOfficeAudienceReception | undefined;
};

export type OfficeInformationData = {
    enhet: Office;
    overordnetEnhet: string;
    kontaktinformasjon: ContactInfo;
};

export type OfficeInformationProps = ContentCommonProps & {
    type: ContentType.OfficeInformation;
    data: OfficeInformationData;
};
