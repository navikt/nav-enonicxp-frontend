import { ComponentCommonProps, ComponentType } from './_component-common';
import { ContentProps } from 'types/content-props/_content-common';
import { EmptyObject } from 'types/util-types';
import React from 'react';
import { PartConfigAccordion } from 'components/parts/accordion/AccordionPart';
import { PartConfigAlertBox } from 'components/parts/alert-box/AlertBoxPart';
import { PartConfigAlternativeAudience } from 'components/parts/alternative-audience/AlternativeAudiencePart';
import { PartConfigAreaCard } from 'components/parts/area-card/AreaCardPart';
import { PartConfigAreapageSituationCard } from 'components/parts/areapage-situation-card/AreapageSituationCardPart';
import { PartConfigButton } from 'components/parts/button/ButtonPart';
import { PartConfigCalculator } from 'components/parts/calculator/CalculatorPart';
import { PartConfigContactOption } from 'components/parts/contact-option/ContactOptionPart';
import { PartConfigFilterMenu } from 'components/parts/filters-menu/FiltersMenuPart';
import { PartConfigFormDetails } from 'components/parts/form-details/FormDetailsPart';
import { PartConfigFrontpageContact } from 'components/parts/frontpage-contact/FrontpageContactPart';
import { PartConfigFrontpageCurrentTopics } from 'components/parts/frontpage-current-topics/FrontpageCurrentTopics';
import { PartConfigFrontpageShortcuts } from 'components/parts/frontpage-shortcuts/FrontpageShortcutsPart';
import { PartConfigHeader } from 'components/parts/header/HeaderPart';
import { PartConfigHtmlArea } from 'components/parts/html-area/HtmlArea';
import { PartConfigLinkList } from 'components/parts/link-list/LinkListPart';
import { PartConfigLinkPanel } from 'components/parts/link-panel/LinkPanelPart';
import { PartConfigLoggedinCard } from 'components/parts/loggedin-card/LoggedinCardPart';
import { PartConfigNewsList } from 'components/parts/news-list/NewsListPart';
import { PartConfigOfficeEditorialDetail } from 'components/parts/office-editorial-detail/OfficeEditorialDetailPart';
import { PartConfigPageHeader } from 'components/parts/page-header/PageHeaderPart';
import { PartConfigPageNavigationMenu } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { PartConfigPayoutDates } from 'components/parts/payout-dates/PayoutDatesPart';
import {
    PartConfigProductCard,
    PartConfigProductCardMicro,
    PartConfigProductCardMini,
} from 'components/parts/product-card/ProductCard';
import { PartConfigProductDetails } from 'components/parts/product-details/ProductDetailsPart';
import { PartConfigProviderCard } from 'components/parts/provider-card/ProviderCardPart';
import { PartConfigReadMore } from 'components/parts/read-more/ReadMorePart';
import { PartConfigRelatedSituations } from 'components/parts/related-situations/RelatedSituationsPart';
import { PartConfigUserTests } from 'components/parts/user-tests/UserTestsPart';
import { PartConfigUxSignalsWidget } from 'components/parts/uxsignals-widget/UxSignalsWidgetPart';

export enum PartType {
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

// Deprecated, should never render to anything, only included for compatibility
export enum PartDeprecatedType {
    Notifications = 'no.nav.navno:notifications',
    BreakingNews = 'no.nav.navno:breaking-news',
    PageCrumbs = 'no.nav.navno:page-crumbs',
}

// Legacy, only used in templates for old content types
export enum PartLegacyType {
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
}

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

export type PartTypeAll = PartType | PartLegacyType | PartDeprecatedType;

export type PartComponentProps<Descriptor extends PartTypeAll = PartTypeAll> =
    Descriptor extends PartTypeAll
        ? ComponentCommonProps<
              ComponentType.Part,
              Descriptor,
              Descriptor extends keyof PartConfigs ? PartConfigs[Descriptor] : EmptyObject
          >
        : never;

export type PartComponent<Descriptor extends PartType> = Descriptor extends PartType
    ? React.FunctionComponent<PartComponentProps<Descriptor>>
    : never;
