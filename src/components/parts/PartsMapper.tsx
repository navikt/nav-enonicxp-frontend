import React from 'react';
import { PartWithOwnData, PartWithPageData } from 'types/component-props/parts';
import { PartDeprecated, PartType } from 'types/component-props/parts';
import LinkLists from './link-lists/LinkLists';
import { LinkPanels } from './link-panels/LinkPanels';
import { MainArticleChapterNavigation } from './main-article-chapter-navigation/MainArticleChapterNavigation';
import MainPanels from './main-panels/MainPanels';
import { MenuList } from './menu-list/MenuList';
import PageHeading from './page-heading/PageHeading';
import PageList from './page-list/PageList';
import Alert from './_dynamic/alert/Alert';
import { LinkPanelPart } from './_dynamic/link-panel/LinkPanelPart';
import LesMerPanel from './_dynamic/les-mer-panel/LesMerPanel';
import { MainArticle } from './main-article/MainArticle';
import {
    ComponentType,
    PartComponentProps,
} from '../../types/component-props/_component-common';
import { ContentProps } from '../../types/content-props/_content-common';
import Veilederpanel from './_dynamic/veilederpanel/Veilederpanel';
import { OfficeInformation } from './office-information/OfficeInformation';
import { HeaderPart } from './_dynamic/header/HeaderPart';
import { LinkList } from './_dynamic/link-list/LinkList';
import { NewsList } from './_dynamic/news-list/NewsList';
import PublishingCalendar from './publishing-calendar/PublishingCalendar';
import { BEM, classNames } from '../../utils/classnames';
import { HtmlArea } from './_dynamic/html-area/HtmlArea';
import { PageHeaderPart } from './_dynamic/page-header/PageHeaderPart';
import { ButtonPart } from './_dynamic/button/ButtonPart';
import { PageNavigationMenuPart } from './page-navigation-menu/PageNavigationMenuPart';
import { FiltersMenu } from './_dynamic/filters-menu/FiltersMenu';
import { ProductCardPart } from './_dynamic/product-card/ProductCardPart';
import { ContactOptionPart } from './_dynamic/contact-option/ContactOptionPart';

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
    [PartType.ReadMorePanel]: LesMerPanel,
    [PartType.SupervisorPanel]: Veilederpanel,
    [PartType.LinkList]: LinkList,
    [PartType.NewsList]: NewsList,
    [PartType.HtmlArea]: HtmlArea,
    [PartType.PageHeader]: PageHeaderPart,
    [PartType.Button]: ButtonPart,
    [PartType.PageNavigationMenu]: PageNavigationMenuPart,
    [PartType.FiltersMenu]: FiltersMenu,
    [PartType.ProductCard]: ProductCardPart,
    [PartType.ProductCardMini]: () => null,
    [PartType.ProductCardMicro]: () => null,
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
