import { Translations } from './default';
import { MenuListItemKey } from '../types/menu-list-items';
import { Taxonomy } from 'types/taxonomies';
import { Area } from 'types/areas';

const productTaxonomies: { [key in Taxonomy]: string } = {
    [Taxonomy.ALL]: 'All',
    [Taxonomy.ASSISTIVE_TOOLS]: 'Assistive tools',
    [Taxonomy.BENEFITS]: 'Benefits',
    [Taxonomy.FOLLOWUP]: 'Follow-up',
    [Taxonomy.FOR_EMPLOYERS]: 'For employers',
    [Taxonomy.FOR_EVENT_ORGANIZERS]: 'For schemes organizers',
    [Taxonomy.FOR_HEALTH_SERVICE]: 'For physicians and other therapists',
    [Taxonomy.FOR_MUNICIPALITY]: 'For the municipality',
    [Taxonomy.FOR_PROVIDERS]: 'For providers',
    [Taxonomy.MEASURES]: 'Measures',
    [Taxonomy.RIGHTS]: 'Counselling',
};

const areas: { [key in Area]: string } = {
    [Area.ALL]: 'All',
    [Area.ACCESSIBILITY]: 'Aid and accessibility',
    [Area.FAMILY]: 'Family and children',
    [Area.HEALTH]: 'Health',
    [Area.MUNICIPALITY]: 'For government',
    [Area.OTHER]: 'Other',
    [Area.PENSION]: 'Pension',
    [Area.SELF_EMPLOYED]: 'For the self-employed',
    [Area.SOCIAL_COUNSELLING]: 'Financial social advice and guidance',
    [Area.WORK]: 'Work',
};

export const translationsBundleEn: Translations = {
    areaPage: {
        chooseArea: 'Choose an area',
    },
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
        day: 'day',
        date: 'date',
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
    },
    products: {
        person: 'For individuals',
        employer: 'For employers',
        provider: 'For providers',
    },
    situations: {
        person: 'You may have right to this',
        employer: 'For employers',
        provider: 'For providers',
    },
    guides: {
        person: 'How to',
        employer: 'For employers',
        provider: 'For providers',
    },
    productTaxonomies,
    areas,
    header: {
        copyLink: 'Copy link',
        copiedLinkConfirmed: 'Link successfully copied',
    },
    overview: {
        noProducts: 'No hits',
        ariaExplanation: 'Filter list by area',
        ariaItemExplanation: 'Show area',
        chooseArea: 'Choose area',
        chooseType: 'Choose type',
        search: 'Search',
        loading: 'Loading content...',
    },
    pagination: {
        goTo: 'Go to',
        ariaExplanation: 'Navigate the content by pagination',
    },
    contactPoint: {
        chat: {
            title: 'Chat with Frida',
            ingress:
                'You will first be met by chatbot Frida who will answer you. You can also ask Frida to talk to a counsellor (weekdays 09:00–15:00).',
        },
        legacyChat: {
            title: 'You can chat with us',
            ingress:
                'You will first meet chatbot Frida. You can ask Frida to chat with a counsellor (weekdays 09:00–15:00)',
        },
        write: {
            title: 'Write to us',
            ingress:
                'Send messages or new information regarding your case. You may also ask questions should you have any. <br/> <br/> Response time is a few business days. If you need answers faster, please see our chat service.',
        },
        navoffice: {
            title: 'Find your local NAV office',
            ingress: 'Search for a NAV office using postal code or city.',
        },
        aidcentral: {
            title: 'Find your Assistive Technology Center',
            ingress:
                'Find contact information and information on pickup and delivery at your nearest Assistive Technology Center.',
        },
        call: {
            title: 'Call us at +47 55 55 33 33',
            ingress:
                'Opening hours: weekdays 09:00–15:00. If the opening hours are changed, you will be notified by voice message.',
        },
        shared: {
            generalOpeningHours: 'General opening hours',
            openingHours: 'Opening hours',
            specialHours: 'Other opening hours',
            closed: 'Closed',
            openNow: 'Open',
            opensAt: 'Opens {$1} at {$2}',
            closedNow: 'Closed now',
            seeMoreOptions: 'See more phone numbers and calling options',
            todaysPhoneOpeningHours: 'Phone hours today',
            callUsAt: 'Call us at',
            businessDays: 'business days',
        },
    },
    versionHistory: {
        label: 'Version history',
        title: 'Historic versions',
        loading: 'Loading historic version...',
    },
    pageWarnings: {
        draftWarning: 'Draft - this page is still in progress',
        failoverWarning:
            'We are currently having technical issues on nav.no. You may experience slow response times or missing content. Try reloading the page.',
    },
    caseTimeUnit: {
        single: {
            days: 'day',
            weeks: 'week',
            months: 'month',
        },
        multi: {
            days: 'days',
            weeks: 'weeks',
            months: 'months',
        },
    },
    payoutDates: {
        tableHeaderPrefix: 'Payment dates in',
        tableHeaderPrefixNoYear: 'Payment dates',
    },
    greetings: {
        hi: 'Hi!',
    },
};
