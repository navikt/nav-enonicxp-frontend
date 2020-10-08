import { ContentType } from '../../../types/content-types/_schema';

export const MockTableContent = [
    {
        __typename: ContentType.TransportPage,
        _path: '/',
        displayName: 'Panel 1',
        data: {
            ingress: 'Din ingress',
        },
    },
    {
        __typename: ContentType.ExternalLink,
        _path: '/',
        displayName: 'Panel 2',
        data: {
            description: 'Din ingress',
            url: '/',
        },
    },
    {
        __typename: ContentType.ExternalLink,
        _path: '/',
        displayName: 'Panel 3',
        data: {
            description: 'Din ingress',
            url: '/',
        },
    },
];

export const MockLinkList = {
    __typename: 'no_nav_navno_ContentList',
    _id: '860a5f4d-e1af-4d3f-ad0c-1b13fab2c6e8',
    _path: '/www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite',
    createdTime: '2015-08-28T09:33:59Z',
    modifiedTime: '2019-12-12T13:15:40.069971Z',
    displayName: 'Nyttig å vite',
    page: {},
    data: {
        sectionContents: [
            {
                __typename: 'no_nav_navno_MainArticle',
                _id: 'cd3c1fc5-53e9-4cdd-8287-ef69405832bd',
                _path:
                    '/www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/lang-ventetid-pa-telefonen',
                createdTime: '2019-12-04T07:59:44.599840Z',
                modifiedTime: '2019-12-04T11:35:56.473706Z',
                displayName: 'Lang ventetid på telefonen',
                page: {},
                data: {
                    ingress:
                        'Vi har dessverre lang ventetid på telefonen for tiden. Vi beklager ulempen dette medfører for deg som ringer. ',
                },
            },
            {
                __typename: 'no_nav_navno_PageList',
                _id: '5c33bb94-5d8e-4a11-88de-39ff388206b5',
                _path:
                    '/www.nav.no/no/nav-og-samfunn/kontakt-nav/kontakt-oss_2/feiltolkning-av-eos-reglene',
                createdTime: '2019-10-31T12:51:49Z',
                modifiedTime: '2019-12-12T13:40:51.919815Z',
                displayName: 'Feiltolkning av EØS-reglene',
                page: {},
                data: {
                    ingress:
                        'Her finner du informasjon knyttet til feil tolkning og praktisering av EØS-reglene for mottakere av arbeidsavklaringspenger, sykepenger og pleiepenger.',
                },
            },
            {
                __typename: 'no_nav_navno_MainArticle',
                _id: 'a24afc59-41f2-4c19-b976-1cc722df75b7',
                _path:
                    '/www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering/relatert-informasjon/permittering-i-julen-og-paskehelgen',
                createdTime: '2015-02-03T08:33:59Z',
                modifiedTime: '2019-12-13T08:35:50.375459Z',
                displayName: 'Permitteringsregler ved høytider',
                page: {},
                data: {
                    ingress:
                        'Når permitteringen varer 6 uker eller mindre, får du som hovedregel ikke dagpenger fra og med 20. desember til og med 1. januar. Disse dagene kan heller ikke regnes som ventedager. Det samme gjelder fra og med palmesøndag til og med 2. påskedag.',
                },
            },
            {
                __typename: 'no_nav_navno_MainArticle',
                _id: '74f92237-781a-43bd-94b7-5f91d0335e0f',
                _path:
                    '/www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/etteroppgjor-for-uforetrygd-inntektsaret-2018',
                createdTime: '2019-11-15T07:12:00Z',
                modifiedTime: '2019-11-15T21:38:20Z',
                displayName: 'Etteroppgjør for uføretrygd – inntektsåret 2018',
                page: {},
                data: {
                    ingress:
                        'Uføretrygd blir beregnet og utbetalt etter eventuell inntekt du har oppgitt å ha ved siden av. Hver høst gjennomfører NAV en automatisk kontroll ut fra inntektsopplysningene i skatteoppgjøret, for å se om du har mottatt riktig beløp. Dette kalles etteroppgjør.',
                },
            },
            {
                __typename: 'no_nav_navno_MainArticle',
                _id: '4c298da7-9d8d-4e25-ab3a-661216c34725',
                _path:
                    '/www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/utbetalingsdatoer-og-skattetrekk-i-desember',
                createdTime: '2014-11-10T13:59:33Z',
                modifiedTime: '2019-12-05T14:02:17.311746Z',
                displayName: 'Skattetrekk og utbetalingsdatoer i desember',
                page: {},
                data: {
                    ingress:
                        'Under finner du en oversikt over skattetrekk i juni og desember på skattepliktige ytelser fra NAV.',
                },
            },
            {
                __typename: 'no_nav_navno_MainArticle',
                _id: 'e8b0e763-84ec-46e3-af12-033ec20f9dd7',
                _path:
                    '/www.nav.no/no/nav-og-samfunn/innhold-til-nav-og-samfunn-forside/nyheter/praksisendring-for-kontantytelser-under-midlertidig-opphold-i-et-annet-eu-eos-land',
                createdTime: '2019-10-28T10:57:52Z',
                modifiedTime: '2019-12-10T13:27:15.812133Z',
                displayName:
                    'Viktig informasjon om reise til EU/EØS-land og Norden',
                page: {},
                data: {
                    ingress:
                        'Fra 28. oktober 2019 gjelder nye regler for deg som skal reise til et annet EU/EØS-land eller et annet land i Norden når du mottar arbeidsavklaringspenger, pleiepenger eller sykepenger.',
                },
            },
        ],
    },
};
