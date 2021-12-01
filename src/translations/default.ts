import { DeepPartial } from '../types/util-types';
import { MenuListItemKey } from '../types/menu-list-items';
import { Taxonomy } from 'types/taxonomies';

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
    [MenuListItemKey.AppealRightsLegacy]: 'Klagerettigheter',
    [MenuListItemKey.FormAndApplicationLegacy]: 'Skjema og søknad',
    [MenuListItemKey.ProcessTimesLegacy]: 'Saksbehandlingstider',
    [MenuListItemKey.RelatedInformationLegacy]: 'Relatert innhold',
    [MenuListItemKey.ReportChangesLegacy]: 'Meld fra om endringer',
    [MenuListItemKey.RulesAndRegulationsLegacy]: 'Regelverk',
};

const productTaxonomies: { [key in Taxonomy]: string } = {
    [Taxonomy.BENEFITS]: 'Pengestøtte',
    [Taxonomy.RIGHTS]: 'Veiledning',
    [Taxonomy.FOLLOWUP]: 'Oppfølging',
};

export const bundle = {
    stringParts: {
        conjunction: 'og',
    },
    calculator: {
        calculate: 'Beregn',
        error: 'Beklager, det har oppstått en feil i kalkulatoren med følgende feilmelding:',
    },
    dates: {
        lastChanged: 'Sist endret',
        published: 'Publisert',
    },
    linkPanels: {
        label: 'Valgpaneler',
    },
    filteredContent: {
        noFiltersSelected: 'Ingen filtere er valgt, så alt innhold vises.',
        filtersSelected:
            'Vi har fjernet innhold som ikke er relevant i din situasjon.',
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
        contents: 'Innhold',
    },
    mainPanels: {
        label: 'Hovedvalg',
    },
    notifications: {
        label: 'Viktige varsler',
    },
    officeInformation: {
        closed: 'Stengt',
    },
    relatedContent: relatedContent,
    productTaxonomies,
    situations: {
        youMayHaveRightTo: 'Dette kan du ha rett til',
        employerNeedToKnow: 'Som arbeidsgiver må du vite dette',
    },
    publishingCalendar: {
        event: 'Kalenderhendelse',
        publishdate: 'Publiseringsdato',
    },
    header: {
        copyLink: 'Kopier lenke',
        copiedLink: 'Lenken er kopiert',
    },
    contactPoint: {
        chat: {
            title: 'Chat med Frida',
            ingress:
                'Du møter først en chatbot, men kan gå videre og chatte med en veileder uten å logge inn (hverdager 09.00–15.00).',
        },
        write: {
            title: 'Skriv til oss',
            ingress:
                'Skal du sende oss nye opplysninger i saken din? "Skriv til oss" er et sikkert alternativ til e-post.',
        },
        call: {
            title: 'Ring oss på',
            ingress:
                'Åpningstider: hverdager 09:00–15:00. Dersom åpningstidene er midlertidig endret, får du beskjed via automatisk svarer.',
        },
        shared: {
            generalOpeningHours: 'Ordinære åpningstider',
            openingHours: 'Åpningstider',
            specialHours: 'Spesielle åpningstider',
            closed: 'Stengt',
            openNow: 'Åpent',
            opensAt: 'Åpner {$1} kl {$2}',
            closedNow: 'Stengt nå',
            closingInAbout: 'Stenger om ca {$1} minutter',
            closingNow: 'Stenger straks',
            seeAllOpeningHours: 'Se alle åpningstider',
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
    },
    versionHistory: {
        label: 'Versjonshistorikk',
        title: 'Vis historisk innhold',
        loading: 'Laster historisk innhold...',
    },
};

export type Translations = DeepPartial<typeof bundle>;
