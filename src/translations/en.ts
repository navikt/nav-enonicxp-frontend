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
import { PartialTranslations } from './default';

const taxonomies: {
    [key in Taxonomy]?: string;
} = {
    [ProductTaxonomy.ALL]: 'Alle',
    [ProductTaxonomy.BENEFITS]: 'Benefits',
    [ProductTaxonomy.INSURANCE]: 'Insurance',
    [ProductTaxonomy.MEASURES]: 'Measures',
    [ProductTaxonomy.SERVICE]: 'Service',
    [ProductTaxonomy.COUNSELLING]: 'Counselling',
    [ProductTaxonomy.ASSISTIVE_TOOLS]: 'Assistive tools',
    [ProductTaxonomy.EMPLOYEE_BENEFITS]: 'Benefits for employees',
    [ProductTaxonomy.REFUND]: 'Refund',
    [ProductTaxonomy.OTHER]: 'Other',
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

const areas: { [key in Area]?: string } = {
    [Area.ALL]: 'All',
    [Area.WORK]: 'Work',
    [Area.HEALTH]: 'Health',
    [Area.FAMILY]: 'Family and children',
    [Area.PENSION]: 'Pension',
    [Area.SOCIAL_COUNSELLING]: 'Social services and guidance',
    [Area.ACCESSIBILITY]: 'Aid and accessibility',
    [Area.RECRUITMENT]: 'Recruitment',
    [Area.INCLUSION]: 'Inclusion and facilitation',
    [Area.DOWNSIZING]: 'Layoffs, furloughs and temporary leave',
    [Area.OTHER]: 'General',
};

export const translationsBundleEn: PartialTranslations = {
    errors: {
        componentError: 'An error occurred while loading this content element',
    },
    stringParts: {
        conjunction: 'and',
        for: 'for',
        this: 'this',
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
    linkPanels: {
        label: 'Link panels',
    },
    linkList: {
        label: 'List of links',
    },
    filteredContent: {
        noFiltersSelected: 'No filters are selected. Showing all content.',
        filtersSelected: 'We have hidden content not relevant for your situation.',
        customizeContent: 'Customize content',
        showingInformationFor: 'Showing information for:',
    },
    audienceServices: {
        HJELP_KOMME_I_JOBB: 'Employment help',
        NODSITUASJON:
            'Help in emergency situations, such as temporary accommodation or financial social assistance',
        OKONOMI_GJELD: 'Financial and debt advice',
        TILGANGPC: 'Access to PC',
        HJELPDIGITALETJENESTER: 'Help using digital services if you need it',
        BARNEVERNTJENESTE: 'Child protection service',
        FLYKTNINGTJENESTE: 'Refugee service',
        FENGSEL_OPPFOLGING: 'Follow-up of people in prison',
        RUS_OPPFOLGING: 'Follow-up of people with substance abuse problems',
        PSYKISK_HELSE_OPPFOLGING: 'Follow-up of people with mental health problems',
        STARTLAN: 'Start-up loans and grants from the municipality',
        SJOFARTSOPPGAVER: 'Issuance of sjøfartsbok and dissemination of seafarers',
        AKTIVITETSKORTET: 'Activity card for child and youth',
        BOSTOTTE_HUSBANKEN: 'Housing benefits from Husbanken',
        BOSTOTTE_KOMMUNEN: 'Housing benefits from from the municipality',
        PRIVATOKONOMI_FORVALTNING: 'Voluntary and compulsory management of private finances',
        INTROPROGRAMMET: 'Introductory program',
        KOMMUNAL_BOLIG: 'Public housing',
        KOMMUNAL_TILLEGGSPENSJON: 'Public pension supplement',
        KOMMUNALT_FRIKORT_HELSETJENESTER: 'Public health services for hjemmetjenesten',
        LEDSAGERBEVIS: 'Accompanying person certificate',
        PARKERING_FORFLYTNINGSHEMMEDE: 'Parking permit for people with reduced mobility',
        REDUSERT_FORELDREBETALING: 'Reduced parental contribution for child care',
        SKJENKEBEVILLING: 'Alcohol permit',
        STOTTEKONTAKT: 'Støttekontakt',
        TILRETTELAGT_TRANSPORT: 'Arranged transport (TT card)',
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
        appointmentOnly: 'Kun timeavtale',
        specialOpeningHours: 'Special opening hours',
        address: 'Address',
        youCanMakeAppointment:
            'You can book a meeting with your advisor outside of these opening hours.',
        location: 'Location',
        postalAddress: 'Postal address',
        orgNumber: 'Org number',
        officeNumber: 'Office number',
        phoneToNav: 'NAV phone number is',
        phoneToHMS: 'Phone number to Hjelpemiddelsentralen is',
        phoneInformation:
            'Phone hours, weekdays at 9-15. NAV call center will assist you or connect you with your NAV office.',
        alternativeContacts: 'Other contact options:',
        taglineOffice: 'NAV office',
        taglineHMS: 'Assistive technology centre',
    },
    dateTime: {
        weekDayNames: {
            mon: 'Monday',
            tue: 'Tuesday',
            wed: 'Wednesday',
            thu: 'Thursday',
            fri: 'Friday',
            sat: 'Saturday',
            sun: 'Sunday',
        },
        relatives: {
            today: 'today',
            tomorrow: 'tomorrow',
        },
        time: 'time',
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
        person: 'Your rights',
        employer: 'What employers should know',
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
        copyLinkTo: 'Copy link to',
        copiedLinkConfirmed: 'Link successfully copied',
    },
    overview: {
        noHits: 'No hits with the selected filters.',
        numHits: 'Showing $1 out of $2',
        search: 'Search',
        filterOrSearch: 'Use filters or search',
        loading: 'Loading content...',
        any: 'From A to Z',
        resetFilters: 'Reset filters',
        more: 'More about',
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
    form: {
        application: 'Application',
        back: 'Back',
    },
    contactPoint: {
        chat: {
            title: 'Chat with Frida',
            ingress:
                'You will first be met by chatbot Frida who will answer you. You can also ask Frida to talk to an advisor (weekdays 9-15).',
            chatWithCounsellor: 'Chat with advisor',
            alwaysOpen: 'Always open',
        },
        legacyChat: {
            title: 'You can chat with us',
            ingress:
                'You will first be met by chatbot Frida who will answer you. You can also ask Frida to talk to an advisor (weekdays 9-1430).',
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
            ingress: 'Weekdays 9-15. We can call you back if the wait time is more than 5 minutes.',
        },
        shared: {
            closed: 'Closed',
            openNow: 'Open',
            opensAt: 'Opens {$date} at {$time}',
            closedNow: 'Closed now',
            seeMoreOptions: 'See more phone numbers and calling options',
        },
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
    productDetailTypes: {
        [ProductDetailType.PAYOUT_DATES]: 'payment dates',
        [ProductDetailType.PROCESSING_TIMES]: 'processing times',
        [ProductDetailType.RATES]: 'rates',
        [ProductDetailType.ALL_PRODUCTS]: 'all',
    },
    processingTimesVisibilityTypes: {
        [ProcessingTimesVisibilityType.ALL]: '',
        [ProcessingTimesVisibilityType.APPLICATION]: 'application',
        [ProcessingTimesVisibilityType.COMPLAINT]: 'appeal',
    },
    payoutDates: {
        tableHeaderPrefix: 'Payment dates in',
        tableHeaderPrefixNoYear: 'Payment dates',
    },
    greetings: {
        hi: 'Hi!',
    },
    yourServicesText: {
        yourServices: 'Your services',
    },
    macroVideo: {
        playMovie: 'Watch video:',
        duration: 'Duration is',
        minutes: 'min',
        error: 'An error occurred while loading the video',
    },
    audience: {
        person: 'individuals',
        employer: 'employers',
        provider: 'providers',
    },
    providerAudience: {
        administrator: 'bankruptcy administrators',
        doctor: 'physicians, dentists or other healthcare professional',
        municipality_employed: 'employed in the municipality or county municipality',
        optician: 'opticians or ophthalmologists',
        measures_organizer: 'organizers of labour market measures',
        aid_supplier: 'assistive technology providers',
        other: 'other partners',
    },
    related: {
        relatedAudience: 'There is also information on {name} for',
        otherOffers: 'Other options',
        moreInformation: 'More information for you who',
    },
    internalNavigation: {
        pageNavigationMenu: 'Contents',
        sectionNavigation: 'In this chapter',
    },
};
