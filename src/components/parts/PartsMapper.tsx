import React from 'react';
import {
    PartDeprecatedType,
    PartLegacyType,
    PartComponentProps,
    PartType,
    PartTypeAll,
} from 'types/component-props/parts';
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
import { ComponentType } from 'types/component-props/_component-common';
import { ContentProps } from 'types/content-props/_content-common';
import { OfficeInformation } from './_legacy/office-information/OfficeInformation';
import { HeaderPart } from './header/HeaderPart';
import { LinkListPart } from './link-list/LinkListPart';
import { NewsListPart } from './news-list/NewsListPart';
import { PublishingCalendar } from './_legacy/publishing-calendar/PublishingCalendar';
import { PublishingCalendarEntry } from './_legacy/publishing-calendar/PublishingCalendarEntry';
import { BEM, classNames } from 'utils/classnames';
import { HtmlArea } from './html-area/HtmlArea';
import { CalculatorPart } from 'components/parts/calculator/CalculatorPart';
import { ProductDetailsPart } from './product-details/ProductDetailsPart';
import { PageHeaderPart } from './page-header/PageHeaderPart';
import { ButtonPart } from './button/ButtonPart';
import { ProviderCardPart } from './provider-card/ProviderCardPart';
import { PageNavigationMenuPart } from './page-navigation-menu/PageNavigationMenuPart';
import { FiltersMenu } from './filters-menu/FiltersMenu';
import { FrontpageCurrentTopics } from './frontpage-current-topics/FrontpageCurrentTopics';
import { FrontpageShortcuts } from './frontpage-shortcuts/FrontpageShortcuts';
import {
    ProductCardMiniPart,
    ProductCardPart,
} from './product-card/ProductCard';
import { OfficeEditorialDetailPart } from './office-editorial-detail/OfficeEditorialDetailPart';
import { ContactOptionPart } from './contact-option/ContactOptionPart';
import { ProductCardMicroPart } from './product-card-micro/ProductCardMicro';
import { editorAuthstateClassname } from 'components/_common/auth-dependant-render/AuthDependantRender';
import { PayoutDatesPart } from './payout-dates/PayoutDatesPart';
import { AreaCardPart } from './area-card/AreaCardPart';
import { AreapageSituationCardPart } from './areapage-situation-card/AreapageSituationCardPart';
import { LoggedinCardPart } from './loggedin-card/LoggedinCardPart';
import { FrontpageContactPart } from './frontpage-contact/FrontpageContactPart';
import { UxSignalsWidgetPart } from 'components/parts/uxsignals-widget/UxSignalsWidgetPart';
import { FormDetailsPart } from './form-details/FormDetailsPart';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { UserTestsPart } from 'components/parts/user-tests/UserTestsPart';
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

const PartComponent = ({
    partProps,
    pageProps,
}: {
    partProps: PartComponentProps;
    pageProps: ContentProps;
}) => {
    switch (partProps.descriptor) {
        case PartType.Accordion:
            return <AccordionPart {...partProps} pageProps={pageProps} />;
        case PartType.AlertBox:
            return <AlertBoxPart {...partProps} pageProps={pageProps} />;
        case PartType.AlternativeAudience:
            return (
                <AlternativeAudiencePart {...partProps} pageProps={pageProps} />
            );
        case PartType.AreaCard:
            return <AreaCardPart {...partProps} pageProps={pageProps} />;
        case PartType.AreapageSituationCard:
            return (
                <AreapageSituationCardPart
                    {...partProps}
                    pageProps={pageProps}
                />
            );
        case PartType.Button:
            return <ButtonPart {...partProps} pageProps={pageProps} />;
        case PartType.Calculator:
            return <CalculatorPart {...partProps} pageProps={pageProps} />;
        case PartType.ContactOption:
            return <ContactOptionPart {...partProps} pageProps={pageProps} />;
        case PartType.FiltersMenu:
            return <FiltersMenu {...partProps} pageProps={pageProps} />;
        case PartType.FormDetails:
            return <FormDetailsPart {...partProps} pageProps={pageProps} />;
        case PartType.FrontpageContact:
            return (
                <FrontpageContactPart {...partProps} pageProps={pageProps} />
            );
        case PartType.FrontpageCurrentTopics:
            return (
                <FrontpageCurrentTopics {...partProps} pageProps={pageProps} />
            );
        case PartType.FrontpageShortcuts:
            return <FrontpageShortcuts {...partProps} pageProps={pageProps} />;
        case PartType.Header:
            return <HeaderPart {...partProps} pageProps={pageProps} />;
        case PartType.HtmlArea:
            return <HtmlArea {...partProps} pageProps={pageProps} />;
        case PartType.LinkList:
            return <LinkListPart {...partProps} pageProps={pageProps} />;
        case PartType.LinkPanel:
            return <LinkPanelPart {...partProps} pageProps={pageProps} />;
        case PartType.LoggedinCard:
            return <LoggedinCardPart {...partProps} pageProps={pageProps} />;
        case PartType.NewsList:
            return <NewsListPart {...partProps} pageProps={pageProps} />;
        case PartType.OfficeEditorialDetail:
            return (
                <OfficeEditorialDetailPart
                    {...partProps}
                    pageProps={pageProps}
                />
            );
        case PartType.PageHeader:
            return <PageHeaderPart {...partProps} pageProps={pageProps} />;
        case PartType.PageNavigationMenu:
            return (
                <PageNavigationMenuPart {...partProps} pageProps={pageProps} />
            );
        case PartType.PayoutDates:
            return <PayoutDatesPart {...partProps} pageProps={pageProps} />;
        case PartType.ProductCard:
            return <ProductCardPart {...partProps} pageProps={pageProps} />;
        case PartType.ProductCardMicro:
            return (
                <ProductCardMicroPart {...partProps} pageProps={pageProps} />
            );
        case PartType.ProductCardMini:
            return <ProductCardMiniPart {...partProps} pageProps={pageProps} />;
        case PartType.ProductDetails:
            return <ProductDetailsPart {...partProps} pageProps={pageProps} />;
        case PartType.ProviderCard:
            return <ProviderCardPart {...partProps} pageProps={pageProps} />;
        case PartType.ReadMore:
            return <ReadMorePart {...partProps} pageProps={pageProps} />;
        case PartType.RelatedSituations:
            return (
                <RelatedSituationsPart {...partProps} pageProps={pageProps} />
            );
        case PartType.UserTests:
            return <UserTestsPart {...partProps} pageProps={pageProps} />;
        case PartType.UxSignalsWidget:
            return <UxSignalsWidgetPart {...partProps} pageProps={pageProps} />;

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
                isEditView &&
                    renderOnAuthState &&
                    editorAuthstateClassname(renderOnAuthState)
            )}
            {...editorProps}
        >
            <PartComponent pageProps={pageProps} partProps={partProps} />
        </div>
    );
};
