import React from 'react';
import { EmptyObject } from 'types/util-types';
import { PartConfigTrekkspill } from 'components/parts/trekkspill/TrekkspillPart';
import { PartConfigVarselboks } from 'components/parts/varselboks/VarselboksPart';
import { PartConfigOmradekort } from 'components/parts/omradekort/OmradekortPart';
import { PartConfigSituasjonskort } from 'components/parts/situasjonskort/SituasjonskortPart';
import { PartConfigButton } from 'components/parts/button/ButtonPart';
import { PartConfigKalkulator } from 'components/parts/kalkulator/KalkulatorPart';
import { PartConfigKontaktOssKanal } from 'components/parts/kontakt-oss-kanal/KontaktOssKanalPart';
import { PartConfigFiltreringsmeny } from 'components/parts/filtreringsmeny/FiltreringsmenyPart';
import { PartConfigSkjemadetaljer } from 'components/parts/skjemadetaljer/SkjemadetaljerPart';
import { PartConfigSeksjonForKontaktinformasjon } from 'components/parts/seksjon-for-kontaktinformasjon/SeksjonForKontaktinformasjonPart';
import { PartConfigSeksjonForAktuelleTemaer } from 'components/parts/seksjon-for-aktuelle-temaer/SeksjonForAktuelleTemaerPart';
import { PartConfigSeksjonForSnarveier } from 'components/parts/seksjon-for-snarveier/SeksjonForSnarveierPart';
import { PartConfigFrontpagePersonShortcuts } from 'components/parts/seksjon-for-snarveier-pa-forside-for-privatperson/SeksjonForSnarveierPaForsideForPrivatpersonPart';
import { PartConfigHeader } from 'components/parts/header/HeaderPart';
import { PartConfigHtmlArea } from 'components/parts/html-area/HtmlAreaPart';
import { PartConfigLenkeliste } from 'components/parts/lenkeliste/LenkelistePart';
import { PartConfigLenkepanel } from 'components/parts/lenkepanelPart/LenkepanelPart';
import { PartConfigKortForInnloggetBruker } from 'components/parts/kort-for-innlogget-bruker/KortForInnloggetBrukerPart';
import { PartConfigNewsList } from 'components/parts/news-list/NewsListPart';
import { PartConfigDetaljinformasjonForDetAktuelleKontoret } from 'components/parts/detaljinformasjon-for-det-aktuelle-kontoret/DetaljinformasjonForDetAktuelleKontoretPart';
import { PartConfigPageHeader } from 'components/parts/page-header/PageHeaderPart';
import { PartConfigPageNavigationMenu } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { PartConfigPayoutDates } from 'components/parts/payout-dates/PayoutDatesPart';
import { PartConfigProductCard } from 'components/parts/product-card/ProductCardPart';
import { PartConfigProductDetails } from 'components/parts/product-details/ProductDetailsPart';
import { PartConfigProviderCard } from 'components/parts/provider-card/ProviderCardPart';
import { PartConfigReadMore } from 'components/parts/readMorePart/ReadMorePart';
import { PartConfigRelatedSituations } from 'components/parts/related-situations/RelatedSituationsPart';
import { PartConfigUserTests } from 'components/parts/user-tests/UserTestsPart';
import { PartConfigUxSignalsWidget } from 'components/parts/uxsignals-widget/UxSignalsWidgetPart';
import { PartConfigProductCardMini } from 'components/parts/product-card-mini/ProductCardMiniPart';
import { PartConfigProductCardMicro } from 'components/parts/product-card-micro/ProductCardMicroPart';
import { ComponentBaseProps, ComponentType } from './_component-common';

