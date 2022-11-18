import { Translations } from './default';
import { MenuListItemKey } from 'types/menu-list-items';
import {
    ProductTaxonomy,
    Taxonomy,
    ThemedArticlePageTaxonomy,
    ToolsPageTaxonomy,
} from 'types/taxonomies';
import { Area } from 'types/areas';

const taxonomies: {
    [key in Taxonomy]: string;
} = {
    [ProductTaxonomy.ALL]: 'Alle',
    [ProductTaxonomy.ASSISTIVE_TOOLS]: 'Assistive tools',
    [ProductTaxonomy.BENEFITS]: 'Benefits',
    [ProductTaxonomy.FOLLOWUP]: 'Follow-up',
    [ProductTaxonomy.SERVICE]: 'Service',
    [ProductTaxonomy.FOR_EMPLOYERS]: 'For employers',
    [ProductTaxonomy.FOR_EVENT_ORGANIZERS]: 'For schemes organizers',
    [ProductTaxonomy.FOR_HEALTH_SERVICE]: 'For physicians and other therapists',
    [ProductTaxonomy.FOR_MUNICIPALITY]: 'For the municipality',
    [ProductTaxonomy.FOR_PROVIDERS]: 'For providers',
    [ProductTaxonomy.MEASURES]: 'Measures',
    [ProductTaxonomy.RIGHTS]: 'Counselling',
    [ProductTaxonomy.FORMS]: 'Forms',
    [ThemedArticlePageTaxonomy.TIPS_JOB]: 'Advice for jobseekers',
    [ThemedArticlePageTaxonomy.HELP_WORK]: 'Help to get employed',
    [ThemedArticlePageTaxonomy.WHEN_SICK]: 'When you are ill',
    [ThemedArticlePageTaxonomy.PAYMENT]: 'Payment',
    [ThemedArticlePageTaxonomy.COMPLAINT_RIGHTS]: 'Right to appeal',
    [ThemedArticlePageTaxonomy.USER_SUPPORT]: 'User support',
    [ThemedArticlePageTaxonomy.ABOUT_NAV]: 'About NAV',
    [ThemedArticlePageTaxonomy.MEMBERSHIP_NATIONAL_INSURANCE]:
        'Membership in Folketrygden (The National Insurance Scheme)',
    [ThemedArticlePageTaxonomy.RECRUITMENT]: 'Recruitment',
    [ToolsPageTaxonomy.CALCULATOR]: 'Calculator',
    [ToolsPageTaxonomy.NAVIGATOR]: 'Navigator',
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
    audienceServices: {
        BARNEVERN: 'Barnevern',
        KRIMINALOMSORG: 'Kriminalomsorg',
        FLYKTNING: 'Flyktning',
        RUS: 'Rus',
        STARTLAN: 'Startlån',
        STOETTEKONTAKT: 'Støttekontakt',
    },
    currentTopic: {
        tag: 'Featured',
    },
    mainArticle: {
        facts: 'Facts',
        lastChanged: 'Updated',
        linkedListDescription: 'Chapters',
        published: 'Published',
        tableOfContents: 'Table of contents',
        contents: 'Contents',
        news: 'News',
        pressRelease: 'Press release',
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
    taxonomies,
    areas,
    header: {
        copyLink: 'Copy link',
        copiedLinkConfirmed: 'Link successfully copied',
    },
    overview: {
        noProducts: 'No hits',
        search: 'Search',
        loading: 'Loading content...',
        areas: {
            choose: 'Choose area',
            ariaExplanation: 'Filter list by area',
            ariaItemExplanation: 'Show area',
        },
        taxonomies: {
            choose: 'Choose type',
            ariaExplanation: 'Filter list by type',
            ariaItemExplanation: 'Show type',
        },
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
                'Weekdays 09:00–15:00. We can call you back if the wait time is more than 5 minutes.',
        },
        shared: {
            closed: 'Closed',
            openNow: 'Open',
            opensAt: 'Opens {$1} at {$2}',
            closedNow: 'Closed now',
            seeMoreOptions: 'See more phone numbers and calling options',
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
