import { Translations } from './default';
import { MenuListItemKey } from '../types/menu-list-items';
import { Taxonomies } from 'types/taxonomies';

const taxonomies: { [key in Taxonomies]: string } = {
    [Taxonomies.BENEFITS]: 'Pengestøtte fra NAV',
    [Taxonomies.RIGHTS]: 'Rettigheter',
};

export const bundle: Translations = {
    dates: {
        published: 'Published',
        lastChanged: 'Updated',
    },
    linkLists: {
        label: 'Links',
        moreNews: 'More news',
        news: 'News',
        niceToKnow: 'Nice to know',
        shortcuts: 'Shortcuts',
    },
    linkPanels: { label: 'Link panels' },
    filteredContent: {
        noFiltersSelected: 'No filters are selected. Showing all content.',
        filtersSelected:
            'We have hidden content not relevant for your situation.',
        customizeContent: 'Customize content',
        showingInformationFor: 'Showing information for:',
    },
    mainArticle: {
        facts: 'Facts',
        lastChanged: 'Updated',
        linkedListDescription: 'Chapters',
        published: 'Published',
        tableOfContents: 'Table of contents',
    },
    mainPanels: { label: 'Main panels' },
    publishingCalendar: {
        publishdate: 'Publiseringsdato',
        event: 'Kalenderhendelse',
    },
    notifications: {
        label: 'Urgent notifications',
    },
    relatedContent: {
        [MenuListItemKey.AppealRights]: 'Appeal rights',
        [MenuListItemKey.FormAndApplication]: 'Form and application',
        [MenuListItemKey.International]: 'International',
        [MenuListItemKey.Membership]: 'Membership',
        [MenuListItemKey.ProcessTimes]: 'Processing times',
        [MenuListItemKey.Rates]: 'Rates',
        [MenuListItemKey.RelatedInformation]: 'Related information',
        [MenuListItemKey.ReportChanges]: 'Report changes',
        [MenuListItemKey.RulesAndRegulations]: 'Laws and regulations',
        [MenuListItemKey.Saksbehandling]: 'Procedural',
        [MenuListItemKey.Selfservice]: 'Selfservice',
        [MenuListItemKey.Shortcuts]: 'Shortcuts',
        [MenuListItemKey.AppealRightsLegacy]: 'Appeal rights',
        [MenuListItemKey.FormAndApplicationLegacy]: 'Form and application',
        [MenuListItemKey.ProcessTimesLegacy]: 'Processing times',
        [MenuListItemKey.RelatedInformationLegacy]: 'Related information',
        [MenuListItemKey.ReportChangesLegacy]: 'Report changes',
        [MenuListItemKey.RulesAndRegulationsLegacy]: 'Laws and regulations',
    },
    taxonomies,
    header: {
        copyLink: 'Copy link',
        copiedLink: 'The link was copied',
    },
};
