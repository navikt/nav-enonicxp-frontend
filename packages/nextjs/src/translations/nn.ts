import { MenuListItemKey } from 'types/menu-list-items';
import {
    ProductTaxonomy,
    Taxonomy,
    ThemedArticlePageTaxonomy,
    ToolsPageTaxonomy,
} from 'types/taxonomies';
import { Area } from 'types/areas';
import { PartialTranslations } from 'translations/default';

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
    [key in Taxonomy]?: string;
} = {
    [ProductTaxonomy.ALL]: 'Alle',
    [ProductTaxonomy.BENEFITS]: 'Pengestøtte',
    [ProductTaxonomy.INSURANCE]: 'Forsikring',
    [ProductTaxonomy.MEASURES]: 'Tiltak',
    [ProductTaxonomy.SERVICE]: 'Teneste',
    [ProductTaxonomy.COUNSELLING]: 'Rettleiing',
    [ProductTaxonomy.ASSISTIVE_TOOLS]: 'Hjelpemiddel',
    [ProductTaxonomy.EMPLOYEE_BENEFITS]: 'Pengestøtte til ansatt',
    [ProductTaxonomy.REFUND]: 'Refusjon',
    [ProductTaxonomy.OTHER]: 'Anna',
    [ThemedArticlePageTaxonomy.TIPS_JOB]: 'Jobbsøkartips',
    [ThemedArticlePageTaxonomy.HELP_WORK]: 'Hjelp til å kome i jobb',
    [ThemedArticlePageTaxonomy.WHEN_SICK]: 'Når du er sjuk',
    [ThemedArticlePageTaxonomy.PAYMENT]: 'Utbetaling',
    [ThemedArticlePageTaxonomy.COMPLAINT_RIGHTS]: 'Klagerettar',
    [ThemedArticlePageTaxonomy.USER_SUPPORT]: 'Brukarstøtte',
    [ThemedArticlePageTaxonomy.ABOUT_NAV]: 'Om Nav',
    [ThemedArticlePageTaxonomy.MEMBERSHIP_NATIONAL_INSURANCE]: 'Medlemskap i folketrygda',
    [ThemedArticlePageTaxonomy.RECRUITMENT]: 'Rekruttering',
    [ToolsPageTaxonomy.CALCULATOR]: 'Kalkulator',
    [ToolsPageTaxonomy.NAVIGATOR]: 'Vegvisar',
};

const areas: { [key in Area]?: string } = {
    [Area.ALL]: 'Alle',
    [Area.WORK]: 'Arbeid',
    [Area.HEALTH]: 'Helse og sjukdom',
    [Area.FAMILY]: 'Familie og barn',
    [Area.PENSION]: 'Pensjon',
    [Area.SOCIAL_COUNSELLING]: 'Sosiale tenester og rettleiing',
    [Area.ACCESSIBILITY]: 'Hjelpemiddel og tilrettelegging',
    [Area.RECRUITMENT]: 'Rekruttering',
    [Area.INCLUSION]: 'Inkludering og tilrettelegging',
    [Area.DOWNSIZING]: 'Permittering og nedbemanning',
    [Area.OTHER]: 'På tvers',
};

