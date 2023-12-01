import React from 'react';
import {
    PartCurrentType,
    PartDeprecatedType,
    PartLegacyType,
    PartType,
} from 'types/component-props/parts';
import { MainArticleChapterNavigation } from './_legacy/main-article-chapter-navigation/MainArticleChapterNavigation';
import { MainPanels } from './_legacy/main-panels/MainPanels';
import { MenuList } from './_legacy/menu-list/MenuList';
import PageHeading from './_legacy/page-heading/PageHeading';
import { PageList } from './_legacy/page-list/PageList';
import { AlertBoxPart } from './alert-box/AlertBoxPart';
import { LinkPanelPart } from './link-panel/LinkPanelPart';
import { LinkPanelsLegacyPart } from './_legacy/link-panels/LinkPanelsLegacyPart';
import LinkLists from './_legacy/link-lists/LinkLists';
import { MainArticle } from './_legacy/main-article/MainArticle';
import {
    ComponentType,
    PartComponentProps,
} from 'types/component-props/_component-common';
import { ContentProps } from 'types/content-props/_content-common';
import { OfficeInformation } from './_legacy/office-information/OfficeInformation';
import { HeaderPart } from './header/HeaderPart';
import { LinkListPart } from './link-list/LinkListPart';
import { NewsListPart } from './news-list/NewsListPart';
import PublishingCalendar from './_legacy/publishing-calendar/PublishingCalendar';
import PublishingCalendarEntry from './_legacy/publishing-calendar/PublishingCalendarEntry';
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
import { ProductCardPart } from './product-card/ProductCard';
import { OfficeEditorialDetail } from './office-editorial-detail/OfficeEditorialDetail';
import { ContactOptionPart } from './contact-option/ContactOptionPart';
import { ProductCardMicroPart } from './product-card-micro/ProductCardMicro';
import { editorAuthstateClassname } from '../_common/auth-dependant-render/AuthDependantRender';
import { AlertPanelPart } from './alert-panel/AlertPanelPart';
import { PayoutDatesPart } from './payout-dates/PayoutDatesPart';
import { AreaCardPart } from './area-card/AreaCardPart';
import { AreapageSituationCardPart } from './areapage-situation-card/AreapageSituationCardPart';
import { LoggedinCardPart } from './loggedin-card/LoggedinCardPart';
import { FrontpageContactPart } from './frontpage-contact/FrontpageContactPart';
import { FrontpageSurveyPanel } from './frontpage-survey-panel/FrontpageSurveyPanel';
import { UxSignalsWidgetPart } from 'components/parts/uxsignals-widget/UxSignalsWidgetPart';
import { FormDetailsPart } from './form-details/FormDetailsPart';

type Props = {
    partProps: PartComponentProps;
    pageProps: ContentProps;
};

const bem = BEM(ComponentType.Part);

const partsWithPageData: Record<
    PartLegacyType,
    React.FunctionComponent<ContentProps>
> = {
    [PartType.LinkLists]: LinkLists,
    [PartType.LinkPanels]: LinkPanelsLegacyPart,
    [PartType.MainArticle]: MainArticle,
    [PartType.MainArticleLinkedList]: MainArticleChapterNavigation,
    [PartType.MainPanels]: MainPanels,
    [PartType.MenuList]: MenuList,
    [PartType.OfficeInformation]: OfficeInformation,
    [PartType.PageHeading]: PageHeading,
    [PartType.PageList]: PageList,
    [PartType.PublishingCalendar]: PublishingCalendar,
    [PartType.PublishingCalendarEntry]: PublishingCalendarEntry,
};

const partsWithOwnData: Record<
    PartCurrentType,
    React.FunctionComponent<PartComponentProps>
> = {
    [PartType.AlertPanel]: AlertPanelPart,
    [PartType.AlertBox]: AlertBoxPart,
    [PartType.Header]: HeaderPart,
    [PartType.LinkPanel]: LinkPanelPart,
    [PartType.LinkList]: LinkListPart,
    [PartType.NewsList]: NewsListPart,
    [PartType.HtmlArea]: HtmlArea,
    [PartType.Calculator]: CalculatorPart,
    [PartType.PageHeader]: PageHeaderPart,
    [PartType.Button]: ButtonPart,
    [PartType.ProviderCard]: ProviderCardPart,
    [PartType.PageNavigationMenu]: PageNavigationMenuPart,
    [PartType.FiltersMenu]: FiltersMenu,
    [PartType.FrontpageCurrentTopics]: FrontpageCurrentTopics,
    [PartType.FrontpageShortcuts]: FrontpageShortcuts,
    [PartType.ProductCard]: ProductCardPart,
    [PartType.ProductCardMicro]: ProductCardMicroPart,
    [PartType.ProductCardMini]: ProductCardPart,
    [PartType.OfficeEditorialDetail]: OfficeEditorialDetail,
    [PartType.ProductDetails]: ProductDetailsPart,
    [PartType.FormDetails]: FormDetailsPart,
    [PartType.ContactOption]: ContactOptionPart,
    [PartType.PayoutDates]: PayoutDatesPart,
    [PartType.AreaCard]: AreaCardPart,
    [PartType.AreapageSituationCard]: AreapageSituationCardPart,
    [PartType.LoggedinCard]: LoggedinCardPart,
    [PartType.FrontpageContact]: FrontpageContactPart,
    [PartType.FrontpageSurveyPanel]: FrontpageSurveyPanel,
    [PartType.UxSignalsWidget]: UxSignalsWidgetPart,
};

const partsDeprecated: ReadonlySet<PartType> = new Set([
    PartType.Notifications,
    PartType.BreakingNews,
    PartType.PageCrumbs,
]) satisfies ReadonlySet<PartDeprecatedType>;

const PartComponent = ({ partProps, pageProps }: Props) => {
    const { descriptor } = partProps;

    const PartWithPageData = partsWithPageData[descriptor];
    if (PartWithPageData) {
        return <PartWithPageData {...pageProps} />;
    }

    const PartWithOwnData = partsWithOwnData[descriptor];
    if (PartWithOwnData) {
        return <PartWithOwnData {...partProps} pageProps={pageProps} />;
    }

    return <div>{`Unimplemented part: ${descriptor}`}</div>;
};

export const PartsMapper = ({ pageProps, partProps }: Props) => {
    const { path, descriptor, config } = partProps;

    if (!descriptor || partsDeprecated.has(descriptor)) {
        return null;
    }

    const isEditView = pageProps.editorView === 'edit';
    const partName = descriptor.split(':')[1];
    const renderOnAuthState = config?.renderOnAuthState;

    const editorProps =
        isEditView && !partsWithPageData[descriptor]
            ? {
                  'data-portal-component-type': ComponentType.Part,
                  'data-portal-component': path,
              }
            : undefined;

    return (
        <div
            className={classNames(
                bem(),
                bem(partName),
                isEditView && editorAuthstateClassname(renderOnAuthState)
            )}
            {...editorProps}
        >
            <PartComponent pageProps={pageProps} partProps={partProps} />
        </div>
    );
};
