import React from 'react';
import { PartWithOwnData, PartWithPageData } from 'types/component-props/parts';
import { PartDeprecated, PartType } from 'types/component-props/parts';
import LinkLists from './_legacy/link-lists/LinkLists';
import { LinkPanels } from './_legacy/link-panels/LinkPanels';
import { MainArticleChapterNavigation } from './_legacy/main-article-chapter-navigation/MainArticleChapterNavigation';
import MainPanels from './_legacy/main-panels/MainPanels';
import { MenuList } from './_legacy/menu-list/MenuList';
import PageHeading from './_legacy/page-heading/PageHeading';
import PageList from './_legacy/page-list/PageList';
import Alert from './alert/Alert';
import { LinkPanelPart } from './link-panel/LinkPanelPart';
import { MainArticle } from './_legacy/main-article/MainArticle';
import {
    ComponentType,
    PartComponentProps,
} from '../../types/component-props/_component-common';
import { ContentProps } from '../../types/content-props/_content-common';
import { OfficeInformation } from './_legacy/office-information/OfficeInformation';
import { HeaderPart } from './header/HeaderPart';
import { LinkList } from './link-list/LinkList';
import { NewsList } from './news-list/NewsList';
import PublishingCalendar from './_legacy/publishing-calendar/PublishingCalendar';
import { BEM, classNames } from '../../utils/classnames';
import { HtmlArea } from './html-area/HtmlArea';
import { PageHeaderPart } from './page-header/PageHeaderPart';
import { ButtonPart } from './button/ButtonPart';
import { ProviderCardPart } from './provider-card/ProviderCardPart';
import { PageNavigationMenuPart } from './page-navigation-menu/PageNavigationMenuPart';
import { FiltersMenu } from './filters-menu/FiltersMenu';
import { ProductCardPart } from './product-card/ProductCard';
import { ContactOptionPart } from './contact-option/ContactOptionPart';

type Props = {
    partProps: PartComponentProps;
    pageProps: ContentProps;
};

const partsWithPageData: {
    [key in PartWithPageData]: React.FunctionComponent<ContentProps>;
} = {
    [PartType.LinkLists]: LinkLists,
    [PartType.LinkPanels]: LinkPanels,
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
    [PartType.Alert]: Alert,
    [PartType.Header]: HeaderPart,
    [PartType.LinkPanel]: LinkPanelPart,
    [PartType.LinkList]: LinkList,
    [PartType.NewsList]: NewsList,
    [PartType.HtmlArea]: HtmlArea,
    [PartType.PageHeader]: PageHeaderPart,
    [PartType.Button]: ButtonPart,
    [PartType.ProviderCard]: ProviderCardPart,
    [PartType.PageNavigationMenu]: PageNavigationMenuPart,
    [PartType.FiltersMenu]: FiltersMenu,
    [PartType.ProductCard]: ProductCardPart,
    [PartType.ProductCardMicro]: ProductCardPart,
    [PartType.ProductCardMini]: ProductCardPart,
    [PartType.ContactOption]: ContactOptionPart,
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

    const PartWithOwnData = partsWithOwnData[descriptor];
    if (PartWithOwnData) {
        return <PartWithOwnData {...partProps} />;
    }

    return <div>{`Unimplemented part: ${descriptor}`}</div>;
};

export const PartsMapper = ({ pageProps, partProps }: Props) => {
    const { path, descriptor } = partProps;

    if (!descriptor) {
        return null;
    }

    const bem = BEM(ComponentType.Part);
    const partName = descriptor.split(':')[1];

    const editorProps = pageProps.editMode
        ? {
              'data-portal-component-type': ComponentType.Part,
              'data-portal-component': path,
          }
        : undefined;

    if (partsDeprecated[descriptor]) {
        // Prevents content-studio editor crash due to missing component props
        if (pageProps.editMode) {
            return <div {...editorProps} />;
        }

        return null;
    }

    return (
        <div className={classNames(bem(), bem(partName))} {...editorProps}>
            <PartComponent pageProps={pageProps} partProps={partProps} />
        </div>
    );
};
