import { OfficeInformationData } from '../../../../types/content-props/office-information-props';

export const officeInformationMock: OfficeInformationData = {
    enhet: {
        enhetId: 100000029,
        navn: 'NAV Aurskog-Høland',
        enhetNr: '0221',
        antallRessurser: 0,
        status: 'Aktiv',
        orgNivaa: 'EN',
        type: 'LOKAL',
        organisasjonsnummer: '991359583',
    },
    overordnetEnhet: '0200',
    kontaktinformasjon: {
        id: 100000665,
        enhetNr: '0221',
        telefonnummer: '55553333',
        postadresse: {
            type: 'stedsadresse',
            postnummer: '1940',
            poststed: 'BJØRKELANGEN',
            gatenavn: 'Rådhusveien',
            husnummer: '3',
        },
        besoeksadresse: {
            type: 'stedsadresse',
            postnummer: '1940',
            poststed: 'BJØRKELANGEN',
            gatenavn: 'Rådhusveien',
            husnummer: '3',
        },
        spesielleOpplysninger:
            'Vakttelefon/Nødhjelp sosiale tjenester, tlf 40638496 (9-15).\nVi tilbyr digital søknad sosialhjelp som gjøres via nav.no\nPapirsøknader sosialhjelp legges i postkasse ved NAV-dør i rådhusets åpningstid 10-14. Ellers i brevsprekk utenfor rådhusets hovedinngang.\n\nPåsken 2022: NAV har stengt for drop in mandag 11.april. Henvendelse via nav.no eller telefon 55 55 33 33. Nødhjelp økonomisk sosialhjelp 40 63 84 96 9-15.  Rådhuset er stengt i perioden 11.april – 18.april. \nPost må legges i postkasse utenfor Rådhuset.\n\nSommer 2022: Rådhuset er sommerstengt uke 27-28-29-30. Henvendelse via nav.no eller telefon 55 55 33 33. Nødhjelp økonomisk sosialhjelp 40 63 84 96 9-15.\nPost må legges i postkasse utenfor Rådhuset.',
        publikumsmottak: {
            id: 100000509,
            besoeksadresse: {
                type: 'stedsadresse',
                postnummer: '1940',
                poststed: 'Bjørkelangen',
                gatenavn: 'Rådhusveien',
                husnummer: '3',
            },
            aapningstider: [
                {
                    id: 100001728,
                    dag: 'Tirsdag',
                    kommentar: 'Åpent for timeavtaler.',
                    stengt: 'true',
                },
                {
                    id: 100003699,
                    dag: 'Onsdag',
                    kommentar: 'Åpent for timeavtaler.',
                    stengt: 'true',
                },
                {
                    id: 100001729,
                    dag: 'Fredag',
                    kommentar: 'Åpent for timeavtaler.',
                    stengt: 'true',
                },
                {
                    id: 100003700,
                    dag: 'Torsdag',
                    fra: '12:00',
                    til: '14:00',
                    kommentar: 'Åpent for timeavtaler.',
                    stengt: 'false',
                },
                {
                    id: 100001727,
                    dag: 'Mandag',
                    fra: '12:00',
                    til: '14:00',
                    kommentar: 'Åpent for timeavtaler.',
                    stengt: 'false',
                },
            ],
        },
    },
};
