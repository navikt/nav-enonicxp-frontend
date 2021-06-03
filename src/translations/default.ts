import { DeepPartial } from '../types/util-types';
import { MenuListItemKey } from '../types/menu-list-items';
import { Taxonomies } from 'types/taxonomies';

const relatedContent: { [key in MenuListItemKey]: string } = {
    [MenuListItemKey.AppealRights]: 'Klagerettigheter',
    [MenuListItemKey.FormAndApplication]: 'Skjema og søknad',
    [MenuListItemKey.International]: 'Internasjonalt',
    [MenuListItemKey.Membership]: 'Medlemsskap i folketrygden',
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

const taxonomies: { [key in Taxonomies]: string } = {
    [Taxonomies.BENEFITS]: 'Pengestøtte fra NAV',
    [Taxonomies.RIGHTS]: 'Rettigheter',
};

export const bundle = {
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
    taxonomies,
    publishingCalendar: {
        event: 'Kalenderhendelse',
        publishdate: 'Publiseringsdato',
    },
    header: {
        copyLink: 'Kopier lenke',
        copiedLink: 'Lenken er kopiert',
    },
};

export type Translations = DeepPartial<typeof bundle>;
