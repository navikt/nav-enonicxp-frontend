export enum ProductTaxonomy {
    ALL = 'all',
    BENEFITS = 'benefits',
    INSURANCE = 'insurance',
    MEASURES = 'measures',
    SERVICE = 'service',
    COUNSELLING = 'rights',
    ASSISTIVE_TOOLS = 'assistive_tools',
    EMPLOYEE_BENEFITS = 'employee_benefits',
    REFUND = 'refund',
    OTHER = 'forms',
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

export type Taxonomy = ProductTaxonomy | ThemedArticlePageTaxonomy | ToolsPageTaxonomy;
