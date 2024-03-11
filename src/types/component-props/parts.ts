export enum PartType {
    // Deprecated, should never render to anything, only included for compatibility
    Notifications = 'no.nav.navno:notifications',
    BreakingNews = 'no.nav.navno:breaking-news',
    PageCrumbs = 'no.nav.navno:page-crumbs',
    // Legacy, only used in templates for old content types
    LinkPanels = 'no.nav.navno:link-panels',
    LinkLists = 'no.nav.navno:link-lists',
    PageHeading = 'no.nav.navno:page-heading',
    MainPanels = 'no.nav.navno:main-panels',
    MainArticle = 'no.nav.navno:main-article',
    MainArticleLinkedList = 'no.nav.navno:main-article-linked-list',
    MenuList = 'no.nav.navno:menu-list',
    OfficeInformation = 'no.nav.navno:office-information',
    PageList = 'no.nav.navno:page-list',
    PublishingCalendar = 'no.nav.navno:publishing-calendar',
    PublishingCalendarEntry = 'no.nav.navno:publishing-calendar-entry',
    // Parts currently available for active use
    AreaCard = 'no.nav.navno:area-card',
    AlertPanel = 'no.nav.navno:alert-panel',
    LinkPanel = 'no.nav.navno:dynamic-link-panel',
    AlertBox = 'no.nav.navno:dynamic-alert',
    Header = 'no.nav.navno:dynamic-header',
    LinkList = 'no.nav.navno:dynamic-link-list',
    NewsList = 'no.nav.navno:dynamic-news-list',
    HtmlArea = 'no.nav.navno:html-area',
    Calculator = 'no.nav.navno:calculator',
    OfficeEditorialDetail = 'no.nav.navno:office-editorial-detail',
    PageHeader = 'no.nav.navno:page-header',
    Button = 'no.nav.navno:button',
    ProviderCard = 'no.nav.navno:provider-card',
    PageNavigationMenu = 'no.nav.navno:page-navigation-menu',
    FiltersMenu = 'no.nav.navno:filters-menu',
    ProductCard = 'no.nav.navno:product-card',
    ProductCardMini = 'no.nav.navno:product-card-mini',
    ProductCardMicro = 'no.nav.navno:product-card-micro',
    ProductDetails = 'no.nav.navno:product-details',
    FormDetails = 'no.nav.navno:form-details',
    ContactOption = 'no.nav.navno:contact-option',
    PayoutDates = 'no.nav.navno:payout-dates',
    AreapageSituationCard = 'no.nav.navno:areapage-situation-card',
    LoggedinCard = 'no.nav.navno:loggedin-card',
    FrontpageContact = 'no.nav.navno:frontpage-contact',
    FrontpageCurrentTopics = 'no.nav.navno:frontpage-current-topics',
    FrontpageShortcuts = 'no.nav.navno:frontpage-shortcuts',
    UxSignalsWidget = 'no.nav.navno:uxsignals-widget',
    UserTests = 'no.nav.navno:user-tests',
    ReadMore = 'no.nav.navno:read-more',
    Accordion = 'no.nav.navno:accordion',
    AlternativeAudience = 'no.nav.navno:alternative-audience',
    RelatedSituations = 'no.nav.navno:related-situations',
}

export type PartDeprecatedType =
    | PartType.Notifications
    | PartType.BreakingNews
    | PartType.PageCrumbs;

export type PartLegacyType =
    | PartType.LinkPanels
    | PartType.LinkLists
    | PartType.PageHeading
    | PartType.MainArticle
    | PartType.MainArticleLinkedList
    | PartType.MainPanels
    | PartType.MenuList
    | PartType.OfficeInformation
    | PartType.PageList
    | PartType.PublishingCalendar
    | PartType.PublishingCalendarEntry;

export type PartCurrentType = Exclude<
    PartType,
    PartLegacyType | PartDeprecatedType
>;
