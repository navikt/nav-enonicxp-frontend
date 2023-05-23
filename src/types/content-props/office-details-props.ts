import { ProductDataMixin } from 'types/component-props/_mixins';

export interface Address {
    type?: 'stedsadresse' | 'postboksadresse';
    gatenavn?: string;
    husbokstav?: string;
    husnummer?: string;
    postboksanlegg?: string;
    postboksnummer?: string;
    postnummer?: string;
    poststed?: string;
}

export interface OpeningHours {
    dag?: 'Mandag' | 'Tirsdag' | 'Onsdag' | 'Torsdag' | 'Fredag';
    dato?: string;
    fra?: string;
    til?: string;
    kunTimeavtale?: string;
    kommentar?: string;
    stengt?: string;
}

export interface AudienceReception {
    stedsbeskrivelse?: string;
    aapningstider: OpeningHours[];
    besoeksadresse?: Address;
    adkomstbeskrivelse?: string;
}

export type Service = {
    type:
        | 'HJELP_KOMME_I_JOBB'
        | 'NODSITUASJON'
        | 'OKONOMI_GJELD'
        | 'TILGANGPC'
        | 'HJELPDIGITALETJENESTER'
        | 'BARNEVERNTJENESTE'
        | 'FLYKTNINGTJENESTE'
        | 'FENGSEL_OPPFOLGING'
        | 'RUS_OPPFOLGING'
        | 'PSYKISK_HELSE_OPPFOLGING'
        | 'STARTLAN'
        | 'SJOFARTSOPPGAVER'
        | 'AKTIVITETSKORTET'
        | 'BOSTOTTE_HUSBANKEN'
        | 'BOSTOTTE_KOMMUNEN'
        | 'PRIVATOKONOMI_FORVALTNING'
        | 'INTROPROGRAMMET'
        | 'KOMMUNAL_BOLIG'
        | 'KOMMUNAL_TILLEGGSPENSJON'
        | 'KOMMUNALT_FRIKORT_HELSETJENESTER'
        | 'LEDSAGERBEVIS'
        | 'PARKERING_FORFLYTNINGSHEMMEDE'
        | 'REDUSERT_FORELDREBETALING'
        | 'SKJENKEBEVILLING'
        | 'STOTTEKONTAKT'
        | 'TILRETTELAGT_TRANSPORT';
};

type AudienceServices = {
    tjenester?: Service[];
    ytterligereInformasjon?: string;
};

type DigitalApplication = {
    lenke: string;
    lenketekst: string;
};

type SocialServices = {
    digitaleSoeknader?: DigitalApplication[];
    papirsoeknadInformasjon?: string;
};

export type AudienceContact = {
    beskrivelse?: string;
    telefon?: string;
    epost?: string;
    sortOrder: number;
};

interface AudienceContactInformation {
    spraakdrakt: 'NN' | 'NB';
    informasjonUtbetalinger?: string;
    brukertjenesteTilbud?: AudienceServices;
    publikumsmottak: AudienceReception[];
    sosialhjelp?: SocialServices;
    publikumskanaler: AudienceContact[] | AudienceContact;
}

export type OfficeDetailsData = ProductDataMixin & {
    enhetNr: string;
    navn: string;
    organisasjonsnummer: string;
    sosialeTjenester?: string;
    spesielleOpplysninger?: string;
    status: string;
    underEtableringDato?: string;
    aktiveringsdato?: string;
    nedleggesesdato?: string;
    beliggenhet: Address;
    postadresse: Address;
    brukerkontakt: AudienceContactInformation;
};
