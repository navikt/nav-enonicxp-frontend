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
        NODSITUASJON:
            'Hjelp i nødsituasjoner, for eksempel midlertidig botilbud eller økonomisk sosialhjelp',
        TILGANGPC: 'Tilgang til PC',
        HJELPDIGITALETJENESTER:
            'Hjelp til å bruke digitale tjenester hvis du trenger det',
        BARNEVERN: 'Barnevern',
        FENGSEL_OG_KRIMINALOMSORG: 'Fengsel- og kriminalomsorg',
        FLYKTNINGSTJENESTE: 'Flyktningetjeneste',
        RUS_OG_PSYKISK_HELSE: 'Rus og psykisk helse',
        STARTLAN: 'Startlån',
        SJOFARTSOPPGAVER: 'Sjøfartsoppgaver',
        STOTTEKONTAKT: 'Støttekontakt',
    },
    currentTopic: {
        tag: 'Featured',
    },
    pressLanding: {
        latestPressNews: 'Latest press and news',
        morePressNews: 'More press releases and news',
        pressShortcuts: 'Shortcuts',
        news: 'News',
        press: 'Press release',
        published: 'Published',
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
        publishdate: 'Date',
        event: 'Publication',
    },
    office: {
        youFindUsHere: 'You can find us here',
        chooseBetweenOffices: 'You can choose one of the following offices.',
        officeInformation: 'Office information',
        closed: 'Closed',
        openingHoursWithoutAppointment: 'Opening hours without an appointment',
        appointmentOnly: 'Kun timeavtale',
        specialOpeningHours: 'Special opening hours',
        address: 'Address',
        youCanMakeAppointment:
            'You can book a meeting with your counsellor outside of these opening hours.',
        location: 'Location',
        postalAddress: 'Postal address',
        orgNumber: 'Org number',
        officeNumber: 'Office number',
        phoneToNav: 'NAV phone number is',
        phoneInformation:
            'Open, weekdays at 9-15. NAV call center will assist you or connect you with your NAV office.',
        alternativeContacts: 'Other contact options:',
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
            tomorrow: 'tomorrow',
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
    overviews: {
        any: 'From A to Z',
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
                'You will first be met by chatbot Frida who will answer you. You can also ask Frida to talk to a counsellor (weekdays 9-15).',
        },
        legacyChat: {
            title: 'You can chat with us',
            ingress:
                'You will first be met by chatbot Frida who will answer you. You can also ask Frida to talk to a counsellor (weekdays 9-15).',
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
                'Weekdays 9-15. We can call you back if the wait time is more than 5 minutes.',
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
