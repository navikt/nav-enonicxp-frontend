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

export type Language = 'no' | 'nn' | 'en';
