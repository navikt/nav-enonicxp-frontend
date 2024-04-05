import React from 'react';
import {
    PartDeprecatedType,
    PartLegacyType,
    PartComponentProps,
    PartType,
    PartTypeAll,
} from 'types/component-props/parts';
import { ComponentType } from 'types/component-props/_component-common';
import { ContentProps } from 'types/content-props/_content-common';
import { BEM, classNames } from 'utils/classnames';
import { HtmlAreaPart } from 'components/parts/html-area/HtmlAreaPart';
import { CalculatorPart } from 'components/parts/calculator/CalculatorPart';
import { FiltersMenuPart } from 'components/parts/filters-menu/FiltersMenuPart';
import { FrontpageCurrentTopicsPart } from 'components/parts/frontpage-current-topics/FrontpageCurrentTopicsPart';
import { FrontpageShortcutsPart } from 'components/parts/frontpage-shortcuts/FrontpageShortcutsPart';
import { ProductCardPart } from 'components/parts/product-card/ProductCardPart';
import { ProductCardMicroPart } from 'components/parts/product-card-micro/ProductCardMicroPart';
import { editorAuthstateClassname } from 'components/_common/auth-dependant-render/AuthDependantRender';
import { UxSignalsWidgetPart } from 'components/parts/uxsignals-widget/UxSignalsWidgetPart';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { UserTestsPart } from 'components/parts/user-tests/UserTestsPart';
import { ProductCardMiniPart } from 'components/parts/product-card-mini/ProductCardMiniPart';
import { MainArticleChapterNavigation } from './_legacy/main-article-chapter-navigation/MainArticleChapterNavigation';
import { MainPanels } from './_legacy/main-panels/MainPanels';
import { MenuList } from './_legacy/menu-list/MenuList';
import { PageHeading } from './_legacy/page-heading/PageHeading';
import { PageList } from './_legacy/page-list/PageList';
import { AlertBoxPart } from './alert-box/AlertBoxPart';
import { LinkPanelPart } from './link-panel/LinkPanelPart';
import { LinkPanelsLegacyPart } from './_legacy/link-panels/LinkPanelsLegacyPart';
import { LinkLists } from './_legacy/link-lists/LinkLists';
import { MainArticle } from './_legacy/main-article/MainArticle';
import { OfficeInformation } from './_legacy/office-information/OfficeInformation';
import { HeaderPart } from './header/HeaderPart';
import { LinkListPart } from './link-list/LinkListPart';
import { NewsListPart } from './news-list/NewsListPart';
import { PublishingCalendar } from './_legacy/publishing-calendar/PublishingCalendar';
import { PublishingCalendarEntry } from './_legacy/publishing-calendar/PublishingCalendarEntry';
import { ProductDetailsPart } from './product-details/ProductDetailsPart';
import { PageHeaderPart } from './page-header/PageHeaderPart';
import { ButtonPart } from './button/ButtonPart';
import { ProviderCardPart } from './provider-card/ProviderCardPart';
import { PageNavigationMenuPart } from './page-navigation-menu/PageNavigationMenuPart';
import { OfficeEditorialDetailPart } from './office-editorial-detail/OfficeEditorialDetailPart';
import { ContactOptionPart } from './contact-option/ContactOptionPart';
import { PayoutDatesPart } from './payout-dates/PayoutDatesPart';
import { AreaCardPart } from './area-card/AreaCardPart';
import { AreapageSituationCardPart } from './areapage-situation-card/AreapageSituationCardPart';
import { LoggedinCardPart } from './loggedin-card/LoggedinCardPart';
import { FrontpageContactPart } from './frontpage-contact/FrontpageContactPart';
import { FormDetailsPart } from './form-details/FormDetailsPart';
import { ReadMorePart } from './read-more/ReadMorePart';
import { AccordionPart } from './accordion/AccordionPart';
import { AlternativeAudiencePart } from './alternative-audience/AlternativeAudiencePart';
import { RelatedSituationsPart } from './related-situations/RelatedSituationsPart';

const partsDeprecated: ReadonlySet<PartTypeAll> = new Set([
    PartDeprecatedType.Notifications,
    PartDeprecatedType.BreakingNews,
    PartDeprecatedType.PageCrumbs,
]) satisfies ReadonlySet<PartDeprecatedType>;

const bem = BEM(ComponentType.Part);

const buildEditorProps = (componentPath: string) => ({
    'data-portal-component-type': ComponentType.Part,
    'data-portal-component': componentPath,
});

