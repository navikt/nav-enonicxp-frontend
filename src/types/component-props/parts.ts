import { PartConfigAccordion } from './part-configs/accordion';
import { ComponentCommonProps, ComponentType } from './_component-common';
import { PartConfigAlertBox } from './part-configs/alert-box';
import { PartConfigAlternativeAudience } from './part-configs/alternative-audience';
import { ContentProps } from '../content-props/_content-common';
import { EmptyObject } from '../util-types';
import { PartConfigAreaCard } from './part-configs/area-card';
import { PartConfigAreapageSituationCard } from './part-configs/areapage-situation-card';
import { PartConfigButton } from './part-configs/button';
import { PartConfigCalculator } from './part-configs/calculator';
import { PartConfigContactOption } from './part-configs/contact-option';
import { PartConfigFilterMenu } from './part-configs/filter-menu';
import { PartConfigFormDetails } from './part-configs/form-details';
import { PartConfigFrontpageContact } from './part-configs/frontpage-contact';
import { PartConfigFrontpageCurrentTopics } from './part-configs/frontpage-current-topics';
import { PartConfigFrontpageShortcuts } from './part-configs/frontpage-shortcuts';
import { PartConfigHeader } from './part-configs/header';
import { PartConfigHtmlArea } from './part-configs/html-area';
import { PartConfigLinkList } from './part-configs/link-list';
import { PartConfigLinkPanel } from './part-configs/link-panel';
import { PartConfigLoggedinCard } from './part-configs/loggedin-card';
import { PartConfigNewsList } from './part-configs/news-list';
import { PartConfigOfficeEditorialDetail } from './part-configs/office-editorial-detail';
import { PartConfigPageHeader } from './part-configs/page-header';
import { PartConfigPageNavigationMenu } from './part-configs/page-navigation-menu';
import { PartConfigPayoutDates } from './part-configs/payout-dates';
import {
    PartConfigProductCard,
    PartConfigProductCardMicro,
    PartConfigProductCardMini,
} from './part-configs/product-card';
import { PartConfigProductDetails } from './part-configs/product-details';
import { PartConfigReadMore } from './part-configs/read-more';
import { PartConfigRelatedSituations } from './part-configs/related-situations';
import { PartConfigProviderCard } from './part-configs/provider-card';
import { PartConfigUserTests } from './part-configs/user-tests';
import { PartConfigUxSignalsWidget } from './part-configs/uxsignals-widget';
import React from 'react';

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

    // Parts currently available for use
    AreaCard = 'no.nav.navno:area-card',
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

type PartConfigs = {
    [PartType.Accordion]: PartConfigAccordion;
    [PartType.AlertBox]: PartConfigAlertBox;
    [PartType.AlternativeAudience]: PartConfigAlternativeAudience;
    [PartType.AreaCard]: PartConfigAreaCard;
    [PartType.AreapageSituationCard]: PartConfigAreapageSituationCard;
    [PartType.Button]: PartConfigButton;
    [PartType.Calculator]: PartConfigCalculator;
    [PartType.ContactOption]: PartConfigContactOption;
    [PartType.FiltersMenu]: PartConfigFilterMenu;
    [PartType.FormDetails]: PartConfigFormDetails;
    [PartType.FrontpageContact]: PartConfigFrontpageContact;
    [PartType.FrontpageCurrentTopics]: PartConfigFrontpageCurrentTopics;
    [PartType.FrontpageShortcuts]: PartConfigFrontpageShortcuts;
    [PartType.Header]: PartConfigHeader;
    [PartType.HtmlArea]: PartConfigHtmlArea;
    [PartType.LinkList]: PartConfigLinkList;
    [PartType.LinkPanel]: PartConfigLinkPanel;
    [PartType.LoggedinCard]: PartConfigLoggedinCard;
    [PartType.NewsList]: PartConfigNewsList;
    [PartType.OfficeEditorialDetail]: PartConfigOfficeEditorialDetail;
    [PartType.PageHeader]: PartConfigPageHeader;
    [PartType.PageNavigationMenu]: PartConfigPageNavigationMenu;
    [PartType.PayoutDates]: PartConfigPayoutDates;
    [PartType.ProductCard]: PartConfigProductCard;
    [PartType.ProductCardMini]: PartConfigProductCardMini;
    [PartType.ProductCardMicro]: PartConfigProductCardMicro;
    [PartType.ProductDetails]: PartConfigProductDetails;
    [PartType.ReadMore]: PartConfigReadMore;
    [PartType.RelatedSituations]: PartConfigRelatedSituations;
    [PartType.ProviderCard]: PartConfigProviderCard;
    [PartType.UserTests]: PartConfigUserTests;
    [PartType.UxSignalsWidget]: PartConfigUxSignalsWidget;
};

export type PartComponentProps<Descriptor extends PartType = PartType> =
    ComponentCommonProps<
        ComponentType.Part,
        Descriptor,
        Descriptor extends keyof PartConfigs
            ? PartConfigs[Descriptor]
            : EmptyObject
    > & {
        pageProps: ContentProps;
    };

export type PartComponent<Descriptor extends PartType> =
    React.FunctionComponent<PartComponentProps<Descriptor>>;
