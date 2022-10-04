export enum ProductTaxonomy {
    ALL = 'all',
    ASSISTIVE_TOOLS = 'assistive_tools',
    BENEFITS = 'benefits',
    FOLLOWUP = 'followup',
    MEASURES = 'measures',
    RIGHTS = 'rights',
    FOR_EMPLOYERS = 'for_employers',
    FOR_EVENT_ORGANIZERS = 'for_event_organizers',
    FOR_MUNICIPALITY = 'for_municipality',
    FOR_HEALTH_SERVICE = 'for_health_service',
    FOR_PROVIDERS = 'for_providers',
    FORMS = 'forms',
}

export enum ThemedArticlePageTaxonomy {
    HELP_WORK = 'help_work',
    WHEN_SICK = 'when_sick',
    PAYMENT = 'payment',
    COMPLAINT_RIGHTS = 'complaint_rights',
    USER_SUPPORT = 'user_support',
    ABOUT_NAV = 'about_nav',
    MEMBERSHIP_NATIONAL_INSURANCE = 'membership_national_insurance',
    RECRUITMENT = 'recruitment',
}

export enum ToolsPageTaxonomy {
    CALCULATOR = 'calculator',
    NAVIGATOR = 'navigator',
}

export type Taxonomy =
    | ProductTaxonomy
    | ThemedArticlePageTaxonomy
    | ToolsPageTaxonomy;
