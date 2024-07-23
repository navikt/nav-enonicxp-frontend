import type { Meta, StoryObj } from '@storybook/react';
import { SituationPage } from './SituationPage';

const meta = {
    title: 'Components/Pages/SituationPage',
    component: SituationPage,
} satisfies Meta<typeof SituationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        _id: '23a43b41-ac9f-4270-9397-30400aad1940',
        _name: 'trenger-tilrettelegging-pa-jobb-eller-i-utdanning',
        _path: '/www.nav.no/no/person/hjelpemidler/livssituasjoner/trenger-tilrettelegging-pa-jobb-eller-i-utdanning',
        creator: 'user:adfs:1a41c681-a7e4-44a2-b711-b1137e86b760',
        modifier: 'user:adfs:97a7782e-8b02-4336-ba06-7f4d3809d8eb',
        createdTime: '2021-10-22T07:14:43.875405Z',
        modifiedTime: '2024-04-17T07:43:40.976132Z',
        owner: 'user:adfs:1a41c681-a7e4-44a2-b711-b1137e86b760',
        type: 'no.nav.navno:situation-page',
        displayName: 'Trenger tilrettelegging på jobb eller i utdanning',
        hasChildren: false,
        language: 'no',
        valid: true,
        childOrder: 'modifiedtime DESC',
        data: {
            chatbotToggle: true,
            title: 'Trenger tilrettelegging på jobb eller i utdanning',
            feedbackToggle: false,
            noindex: false,
            illustration: '28db5058-d0a7-4fb8-8ae0-dc1a5a435862',
            audience: {
                _selected: 'person',
                person: {},
            },
            ingress:
                'Hjelpemidler og tilrettelegging på arbeidsplassen eller skolen for å kunne jobbe eller gjennomføre utdanning.',
            area: ['accessibility', 'work'],
            customPath: '/tilrettelegging-jobb',
            owner: 'hjelpemidler_og_tilrettelegging',
            nosnippet: false,
        },
        x: {
            'no-nav-navno': {
                redirectToLayer: {},
                previewOnly: {
                    previewOnly: false,
                },
                virtualParent: {},
                searchOrder: {},
            },
        },
        page: {
            type: 'page',
            path: '/',
            descriptor: 'no.nav.navno:single-col-page',
            config: {},
            regions: {
                pageContent: {
                    components: [
                        {
                            path: '/pageContent/0',
                            type: 'layout',
                            descriptor: 'no.nav.navno:section-with-header',
                            config: {
                                border: {
                                    width: 3,
                                    rounded: false,
                                },
                                anchorId: 'kort-om',
                                toggleCopyButton: false,
                                hideFromInternalNavigation: false,
                            },
                            regions: {
                                intro: {
                                    components: [],
                                    name: 'intro',
                                },
                                content: {
                                    components: [
                                        {
                                            path: '/pageContent/0/content/0',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:html-area',
                                            config: {
                                                html: '<p>Hvis du har nedsatt funksjonsevne, kan det hende du trenger tilrettelegging på arbeidsplassen eller på utdanningsinstitusjonen.</p>\n',
                                                expandable: false,
                                                expandableOpenByDefault: false,
                                                renderOnAuthState: 'always',
                                            },
                                        },
                                    ],
                                    name: 'content',
                                },
                            },
                        },
                        {
                            path: '/pageContent/1',
                            type: 'part',
                            descriptor: 'no.nav.navno:page-navigation-menu',
                            config: {
                                title: 'Innhold',
                                viewStyle: 'inContent',
                            },
                        },
                        {
                            path: '/pageContent/2',
                            type: 'layout',
                            descriptor: 'no.nav.navno:section-with-header',
                            config: {
                                icon: {
                                    size: 0,
                                    icon: '577a5d09-d24e-4c40-96ec-800865200e74',
                                },
                                border: {
                                    width: 3,
                                    rounded: false,
                                },
                                title: 'Hjelpemidler og tilrettelegging i arbeidslivet',
                                toggleCopyButton: false,
                                anchorId: 'innholdsseksjon',
                                hideFromInternalNavigation: false,
                            },
                            regions: {
                                intro: {
                                    components: [],
                                    name: 'intro',
                                },
                                content: {
                                    components: [
                                        {
                                            path: '/pageContent/2/content/0',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:html-area',
                                            config: {
                                                html: '<p>NAV Hjelpemiddelsentral kan gi råd og veiledning om hjelpemidler og tilrettelegging av det fysiske miljøet på arbeidsplassen. Dette gjelder også der arbeidsgiver er ansvarlig for å finansiere utstyret eller tilretteleggingen.</p>\n\n<p>Du kan lese mer om <a href="https://www.arbeidstilsynet.no/arbeidsforhold/tilrettelegging/">arbeidsgivers generelle plikt til å tilrettelegge</a> (arbeidstilsynet.no).</p>\n\n<p>Tilrettelegging kan både være et ergonomisk tiltak eller et hjelpemiddel, som leselist eller programvare.  </p>\n\n<h3>Hvem kan få hjelp til hva?</h3>\n\n<p>Retten til hjelpemidler og veiledning om tilrettelegging på arbeidsplassen, gjelder enten du er arbeidssøker, arbeidstaker, selvstendig næringsdrivende eller får arbeidsavklaringspenger.</p>\n\n<p>Du kan søke NAV om hjelpemidler hvis du trenger det for å kunne utføre arbeidet ditt.</p>\n\n<p><a href="content://b42d8aca-6aea-4a85-9b17-755966a3daca">Her kan du finne mer informasjon om bestemte hjelpemiddeltyper</a> knyttet til ulike vansker og funksjonsnedsettelser: sansetap, bevegelsesvansker, kognitive vansker eller vansker med tale og språk.</p>\n\n<p>Du kan også få dekket kostnader til ombygging av maskiner for at du skal kunne nyttiggjøre deg utstyret.</p>\n\n<p>Du får ikke støtte til maskiner, driftsmidler, hjelpemidler eller utstyr som det må forventes skal finnes for at virksomheten skal ha en ordinær drift.</p>\n',
                                                expandable: false,
                                                expandableOpenByDefault: false,
                                                renderOnAuthState: 'always',
                                            },
                                        },
                                        {
                                            path: '/pageContent/2/content/1',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:accordion',
                                            config: {
                                                accordion: [
                                                    {
                                                        title: 'Arbeidsrettet veiledning',
                                                        html: '<p>NAV Hjelpemiddelsentral kan bidra spesielt i arbeidsrettet veiledning dersom du har</p>\n\n<ul>\n\t<li>nedsatt syn</li>\n\t<li>nedsatt hørsel</li>\n\t<li>kombinert nedsatt syn og hørsel, eller</li>\n\t<li>kognitive vansker.</li>\n</ul>\n\n<p>Spør NAV-kontoret ditt om dette, de kan henvise deg til NAV Hjelpemiddelsentral.</p>\n',
                                                    },
                                                    {
                                                        title: 'Selvstendig næringsdrivende',
                                                        html: '<p>Er du selvstendig næringsdrivende, kan du ha rett til tilskudd ved moderniserings- og effektiviseringstiltak på arbeidsplassen. Tiltaket må være nødvendig for at du skal kunne utføre arbeidet, og utstyret skal heller ikke være vanlig å ha. For moderniserings- og effektiviseringstiltak må du betale en egenandel på 40 prosent av kostnaden.</p>\n',
                                                    },
                                                    {
                                                        title: 'Arbeidsgiver',
                                                        html: '<div>Hvis du er arbeidsgiver og ønsker å ansette en person med funksjonsnedsettelse, kan du søke råd hos NAV Hjelpemiddelsentral. Du kan også få veiledning hvis du ønsker generell informasjon om tilretteleggingsmuligheter, eller hvis du allerede har en arbeidstaker som trenger tilrettelegging.</div>\n\n<div>Du kan lese mer om hva NAV Hjelpemiddelsentral kan hjelpe deg som arbeidsgiver med:</div>\n\n<div>[product-card-mini targetPage="b568ca25-7b2a-4147-99af-dcc5cdf68f79"/]</div>\n',
                                                    },
                                                ],
                                            },
                                        },
                                        {
                                            path: '/pageContent/2/content/2',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:html-area',
                                            config: {
                                                renderOnAuthState: 'always',
                                                html: '<h3>Varighet</h3>\n\n<p>Hvis du låner hjelpemidler av NAV, kan du ha de så lenge arbeidsforholdet varer. Du kan også ta med deg hjelpemidlene til ny arbeidsgiver. Ved nytt arbeidsforhold kan det være aktuelt å få vurdert hvilke tilretteleggingsbehov du har på det nye arbeidsstedet.</p>\n\n<h3>Hvordan søker du?</h3>\n\n<p>Hvis virksomheten er tilknyttet en bedriftshelsetjeneste, kan de hjelpe til med å vurdere tilretteleggingsbehovet ditt og med å søke. Om virksomheten ikke har egen bedriftshelsetjeneste, kan du kontakte NAV-kontoret for å få en arbeidsplassvurdering med fysioterapeut eller ergoterapeut.</p>\n\n<p>Har du behov for mer hjelp til utredning, kan du sammen med arbeidsgiver ta kontakt med hjelpemiddelsentralen i fylket ditt for å få råd og veiledning.</p>\n\n<p>Søknadsskjema til ulike hjelpemiddeltyper finner du i <a href="content://2a06f089-4a7f-44ee-8381-3fcee48e3557">NAVs skjemaoversikt</a>. Når du søker hjelpemidler til arbeid, må du fylle ut tilleggsskjemaet T12 i tillegg til søknadsskjemaet. Dette kommer opp som en valgmulighet når du laster ned det aktuelle søknadsskjemaet.</p>\n',
                                                expandable: false,
                                            },
                                        },
                                        {
                                            path: '/pageContent/2/content/3',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:product-card-mini',
                                            config: {
                                                header: 'Hvis du trenger hjelp til å komme i jobb, kan du finne mer informasjon på denne siden:',
                                                targetPage: '0c45db7a-0c06-495b-8434-c566123f5f2a',
                                            },
                                        },
                                        {
                                            path: '/pageContent/2/content/4',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:product-card-mini',
                                            config: {
                                                header: 'Hvis du er arbeidsgiver, kan du finne mer informasjon om tilrettelegging her:',
                                                targetPage: 'b568ca25-7b2a-4147-99af-dcc5cdf68f79',
                                            },
                                        },
                                    ],
                                    name: 'content',
                                },
                            },
                        },
                        {
                            path: '/pageContent/3',
                            type: 'layout',
                            descriptor: 'no.nav.navno:section-with-header',
                            config: {
                                title: 'Hjelpemidler og tilrettelegging i utdanning',
                                anchorId: 'utdanning',
                                hideFromInternalNavigation: false,
                                toggleCopyButton: false,
                            },
                            regions: {
                                intro: {
                                    components: [],
                                    name: 'intro',
                                },
                                content: {
                                    components: [
                                        {
                                            path: '/pageContent/3/content/0',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:html-area',
                                            config: {
                                                renderOnAuthState: 'always',
                                                html: '<p>Dersom du studerer eller skal begynne å studere, bør du først kontakte tilretteleggingstjenesten på studiestedet. Alle studiesteder skal ha en slik tjeneste, selv om det kan ha ulike navn. Sammen kan dere kontakte NAV Hjelpemidler og tilrettelegging for å få råd og eventuelt hjelp til å søke om hjelpemidler. </p>\n\n<h3>Hvem kan få hjelpemiddel under utdanning?</h3>\n\n<p>Har du en funksjonsnedsettelse og tar utdanning ut over videregående nivå eller mottar arbeidsavklaringspenger, kan du ha rett til hjelpemidler. Hjelpemiddelet må ha en klar sammenheng med funksjonsnedsettelsen og være nødvendig for å kunne gjennomføre utdanning.</p>\n\n<h3>Hva kan du få?</h3>\n\n<p>Tilrettelegging av en studieplass kan både være et ergonomisk tiltak eller et hjelpemiddel, som leselist eller programvare. Støtten er avgrenset til praktisk tilrettelegging og gjelder ikke pedagogiske tiltak.</p>\n\n<p>Hjelpemidler blir gitt som utlån fra hjelpemiddelsentralen og skal leveres tilbake når utdanningen er slutt eller avbrytes, eller hvis hjelpemidlet av andre grunner ikke lenger er i bruk.</p>\n\n<p><a href="content://b42d8aca-6aea-4a85-9b17-755966a3daca">Her kan du finne mer informasjon om bestemte hjelpemiddeltyper</a> knyttet til ulike vansker og funksjonsnedsettelser: sansetap, bevegelsesvansker, kognitive vansker eller vansker med tale og språk.</p>\n\n<h4>Arbeidsrettet veiledning</h4>\n\n<p>NAV Hjelpemiddelsentral kan bidra spesielt i arbeidsrettet veiledning dersom du har</p>\n\n<ul>\n\t<li>nedsatt syn</li>\n\t<li>nedsatt hørsel</li>\n\t<li>kombinert nedsatt syn og hørsel, eller</li>\n\t<li>kognitive vansker.</li>\n</ul>\n\n<p>Spør NAV-kontoret ditt om dette, de kan henvise deg til NAV Hjelpemiddelsentral.</p>\n\n<h3>Hvordan søker du?</h3>\n\n<p>Studiestedet er ansvarlig for å bidra til samarbeid om tilrettelegging av din studiesituasjon, ut fra muligheter og behov. Funksjonsvurderinger må gjøres av kommunehelsetjenesten eller andre som har kompetanse til å foreta slike vurderinger.</p>\n\n<p>Det er ofte best å få hjelp når du skal søke om hjelpemiddel, men du må selv signere søknaden. Søknadsskjema til ulike hjelpemiddeltyper finner du <a href="content://2a06f089-4a7f-44ee-8381-3fcee48e3557">i NAVs skjemaoversikt</a>.</p>\n',
                                                expandable: false,
                                            },
                                        },
                                    ],
                                    name: 'content',
                                },
                            },
                        },
                        {
                            path: '/pageContent/4',
                            type: 'layout',
                            descriptor: 'no.nav.navno:situation-flex-cols',
                            config: {
                                title: 'Utvalg av aktuelle ordninger og hjelpemidler',
                                toggleCopyButton: false,
                                numCols: 3,
                                justifyContent: 'flex-start',
                                anchorId: 'aktuelle-produktsider',
                                hideFromInternalNavigation: false,
                            },
                            regions: {
                                flexcols: {
                                    components: [
                                        {
                                            path: '/pageContent/4/flexcols/0',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:product-card',
                                            config: {
                                                targetPage: '278a3983-480a-434e-86e2-e9d630dbdf55',
                                            },
                                        },
                                        {
                                            path: '/pageContent/4/flexcols/1',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:product-card',
                                            config: {
                                                targetPage: '22d11d08-f921-4507-8203-ae2ec55def67',
                                            },
                                        },
                                        {
                                            path: '/pageContent/4/flexcols/2',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:product-card',
                                            config: {
                                                targetPage: '5b218a20-788a-4f50-b7d2-353f05abee65',
                                            },
                                        },
                                        {
                                            path: '/pageContent/4/flexcols/3',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:product-card',
                                            config: {
                                                targetPage: '2253cf12-7a92-4556-9cad-1ddc6c7c2deb',
                                            },
                                        },
                                    ],
                                    name: 'flexcols',
                                },
                            },
                        },
                        {
                            path: '/pageContent/5',
                            type: 'layout',
                            descriptor: 'no.nav.navno:section-with-header',
                            config: {
                                icon: {
                                    size: 0,
                                },
                                border: {
                                    width: 3,
                                    rounded: false,
                                },
                                title: 'Tilskuddsordninger',
                                toggleCopyButton: false,
                                anchorId: 'tilskuddsordninger',
                                hideFromInternalNavigation: false,
                            },
                            regions: {
                                intro: {
                                    components: [],
                                    name: 'intro',
                                },
                                content: {
                                    components: [
                                        {
                                            path: '/pageContent/5/content/0',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:html-area',
                                            config: {
                                                html: '<p>Dersom du har behov for hjelpemidler som ikke lånes ut av NAV, finnes det tilskuddsordninger som kan dekke beløpet eller deler av det. Dette gjelder for eksempel apper og programvare, PC eller nettbrett når du har lese- og skrivevansker og tilskudd til rimelige hjelpemidler.</p>\n',
                                                expandable: false,
                                                expandableOpenByDefault: false,
                                                renderOnAuthState: 'always',
                                            },
                                        },
                                        {
                                            path: '/pageContent/5/content/1',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:product-card-mini',
                                            config: {
                                                header: 'Du kan lese mer om:',
                                                targetPage: 'e9e99e18-068e-42fe-a85a-32162932feee',
                                            },
                                        },
                                        {
                                            path: '/pageContent/5/content/2',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:product-card-mini',
                                            config: {
                                                targetPage: '32c0643d-03a1-4949-831d-7ecc4a626e7e',
                                            },
                                        },
                                        {
                                            path: '/pageContent/5/content/3',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:product-card-mini',
                                            config: {
                                                targetPage: '19fd31e3-2daa-4567-9a2b-6e1fb895aab5',
                                            },
                                        },
                                    ],
                                    name: 'content',
                                },
                            },
                        },
                        {
                            path: '/pageContent/6',
                            type: 'layout',
                            descriptor: 'no.nav.navno:section-with-header',
                            config: {
                                title: 'Hvem kan hjelpe?',
                                anchorId: 'hjelp',
                                hideFromInternalNavigation: false,
                                toggleCopyButton: false,
                            },
                            regions: {
                                intro: {
                                    components: [],
                                    name: 'intro',
                                },
                                content: {
                                    components: [
                                        {
                                            path: '/pageContent/6/content/0',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:html-area',
                                            config: {
                                                renderOnAuthState: 'always',
                                                html: '<p>Ditt lokale NAV-kontor kan veilede deg til riktig tjeneste, enten det er NAV Hjelpemiddelsentral eller andre deler av NAV. </p>\n\n<p>Andre som kan hjelpe er blant andre:</p>\n\n<ul>\n\t<li>Bedriftshelsetjenesten</li>\n\t<li>Tilretteleggingstjenesten på studiestedet</li>\n\t<li>Kommunal ergo- eller fysioterapitjeneste</li>\n\t<li>Kommunal synskontakt</li>\n\t<li>Kommunal hørselskontakt</li>\n\t<li>Lånekassen - som kan gi ekstra stipend hvis du ikke klarer å jobbe ved siden av studiene.</li>\n</ul>\n\n<p> </p>\n',
                                                expandable: false,
                                            },
                                        },
                                    ],
                                    name: 'content',
                                },
                            },
                        },
                        {
                            path: '/pageContent/7',
                            type: 'layout',
                            descriptor: 'no.nav.navno:situation-flex-cols',
                            config: {
                                numCols: 2,
                                justifyContent: 'flex-start',
                                title: 'Andre som kan hjelpe',
                                toggleCopyButton: false,
                                anchorId: 'andre-som-kan-hjelpe',
                            },
                            regions: {
                                flexcols: {
                                    components: [
                                        {
                                            path: '/pageContent/7/flexcols/0',
                                            type: 'part',
                                            descriptor: 'no.nav.navno:provider-card',
                                            config: {
                                                link: {
                                                    external: {
                                                        url: 'https://www.lanekassen.no',
                                                        text: 'Lånekassen',
                                                    },
                                                    _selected: 'external',
                                                },
                                                description:
                                                    'Gir studiestøtte og stipend under utdanning',
                                                endnote: 'PENGESTØTTE FRA LÅNEKASSEN',
                                            },
                                        },
                                    ],
                                    name: 'flexcols',
                                },
                            },
                        },
                    ],
                    name: 'pageContent',
                },
            },
        },
        attachments: {},
        publish: {
            from: '2021-10-22T07:21:39.794Z',
            first: '2021-10-22T07:21:39.794Z',
        },
    },
};
