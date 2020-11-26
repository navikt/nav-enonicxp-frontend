export enum PartType {
    LinkPanels = 'no.nav.navno:link-panels',
    LinkLists = 'no.nav.navno:link-lists',
    PageHeading = 'no.nav.navno:page-heading',
    MainPanels = 'no.nav.navno:main-panels',
    MainArticle = 'no.nav.navno:main-article',
    MainArticleLinkedList = 'no.nav.navno:main-article-linked-list',
    MenuList = 'no.nav.navno:menu-list',
    OfficeInformation = 'no.nav.navno:office-information',
    PageList = 'no.nav.navno:page-list',

    LinkPanel = 'no.nav.navno:dynamic-link-panel',
    SupervisorPanel = 'no.nav.navno:dynamic-supervisor-panel',
    Alert = 'no.nav.navno:dynamic-alert',
    ReadMorePanel = 'no.nav.navno:dynamic-read-more-panel',
    Header = 'no.nav.navno:dynamic-header',

    Notifications = 'no.nav.navno:notifications',
    BreakingNews = 'no.nav.navno:breaking-news',
    PageCrumbs = 'no.nav.navno:page-crumbs',
}

export type PartWithPageData =
    | PartType.LinkPanels
    | PartType.LinkLists
    | PartType.PageHeading
    | PartType.MainArticle
    | PartType.MainArticleLinkedList
    | PartType.MainPanels
    | PartType.MenuList
    | PartType.OfficeInformation
    | PartType.PageList;

export type PartWithOwnData =
    | PartType.LinkPanel
    | PartType.SupervisorPanel
    | PartType.Alert
    | PartType.ReadMorePanel
    | PartType.Header;

export type PartDeprecated =
    | PartType.Notifications
    | PartType.BreakingNews
    | PartType.PageCrumbs;
