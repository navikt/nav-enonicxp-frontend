import { DeepPartial } from '../types/util-types';
import { MenuListItemKey } from '../types/menu-list-items';
import { Taxonomy } from 'types/taxonomies';
import { Area } from 'types/areas';
import { ProductDetailType } from '../types/content-props/product-details';

const relatedContent: { [key in MenuListItemKey]: string } = {
    [MenuListItemKey.AppealRights]: 'Klagerettigheter',
    [MenuListItemKey.FormAndApplication]: 'Skjema og søknad',
    [MenuListItemKey.International]: 'Internasjonalt',
    [MenuListItemKey.Membership]: 'Medlemskap i folketrygden',
    [MenuListItemKey.ProcessTimes]: 'Saksbehandlingstider',
    [MenuListItemKey.Rates]: 'Satser',
    [MenuListItemKey.RelatedInformation]: 'Relatert innhold',
    [MenuListItemKey.ReportChanges]: 'Meld fra om endringer',
    [MenuListItemKey.RulesAndRegulations]: 'Regelverk',
    [MenuListItemKey.Saksbehandling]: 'Saksbehandling',
    [MenuListItemKey.Selfservice]: 'Selvbetjening',
    [MenuListItemKey.Shortcuts]: 'Snarveier',
};

const productTaxonomies: { [key in Taxonomy]: string } = {
    [Taxonomy.ALL]: 'Alle',
    [Taxonomy.ASSISTIVE_TOOLS]: 'Hjelpemiddel',
    [Taxonomy.BENEFITS]: 'Pengestøtte',
    [Taxonomy.FOLLOWUP]: 'Oppfølging',
    [Taxonomy.FOR_EMPLOYERS]: 'For arbeidsgivere',
    [Taxonomy.FOR_EVENT_ORGANIZERS]: 'For tiltaksarrangører',
    [Taxonomy.FOR_HEALTH_SERVICE]: 'For leger og andre behandlere',
    [Taxonomy.FOR_MUNICIPALITY]: 'For kommunen',
    [Taxonomy.FOR_PROVIDERS]: 'For samarbeidspartnere',
    [Taxonomy.MEASURES]: 'Tiltak',
    [Taxonomy.RIGHTS]: 'Veiledning',
};

const areas: { [key in Area]: string } = {
    [Area.ALL]: 'Alle',
    [Area.ACCESSIBILITY]: 'Hjelpemidler og tilrettelegging',
    [Area.FAMILY]: 'Familie og barn',
    [Area.HEALTH]: 'Helse og sykdom',
    [Area.MUNICIPALITY]: 'For kommunen',
    [Area.OTHER]: 'Annet',
    [Area.PENSION]: 'Pensjon',
    [Area.SELF_EMPLOYED]: 'For selvstendig næringsdrivende',
    [Area.SOCIAL_COUNSELLING]: 'Økonomisk sosialhjelp, råd og veiledning',
    [Area.WORK]: 'Arbeid',
};

const productDetailTypes: { [key in ProductDetailType]: string } = {
    [ProductDetailType.PAYOUT_DATES]: 'utbetalingsdatoer',
    [ProductDetailType.PROCESSING_TIMES]: 'saksbehandlingstider',
    [ProductDetailType.RATES]: 'satser',
    [ProductDetailType.ALL_PRODUCTS]: 'alle',
};

