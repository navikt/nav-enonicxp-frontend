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

    LinkPanel = 'no.nav.navno:dynamic-link-panel',
    Alert = 'no.nav.navno:dynamic-alert',
    Header = 'no.nav.navno:dynamic-header',
    LinkList = 'no.nav.navno:dynamic-link-list',
    NewsList = 'no.nav.navno:dynamic-news-list',
    HtmlArea = 'no.nav.navno:html-area',
    PageHeader = 'no.nav.navno:page-header',
    Button = 'no.nav.navno:button',
    PageNavigationMenu = 'no.nav.navno:page-navigation-menu',
    FiltersMenu = 'no.nav.navno:filters-menu',
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
    | PartType.Alert
    | PartType.Header
    | PartType.LinkList
    | PartType.NewsList
    | PartType.HtmlArea
    | PartType.PageHeader
    | PartType.Button
    | PartType.PageNavigationMenu
    | PartType.FiltersMenu;
