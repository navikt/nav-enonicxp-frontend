export enum ProductTaxonomy {
    ALL = 'all',
    INSURANCE = 'insurance',
    ASSISTIVE_TOOLS = 'assistive_tools',
    BENEFITS = 'benefits',
    MEASURES = 'measures',
    SERVICE = 'service',
    RIGHTS = 'rights',
    FORMS = 'forms',
    EMPLOYEE_BENEFITS = 'employee_benefits',
    REFUND = 'refund',
    FOR_PROVIDERS = 'for_providers',
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
