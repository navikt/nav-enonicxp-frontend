import { DeepPartial } from 'types/util-types';
import { MenuListItemKey } from 'types/menu-list-items';
import {
    ProductTaxonomy,
    Taxonomy,
    ThemedArticlePageTaxonomy,
    ToolsPageTaxonomy,
} from 'types/taxonomies';
import { Area } from 'types/areas';
import { ProductDetailType } from 'types/content-props/product-details';

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

const taxonomies: {
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
    pressLanding: {
        latestPressNews: 'Siste pressemeldinger og nyheter',
        morePressNews: 'Flere pressemeldinger og nyheter',
        pressShortcuts: 'Snarveier',
        news: 'Nyhet',
        press: 'Pressemelding',
        published: 'Publisert',
    },
    linkLists: {
        news: 'Nyheter',
        moreNews: 'Flere nyheter',
        niceToKnow: 'Nyttig å vite',
        shortcuts: 'Snarveier',
        label: 'Lenker',
    },
    currentTopic: {
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
    audienceServices: {
        HJELP_KOMME_I_JOBB: 'Hjelp til å komme i jobb',
        NODSITUASJON:
            'Hjelp i nødssituasjoner, for eksempel midlertidig botilbud eller økonomisk sosialhjelp',
        OKONOMI_GJELD: 'Økonomi- og gjeldsrådgivning',
        TILGANGPC: 'Tilgang til PC',
        HJELPDIGITALETJENESTER:
            'Hjelp til å bruke digitale tjenester hvis du trenger det',
        BARNEVERNTJENESTE: 'Barneverntjeneste',
        FLYKTNINGTJENESTE: 'Flyktningtjeneste',
        FENGSEL_OPPFOLGING: 'Oppfølging av personer i fengsel',
        RUS_OPPFOLGING: 'Oppfølging av personer med rusproblemer',
        PSYKISK_HELSE_OPPFOLGING:
            'Oppfølging av personer med psykiske helseproblemer',
        STARTLAN: 'Startlån og tilskudd fra kommunen',
        SJOFARTSOPPGAVER: 'Utstedelse av sjøfartsbok og formidling av sjøfolk',
        AKTIVITETSKORTET: 'Aktivitetskortet for barn og unge',
        BOSTOTTE_HUSBANKEN: 'Bostøtte fra Husbanken',
        BOSTOTTE_KOMMUNEN: 'Bostøtte fra kommunen',
        PRIVATOKONOMI_FORVALTNING:
            'Frivillig og tvungen forvaltning av privatøkonomi',
        INTROPROGRAMMET: 'Introduksjonsprogrammet',
        KOMMUNAL_BOLIG: 'Kommunal bolig',
        KOMMUNAL_TILLEGGSPENSJON: 'Kommunal tilleggspensjon',
        KOMMUNALT_FRIKORT_HELSETJENESTER:
            'Kommunalt frikort for helsetjenester',
        LEDSAGERBEVIS: 'Ledsagerbevis',
        PARKERING_FORFLYTNINGSHEMMEDE:
            'Parkeringstillatelse for forflytningshemmede',
        REDUSERT_FORELDREBETALING:
            'Redusert foreldrebetaling i barnehage eller SFO',
        SKJENKEBEVILLING: 'Skjenkebevilling',
        STOTTEKONTAKT: 'Støttekontakt',
        TILRETTELAGT_TRANSPORT: 'Tilrettelagt transport (TT-kort)',
    },
    relatedContent: relatedContent,
    taxonomies,
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
    overviews: {
        any: 'Fra A til Å',
    },
    publishingCalendar: {
        event: 'Hendelse',
        publishdate: 'Dato',
    },
    header: {
        copyLink: 'Kopier lenke',
        copiedLinkConfirmed: 'Lenken er kopiert',
    },
    overview: {
        noProducts: 'Ingen treff',
        search: 'Finn tjeneste',
        loading: 'Laster innhold...',
        resetFilters: 'Nullstill',
        areas: {
            choose: 'Velg område',
            ariaExplanation: 'Filtrer listen etter område',
            ariaItemExplanation: 'Vis område',
        },
        taxonomies: {
            choose: 'Velg type',
            ariaExplanation: 'Filtrer listen etter type',
            ariaItemExplanation: 'Vis type',
        },
    },
    pagination: {
        goTo: 'Gå til',
        ariaExplanation: 'Navigering av innholdet via paginering',
    },
    form: {
        application: 'Søknad',
        back: 'Tilbake',
    },
    contactPoint: {
        chat: {
            title: 'Du kan chatte med oss',
            ingress:
                'Du møter først chatbot Frida som svarer deg. Du kan også be Frida om å få snakke med en veileder (hverdager 9-15).',
            chatWithCounsellor: 'Chat med veileder',
            alwaysOpen: 'Alltid åpen',
        },
        legacyChat: {
            title: 'Du kan chatte med oss',
            ingress:
                'Du møter først chatbot Frida som svarer deg. Du kan også be Frida om å få snakke med en veileder (hverdager 9-15).',
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
                'Hverdager 9-15. Vi kan ringe deg tilbake hvis ventetiden er over 5 minutter.',
        },
        shared: {
            closed: 'Stengt',
            openNow: 'Åpent nå',
            opensAt: 'Åpner {$date} kl. {$time}',
            closedNow: 'Stengt nå',
            seeMoreOptions: 'Se flere telefonnummer og tastevalg',
        },
    },
    office: {
        youFindUsHere: 'Du finner oss her',
        chooseBetweenOffices: 'Du kan velge ett av de følgende kontorene.',
        officeInformation: 'Kontorinformasjon',
        closed: 'Stengt',
        openingHoursWithoutAppointment: 'Åpningstider når du ikke har avtale',
        appointmentOnly: 'Kun timeavtale',
        specialOpeningHours: 'Spesielle åpningstider',
        address: 'Adresse',
        youCanMakeAppointment:
            'Du kan avtale møte med veilederen din utenom disse åpningstidene.',
        location: 'Beliggenhet',
        postalAddress: 'Postadresse',
        orgNumber: 'Organisasjonsnummer',
        officeNumber: 'Kontornummer',
        phoneToNav: 'Telefonnummeret til NAV er',
        phoneInformation:
            'Åpent hverdager kl. 9–15. NAV Kontaktsenter kan hjelpe deg, eller sette deg i kontakt med NAV-kontoret ditt.',
        alternativeContacts: 'Andre kontaktopplysninger:',
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
        time: 'tid',
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
    productDetailTypes,
    payoutDates: {
        tableHeaderPrefix: 'Utbetalingsdatoer i',
        tableHeaderPrefixNoYear: 'Utbetalingsdatoer',
    },
    greetings: {
        hi: 'Hei!',
    },
};

export type Translations = DeepPartial<typeof translationsBundleNb>;
