export enum ProductTaxonomy {
    ALL = 'all',
    ASSISTIVE_TOOLS = 'assistive_tools',
    BENEFITS = 'benefits',
    MEASURES = 'measures',
    SERVICE = 'service',
    RIGHTS = 'rights',
    INSURANCE = 'insurance',
    EMPLOYEE_BENEFITS = 'employee_benefits',
    REFUND = 'refund',
    FOR_PROVIDERS = 'for_providers',
    FORMS = 'forms',
}

export enum ThemedArticlePageTaxonomy {
    TIPS_JOB = 'tips_job',
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
