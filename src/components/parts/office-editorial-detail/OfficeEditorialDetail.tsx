/* eslint-disable react-hooks/rules-of-hooks */

import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import {
    DetailType,
    OfficeEditorialDetailProps,
} from 'types/component-props/parts/office-editorial-detail';
import { OfficeBranchData } from 'types/content-props/office-branch-props';
import { ServiceInformation } from './details/ServiceInformation';
import { SocialHelpLinks } from './details/SocialHelpLinks';
import { PlaceholderIndicator } from './PlaceholderIndicator';

const getDetailComponent = (type: DetailType) => {
    const detailComponents = {
        [DetailType.SERVICE_INFORMATION]: ServiceInformation,
        [DetailType.SOCIAL_HELP_LINKS]: SocialHelpLinks,
        [DetailType.SOCIAL_HELP_PAYOUT_INFORMATION]: SocialHelpLinks,
        [DetailType.SOCIAL_HELP_POSTAL_INFORMATION]: SocialHelpLinks,
    };

    return detailComponents[type] || null;
};

export type DetailProps = {
    officeData: OfficeBranchData;
};

const officeDummyData = {
    lokalkontor: {
        enhetNr: '0533',
        navn: 'NAV Indre Ytrested',
        orgNrTilKommunaltNavKontor: '911002234',
        organisasjonsnummer: '919121321',
        sosialeTjenester:
            '--> Flyktninger fra Ukraina som har behov for å komme i kontakt med NAV og ikke har d-nummer eller f-nummer kan settes til Daria Mysyniuk på 91996754. Husk å sjekke kalender i Outlook om hun er ledig.\n\n--> Kontoret har tilpasset åpningstid pga Korona-viruset\n\nOppfølging og timeavtaler vil kunne bli gjennomført pr telefon. \nVed behov for akutt nødhjelp mellom 1530 og 0800 kan bruker ta kontakt med kommunenes sosialtjenestevakt (legevakten) på 23487090\n-----------------------------------------\n\n6 PCer tilgjengelig i V/P som bruker kan benytte til selvbetjening.\n\nNAV Oslo (0300) registrerer Del A for Nav kontorene i Oslo. Spørsmål skal til NAV kontoret.\n\nSosialfaglige henvendelser\nTil saksbehandler, ingen vakttelefon. \nVed purring på manglende utbetaling: Send Gosys-oppgave til kontorbenk att. Maria Breistrand\n\nSosialfaglige tjenester: Gjeldsrådgivning, frivillig/tvungen forvaltning, rustjenesten med booppfølging, boligkontor (midlertidig bolig, bostøtte, startlån, kommunal bostøtte, kommunalt boligtilskudd), flyktningetjenesten, kommunalt frikort\n\nSender post digitalt\nPapirsøknadsskjema finnes på kommunens nettside og i V/P\n\nOslo kommune har en døgnåpen vakttjeneste i Storgata 40, de behandler søknad om akutt nødhjelp når NAV-kontoret er stengt.\n\nSaksbehandlingstider: \nØkonomisk sosialhjelp: 3 uker \nStartlån: 4 mnd\n\nUtbetalinger:\nFast utbetalingsdager: Mandag, onsdag, fredag\nSiste tidspunkt for kjøring: 1400\nUtbetaling når utbetaling havner på helg/helligdag: siste/første virkedag før/etter\nUtbetalingsmåter for nødhjelp: kronekort (kontonr. starter på 1315)\nKvalifiseringsstønad: 28 i mnd',
        spesielleOpplysninger:
            'Informasjon i forbindelse med korona-situasjonen: Vi oppfordrer alle til å benytte våre skriftlige kanaler på nav.no fremfor å oppsøke NAV-kontorene.  På nav.no kan du søke om økonomisk sosialhjelp, dagpenger og andre ytelser fra NAV. Begrens besøkene dine til NAV–kontoret med mindre det er helt nødvendig for deg\n\nDersom du skal søke om dagpenger fordi du har blitt permittert eller arbeidsledig, må du først registrere deg som arbeidssøker på nav.no. Deretter kan du søke om dagpenger på nav.no: https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering',
        status: 'AKTIV',
        underEtableringDato: '1970-01-01',
        aktiveringsdato: '1970-01-01',
        underAvviklingDato: null,
        nedleggelsesdato: null,
    },
    beliggenhet: {
        type: 'stedsadresse',
        gatenavn: 'Svingen',
        husnummer: '150',
        husbokstav: 'A',
        adresseTilleggsnavn: null,
        postnummer: '3159',
        poststed: 'Indre Ytrested',
    },
    postadresse: {
        type: 'stedsadresse',
        postnummer: '3151',
        poststed: 'Ytrested',
        postboks: '123',
        postboksanlegg: 'Ytrested',
    },
    brukerkontakt: {
        spraakdrakt: 'NN',
        informasjonUtbetalinger:
            'Utbetalinger:\nFast utbetalingsdager: Mandag, onsdag, fredag\nSiste tidspunkt for kjøring: 1400\nUtbetaling når utbetaling havner på helg/helligdag: siste/første virkedag før/etter\nUtbetalingsmåter for nødhjelp: kronekort (kontonr. starter på 1315)\nKvalifiseringsstønad: 28 i mnd',
        brukertjenesteTilbud: {
            tjenester: [
                {
                    type: 'RUS',
                },
                {
                    type: 'STARTLAN',
                },
            ],
            ytterligereInformasjon:
                'UKRAINA-KRISEN\nDet er opprettet et eget senter i kommunens lokaler på Rådhuset. Her kan flyktninger få råd på ukrainsk til å finne informasjon og svar på praktiske spørsmål om asylprosessen.',
        },
        publikumsmottak: [
            {
                stedsbeskrivelse: 'NAV Indre',
                aapningstider: [
                    {
                        dag: 'Mandag',
                        dato: null,
                        fra: null,
                        til: null,
                        kommentar: null,
                        stengt: true,
                    },
                    {
                        dag: 'Tirsdag',
                        dato: null,
                        fra: 'string',
                        til: 'string',
                        kommentar: 'Kun åpent for timeavtaler',
                        stengt: true,
                    },
                    {
                        dag: 'Onsdag',
                        dato: null,
                        fra: '09:00',
                        til: '12:00',
                        kommentar: null,
                        stengt: false,
                    },
                    {
                        dag: 'Torsdag',
                        dato: null,
                        fra: '09:00',
                        til: '12:00',
                        kommentar: null,
                        stengt: false,
                    },
                    {
                        dag: 'Fredag',
                        dato: null,
                        fra: '09:00',
                        til: '12:00',
                        kommentar: null,
                        stengt: false,
                    },
                ],
                besoeksadresse: {
                    gatenavn: 'Svingen',
                    husnummer: '150',
                    husbokstav: 'A',
                    adresseTilleggsnavn: null,
                    postnummer: '3159',
                    poststed: 'Indre Ytrested',
                },
                adkomst:
                    'Ta heisen opp til 4.etg ved siden av blomsterbutikken',
            },
            {
                stedsbeskrivelse: 'NAV Søndre Ytrested',
                aapningstider: [
                    {
                        dag: 'Mandag',
                        dato: null,
                        fra: null,
                        til: null,
                        kommentar: 'Kun åpent for timeavtaler',
                        stengt: true,
                    },
                    {
                        dag: 'Tirsdag',
                        dato: null,
                        fra: 'string',
                        til: 'string',
                        kommentar: 'Kun åpent for timeavtaler',
                        stengt: true,
                    },
                    {
                        dag: 'Onsdag',
                        dato: null,
                        fra: null,
                        til: null,
                        kommentar: 'Kun åpent for timeavtaler',
                        stengt: true,
                    },
                    {
                        dag: 'Torsdag',
                        dato: null,
                        fra: null,
                        til: null,
                        kommentar: 'Kun åpent for timeavtaler',
                        stengt: true,
                    },
                    {
                        dag: 'Fredag',
                        dato: null,
                        fra: null,
                        til: null,
                        kommentar: 'Kun åpent for timeavtaler',
                        stengt: true,
                    },
                    {
                        dag: null,
                        dato: '2022-10-31',
                        fra: '17:00',
                        til: '20:00',
                        kommentar: 'Knask eller knep! Vi har Halloween åpent!',
                        stengt: false,
                    },
                ],
                besoeksadresse: {
                    gatenavn: 'Snipevn',
                    husnummer: '3',
                    husbokstav: null,
                    adresseTilleggsnavn: 'Myra',
                    postnummer: '3158',
                    poststed: 'Søndre Ytrested',
                },
                adkomst: null,
            },
        ],
        sosialhjelp: {
            digitaleSoeknader: [
                {
                    lenke: 'https://ytrested.kommune.no/sosialhjelpsoknad',
                    lenketekst: 'Digital søknad for sosialhjelp i kommunen',
                },
            ],
            papirsoeknadInformasjon:
                'Papirsøknadsskjema finnes på kommunens nettside og ved inngangsdøren. Kan leveres i brevsprekk utenom åpningstidene.',
        },
        publikumskanaler: [
            {
                beskrivelse: 'Beredskapstelefon',
                telefon: '91100112',
                epost: null,
                sortOrder: 0,
                tidsrom: {
                    TBD: 'TBD',
                },
            },
            {
                beskrivelse:
                    'For arbeidsgivere telefon (09:00-14:00 man og tor)',
                telefon: '33110011',
                epost: null,
                sortOrder: 1,
            },
            {
                beskrivelse: 'eller epost',
                telefon: null,
                epost: 'arbeidsgiverkontakt@navytrested.no',
                sortOrder: 2,
            },
        ],
    },
};

