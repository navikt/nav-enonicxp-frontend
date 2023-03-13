import { MenuListItemKey } from 'types/menu-list-items';
import {
    ProductTaxonomy,
    Taxonomy,
    ThemedArticlePageTaxonomy,
    ToolsPageTaxonomy,
} from 'types/taxonomies';
import { Area } from 'types/areas';
import { Translations } from 'translations/default';

const relatedContent: { [key in MenuListItemKey]: string } = {
    [MenuListItemKey.AppealRights]: 'Klagerettar',
    [MenuListItemKey.FormAndApplication]: 'Skjema og søknad',
    [MenuListItemKey.International]: 'Internasjonalt',
    [MenuListItemKey.Membership]: 'Medlemskap i folketrygda',
    [MenuListItemKey.ProcessTimes]: 'Sakshandsamingstider',
    [MenuListItemKey.Rates]: 'Satsar',
    [MenuListItemKey.RelatedInformation]: 'Relatert innhald',
    [MenuListItemKey.ReportChanges]: 'Meld frå om endringar',
    [MenuListItemKey.RulesAndRegulations]: 'Regelverk',
    [MenuListItemKey.Saksbehandling]: 'Sakshandsaming',
    [MenuListItemKey.Selfservice]: 'Sjølvbetening',
    [MenuListItemKey.Shortcuts]: 'Snarvegar',
};

const taxonomies: {
    [key in Taxonomy]: string;
} = {
    [ProductTaxonomy.ALL]: 'Alle',
    [ProductTaxonomy.ASSISTIVE_TOOLS]: 'Hjelpemiddel',
    [ProductTaxonomy.BENEFITS]: 'Pengestønad',
    [ProductTaxonomy.FOLLOWUP]: 'Oppfylging',
    [ProductTaxonomy.SERVICE]: 'Teneste',
    [ProductTaxonomy.FOR_EMPLOYERS]: 'For arbeidsgjevarar',
    [ProductTaxonomy.FOR_EVENT_ORGANIZERS]: 'For tiltaksarrangørar',
    [ProductTaxonomy.FOR_HEALTH_SERVICE]: 'For leger og andre behandlarar',
    [ProductTaxonomy.FOR_MUNICIPALITY]: 'For kommunen',
    [ProductTaxonomy.FOR_PROVIDERS]: 'For samhandlarar',
    [ProductTaxonomy.MEASURES]: 'Tiltak',
    [ProductTaxonomy.RIGHTS]: 'Rettleiing',
    [ProductTaxonomy.FORMS]: 'Skjema',
    [ThemedArticlePageTaxonomy.TIPS_JOB]: 'Jobbsøkartips',
    [ThemedArticlePageTaxonomy.HELP_WORK]: 'Hjelp til å kome i jobb',
    [ThemedArticlePageTaxonomy.WHEN_SICK]: 'Når du er sjuk',
    [ThemedArticlePageTaxonomy.PAYMENT]: 'Utbetaling',
    [ThemedArticlePageTaxonomy.COMPLAINT_RIGHTS]: 'Klagerettar',
    [ThemedArticlePageTaxonomy.USER_SUPPORT]: 'Brukarstøtte',
    [ThemedArticlePageTaxonomy.ABOUT_NAV]: 'Om NAV',
    [ThemedArticlePageTaxonomy.MEMBERSHIP_NATIONAL_INSURANCE]:
        'Medlemskap i folketrygda',
    [ThemedArticlePageTaxonomy.RECRUITMENT]: 'Rekruttering',
    [ToolsPageTaxonomy.CALCULATOR]: 'Kalkulator',
    [ToolsPageTaxonomy.NAVIGATOR]: 'Vegvisar',
};

const areas: { [key in Area]: string } = {
    [Area.ALL]: 'Alle',
    [Area.ACCESSIBILITY]: 'Hjelpemiddel og tilrettelegging',
    [Area.FAMILY]: 'Familie og barn',
    [Area.HEALTH]: 'Helse og sjukdom',
    [Area.MUNICIPALITY]: 'For kommunen',
    [Area.OTHER]: 'Anna',
    [Area.PENSION]: 'Pensjon',
    [Area.SOCIAL_COUNSELLING]: 'Økonomisk sosialhjelp, råd og rettleiing',
    [Area.WORK]: 'Arbeid',
};