export const translationsBundleNn: PartialTranslations = {
    relatedContent,
    taxonomies,
    areas,
    stringParts: {
        conjunction: 'og',
        for: 'for',
        this: 'dette',
    },
    calculator: {
        calculate: 'Rekn ut',
        error: 'Orsak, det har skjedd ein feil i kalkulatoren med følgande feilmelding:',
    },
    dates: {
        lastChanged: 'Oppdatert',
        published: 'Publisert',
    },
    linkList: {
        label: 'Liste av lenker',
    },
    filteredContent: {
        noFiltersSelected: 'Ingen filter er valde, så vi viser alt innhald.',
        filtersSelected: 'Vi har fjerna innhald som ikkje er relevant i situasjonen din.',
        customizeContent: 'Tilpass innhald',
        showingInformationFor: 'Viser informasjon for:',
    },
    pressLanding: {
        latestPressNews: 'Siste pressemeldingar og nyheiter',
        morePressNews: 'Fleire pressemeldingar og nyheiter',
        pressShortcuts: 'Snarvegar',
        news: 'Nyheit',
        press: 'Pressemelding',
        published: 'Publisert',
    },
    linkLists: {
        moreNews: 'Fleire nyheiter',
    },
    currentTopic: {
        tag: 'Aktuelt',
    },
    mainArticle: {
        facts: 'Fakta',
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
        HJELP_KOMME_I_JOBB: 'Hjelp til å kome i jobb',
        NODSITUASJON:
            'Hjelp i nødssituasjonar, til dømes mellombels butilbod eller økonomisk sosialhjelp',
        OKONOMI_GJELD: 'Økonomi- og gjeldsrådgiving',
        TILGANGPC: 'Tilgang til PC',
        HJELPDIGITALETJENESTER: 'Hjelp til å bruke digitale tenester dersom du treng det',
        BARNEVERNTJENESTE: 'Barnevernteneste',
        FLYKTNINGTJENESTE: 'Flyktningtenesta',
        FENGSEL_OPPFOLGING: 'Oppfølging av personar i fengsel',
        RUS_OPPFOLGING: 'Oppfølging av personar med rusproblem',
        PSYKISK_HELSE_OPPFOLGING: 'Oppfølging av personar med psykiske helseproblem',
        STARTLAN: 'Startlån og tilskot frå kommunen',
        SJOFARTSOPPGAVER: 'Utskriving av sjøfartsbok og formidling av sjøfolk',
        AKTIVITETSKORTET: 'Aktivitetskortet for barn og unge',
        BOSTOTTE_HUSBANKEN: 'Bustøtte frå Husbanken',
        BOSTOTTE_KOMMUNEN: 'Bustøtte frå kommunen',
        PRIVATOKONOMI_FORVALTNING: 'Frivillig og tvungen forvaltning av privatøkonomi',
        INTROPROGRAMMET: 'Introduksjonsprogrammet',
        KOMMUNAL_BOLIG: 'Kommunal bustad',
        KOMMUNAL_TILLEGGSPENSJON: 'Kommunal tilleggspensjon',
        KOMMUNALT_FRIKORT_HELSETJENESTER: 'Kommunalt frikort for helsetenester',
        LEDSAGERBEVIS: 'Følgjebevis',
        PARKERING_FORFLYTNINGSHEMMEDE: 'Parkeringsløyve for forflyttingshemma',
        REDUSERT_FORELDREBETALING: 'Redusert foreldrebetaling i barnehage eller SFO',
        SKJENKEBEVILLING: 'Skjenkeløyve',
        STOTTEKONTAKT: 'Støttekontakt',
        TILRETTELAGT_TRANSPORT: 'Tilrettelagt transport (TT-kort)',
    },
    products: {
        person: 'For privatpersonar',
        employer: 'For arbeidsgjevarar',
        provider: 'For samarbeidspartnarar',
    },
    situations: {
        person: 'Dette kan du ha rett til',
        employer: 'Kva arbeidsgjevarar må vita',
        provider: 'For samarbeidspartnarar',
    },
    guides: {
        person: 'Slik gjer du det',
        employer: 'Slik gjer du det',
        provider: 'Slik gjer du det',
    },
    publishingCalendar: {
        event: 'Hending',
        publishdate: 'Dato',
    },
    header: {
        copyLink: 'Kopier lenke',
        copyLinkTo: 'Kopier lenke til',
        copiedLinkConfirmed: 'Lenka er kopiert',
    },
    overview: {
        noHits: 'Ingen treff med dei valde filtera.',
        numHits: 'Viser $1 av $2',
        search: 'Søk',
        filterOrSearch: 'Bruk filter eller søk',
        loading: 'Laster innhald...',
        resetFilters: 'Nullstill filter',
        any: 'Frå A til Å',
        more: 'Meir om',
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
    oversikt: {
        noHits: 'Ingen treff med dei valde filtera.',
        numHits: 'Viser $1 av $2',
        sok: 'Søk',
        omradeEllerSok: 'Vel område eller søk',
        omrade: 'Vel område',
        loading: 'Laster innhald...',
        resetFilters: 'Nullstill filter',
        any: 'Frå A til Å',
        more: 'Meir om',
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
    form: {
        back: 'Vel ein annan måte å sende inn på',
    },
    contactPoint: {
        chat: {
            title: 'Du kan chatte med oss',
            ingress:
                'Du møter først chatbot Frida som svarar deg. Du kan òg be om å få snakke med ein rettleiar (kvardagar 9-15).',
            chatWithCounsellor: 'Chat med rettleiar',
            alwaysOpen: 'Alltid ope',
        },
        legacyChat: {
            title: 'Du kan chatte med oss',
            ingress:
                'Du møter først chatbot Frida som svarar deg. Du kan òg be om å få snakke med ein rettleiar.',
        },
        write: {
            title: 'Skriv til oss',
            ingress:
                'Send beskjed eller nye opplysningar i saka di. Du kan òg sende spørsmål. <br/><br/> Svartida er nokre arbeidsdagar. Vil du ha raskare svar, kan du bruke chat.',
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
            ingress: 'Kvardagar 9-15. Vi kan ringe deg tilbake viss ventetida er over 5 minutt.',
        },
        shared: {
            closed: 'Stengt',
            openNow: 'Ope no',
            opensAt: 'Opnar {$date} kl {$time}',
            closedNow: 'Stengt no',
            seeMoreOptions: 'Sjå fleire telefonnummer og tasteval.',
        },
    },
    office: {
        youFindUsHere: 'Du finn oss her',
        officeInformation: 'Kontorinformasjon',
        location: 'Plassering',
        postalAddress: 'Postadresse',
        orgNumber: 'Organisasjonsnummer',
        officeNumber: 'Kontornummer',
        phoneToNav: 'Telefonnummeret til Nav er',
        phoneToHMS: 'Telefonnummeret til hjelpemiddelsentralen er',
        phoneInformation:
            'Telefontid kvardagar kl 9–15. Nav kontaktsenter kan hjelpe deg, eller sette deg i kontakt med Nav-kontoret ditt.',
        alternativeContacts: 'Andre kontaktopplysningar:',
        taglineOffice: 'Nav-kontor',
        taglineHMS: 'Hjelpemiddelsentral',
    },
    dateTime: {
        weekDayNames: {
            mon: 'Måndag',
            tue: 'Tysdag',
            wed: 'Onsdag',
            thu: 'Torsdag',
            fri: 'Fredag',
            sat: 'Laurdag',
            sun: 'Søndag',
        },
        relatives: {
            today: 'i dag',
            tomorrow: 'i morgon',
        },
        time: 'tid',
        day: 'dag',
        date: 'dato',
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
    yourServicesText: {
        yourServices: 'Dine tjenester',
    },
    macroVideo: {
        playMovie: 'Sjå video:',
        duration: 'Varighet er',
        minutes: 'min',
        error: 'Det oppsto en feil under lasting av video',
    },
    audience: {
        person: 'privatpersonar',
        employer: 'arbeidsgjevarar',
        provider: 'samarbeidspartnarar',
    },
    providerAudience: {
        administrator: 'bostyrerar',
        doctor: 'legar, tannlegar eller andre behandlarar',
        municipality_employed: 'ansatte i kommunen eller fylkeskommunen',
        optician: 'optikarar eller øyelegar',
        measures_organizer: 'tiltaksarrangørar',
        aid_supplier: 'hjelpemiddelformidlarar',
        other: 'andre samarbeidspartnarar',
    },
    related: {
        relatedAudience: 'Det finst også informasjon om {name} til',
        otherOffers: 'Andre tilbod',
        moreInformation: 'Meir informasjon til deg som',
    },
    internalNavigation: {
        pageNavigationMenu: 'Innhald på sida',
        sectionNavigation: 'I dette kapittelet',
    },
};
