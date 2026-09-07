import { AudienceReception, Address } from '@navikt/nav-office-reception-info';

type PostBoxAddress = {
    type: 'postboksadresse';
    adresseTilleggsnavn?: string;
    postnummer?: string;
    poststed?: string;
    postboksnummer?: string;
    postboksanlegg?: string;
};

type StreetAddress = Partial<Address> & {
    type: 'stedsadresse';
    locationLabel?: string;
};

export type OfficeAddress = StreetAddress | PostBoxAddress;

export type OfficeType =
    'LOKAL' | 'HMS' | 'ALS' | 'OKONOMI' | 'OPPFUTLAND' | 'KONTROLL' | 'REDAKSJONELT';

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

type AudienceContactInformation = {
    spraakdrakt?: 'NN' | 'NB';
    informasjonUtbetalinger?: string;
    brukertjenesteTilbud?: AudienceServices;
    publikumsmottak?: AudienceReception[];
    sosialhjelp?: SocialServices;
    publikumskanaler?: AudienceContact[] | AudienceContact;
};

export type OfficeDetailsData = {
    enhetNr?: string;
    type: OfficeType;
    telefonnummer?: string;
    telefonnummerKommentar?: string;
    hidePhoneInformation?: boolean;
    faksnummer?: string;
    navn?: string;
    organisasjonsnummer?: string;
    sosialeTjenester?: string;
    spesielleOpplysninger?: string;
    status?: string;
    underEtableringDato?: string;
    aktiveringsdato?: string;
    nedleggesesdato?: string;
    beliggenhet?: OfficeAddress;
    postadresse?: OfficeAddress;
    brukerkontakt?: AudienceContactInformation;
};