export const OfficeEditorialDetail = ({
    config,
    pageProps,
}: OfficeEditorialDetailProps) => {
    const { detailType } = config;
    const { pageConfig } = usePageConfig();

    const officeData = officeDummyData as OfficeBranchData; //pageProps.data as OfficeBranchData;

    // Note these texts are presented to editors only to give an idea
    // of what information the placeholder represent.
    const editorTranslation: { [key in DetailType]: string } = {
        [DetailType.SERVICE_INFORMATION]:
            'informasjon om tjenestene til kontoret.',
        [DetailType.SOCIAL_HELP_LINKS]: 'lenke til søknad om sosialhjelp.',
        [DetailType.SOCIAL_HELP_PAYOUT_INFORMATION]:
            'informasjon om utbetaling av sosialhjelp',
        [DetailType.SOCIAL_HELP_POSTAL_INFORMATION]:
            'informasjon om postkasse/henting av søknad for sosialhjelp.',
    };

    if (pageConfig.editorView) {
        if (!detailType) {
            <EditorHelp text="Angi hvilken informasjon fra kontoret som skal vises her ved å velge fra innstillingene til høyre." />;
        }
        return (
            <PlaceholderIndicator>{`Her plasseres kontor-spesifikk ${editorTranslation[detailType]}`}</PlaceholderIndicator>
        );
    }

    const DetailComponent = getDetailComponent(detailType);

    return <DetailComponent officeData={officeData} />;
};