export enum PartType {
    Omradekort = 'no.nav.navno:area-card',
    Lenkepanel = 'no.nav.navno:dynamic-link-panel',
    Varselboks = 'no.nav.navno:dynamic-alert',
    Header = 'no.nav.navno:dynamic-header',
    Lenkeliste = 'no.nav.navno:dynamic-link-list',
    NewsList = 'no.nav.navno:dynamic-news-list',
    HtmlArea = 'no.nav.navno:html-area',
    Kalkulator = 'no.nav.navno:calculator',
    DetaljinformasjonForDetAktuelleKontoret = 'no.nav.navno:office-editorial-detail',
    PageHeader = 'no.nav.navno:page-header',
    Button = 'no.nav.navno:button',
    ProviderCard = 'no.nav.navno:provider-card',
    PageNavigationMenu = 'no.nav.navno:page-navigation-menu',
    Filtreringsmeny = 'no.nav.navno:filters-menu',
    ProductCard = 'no.nav.navno:product-card',
    ProductCardMini = 'no.nav.navno:product-card-mini',
    ProductCardMicro = 'no.nav.navno:product-card-micro',
    ProductDetails = 'no.nav.navno:product-details',
    Skjemadetaljer = 'no.nav.navno:form-details',
    KontaktOssKanal = 'no.nav.navno:contact-option',
    PayoutDates = 'no.nav.navno:payout-dates',
    Situasjonskort = 'no.nav.navno:areapage-situation-card',
    KortForInnloggetBruker = 'no.nav.navno:loggedin-card',
    SeksjonForKontaktinformasjon = 'no.nav.navno:frontpage-contact',
    SeksjonForAktuelleTemaer = 'no.nav.navno:frontpage-current-topics',
    SeksjonForSnarveier = 'no.nav.navno:frontpage-shortcuts',
    SeksjonForSnarveierPaForsideForPrivatperson = 'no.nav.navno:frontpage-person-shortcuts',
    UxSignalsWidget = 'no.nav.navno:uxsignals-widget',
    UserTests = 'no.nav.navno:user-tests',
    ReadMore = 'no.nav.navno:read-more',
    Trekkspill = 'no.nav.navno:accordion',
    AktuelleMalgrupper = 'no.nav.navno:alternative-audience',
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
    Artikkel = 'no.nav.navno:main-article',
    ArtikkelLinkedList = 'no.nav.navno:main-article-linked-list',
    MenuList = 'no.nav.navno:menu-list',
    OfficeInformation = 'no.nav.navno:office-information',
    PageList = 'no.nav.navno:page-list',
    PublishingCalendar = 'no.nav.navno:publishing-calendar',
    PublishingCalendarEntry = 'no.nav.navno:publishing-calendar-entry',
}

type PartConfigs = {
    [PartType.Trekkspill]: PartConfigTrekkspill;
    [PartType.Varselboks]: PartConfigVarselboks;
    [PartType.Omradekort]: PartConfigOmradekort;
    [PartType.Situasjonskort]: PartConfigSituasjonskort;
    [PartType.Button]: PartConfigButton;
    [PartType.Kalkulator]: PartConfigKalkulator;
    [PartType.KontaktOssKanal]: PartConfigKontaktOssKanal;
    [PartType.Filtreringsmeny]: PartConfigFiltreringsmeny;
    [PartType.Skjemadetaljer]: PartConfigSkjemadetaljer;
    [PartType.SeksjonForKontaktinformasjon]: PartConfigSeksjonForKontaktinformasjon;
    [PartType.SeksjonForAktuelleTemaer]: PartConfigSeksjonForAktuelleTemaer;
    [PartType.SeksjonForSnarveier]: PartConfigSeksjonForSnarveier;
    [PartType.SeksjonForSnarveierPaForsideForPrivatperson]: PartConfigFrontpagePersonShortcuts;
    [PartType.Header]: PartConfigHeader;
    [PartType.HtmlArea]: PartConfigHtmlArea;
    [PartType.Lenkeliste]: PartConfigLenkeliste;
    [PartType.Lenkepanel]: PartConfigLenkepanel;
    [PartType.KortForInnloggetBruker]: PartConfigKortForInnloggetBruker;
    [PartType.NewsList]: PartConfigNewsList;
    [PartType.DetaljinformasjonForDetAktuelleKontoret]: PartConfigDetaljinformasjonForDetAktuelleKontoret;
    [PartType.PageHeader]: PartConfigPageHeader;
    [PartType.PageNavigationMenu]: PartConfigPageNavigationMenu;
    [PartType.PayoutDates]: PartConfigPayoutDates;
    [PartType.ProductCard]: PartConfigProductCard;
    [PartType.ProductCardMicro]: PartConfigProductCardMicro;
    [PartType.ProductCardMini]: PartConfigProductCardMini;
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
        ? ComponentBaseProps<
              ComponentType.Part,
              Descriptor,
              Descriptor extends keyof PartConfigs ? PartConfigs[Descriptor] : EmptyObject
          >
        : never;

export type PartComponent<Descriptor extends PartType> = Descriptor extends PartType
    ? React.FunctionComponent<PartComponentProps<Descriptor>>
    : never;
