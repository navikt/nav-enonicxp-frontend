import { DeepPartial } from '../types/util-types';
import { MenuListItemKey } from '../types/menu-list-items';
import { Taxonomy } from 'types/taxonomies';
import { Area } from 'types/areas';

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

const productTaxonomies: { [key in Taxonomy]: string } = {
    [Taxonomy.ALL]: 'Alle',
    [Taxonomy.ASSISTIVE_TOOLS]: 'Hjelpemiddel',
    [Taxonomy.BENEFITS]: 'Pengestønad',
    [Taxonomy.FOLLOWUP]: 'Oppfylging',
    [Taxonomy.FOR_EMPLOYERS]: 'For arbeidsgjevarar',
    [Taxonomy.FOR_EVENT_ORGANIZERS]: 'For tiltaksarrangørar',
    [Taxonomy.FOR_HEALTH_SERVICE]: 'For leger og andre behandlarar',
    [Taxonomy.FOR_MUNICIPALITY]: 'For kommunen',
    [Taxonomy.FOR_PROVIDERS]: 'For samhandlarar',
    [Taxonomy.MEASURES]: 'Tiltak',
    [Taxonomy.RIGHTS]: 'Rettleiing',
};

const areas: { [key in Area]: string } = {
    [Area.ALL]: 'Alle',
    [Area.ACCESSIBILITY]: 'Hjelpemiddel og tilrettelegging',
    [Area.FAMILY]: 'Familie og barn',
    [Area.HEALTH]: 'Helse og sjukdom',
    [Area.MUNICIPALITY]: 'For kommunen',
    [Area.OTHER]: 'Anna',
    [Area.PENSION]: 'Pensjon',
    [Area.SELF_EMPLOYED]: 'For sjølvstendig næringsdrivande',
    [Area.SOCIAL_COUNSELLING]: 'Økonomisk sosialhjelp, råd og rettleiing',
    [Area.WORK]: 'Arbeid',
};

export const translationsBundleNn = {
    areaPage: {
        chooseArea: 'Velg eit område',
    },
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
    mainArticle: {
        facts: 'Fakta',
        lastChanged: 'Sist endra',
        linkedListDescription: 'Kapittel',
        published: 'Publisert',
        tableOfContents: 'Innhaldsoversikt',
        contents: 'Innhald',
    },
    mainPanels: {
        label: 'Hovudval',
    },
    officeInformation: {
        closed: 'Stengt',
    },
    relatedContent: relatedContent,
    productTaxonomies,
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
    publishingCalendar: {
        event: 'Kalenderhending',
        publishdate: 'Publiseringsdato',
    },
    header: {
        copyLink: 'Kopier lenke',
        copiedLinkConfirmed: 'Lenka er kopiert',
    },
    overview: {
        noProducts: 'Ingen treff',
        ariaExplanation: 'Filtrer lista etter område',
        ariaItemExplanation: 'Vis område',
        chooseArea: 'Vel område',
        chooseType: 'Vel type',
        search: 'Søk',
        loading: 'Laster innhald...',
    },
    pagination: {
        goTo: 'Gå til',
        ariaExplanation: 'Navigering av innhaldet med paginering',
    },
    contactPoint: {
        chat: {
            title: 'Chat med oss',
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
                'Kvardagar 09:00-15:00. Vi kan ringe deg tilbake viss ventetida er over 5 minutt. Opningstider: kvardagar 09:00–15:00. Dersom opningstidene er mellombels endra, får du beskjed via automatisk svarar.',
        },
        shared: {
            generalOpeningHours: 'Ordinære opningstider',
            openingHours: 'Opningstider',
            specialHours: 'Særskilde opningstider',
            closed: 'Stengt',
            openNow: 'Ope no',
            opensAt: 'Opnar {$1} kl {$2}',
            closedNow: 'Stengt no',
            seeMoreOptions: 'Sjå fleire telefonnummer og tasteval.',
            todaysPhoneOpeningHours: 'Opningstider på telefon i dag',
            callUsAt: 'Ring oss på',
            businessDays: 'kvardagar',
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
