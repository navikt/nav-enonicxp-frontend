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
    SupervisorPanel = 'no.nav.navno:dynamic-supervisor-panel',
    Alert = 'no.nav.navno:dynamic-alert',
    ReadMorePanel = 'no.nav.navno:dynamic-read-more-panel',
    Header = 'no.nav.navno:dynamic-header',
    LinkList = 'no.nav.navno:dynamic-link-list',
    NewsList = 'no.nav.navno:dynamic-news-list',
    PageNavigationMenu = 'no.nav.navno:page-navigation-menu',
    HtmlArea = 'no.nav.navno:html-area',
    PageHeader = 'no.nav.navno:page-header',
    SectionHeader = 'no.nav.navno:section-header',
    Button = 'no.nav.navno:button',
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
    | PartType.SupervisorPanel
    | PartType.Alert
    | PartType.ReadMorePanel
    | PartType.Header
    | PartType.LinkList
    | PartType.NewsList
    | PartType.PageNavigationMenu
    | PartType.HtmlArea
    | PartType.PageHeader
    | PartType.SectionHeader
    | PartType.Button;
