export enum PartType {
    Notifications = 'no.nav.navno:notifications',
    BreakingNews = 'no.nav.navno:breaking-news',
    PageCrumbs = 'no.nav.navno:page-crumbs',

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

    AreaCard = 'no.nav.navno:area-card',
    AlertPanel = 'no.nav.navno:alert-panel',
    LinkPanel = 'no.nav.navno:dynamic-link-panel',
    AlertBox = 'no.nav.navno:dynamic-alert',
    Header = 'no.nav.navno:dynamic-header',
    LinkList = 'no.nav.navno:dynamic-link-list',
    NewsList = 'no.nav.navno:dynamic-news-list',
    HtmlArea = 'no.nav.navno:html-area',
    Calculator = 'no.nav.navno:calculator',
    PageHeader = 'no.nav.navno:page-header',
    Button = 'no.nav.navno:button',
    ProviderCard = 'no.nav.navno:provider-card',
    PageNavigationMenu = 'no.nav.navno:page-navigation-menu',
    FiltersMenu = 'no.nav.navno:filters-menu',
    ProductCard = 'no.nav.navno:product-card',
    ProductCardMini = 'no.nav.navno:product-card-mini',
    ProductCardMicro = 'no.nav.navno:product-card-micro',
    ProductDetails = 'no.nav.navno:product-details',
    ContactOption = 'no.nav.navno:contact-option',
    PayoutDates = 'no.nav.navno:payout-dates',
    AreapageSituationCard = 'no.nav.navno:areapage-situation-card',
    LoggedinCard = 'no.nav.navno:loggedin-card',
    FrontpageContact = 'no.nav.navno:frontpage-contact',
    FrontpageCurrentTopics = 'no.nav.navno:frontpage-current-topics',
    FrontpageShortcuts = 'no.nav.navno:frontpage-shortcuts',
    Ingress = 'no.nav.navno:ingress',
}

export type PartDeprecated =
    | PartType.Notifications
    | PartType.BreakingNews
    | PartType.PageCrumbs;

export type PartWithPageData =
    | PartType.LinkPanels
    | PartType.LinkLists
    | PartType.PageHeading
    | PartType.MainArticle
    | PartType.MainArticleLinkedList
    | PartType.MainPanels
    | PartType.MenuList
    | PartType.OfficeInformation
    | PartType.PageList
    | PartType.PublishingCalendar;

export type PartWithOwnData =
    | PartType.LinkPanel
    | PartType.AlertBox
    | PartType.Header
    | PartType.LinkList
    | PartType.NewsList
    | PartType.HtmlArea
    | PartType.Calculator
    | PartType.PageHeader
    | PartType.Button
    | PartType.ProviderCard
    | PartType.PageNavigationMenu
    | PartType.FiltersMenu
    | PartType.FrontpageCurrentTopics
    | PartType.FrontpageShortcuts
    | PartType.ProductCard
    | PartType.ProductCardMini
    | PartType.ProductCardMicro
    | PartType.ContactOption
    | PartType.ProductDetails
    | PartType.AlertPanel
    | PartType.PayoutDates
    | PartType.AreaCard
    | PartType.AreapageSituationCard
    | PartType.LoggedinCard
    | PartType.FrontpageContact
    | PartType.Ingress;
