import { DeepPartial } from 'types/util-types';
import { MenuListItemKey } from 'types/menu-list-items';
import {
    ProductTaxonomy,
    Taxonomy,
    ThemedArticlePageTaxonomy,
    ToolsPageTaxonomy,
} from 'types/taxonomies';
import { Area } from 'types/areas';
import {
    ProcessingTimesVisibilityType,
    ProductDetailType,
} from 'types/content-props/product-details';

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
    [ProductTaxonomy.BENEFITS]: 'Pengestøtte',
    [ProductTaxonomy.INSURANCE]: 'Forsikring',
    [ProductTaxonomy.MEASURES]: 'Tiltak',
    [ProductTaxonomy.SERVICE]: 'Tjeneste',
    [ProductTaxonomy.COUNSELLING]: 'Veiledning',
    [ProductTaxonomy.ASSISTIVE_TOOLS]: 'Hjelpemiddel',
    [ProductTaxonomy.EMPLOYEE_BENEFITS]: 'Pengestøtte til ansatt',
    [ProductTaxonomy.REFUND]: 'Refusjon',
    [ProductTaxonomy.OTHER]: 'Annet',
    [ThemedArticlePageTaxonomy.TIPS_JOB]: 'Jobbsøkertips',
    [ThemedArticlePageTaxonomy.HELP_WORK]: 'Hjelp til å komme i jobb',
    [ThemedArticlePageTaxonomy.WHEN_SICK]: 'Når du er syk',
    [ThemedArticlePageTaxonomy.PAYMENT]: 'Utbetaling',
    [ThemedArticlePageTaxonomy.COMPLAINT_RIGHTS]: 'Klagerettigheter',
    [ThemedArticlePageTaxonomy.USER_SUPPORT]: 'Brukerstøtte',
    [ThemedArticlePageTaxonomy.ABOUT_NAV]: 'Om Nav',
    [ThemedArticlePageTaxonomy.MEMBERSHIP_NATIONAL_INSURANCE]: 'Medlemskap i folketrygden',
    [ThemedArticlePageTaxonomy.RECRUITMENT]: 'Rekruttering',
    [ToolsPageTaxonomy.CALCULATOR]: 'Kalkulator',
    [ToolsPageTaxonomy.NAVIGATOR]: 'Veiviser',
};

const areas: { [key in Area]: string } = {
    [Area.ALL]: 'Alle',
    [Area.WORK]: 'Arbeid',
    [Area.HEALTH]: 'Helse og sykdom',
    [Area.FAMILY]: 'Familie og barn',
    [Area.PENSION]: 'Pensjon',
    [Area.SOCIAL_COUNSELLING]: 'Sosiale tjenester og veiledning',
    [Area.ACCESSIBILITY]: 'Hjelpemidler og tilrettelegging',
    [Area.RECRUITMENT]: 'Rekruttering',
    [Area.INCLUSION]: 'Inkludering og tilrettelegging',
    [Area.DOWNSIZING]: 'Permittering og nedbemanning',
    [Area.OTHER]: 'På tvers',
};

const productDetailTypes: { [key in ProductDetailType]: string } = {
    [ProductDetailType.PAYOUT_DATES]: 'utbetalingsdatoer',
    [ProductDetailType.PROCESSING_TIMES]: 'saksbehandlingstider',
    [ProductDetailType.RATES]: 'satser',
    [ProductDetailType.ALL_PRODUCTS]: 'alle',
};

const processingTimesVisibilityTypes: { [key in ProcessingTimesVisibilityType]: string } = {
    [ProcessingTimesVisibilityType.ALL]: '',
    [ProcessingTimesVisibilityType.APPLICATION]: 'søknad',
    [ProcessingTimesVisibilityType.COMPLAINT]: 'klage',
};