export const translationsBundleNn: Translations = {
    stringParts: {
        conjunction: 'og',
    },
    calculator: {
        calculate: 'Rekn ut',
        error: 'Orsak, det har skjedd ein feil i kalkulatoren med følgande feilmelding:',
    },
    dates: {
        lastChanged: 'Oppdatert',
        published: 'Publisert',
    },
    linkPanels: {
        label: 'Valpanel',
    },
    filteredContent: {
        noFiltersSelected: 'Ingen filter er valde, så vi viser alt innhald.',
        filtersSelected:
            'Vi har fjerna innhald som ikkje er relevant i situasjonen din.',
        customizeContent: 'Tilpass innhald',
        showingInformationFor: 'Viser informasjon for:',
    },
    linkLists: {
        news: 'Nyheiter',
        moreNews: 'Fleire nyheiter',
        niceToKnow: 'Nyttig å vete',
        shortcuts: 'Snarvegar',
        label: 'Lenker',
    },
    currentTopic: {
        tag: 'Aktuelt',
    },
    mainArticle: {
        facts: 'Fakta',
        lastChanged: 'Sist endra',
        linkedListDescription: 'Kapittel',
        published: 'Publisert',
        tableOfContents: 'Innhaldsoversikt',
        contents: 'Innhald',
        news: 'Nyheiter',
        pressRelease: 'Pressemelding',
    },
    mainPanels: {
        label: 'Hovudval',
    },
    officeInformation: {
        closed: 'Stengt',
    },
    audienceServices: {
        BARNEVERN: 'Barnevern',
        KRIMINALOMSORG: 'Kriminalomsorg',
        FLYKTNING: 'Flyktning',
        RUS: 'Rus',
        STARTLAN: 'Startlån',
        STOETTEKONTAKT: 'Støttekontakt',
    },
    relatedContent,
    taxonomies,
    areas,
    products: {
        person: 'For privatpersonar',
        employer: 'For arbeidsgjevarar',
        provider: 'For samhandlarar',
    },
    situations: {
        person: 'Dette kan du ha rett til',
        employer: 'For arbeidsgjevarar',
        provider: 'For samhandlarar',
    },
    guides: {
        person: 'Slik gjer du det',
        employer: 'For arbeidsgjevarar',
        provider: 'For samhandlarar',
    },
    overviews: {
        any: 'Frå A til Å',
    },
    publishingCalendar: {
        event: 'Hending',
        publishdate: 'Dato',
    },
    header: {
        copyLink: 'Kopier lenke',
        copiedLinkConfirmed: 'Lenka er kopiert',
    },
    office: {
        youFindUsHere: 'Du finn oss her',
        phoneToNav: 'Telefonnummeret til NAV er',
        chooseBetweenOffices: 'Du kan velje eit av disse kontora.',
        officeInformation: 'Kontorinformasjon',
        closed: 'Stengt',
        openingHoursWithoutAppointment: 'Åpningstidar når du ikkje har avtale',
        appointmentOnly: 'Kun timeavtale',
        specialOpeningHours: 'Spesielle åpningstider',
        address: 'Adresse',
        youCanMakeAppointment:
            'Du kan avtale møte med veilederen din utenom disse åpningstidene.',
    },
    overview: {
        noProducts: 'Ingen treff',
        search: 'Søk',
        loading: 'Laster innhald...',
        areas: {
            choose: 'Vel område',
            ariaExplanation: 'Filtrer lista etter område',
            ariaItemExplanation: 'Vis område',
        },
        taxonomies: {
            choose: 'Vel type',
            ariaExplanation: 'Filtrer lista etter type',
            ariaItemExplanation: 'Vis type',
        },
    },
    pressLanding: {
        latestPressNews: 'Siste pressemeldingar og nyheiter',
        morePressNews: 'Fleire pressemeldingar og nyheiter',
        pressShortcuts: 'Snarvegar',
        news: 'Nyheit',
        press: 'Pressemelding',
        published: 'Publisert',
    },
    pagination: {
        goTo: 'Gå til',
        ariaExplanation: 'Navigering av innhaldet med paginering',
    },
    contactPoint: {
        chat: {
            title: 'Du kan chatte med oss',
            ingress:
                'Du møter først chatbot Frida som svarar deg. Du kan òg be om å få snakke med ein rettleiar (kvardagar 09:00-15:00).',
        },
        legacyChat: {
            title: 'Du kan chatte med oss',
            ingress:
                'Du møter først chatbot Frida som svarar deg. Du kan òg be om å få snakke med ein rettleiar (kvardagar 09:00-15:00).',
        },
        write: {
            title: 'Skriv til oss',
            ingress:
                'Send beskjed eller nye opplysningar i saka di. Du kan òg sende spørsmål. <br/><br/> Svartida er nokre arbeidsdagar. Vil du ha raskare svar, kan du bruke chat.',
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
                'Kvardagar 09:00-15:00. Vi kan ringe deg tilbake viss ventetida er over 5 minutt.',
        },
        shared: {
            closed: 'Stengt',
            openNow: 'Ope no',
            opensAt: 'Opnar {$1} kl {$2}',
            closedNow: 'Stengt no',
            seeMoreOptions: 'Sjå fleire telefonnummer og tasteval.',
        },
    },
    dateTime: {
        weekDayNames: [
            'Måndag',
            'Tysdag',
            'Onsdag',
            'Torsdag',
            'Fredag',
            'Laurdag',
            'Søndag',
        ],
        relatives: {
            today: 'i dag',
            tomorrow: 'i morgon',
        },
        day: 'dag',
        date: 'dato',
    },
    versionHistory: {
        label: 'Versjonshistorikk',
        title: 'Vis historisk innhald',
        loading: 'Laster historisk innhald...',
    },
    pageWarnings: {
        draftWarning: 'Utkast - sida er under arbeid',
    },
    caseTimeUnit: {
        single: {
            days: 'dag',
            weeks: 'veke',
            months: 'månad',
        },
        multi: {
            days: 'dagar',
            weeks: 'veker',
            months: 'månader',
        },
    },
    payoutDates: {
        tableHeaderPrefix: 'Utbetalingsdatoar i',
        tableHeaderPrefixNoYear: 'Utbetalingsdatoar',
    },
    greetings: {
        hi: 'Hei!',
    },
};
