import { DeepPartial } from '../types/util-types';
import { MenuListItemKey } from '../types/menu-list-items';
import {
    ProductTaxonomy,
    Taxonomy,
    ThemedArticlePageTaxonomy,
    ToolsPageTaxonomy,
} from 'types/taxonomies';
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

const productTaxonomies: {
    [key in Taxonomy]: string;
} = {
    [ProductTaxonomy.ALL]: 'Alle',
    [ProductTaxonomy.ASSISTIVE_TOOLS]: 'Hjelpemiddel',
    [ProductTaxonomy.BENEFITS]: 'Pengestøtte',
    [ProductTaxonomy.FOLLOWUP]: 'Oppfølging',
    [ProductTaxonomy.SERVICE]: 'Tjeneste',
    [ProductTaxonomy.FOR_EMPLOYERS]: 'For arbeidsgivere',
    [ProductTaxonomy.FOR_EVENT_ORGANIZERS]: 'For tiltaksarrangører',
    [ProductTaxonomy.FOR_HEALTH_SERVICE]: 'For leger og andre behandlere',
    [ProductTaxonomy.FOR_MUNICIPALITY]: 'For kommunen',
    [ProductTaxonomy.FOR_PROVIDERS]: 'For samarbeidspartnere',
    [ProductTaxonomy.MEASURES]: 'Tiltak',
    [ProductTaxonomy.RIGHTS]: 'Veiledning',
    [ProductTaxonomy.FORMS]: 'Skjema',
    [ThemedArticlePageTaxonomy.TIPS_JOB]: 'Jobbsøkertips',
    [ThemedArticlePageTaxonomy.HELP_WORK]: 'Hjelp til å komme i jobb',
    [ThemedArticlePageTaxonomy.WHEN_SICK]: 'Når du er syk',
    [ThemedArticlePageTaxonomy.PAYMENT]: 'Utbetaling',
    [ThemedArticlePageTaxonomy.COMPLAINT_RIGHTS]: 'Klagerettigheter',
    [ThemedArticlePageTaxonomy.USER_SUPPORT]: 'Brukerstøtte',
    [ThemedArticlePageTaxonomy.ABOUT_NAV]: 'Om NAV',
    [ThemedArticlePageTaxonomy.MEMBERSHIP_NATIONAL_INSURANCE]:
        'Medlemskap i folketrygden',
    [ThemedArticlePageTaxonomy.RECRUITMENT]: 'Rekruttering',
    [ToolsPageTaxonomy.CALCULATOR]: 'Kalkulator',
    [ToolsPageTaxonomy.NAVIGATOR]: 'Veiviser',
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
    featuredArticle: {
        tag: 'Aktuelt',
    },
    mainArticle: {
        facts: 'Fakta',
        lastChanged: 'Oppdatert',
        linkedListDescription: 'Kapitler',
        published: 'Publisert',
        tableOfContents: 'Innholdsfortegnelse',
        contents: 'Innholdsoversikt',
        news: 'Nyheter',
        pressRelease: 'Pressemelding',
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
        legacyChat: {
            title: 'Du kan chatte med oss',
            ingress:
                'Du møter først chatbot Frida. Du kan be Frida om å få chatte med en veileder (hverdager 09:00–15:00)',
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
            closed: 'Stengt',
            openNow: 'Åpent nå',
            opensAt: 'Åpner {$1} kl {$2}',
            closedNow: 'Stengt nå',
            seeMoreOptions: 'Se flere telefonnummer og tastevalg',
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
        contentTypeChangedWarningPre:
            'Obs! Denne siden var opprinnelig av typen ',
        contentTypeChangedWarningPost:
            '. Den inneholder versjonshistorikk og skal derfor ikke slettes. Innholdet bør endres tilbake til opprinnelig innholdstype før arkivering.',
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