export const translationsBundleNb = {
    relatedContent,
    taxonomies,
    areas,
    productDetailTypes,
    processingTimesVisibilityTypes,
    localeNames: {
        no: 'norsk (bokmål)',
        nn: 'nynorsk',
        en: 'engelsk',
        se: 'samisk',
    },
    stringParts: {
        conjunction: 'og',
        for: 'for',
        this: 'dette',
    },
    calculator: {
        calculate: 'Beregn',
        error: 'Beklager, det har oppstått en feil i kalkulatoren med følgende feilmelding:',
    },
    dates: {
        lastChanged: 'Oppdatert',
        published: 'Publisert',
    },
    linkList: {
        label: 'Liste av lenker',
    },
    filteredContent: {
        noFiltersSelected: 'Ingen filtre er valgt, så alt innhold vises.',
        filtersSelected: 'Vi har fjernet innhold som ikke er relevant i situasjonen din.',
        customizeContent: 'Tilpass innhold',
        showingInformationFor: 'Viser informasjon for:',
    },
    frontPage: {
        shortcuts: 'Snarveier',
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
        moreNews: 'Flere nyheter',
    },
    currentTopic: {
        tag: 'Aktuelt',
    },
    mainArticle: {
        facts: 'Fakta',
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
        HJELPDIGITALETJENESTER: 'Hjelp til å bruke digitale tjenester hvis du trenger det',
        BARNEVERNTJENESTE: 'Barneverntjeneste',
        FLYKTNINGTJENESTE: 'Flyktningtjeneste',
        FENGSEL_OPPFOLGING: 'Oppfølging av personer i fengsel',
        RUS_OPPFOLGING: 'Oppfølging av personer med rusproblemer',
        PSYKISK_HELSE_OPPFOLGING: 'Oppfølging av personer med psykiske helseproblemer',
        STARTLAN: 'Startlån og tilskudd fra kommunen',
        SJOFARTSOPPGAVER: 'Utstedelse av sjøfartsbok og formidling av sjøfolk',
        AKTIVITETSKORTET: 'Aktivitetskortet for barn og unge',
        BOSTOTTE_HUSBANKEN: 'Bostøtte fra Husbanken',
        BOSTOTTE_KOMMUNEN: 'Bostøtte fra kommunen',
        PRIVATOKONOMI_FORVALTNING: 'Frivillig og tvungen forvaltning av privatøkonomi',
        INTROPROGRAMMET: 'Introduksjonsprogrammet',
        KOMMUNAL_BOLIG: 'Kommunal bolig',
        KOMMUNAL_TILLEGGSPENSJON: 'Kommunal tilleggspensjon',
        KOMMUNALT_FRIKORT_HELSETJENESTER: 'Kommunalt frikort for helsetjenester',
        LEDSAGERBEVIS: 'Ledsagerbevis',
        PARKERING_FORFLYTNINGSHEMMEDE: 'Parkeringstillatelse for forflytningshemmede',
        REDUSERT_FORELDREBETALING: 'Redusert foreldrebetaling i barnehage eller SFO',
        SKJENKEBEVILLING: 'Skjenkebevilling',
        STOTTEKONTAKT: 'Støttekontakt',
        TILRETTELAGT_TRANSPORT: 'Tilrettelagt transport (TT-kort)',
    },
    products: {
        person: 'For privatpersoner',
        employer: 'For arbeidsgivere',
        provider: 'For samarbeidspartnere',
    },
    situations: {
        person: 'Dette kan du ha rett til',
        employer: 'Hva arbeidsgivere må vite',
        provider: 'For samarbeidspartnere',
    },
    guides: {
        person: 'Slik gjør du det',
        employer: 'Slik gjør du det',
        provider: 'Slik gjør du det',
    },
    publishingCalendar: {
        event: 'Hendelse',
        publishdate: 'Dato',
    },
    header: {
        copyLink: 'Kopier lenke',
        copyLinkTo: 'Kopier lenke til',
        copiedLinkConfirmed: 'Lenken er kopiert',
    },
    overview: {
        noHits: 'Ingen treff med de valgte filtrene.',
        numHits: 'Viser $1 av $2',
        search: 'Søk',
        filterOrSearch: 'Bruk filter eller søk',
        loading: 'Laster innhold...',
        resetFilters: 'Nullstill filter',
        any: 'Fra A til Å',
        more: 'Mer om',
        areas: {
            select: 'Velg område',
            ariaExplanation: 'Filtrer listen etter område',
            ariaItemExplanation: 'Vis område',
        },
        taxonomies: {
            select: 'Velg type',
            ariaExplanation: 'Filtrer listen etter type',
            ariaItemExplanation: 'Vis type',
        },
    },
    oversikt: {
        noHits: 'Ingen treff med de valgte filtrene.',
        numHits: 'Viser $1 av $2',
        sok: 'Søk',
        omradeEllerSok: 'Velg område eller søk',
        omrade: 'Velg område',
        loading: 'Laster innhold...',
        resetFilters: 'Nullstill filter',
        any: 'Fra A til Å',
        more: 'Mer om',
        areas: {
            select: 'Velg område',
            ariaExplanation: 'Filtrer listen etter område',
            ariaItemExplanation: 'Vis område',
        },
        taxonomies: {
            select: 'Velg type',
            ariaExplanation: 'Filtrer listen etter type',
            ariaItemExplanation: 'Vis type',
        },
    },
    form: {
        back: 'Velg en annen måte å sende inn på',
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
                'Du møter først chatbot Frida som svarer deg. Du kan også be Frida om å få snakke med en veileder.',
        },
        write: {
            title: 'Skriv til oss',
            ingress:
                'Send beskjed eller nye opplysninger i saken din. Du kan også sende spørsmål. <br/><br/> Svartid er noen arbeidsdager. Vil du ha svar raskere, kan du bruke chat.',
        },
        navoffice: {
            title: 'Finn ditt Nav-kontor',
            ingress: 'Søk opp Nav-kontor med postnummer, sted eller by.',
        },
        aidcentral: {
            title: 'Finn din hjelpemiddelsentral',
            ingress: 'Finn kontaktinformasjon og les om inn- og utlevering av hjelpemidler.',
        },
        call: {
            title: 'Ring oss på 55 55 33 33',
            ingress: 'Hverdager 9-15. Vi kan ringe deg tilbake hvis ventetiden er over 5 minutter.',
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
        contactUs: 'Kontakt oss',
        officeInformation: 'Kontorinformasjon',
        location: 'Beliggenhet',
        postalAddress: 'Postadresse',
        orgNumber: 'Organisasjonsnummer',
        officeNumber: 'Kontornummer',
        phoneToNav: 'Telefonnummeret til Nav er',
        phoneToHMS: 'Telefonnummeret til hjelpemiddelsentralen er',
        phoneTime: 'Telefontid hverdager kl. 9–15.',
        phoneInformation:
            'Nav kontaktsenter kan hjelpe deg, eller sette deg i kontakt med Nav-kontoret ditt.',
        alternativeContacts: 'Andre kontaktopplysninger:',
        taglineOffice: 'Nav-kontor',
        taglineHMS: 'Hjelpemiddelsentral',
        taglineALS: 'Arbeidslivssenter',
        skriveTilOss: 'skrive til oss',
        kontaktskjemaALSTekst:
            'hvis du ønsker hjelp til å rekruttere eller inkludere arbeidstakere og forebygge sykefravær.',
    },
    dateTime: {
        weekDayNames: {
            mon: 'Mandag',
            tue: 'Tirsdag',
            wed: 'Onsdag',
            thu: 'Torsdag',
            fri: 'Fredag',
            sat: 'Lørdag',
            sun: 'Søndag',
        },
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
        contentTypeChangedWarning: (type: string) =>
            `Obs! Denne siden var opprinnelig en "${type}" og inneholder versjonshistorikk. Den skal derfor «ikke slettes». Hvis du ønsker å se tidligere versjoner av innholdet, kan du bruke funksjonen "Vis historisk innhold" nedenfor.`,
        layerRedirectWarning: (layer: string) =>
            `Obs! Denne siden er satt som redirect til språkversjonen for "${layer}". Husk å velge riktig språkversjon hvis du skal redigere.`,
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
    payoutDates: {
        tableHeaderPrefix: 'Utbetalingsdatoer i',
        tableHeaderPrefixNoYear: 'Utbetalingsdatoer',
    },
    greetings: {
        hi: 'Hei!',
    },
    yourServicesText: {
        yourServices: 'Dine tjenester',
    },
    macroVideo: {
        playMovie: 'Se video:',
        duration: 'Varighet er',
        minutes: 'min',
        error: 'Det oppsto en feil under lasting av video',
    },
    audience: {
        person: 'privatpersoner',
        employer: 'arbeidsgivere',
        provider: 'samarbeidspartnere',
    },
    providerAudience: {
        administrator: 'bostyrere',
        doctor: 'leger, tannleger eller andre behandlere',
        municipality_employed: 'ansatte i kommunen eller fylkeskommunen',
        optician: 'optikere eller øyeleger',
        measures_organizer: 'tiltaksarrangører',
        aid_supplier: 'hjelpemiddelformidlere',
        other: 'andre samarbeidspartnere',
    },
    related: {
        relatedAudience: 'Det finnes også informasjon om {name} til',
        otherOffers: 'Andre tilbud',
        moreInformation: 'Mer informasjon til deg som',
    },
    internalNavigation: {
        pageNavigationMenu: 'Innhold på denne siden',
        sectionNavigation: 'I kapittel',
    },
};

export type Translations = typeof translationsBundleNb;
export type PartialTranslations = DeepPartial<Translations>;