const PartComponentMapper = ({
    partProps,
    pageProps,
}: {
    partProps: PartComponentProps;
    pageProps: ContentProps;
}) => {
    switch (partProps.descriptor) {
        case PartType.Accordion:
            return <AccordionPart {...partProps} />;
        case PartType.AlertBox:
            return <AlertBoxPart {...partProps} />;
        case PartType.AlternativeAudience:
            return <AlternativeAudiencePart {...partProps} />;
        case PartType.AreaCard:
            return <AreaCardPart {...partProps} />;
        case PartType.AreapageSituationCard:
            return <AreapageSituationCardPart {...partProps} />;
        case PartType.Button:
            return <ButtonPart {...partProps} />;
        case PartType.Calculator:
            return <CalculatorPart {...partProps} />;
        case PartType.ContactOption:
            return <ContactOptionPart {...partProps} />;
        case PartType.FiltersMenu:
            return <FiltersMenuPart {...partProps} />;
        case PartType.FormDetails:
            return <FormDetailsPart {...partProps} />;
        case PartType.FrontpageContact:
            return <FrontpageContactPart {...partProps} />;
        case PartType.FrontpageCurrentTopics:
            return <FrontpageCurrentTopicsPart {...partProps} />;
        case PartType.FrontpageShortcuts:
            return <FrontpageShortcutsPart {...partProps} />;
        case PartType.Header:
            return <HeaderPart {...partProps} />;
        case PartType.HtmlArea:
            return <HtmlAreaPart {...partProps} />;
        case PartType.LinkList:
            return <LinkListPart {...partProps} />;
        case PartType.LinkPanel:
            return <LinkPanelPart {...partProps} />;
        case PartType.LoggedinCard:
            return <LoggedinCardPart {...partProps} />;
        case PartType.NewsList:
            return <NewsListPart {...partProps} />;
        case PartType.OfficeEditorialDetail:
            return <OfficeEditorialDetailPart {...partProps} />;
        case PartType.PageHeader:
            return <PageHeaderPart {...partProps} />;
        case PartType.PageNavigationMenu:
            return <PageNavigationMenuPart {...partProps} />;
        case PartType.PayoutDates:
            return <PayoutDatesPart {...partProps} />;
        case PartType.ProductCard:
            return <ProductCardPart {...partProps} />;
        case PartType.ProductCardMini:
            return <ProductCardMiniPart {...partProps} />;
        case PartType.ProductCardMicro:
            return <ProductCardMicroPart {...partProps} />;
        case PartType.ProductDetails:
            return <ProductDetailsPart {...partProps} />;
        case PartType.ProviderCard:
            return <ProviderCardPart {...partProps} />;
        case PartType.ReadMore:
            return <ReadMorePart {...partProps} />;
        case PartType.RelatedSituations:
            return <RelatedSituationsPart {...partProps} />;
        case PartType.UserTests:
            return <UserTestsPart {...partProps} />;
        case PartType.UxSignalsWidget:
            return <UxSignalsWidgetPart {...partProps} />;

        case PartLegacyType.LinkLists:
            return <LinkLists {...pageProps} />;
        case PartLegacyType.LinkPanels:
            return <LinkPanelsLegacyPart {...pageProps} />;
        case PartLegacyType.MainArticle:
            return <MainArticle {...pageProps} />;
        case PartLegacyType.MainArticleLinkedList:
            return <MainArticleChapterNavigation {...pageProps} />;
        case PartLegacyType.MainPanels:
            return <MainPanels {...pageProps} />;
        case PartLegacyType.MenuList:
            return <MenuList {...pageProps} />;
        case PartLegacyType.OfficeInformation:
            return <OfficeInformation {...pageProps} />;
        case PartLegacyType.PageHeading:
            return <PageHeading {...pageProps} />;
        case PartLegacyType.PageList:
            return <PageList {...pageProps} />;
        case PartLegacyType.PublishingCalendar:
            return <PublishingCalendar {...pageProps} />;
        case PartLegacyType.PublishingCalendarEntry:
            return <PublishingCalendarEntry {...pageProps} />;

        default:
            return (
                <EditorHelp
                    text={`Part-komponenten er ikke implementert: "${partProps.descriptor}"`}
                    type={'info'}
                />
            );
    }
};

export const PartsMapper = ({
    pageProps,
    partProps,
}: {
    partProps: PartComponentProps;
    pageProps: ContentProps;
}) => {
    const { path, descriptor, config } = partProps;

    const isEditView = pageProps.editorView === 'edit';
    const editorProps = isEditView ? buildEditorProps(path) : undefined;

    if (!descriptor || partsDeprecated.has(descriptor)) {
        return isEditView ? <div {...editorProps} /> : null;
    }

    const partName = descriptor.split(':')[1];
    const renderOnAuthState = config?.renderOnAuthState;

    return (
        <div
            className={classNames(
                bem(),
                bem(partName),
                isEditView && renderOnAuthState && editorAuthstateClassname(renderOnAuthState)
            )}
            {...editorProps}
        >
            <PartComponentMapper pageProps={pageProps} partProps={partProps} />
        </div>
    );
};
