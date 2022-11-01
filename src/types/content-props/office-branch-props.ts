import { ContentType, ContentCommonProps } from './_content-common';

export interface BranchOffice {
    enhetNr: string;
    navn: string;
    organisasjonsnummer: string;
    orgNrTilKommunalNavKontor?: string;
    sosialeTjenester?: string;
    spesielleOpplysninger?: string;
    status: string;
    underEtableringDato?: string;
    aktiveringsdato?: string;
    nedleggesesdato?: string;
}

export interface Address {
    type?: 'stedsadresse' | 'postboksadresse';
    gatenavn?: string;
    husnummer?: string;
    adresseTilleggsnavn?: string;
    postnummer?: string;
    poststed?: string;
    postboks?: string;
    postboksanlegg?: string;
}

export interface OpeningHours {
    dag?: 'Mandag' | 'Tirsdag' | 'Onsdag' | 'Torsdag' | 'Fredag';
    dato?: string;
    fra?: string;
    til?: string;
    kommentar?: string;
    stengt?: boolean;
}

export interface AudienceReception {
    stedsbeskrivelse?: string;
    aapningstider: OpeningHours[];
    besoeksadresse?: Address;
    adkomst?: string;
}

export type Service = {
    type:
        | 'NODSITUASJON'
        | 'TILGANGPC'
        | 'HJELPDIGITALETJENESTER'
        | 'BARNEVERN'
        | 'KRIMINALOMSORG'
        | 'FLYKTNING'
        | 'RUS'
        | 'STARTLAN'
        | 'STOETTEKONTAKT'
        | 'SJOFART';
};

type AudienceServices = {
    tjenester: Service[];
    ytterligereInformasjon?: string;
};

type DigitalApplication = {
    lenke: string;
    lenketekst: string;
};

type SocialServices = {
    digitaleSoeknader: DigitalApplication[];
    papirsoeknadInformasjon?: string;
};

type AudienceContact = {
    beskrivelse?: string;
    telefon?: string;
    epost?: string;
    sortOrder: number;
};

interface AudienceContactInformation {
    spraakdrakt: 'NN' | 'NB';
    informasjonsUtbetalinger?: string;
    brukertjenesteTilbud?: AudienceServices;
    publikumsmottak: AudienceReception[];
    sosialhjelp?: SocialServices;
    publikumskanaler: AudienceContact[];
}

export type OfficeBranchData = {
    lokalkontor: BranchOffice;
    beliggenhet: Address;
    postadresse: Address;
    brukerkontakt: AudienceContactInformation;
};

export interface OfficeBranchProps extends ContentCommonProps {
    __typename: ContentType.OfficeBranchPage;
    data: OfficeBranchData;
}
