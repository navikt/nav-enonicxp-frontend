import React from 'react';
import {
    PartDeprecated,
    PartType,
    PartWithOwnData,
    PartWithPageData,
} from 'types/component-props/parts';
import { MainArticleChapterNavigation } from './_legacy/main-article-chapter-navigation/MainArticleChapterNavigation';
import MainPanels from './_legacy/main-panels/MainPanels';
import { MenuList } from './_legacy/menu-list/MenuList';
import PageHeading from './_legacy/page-heading/PageHeading';
import PageList from './_legacy/page-list/PageList';
import { AlertBoxPart } from './alert-box/AlertBoxPart';
import { LinkPanelPart } from './link-panel/LinkPanelPart';
import { LinkPanelsLegacyPart } from './_legacy/link-panels/LinkPanelsLegacyPart';
import LinkLists from './_legacy/link-lists/LinkLists';
import { MainArticle } from './_legacy/main-article/MainArticle';
import {
    ComponentType,
    PartComponentProps,
} from '../../types/component-props/_component-common';
import { ContentProps } from '../../types/content-props/_content-common';
import { OfficeInformation } from './_legacy/office-information/OfficeInformation';
import { HeaderPart } from './header/HeaderPart';
import { LinkListPart } from './link-list/LinkListPart';
import { NewsListPart } from './news-list/NewsListPart';
import PublishingCalendar from './_legacy/publishing-calendar/PublishingCalendar';
import { BEM, classNames } from '../../utils/classnames';
import { HtmlArea } from './html-area/HtmlArea';
import { CalculatorPart } from './calculator/Calculator';
import { ProductDetailsPart } from './product-details/ProductDetailsPart';
import { PageHeaderPart } from './page-header/PageHeaderPart';
import { ButtonPart } from './button/ButtonPart';
import { ProviderCardPart } from './provider-card/ProviderCardPart';
import { PageNavigationMenuPart } from './page-navigation-menu/PageNavigationMenuPart';
import { FiltersMenu } from './filters-menu/FiltersMenu';
import { FrontpageCurrentTopics } from './frontpage-current-topics/FrontpageCurrentTopics';
import { FrontpageShortcuts } from './frontpage-shortcuts/FrontpageShortcuts';
import { ProductCardPart } from './product-card/ProductCard';
import { ContactOptionPart } from './contact-option/ContactOptionPart';
import { ProductCardMicroPart } from './product-card-micro/ProductCardMicro';
import { editorAuthstateClassname } from '../_common/auth-dependant-render/AuthDependantRender';
import { AlertPanelPart } from './alert-panel/AlertPanelPart';
import { PayoutDatesPart } from './payout-dates/PayoutDatesPart';
import { AreaCardPart } from './area-card/AreaCardPart';
import { AreapageSituationCardPart } from './areapage-situation-card/AreapageSituationCardPart';
import { LoggedinCardPart } from './loggedin-card/LoggedinCardPart';
import { FrontpageContactPart } from './frontpage-contact/FrontpageContactPart';
import { IngressPart } from './ingress/IngressPart';

type Props = {
    partProps: PartComponentProps;
    pageProps: ContentProps;
};

const partsWithPageData: {
    [key in PartWithPageData]: React.FunctionComponent<ContentProps>;
} = {
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
};

const partsWithOwnData: {
    [key in PartWithOwnData]: React.FunctionComponent<PartComponentProps>;
} = {
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
    [PartType.ProductDetails]: ProductDetailsPart,
    [PartType.ContactOption]: ContactOptionPart,
    [PartType.PayoutDates]: PayoutDatesPart,
    [PartType.AreaCard]: AreaCardPart,
    [PartType.AreapageSituationCard]: AreapageSituationCardPart,
    [PartType.LoggedinCard]: LoggedinCardPart,
    [PartType.FrontpageContact]: FrontpageContactPart,
    [PartType.Ingress]: IngressPart,
};

const partsDeprecated: { [key in PartDeprecated] } = {
    [PartType.Notifications]: true,
    [PartType.BreakingNews]: true,
    [PartType.PageCrumbs]: true,
};

const PartComponent = ({ partProps, pageProps }: Props) => {
    const { descriptor } = partProps;

    const PartWithGlobalData = partsWithPageData[descriptor];
    if (PartWithGlobalData) {
        return <PartWithGlobalData {...pageProps} />;
    }

    const PartWithPageData = partsWithOwnData[descriptor];

    if (PartWithPageData) {
        return <PartWithPageData {...partProps} pageProps={pageProps} />;
    }

    return <div>{`Unimplemented part: ${descriptor}`}</div>;
};

export const PartsMapper = ({ pageProps, partProps }: Props) => {
    const { path, descriptor, config } = partProps;
    const isEditView = pageProps.editorView === 'edit';
    const renderOnAuthState = config?.renderOnAuthState;

    const editorProps = isEditView
        ? {
              'data-portal-component-type': ComponentType.Part,
              'data-portal-component': path,
          }
        : undefined;

    if (!descriptor || partsDeprecated[descriptor]) {
        // Prevents content-studio editor crash due to missing component props
        return isEditView ? <div {...editorProps} /> : null;
    }

    const bem = BEM(ComponentType.Part);
    const partName = descriptor.split(':')[1];

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