export const translationsBundleNb = {
    areaPage: {
        chooseArea: 'Velg et område',
    },
    stringParts: {
        conjunction: 'og',
    },
    calculator: {
        calculate: 'Beregn',
        error: 'Beklager, det har oppstått en feil i kalkulatoren med følgende feilmelding:',
    },
    dates: {
        lastChanged: 'Oppdatert',
        published: 'Publisert',
    },
    linkPanels: {
        label: 'Valgpaneler',
    },
    filteredContent: {
        noFiltersSelected: 'Ingen filtre er valgt, så alt innhold vises.',
        filtersSelected:
            'Vi har fjernet innhold som ikke er relevant i situasjonen din.',
        customizeContent: 'Tilpass innhold',
        showingInformationFor: 'Viser informasjon for:',
    },
    linkLists: {
        news: 'Nyheter',
        moreNews: 'Flere nyheter',
        niceToKnow: 'Nyttig å vite',
        shortcuts: 'Snarveier',
        label: 'Lenker',
    },
    mainArticle: {
        facts: 'Fakta',
        lastChanged: 'Sist endret',
        linkedListDescription: 'Kapitler',
        published: 'Publisert',
        tableOfContents: 'Innholdsfortegnelse',
        contents: 'Innholdsoversikt',
    },
    mainPanels: {
        label: 'Hovedvalg',
    },
    officeInformation: {
        closed: 'Stengt',
    },
    relatedContent: relatedContent,
    productTaxonomies,
    areas,
    products: {
        person: 'For privatpersoner',
        employer: 'For arbeidsgivere',
        provider: 'For samarbeidspartnere',
    },
    situations: {
        person: 'Dette kan du ha rett til',
        employer: 'For arbeidsgivere',
        provider: 'For samarbeidspartnere',
    },
    guides: {
        person: 'Slik gjør du det',
        employer: 'For arbeidsgivere',
        provider: 'For samarbeidspartnere',
    },
    publishingCalendar: {
        event: 'Kalenderhendelse',
        publishdate: 'Publiseringsdato',
    },
    header: {
        copyLink: 'Kopier lenke',
        copiedLinkConfirmed: 'Lenken er kopiert',
    },
    overview: {
        noProducts: 'Ingen treff',
        ariaExplanation: 'Filtrer listen etter område',
        ariaItemExplanation: 'Vis område',
        chooseArea: 'Velg område',
        chooseType: 'Velg type',
        search: 'Søk',
        loading: 'Laster innhold...',
    },
    pagination: {
        goTo: 'Gå til',
        ariaExplanation: 'Navigering av innholdet via paginering',
    },
    contactPoint: {
        chat: {
            title: 'Chat med oss',
            ingress:
                'Du møter først chatbot Frida som svarer deg. Du kan også be Frida om å få snakke med en veileder (hverdager 09:00-15:00).',
        },
        write: {
            title: 'Skriv til oss',
            ingress:
                'Send beskjed eller nye opplysninger i saken din. Du kan også sende spørsmål. <br/><br/> Svartid er noen arbeidsdager. Vil du ha svar raskere, kan du bruke chat.',
        },
        navoffice: {
            title: 'Finn ditt NAV-kontor',
            ingress: 'Søk opp NAV-kontor med postnummer, sted eller by.',
        },
        aidcentral: {
            title: 'Finn din hjelpemiddelsentral',
            ingress:
                'Finn kontaktinformasjon og les om inn- og utlevering av hjelpemidler.',
        },
        call: {
            title: 'Ring oss på 55 55 33 33',
            ingress:
                'Hverdager 09:00–15:00. Vi kan ringe deg tilbake hvis ventetiden er over 5 minutter.',
        },
        shared: {
            generalOpeningHours: 'Ordinære åpningstider',
            openingHours: 'Åpningstider',
            specialHours: 'Spesielle åpningstider',
            closed: 'Stengt',
            openNow: 'Åpent nå',
            opensAt: 'Åpner {$1} kl {$2}',
            closedNow: 'Stengt nå',
            seeMoreOptions: 'Se flere telefonnummer og tastevalg',
            todaysPhoneOpeningHours: 'Åpningstider på telefon i dag',
            callUsAt: 'Ring oss på',
            businessDays: 'hverdager',
        },
    },
    dateTime: {
        weekDayNames: [
            'Mandag',
            'Tirsdag',
            'Onsdag',
            'Torsdag',
            'Fredag',
            'Lørdag',
            'Søndag',
        ],
        relatives: {
            today: 'i dag',
            tomorrow: 'i morgen',
        },
        day: 'dag',
        date: 'dato',
    },
    versionHistory: {
        label: 'Versjonshistorikk',
        title: 'Vis historisk innhold',
        loading: 'Laster historisk innhold...',
    },
    pageWarnings: {
        draftWarning: 'Utkast - siden er under arbeid',
        failoverWarning:
            'Vi har for tiden tekniske problemer på nav.no. Du kan oppleve noe treghet eller at innhold mangler. Du kan prøve å laste inn siden på nytt.',
    },
    caseTimeUnit: {
        single: {
            days: 'dag',
            weeks: 'uke',
            months: 'måned',
        },
        multi: {
            days: 'dager',
            weeks: 'uker',
            months: 'måneder',
        },
    },
    productDetailTypes: productDetailTypes,
    payoutDates: {
        tableHeaderPrefix: 'Utbetalingsdatoer i',
        tableHeaderPrefixNoYear: 'Utbetalingsdatoer',
    },
    greetings: {
        hi: 'Hei!',
    },
};

export type Translations = DeepPartial<typeof translationsBundleNb>;
