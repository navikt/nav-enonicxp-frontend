import { ComponentCommonProps, ComponentType } from './_components';

export enum PartType {
    // Parts using page data
    LinkPanels = 'no.nav.navno:link-panels',
    LinkLists = 'no.nav.navno:link-lists',
    PageHeading = 'no.nav.navno:page-heading',
    MainPanels = 'no.nav.navno:main-panels',
    MainArticleLinkedList = 'no.nav.navno:main-article-linked-list',
    MenuList = 'no.nav.navno:menu-list',
    PageList = 'no.nav.navno:page-list',

    // Parts using own data
    LinkPanel = 'no.nav.navno:dynamic-link-panel',
    SupervisorPanel = 'no.nav.navno:dynamic-supervisor-panel',
    Alert = 'no.nav.navno:dynamic-alert',
    ReadMorePanel = 'no.nav.navno:dynamic-read-more-panel',

    // Deprecated parts - remove after release
    Notifications = 'no.nav.navno:notifications',
    BreakingNews = 'no.nav.navno:breaking-news',
    PageCrumbs = 'no.nav.navno:page-crumbs',
}
