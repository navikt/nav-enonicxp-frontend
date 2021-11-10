import { Translations } from './default';
import { MenuListItemKey } from '../types/menu-list-items';
import { Taxonomy } from 'types/taxonomies';

const productTaxonomies: { [key in Taxonomy]: string } = {
    [Taxonomy.BENEFITS]: 'Benefits',
    [Taxonomy.RIGHTS]: 'Counselling',
    [Taxonomy.FOLLOWUP]: 'Follow-up',
};

export const bundle: Translations = {
    stringParts: {
        conjunction: 'and',
    },
    dates: {
        published: 'Published',
        lastChanged: 'Updated',
    },
    calculator: {
        calculate: 'Calculate',
        error: 'Sorry, an error has occurred in the calculator with the following error message:',
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
        contents: 'Contents',
    },
    mainPanels: { label: 'Main panels' },
    publishingCalendar: {
        publishdate: 'Publiseringsdato',
        event: 'Kalenderhendelse',
    },
    notifications: {
        label: 'Urgent notifications',
    },
    dateTime: {
        weekDayNames: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ],
        relatives: {
            today: 'today',
            tomorrow: 'i morgen',
        },
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
    situations: {
        youMayHaveRightTo: 'You may rights to this',
        employerNeedToKnow: 'As an employer, you need to know this',
    },
    productTaxonomies,
    header: {
        copyLink: 'Copy link',
        copiedLink: 'Link successfully copied',
    },
    contactPoint: {
        chat: {
            title: 'Chat with Frida',
            ingress:
                'You will meet a chatbot at first, but you can be directed to a counsellor (veileder) without logging in (weekdays 09.00–15.00).',
        },
        write: {
            title: 'Write to us',
            ingress:
                'Need to send us updated information about your case? "Write to us" is a secure alternative to e-mail.',
        },
        call: {
            title: 'Call us at',
            ingress:
                'Opening hours: weekdays 09:00–15:00. If the opening hours are changed, you will be notified by voice message.',
        },
        shared: {
            generalOpeningHours: 'General opening hours',
            openingHours: 'Opening hours',
            specialHours: 'Other opening hours',
            closed: 'Closed',
            openNow: 'Open now',
            opensAt: 'Opens {$1} at {$2}',
            closedNow: 'Closed now',
            closingInAbout: 'Closing in about {$1} minutter',
            closingNow: 'Closing now',
        },
    },
    versionHistory: {
        label: 'Version history',
        title: 'Historic versions',
        loading: 'Loading historic version...',
    },
};
