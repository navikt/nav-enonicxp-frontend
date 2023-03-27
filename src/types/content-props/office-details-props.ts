import { ProductDataMixin } from 'types/component-props/_mixins';
import { DynamicPageData } from './dynamic-page-props';

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
        | 'NODSITUASJON'
        | 'TILGANGPC'
        | 'HJELPDIGITALETJENESTER'
        | 'BARNEVERN'
        | 'FENGSEL_OG_KRIMINALOMSORG'
        | 'FLYKTNINGSTJENESTE'
        | 'RUS_OG_PSYKISK_HELSE'
        | 'STARTLAN'
        | 'SJOFARTSOPPGAVER'
        | 'STOTTEKONTAKT';
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

export type OfficeDetailsData = ProductDataMixin &
    DynamicPageData & {
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
